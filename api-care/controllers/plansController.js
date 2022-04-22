const PlansModel =  require('../models/plansModel')

const plansList = async (req,res) => {
	try{
	    let response = await PlansModel.listPlans(req.body,res)
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
	
	
	try{
	    let response = await PlansModel.addPlan(req.body,res)
		let plans = await PlansModel.listPlans(req.body,res)

	    if (response.rowCount > 0){
			res.status(200).json({
				code : 13,
				type : "success",
				message : 'Se agrego el plan',	
				data : {
					id : response.rows[0].i_idplan,
					plans : plans
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


const plansCompanyList = async (req,res) => {
	try{
	    let response = await PlansModel.listPlansCompany(req.body,res)
		if (response.rowCount >0){ 
			res.json({
				response
			}) 
		}else{
			res.status(200).json({
				code : 15,
				type : "error",
				message : 'La compañia no tiene planes asignados',			
			})
		}
	}catch (err){
	    res.status(500).send({
            code : 12,
	      	message : 'Aplication error'
	    })
	}
}

const plansIntervalList = async (req,res) => {
	try{
	    let response = await PlansModel.listPlansIntervals(req.body,res)
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

const getDataRegister = async (req,res) => {
	try{
		let getActivePlans = await PlansModel.listPlans(req.body,res)
	    let getActiveIntervals = await PlansModel.listPlansIntervals(req.body,res)
		res.status(200).json({
			data : {
				plans : getActivePlans,
				intervals : getActiveIntervals
			},
			message : 'success'
		}) 
	}catch (error){
	    res.status(500).send({
            code : 12,
	      	message : 'Aplication error'
	    })
	}
}


module.exports = {
	plansList,
	planDeactivate,
	planAdd,
	plansCompanyList,
	plansIntervalList,
	getDataRegister
}
