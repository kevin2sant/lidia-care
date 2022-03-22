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


const register = async (req,res) => {
	const {user, email, password, profile, name, lastname, rut} = req
	console.log({ user, email, password, profile, name, lastname, rut })

	let query = {
		text: ` INSERT INTO users(username,password,email,created_at,iduser_profile, name, lastname, rut)
                VALUES (
                	$1,$2,$3, now(), $4, $5, $6, $7
                ) RETURNING iduser`,

	    values: [user, password, email, profile, name, lastname, rut]
	}
	return pool()
    .query(query)
    .then(response => response
    )
    .catch(error => {
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
	searchUser
}
