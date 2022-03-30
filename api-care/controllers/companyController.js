const companyModel =  require('../models/companyModel')
const jwt 		=  require('jsonwebtoken')
const CryptoJS 	=  require('crypto-js')

const getDataRegister = async (req,res) => {
	try{
		const getActiveCompany = await companyModel.getActiveCompany(req,res)
		const getActivePlan = await companyModel.getActivePlan(req,res)

		res.status(200).json({
			data : {
				company : getActiveCompany,
				plan : getActivePlan
			},
			message : 'success'
		})
	}catch(error){
		console.log(error)
		res.status(400).json({
			error : error
		})
	}
}

const companyList = async (req,res) => {
	try{
	    let response = await companyModel.listCompany(req.body,res)
		
		res.json({
			type : 'success',
			data : {
				response
			}
		}) 
	}catch (err){
	    res.status(500).send({
            code : 12,
	      	message : 'Aplication error'
	    })
	}
}


const companyDeactivate =  async (req, res) => {
    try {
		let response = await companyModel.deactivateCompany(req.body ,res)
		if (response.rowCount >0){ 
			res.status(200).json({
				code : 13,
				type : "success",
				message : 'Compañia desactivada',			
			})
		}else{
			res.status(200).json({
				code : 14,
				type : "error",
				message : 'Compañia no existe',			
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

const companyAdd = async (req,res) => {
	
    let responseSearch = await companyModel.searchCompany(req.body,res)
    
    if(responseSearch.rowCount > 0){
        res.status(200).json({
            code : 15,
            type : "error",
            message : 'Rut empresa ya existe'	
        })
    }else {
        try{
            let response = await companyModel.addCompany(req.body,res)

            let companies = await companyModel.listCompany(req.body,res)

            if (response.rowCount > 0){
                res.status(200).json({
                    code : 16,
                    type : "success",
                    message : 'Se agrego la compañia',	
                    data : {
                    	id : response.rows[0].i_idcompany,	
                    	companies : companies
                    }	
                })
            }else{
                return response
            }
        }catch (err) {
            console.error(err)
            res.status(500).send({
                code : 12,
                  message : 'Aplication error'
            })
        }
    }
	
}



module.exports = {
	getDataRegister,
	companyList,
    companyDeactivate,
    companyAdd
}
