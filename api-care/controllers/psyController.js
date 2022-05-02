const psyModel =  require('../models/psyModel')

const getListPsyActive = async(req,res,next) => {
	try{
		const getData = await psyModel.getListPsyActive(req,res)

		res.status(200).json({
			data : {
				psy : getData
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

module.exports = {
	getListPsyActive
}