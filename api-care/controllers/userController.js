const UserModel =  require('../models/userModel')
const jwt 		=  require('jsonwebtoken')
const CryptoJS 	=  require('crypto-js')

const userRegister = async (req,res,next) => {
	
	const {user, email, password, profile, name, lastname, rut} = req.body
	console.log({ user, email, password, profile, name, lastname, rut } )
	// Encrypt password
	const encryptPassword = CryptoJS.AES.encrypt(password, 'l1d14;2022').toString();

	const userData = {user: user, email : email, password : encryptPassword, profile : profile, name: name, lastname: lastname, rut: rut}
	
	try{
	    var response = await UserModel.searchUser(userData,res)
	    if (response.rowCount == 0){
	    	var insert = await UserModel.register(userData,res)
			
			return insert.rows[0].iduser
	    }else{
	    	return response
	    }
	}catch (e){
		console.log(e)
	    res.status(500).send({
	    	code : 3,
	      	message : 'error'
	    })
	    next(e)
	}
}

const userLogin = async(req,res,next) => {
	const {user, passwd} = req.body
	
	try{
		
		var login = await UserModel.searchUser(req.body,res)

		if(login.rowCount > 0){
			// Decrypt password
			const bytes  = CryptoJS.AES.decrypt(login.rows[0].v_password, 'l1d14;2022');
		
			const originalText = bytes.toString(CryptoJS.enc.Utf8);
			
			if (originalText == passwd){

				const token = await jwt.sign({
			        i_id_user 		: login.rows[0].i_id_user,
					v_user 			: login.rows[0].v_user,
					v_id_user_level : login.rows[0].v_id_user_level
			    }, 'l1d14;2022', { expiresIn: '1000h' })

				res.status(200).json({
					code : 2,
					message : 'Success',
					data : token
				})
			}else{
				res.status(400).json({
					code : 2,
					message : 'Incorrect user or password'
				})
			}
		}else{
			res.status(400).send({
				code : 2,
		     	message : 'Incorrect user or password '
		    })
		}
	}catch(e){
		
		console.log(e)
		res.status(500).send({
			code : 3,
	      	message : 'error'
	    })
	    next(e)
	}
}

const validateJwt = (req, res) => {
	// return res.status(200).json(req.body.token)
	var decoded = jwt.verify(req.body.token, 'l1d14;2022');
    return res.status(200).json(decoded)
}


const updatePassword =  async (req, res) => {
    const {user, password, passwordUpdate} = req.body
    try {
		var login = await UserModel.searchUserbyid(req.body,res)
		
		const bytes  = CryptoJS.AES.decrypt(login.rows[0].password, 'l1d14;2022');
		const originalText = bytes.toString(CryptoJS.enc.Utf8);
		
		const encryptPasswordUpdate = CryptoJS.AES.encrypt(passwordUpdate, 'l1d14;2022').toString();
		if (originalText != password){
			res.status(200).json({
				code : 1,
				message : 'Wrong Password',
				type : "errorpassword",
			})
		}
		
		
		else if(login.rowCount > 0 && originalText == password){
		
		req.body.passwordUpdate = encryptPasswordUpdate
		const response = await UserModel.updatePassword(req ,res)
			res.status(200).json({
				code : 128,
				type : "success",
				message 	: 	'Password Updated',
					
				})
		}
    }catch (err) {
        console.error(err)
        res.status(500).send({
            code : 12,
	      	message : 'Aplication error'
	    })
    }
}


const resetPassword =  async (req, res) => {
    const {user} = req.body
	const password = 'flock'
    try {
		var login = await UserModel.searchUserbyid(req.body,res)

		
		const encryptPasswordUpdate = CryptoJS.AES.encrypt(password, 'l1d14;2022').toString();
		
		if(login.rowCount > 0){
			req.body.passwordUpdate = encryptPasswordUpdate
		const response = await UserModel.updatePassword(req ,res)
			res.status(200).json({
				code : 128,
				type : "success",
				message 	: 	'Password Updated',
					
				})
		}
    }catch (err) {
        console.error(err)
        res.status(500).send({
            code : 12,
	      	message : 'Aplication error'
	    })
    }
}

const userTest = (req,res) => {
	res.status(500).send({
        code : 12,
      	message : 'Aplication error'
    })
}

module.exports = {
	userRegister,
	userLogin,
	validateJwt,
	updatePassword,
	resetPassword,
	userTest
}
