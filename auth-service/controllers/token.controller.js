const authentication = require('./authentication')
const services = require('../services')
const tokenModel = require('../models/token.model')
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
    Developtoken : async  ( req , res ) => {
        try {
          
            let {username } = req.jwtDecode
            let  authorization = req.headers.authorization
            let title = req.query.title
            let right  =  req.body.right || ['create:data' ]
            let role = await services.roleService.GetRole({
                username : username
            })
            
            if(!role.data ) {
                return  res.status(400)
            } 
            let permission = await services.permissionService.GetPermissionByRole({token : authorization } )
            
            let permiss = permission.permissions

            console.log(permiss)

            let result = permiss.filter( p => right.includes(p))

            console.log(result)

            let token = await  authentication.DevelopToken({
                    type : "DEVELOP" ,  
                    username : username , 
                    token_name : title , 
                    permission  : result
            })
            let create =  await tokenModel.create({
                            username : username , 
                            token_name : title , 
                            permission : result , 
                            token : token
                        })
            console.log(create)
            res.status(200).json({ "token_type" : "Bearer" , "token" : token  }) 
           
        } catch(err) {
            console.log( "MESSAGE : " , err.message) 
            console.log( "STACK : " , err.stack)
            return res.status(500).send({  message : err.message})
        }
    }   , 
    Servicetoken : async (req , res ) => {
        try {

            let signature = req.headers['x-api-key']
            
            let username = req.headers.user

            if( username == null || username == undefined || username == '' ) {
                return res.status(400)
            }
            if( signature == null || signature == undefined || signature == '' ) {
                return res.status(400)
            }         
        
            let token  = await authentication.serviceToken({ username : username  } , signature )

            res.status(200).json( { apiKey : token } )


        }catch(err) {

            console.log(' MESSAGE : ' ,err.message)
            console.log(' STACK : ' ,err.stack)

            res.status(500).send( { status : false , message : err.message } )
        }
    }    
} 