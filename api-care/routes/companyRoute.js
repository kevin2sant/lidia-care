const express 	= require('express')
const company    	= require('../controllers/companyController')

const route 	= express.Router()

// GET
route.get('/getDataRegister', company.getDataRegister)
route.get('/companyList', company.companyList)

// POST
route.post('/companyAdd', company.companyAdd)

module.exports = route
