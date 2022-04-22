const PsyModel =  require('../models/psyModel')

const psyList = async (req,res) => {

	try{
	    let response = await PsyModel.listPsy(req.body,res)
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


const psyDeactivate =  async (req, res) => {
    try {
		let response = await PsyModel.deactivatePsy(req ,res)
		if (response.rowCount >0){ 
			res.status(200).json({
				code : 13,
				type : "success",
				message : 'Psicologo desactivado',			
			})
		}else{
			res.status(200).json({
				code : 14,
				type : "error",
				message : 'Psicologo no existe',			
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

const psyAdd= async (req,res) => {
	
	let responseSearch = await PsyModel.searchPsy(req.body,res)
	if(responseSearch.rowCount > 0){
        res.status(200).json({
            code : 15,
            type : "error",
            message : 'Usuario y/o identificación ya existe'	
        })
    }else {
		try{
			let response = await PsyModel.addPsy(req.body,res)
			let psys = await PsyModel.listPsy(req.body,res)

			if (response.rowCount > 0){
				res.status(200).json({
					code : 13,
					type : "success",
					message : 'Se agrego el Psicologo',	
					data : {
						id : response.rows[0].i_idpsy,
						psys : psys
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
	psyList,
    psyDeactivate,
    psyAdd
}
