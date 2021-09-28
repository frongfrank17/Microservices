const authentication = require('./authentication')
const services = require('../services')
module.exports = {
    Accesstoken : async  ( req , res ) => {
        try {
            let {username , password } = req.body
            if(!username || !password || username == "" || password =="" )  {
                return res.status(401)
            }
            let user = await services.userService.Login(req.body)
            
            if(user.status == false) {
              return  res.status(400).send(user.message)
            } 
            user = user.data 
            let role = await services.roleService.GetRole({
                username : user.username
            })
         
            if(!role.data ) {
                return  res.status(400)
            } 
    
            let token = await  authentication.AccessToken({
                    email : user.email, 
                    username : user.username , 
                    role : role.data.role
                })

            //encode
            res.status(200).json({ "token_type" : "Bearer" , "token" : token })
        } catch(err) {
            console.log( "MESSAGE : " , err.message) 
            console.log( "STACK : " , err.stack)
            return res.status(500).send({  message : err.message})
        }
    }   ,
    
} 