const express 	= require('express')
const psy    	= require('../controllers/psyController')

const route 	= express.Router()
// HTTP GET
route.get('/getListPsyActive', psy.getListPsyActive)

// HTTP POST

// HTTP PUT

module.exports = route
