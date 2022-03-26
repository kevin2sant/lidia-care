const express 	= require('express')
const plan    	= require('../controllers/plansController')

const route 	= express.Router()
// HTTP GET
route.get('/plansList', plan.plansList)
route.get('/plansCompanyList', plan.plansCompanyList)

// HTTP POST
route.post('/planAdd', plan.planAdd)

// HTTP PUT
route.put('/planDeactivate', plan.planDeactivate)

module.exports = route
