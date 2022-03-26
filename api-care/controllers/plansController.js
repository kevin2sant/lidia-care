const PlansModel =  require('../models/plansModel')

const plansList = async (req,res) => {
	try{
	    let response = await PlansModel.listPlans(req.body,res)
		res.json({
			response
		}) 
	}catch (err){
	    res.status(500).send({
            code : 12,
	      	message : 'Aplication error'
	    })
	}
}


const planDeactivate =  async (req, res) => {
    try {
		let response = await PlansModel.deactivatePlan(req ,res)
		if (response.rowCount >0){ 
			res.status(200).json({
				code : 13,
				type : "success",
				message : 'Plan desactivado',			
			})
		}else{
			res.status(200).json({
				code : 14,
				type : "error",
				message : 'Plan no existe',			
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

const planAdd= async (req,res) => {
	
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
	} = req.body
	const planData = {v_plan : v_plan,
					  v_plan_description : v_plan_description,
					  i_beneficiaries : i_beneficiaries,
					  i_idplan_interval : i_idplan_interval,
					  i_price_per_beneficiary : i_price_per_beneficiary,
					  i_internal_price_per_beneficiary : i_internal_price_per_beneficiary,
					  i_appointments : i_appointments,
					  i_extra_appointments : i_extra_appointments,
					  n_discount_appointment : n_discount_appointment,
					  n_discount_particular : n_discount_particular
	}
	
	try{
	    let response = await PlansModel.addPlan(planData,res)
	    if (response.rowCount > 0){
			res.status(200).json({
				code : 13,
				type : "success",
				message : 'Se agrego el plan',	
				idplan : response.rows[0].i_idplan		
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


module.exports = {
	plansList,
	planDeactivate,
	planAdd
}
