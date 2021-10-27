const services = require('../services')
const jwt = require('jsonwebtoken')
const config = require('../config')


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

             

                    let permissions = Key.permissions
                        
                    const havePermission = permissions.includes('create:data')

                    if (!havePermission) {

                        return   res.status(401).send(  { message :' Missing Permission API ' })

                    } 
                

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