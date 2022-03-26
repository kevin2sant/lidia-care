const pool = require('./connectModel')

const listPlans = async (req,res) => {
	let query = {
        text: ` SELECT a.*
				FROM plans a
                WHERE b_active = 'true'`,

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


const deactivatePlan = async (req,res) => {
	const {idplan} = req.body;

	let query = {
        text: ` UPDATE plans
				SET b_active = 'f'
				WHERE i_idplan = $1`,
		values: [idplan]

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

const addPlan = async (req,res) => {
	const {v_plan,
		v_plan_description,
		i_beneficiaries,
		i_idplan_interval,
		i_price_per_beneficiary,
		i_internal_price_per_beneficiary,
		i_appointments,
		i_extra_appointments,
		n_discount_appointment,
		n_discount_particular
 	} = req

	let query = {
		text: ` INSERT INTO plans(
					v_plan,
					v_plan_description,
					i_beneficiaries,
					i_idplan_interval,
					i_price_per_beneficiary,
					i_internal_price_per_beneficiary,
					i_appointments,
					i_extra_appointments,
					n_discount_appointment,
					n_discount_particular)
                VALUES (
                	$1,$2,$3,$4,$5,$6,$7,$8,$9,$10
                ) RETURNING i_idplan`,

	    values: [v_plan,
				v_plan_description,
				i_beneficiaries,
				i_idplan_interval,
				i_price_per_beneficiary,
				i_internal_price_per_beneficiary,
				i_appointments,
				i_extra_appointments,
				n_discount_appointment,
				n_discount_particular]
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

const listPlansCompany = async (req,res) => {
	const {idcompany} = req

	let query = {
        text: ` SELECT a.i_idcompany, 
						a.i_idplan, 
						b.v_plan, 
						b.b_active as b_active_plan, 
						c.v_plan_interval  
				FROM company_plan a
				INNER JOIN plans b ON a.i_idplan = b.i_idplan
				INNER JOIN plan_interval c on b.i_idplan_interval = c.i_idplan_interval
				WHERE a.i_idcompany = $1`,
		values : [idcompany]

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


module.exports = {
	listPlans,
	deactivatePlan,
	addPlan,
	listPlansCompany
}
