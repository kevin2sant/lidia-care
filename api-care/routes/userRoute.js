const express 	= require('express')
const user    	= require('../controllers/userController')

const route 	= express.Router()

route.get('/test', user.userTest)
route.post('/userRegister', user.userRegister)
route.post('/userLogin', user.userLogin)
route.post('/validateJwt', user.validateJwt)
route.put('/updatePassword', user.updatePassword)
route.put('/resetPassword', user.resetPassword)

module.exports = route
