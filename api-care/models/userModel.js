const pool = require('./connectModel')

const searchUser = async (req,res) => {
	const {user, email, password} = req
	
	let query = {
        text: ` SELECT a.*
				FROM users a
                WHERE v_user = $1`,

        values: [user],
    }

    return pool()
    .query(query)
    .then(response => response)
    .catch(error => {
		// console.log(error)
    	res.status(500).send({
   	      	message : 'Ocurrio un error'
		})
	})
}


const usersRegister = async (req,res) => {

	let query = {
		text: ` SELECT * 
				FROM fn_insert_users_json($1,$2,$3)`,

	    values: [req.users, req.company, req.plan]
	}

	console.log(query)

	return pool()
    .query(query)
    .then(response => response.rows
    )
    .catch(error => {
    	console.log(error)
    	res.status(500).send({
	      message : 'Ocurrio un error'
	    })
    })
}

const updatePassword = (req,res) => {
	const {iduser, passwordUpdate} = req.body;

	let query = {
		text: ` UPDATE users 
				SET password = $1,
					updated_at = now()
				WHERE iduser = $2 
				 `,

	    values: [passwordUpdate, iduser]
	}
	return pool()
    .query(query)
    .then(response => 
        response.rows
    )
    .catch(error => {
    	res.status(500).send({
	      message : 'Ocurrio un error'
	    })
    })
} 



module.exports = {
	searchUser,
	usersRegister
}
