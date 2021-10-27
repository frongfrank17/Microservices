const authentication = require('./authentication')
const services = require('../services')
const client = require('../memory/Caching')

module.exports = {

    Servicetoken : async (req , res ) => {
        try {

            let signature = req.headers['x-api-key']        
            let  decoded = req.jwtDecode
            let authorization = req.headers.authorization
            let access_token = authorization.split(' ')[1]
       
            if( signature == null || signature == undefined || signature == '' ) {
                return res.status(400)
            }         
            
            let token 
            let permissions 
            if (decoded.type == "DEVELOP") {
                let getToekn =  await client.asyncGet(access_token)

                if(typeof getToekn == 'string' ) {

                    getToekn = JSON.parse(getToekn)
                    
                    return res.status(200).json( { apiKey : getToekn.token , permissions : getToekn.permissions  } )
                }
             

                token  = await authentication.serviceToken( decoded , signature )

                permissions  = decoded.permission

                await client.asyncSet( access_token, JSON.stringify({   token : token , permissions :  permissions }) )

            } else {

                let getToekn =  await client.asyncGet(access_token)

                if(typeof getToekn == 'string' ) {

                    getToekn = JSON.parse(getToekn)

               
                    return res.status(200).json( { apiKey : getToekn.token , permissions : getToekn.permissions  } )

                }
                token  = await authentication.serviceToken( decoded , signature )

                permissions  = await services.permissionService.GetPermissionByRole({token : authorization })

                permissions   = permissions.permissions
                
                await client.asyncSet(access_token , { token :token , permissions :  permissions } )
            } 
            

          
           
           
          

            res.status(200).json( { apiKey : token , permissions :  permissions  } )


        }catch(err) {

            console.log(' MESSAGE : ' ,err.message)
            console.log(' STACK : ' ,err.stack)

            res.status(500).send( { status : false , message : err.message } )
        }
    }     ,

    

} 