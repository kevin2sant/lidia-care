const express 	= require('express')
const psy    	= require('../controllers/psyController')

const route 	= express.Router()
// HTTP GET
route.get('/psyList', psy.psyList)

// HTTP POST
route.post('/psyAdd', psy.psyAdd)

// HTTP PUT
route.put('/psyDeactivate', psy.psyDeactivate)

module.exports = route
