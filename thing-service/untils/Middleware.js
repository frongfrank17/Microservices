const services = require('../services')
const jwt = require('jsonwebtoken')
const config = require('../config')
const crypto = require('crypto');
const hashHmacSha256 = string => crypto
  .createHmac('sha256', config.tokenSettings.publicKey)
  .update(string)
  .digest('hex');
module.exports = {
    Middleware : async ( req , res , next) => {
        try {

           
            const authorization = req.headers.authorization

            if (!authorization || !(authorization.search('Bearer ') === 0)) {

                return next(new Error('Missing Authorization Header'))

            }
        
            const token = authorization.split(' ')[1]
        
            if (!token) {

                return next(new Error('Missing Bearer Token'))

            }
        
            const Key = await services.OauthService.Keyservice({token : authorization  })
            console.log(Key)
            let permissions = Key.permissions
                
            const haveViewThing = permissions.includes('read:thing')

            if (!haveViewThing) {

                 return   res.status(401).send(  { message :' Missing Permission API ' })

            } 
            console.log(Key)
            const decoded = jwt.verify(Key.apiKey ,config.tokenSettings.privateKey)
            req.permissions = permissions
            req.jwtDecode = decoded

            next()

        }catch(err) {
            console.log("MESSAGE : " , err.message)
            console.log("STACK : " , err.stack)
            res.status(500).json({message : err.message})
        }  
    } 
 }