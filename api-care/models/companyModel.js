const pool = require('./connectModel')

const getActiveCompany = async (req,res) => {
	let query = {
		text : `SELECT *
				FROM companies
				WHERE b_active IS TRUE;`,
		values : []
	}

	return pool()
	.query(query)
	.then(res => res.rows)
	.catch(res => {
		console.log(res)
		res.status(400).json({
			error : res
		})
	})
}

const getActivePlan = async (req,res) => {
	let query = {
		text : `SELECT *
				FROM plans
				WHERE b_active IS TRUE;`,
		values : []
	}

	return pool()
	.query(query)
	.then(res => res.rows)
	.catch(res => {
		console.log(res)
		res.status(400).json({
			error : res
		})
	})
}

const listCompany = async (req,res) => {
	let query = {
        text: ` SELECT a.*
				FROM companies a
                WHERE b_active = 'true'
                ORDER BY 1 DESC`
    }
    return pool()
    .query(query)
    .then(response => response.rows)
    .catch(error => {
		// console.log(error)
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
		// console.log(error)
    	res.status(500).send({
   	      	message : 'Ocurrio un error'
		})
	})
}

const addCompany = async (req,res) => {

	let query = {
		text: ` INSERT INTO companies(
                    v_company,
                    v_company_code)
                VALUES (
                	$1,$2
                ) RETURNING i_idcompany`,

	    values: [req.company, req.identification]
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

	let query = {
		text: `SELECT a.*
               FROM companies a
               WHERE trim(v_company_code) = trim($1)`,
 
	    values: [req.identification]
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
    searchCompany,
    getActiveCompany,
	getActivePlan
}