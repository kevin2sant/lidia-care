const express 	= require('express')
const company    	= require('../controllers/companyController')

const route 	= express.Router()
// HTTP GET
route.get('/companyList', company.companyList)

// HTTP POST
route.post('/companyAdd', company.companyAdd)

// HTTP PUT
route.put('/companyDeactivate', company.companyDeactivate)

module.exports = route
