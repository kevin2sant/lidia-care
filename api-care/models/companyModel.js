const pool = require('./connectModel')

const listCompany = async (req,res) => {
	let query = {
        text: ` SELECT a.*
				FROM companies a
                WHERE b_active = 'true'`
    }
    return pool()
    .query(query)
    .then(response => response)
    .catch(error => {
    	res.status(500).send({
   	      	message : 'Ocurrio un error'
		})
	})
}


const deactivateCompany = async (req,res) => {
	const {idcompany} = req.body;

	let query = {
        text: ` UPDATE companies
				SET b_active = 'f',
                    d_updated_at = NOW()
				WHERE i_idcompany = $1`,
		values: [idcompany]

    }

    return pool()
    .query(query)
    .then(response => response)
    .catch(error => {
    	res.status(500).send({
   	      	message : 'Ocurrio un error'
		})
	})
}

const addCompany = async (req,res) => {
	const {v_company, v_company_code} = req

	let query = {
		text: ` INSERT INTO companies(
                    v_company,
                    v_company_code)
                VALUES (
                	$1,$2
                ) RETURNING i_idcompany`,
	    values: [v_company, v_company_code]
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

const searchCompany = async (req,res) => {
	const {v_company_code} = req

	let query = {
		text: `SELECT a.*
               FROM companies a
               WHERE trim(v_company_code) = trim($1)`,
 
	    values: [v_company_code]
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


module.exports = {
	listCompany,
	deactivateCompany,
	addCompany,
    searchCompany
}
