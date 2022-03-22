const jwt = require('jsonwebtoken')
// const Users = require('../models/Users')

const isAuthenticated = (req,res,next) => {
    if (req.headers.jarvistoken){
        let token = req.headers.jarvistoken
        
        const verify = jwt.verify(token, 'l1d14;2022', function(err, decoded) {
            
            if (decoded){
                next()
            }else{
                res.status(401).json({type : 'error', message : 'Unauthorized'})
            }
        });    
    }else{
        res.status(401).json({type : 'error', message : 'You dont have access token'})
    }
}

module.exports = {
    isAuthenticated
}
