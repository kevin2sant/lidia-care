const express 	= require('express')
const user    	= require('../controllers/userController')

const route 	= express.Router()

route.get('/test', user.userTest)
route.post('/userLogin', user.userLogin)
route.post('/validateJwt', user.validateJwt)
route.put('/updatePassword', user.updatePassword)
route.put('/resetPassword', user.resetPassword)
route.post('/usersRegister', user.usersRegister)

module.exports = route
