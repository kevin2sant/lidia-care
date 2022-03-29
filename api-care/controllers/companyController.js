const companyModel =  require('../models/companyModel')

const companyList = async (req,res) => {
	try{
	    let response = await companyModel.listCompany(req.body,res)
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


const companyDeactivate =  async (req, res) => {
    try {
		let response = await companyModel.deactivateCompany(req ,res)
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

const companyAdd= async (req,res) => {
	
	const {v_company, v_company_code} = req.body
	const companyData = {v_company : v_company, v_company_code : v_company_code}
    let responseSearch = await companyModel.searchCompany(companyData,res)
    if(responseSearch.rowCount > 0){
        res.status(200).json({
            code : 15,
            type : "error",
            message : 'Codigo de empresa ya existe'	
        })
    }else {
        try{
            let response = await companyModel.addCompany(companyData,res)
            if (response.rowCount > 0){
                res.status(200).json({
                    code : 16,
                    type : "success",
                    message : 'Se agrego la compañia',	
                    idcompany : response.rows[0].i_idcompany		
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
	companyList,
    companyDeactivate,
    companyAdd
}
