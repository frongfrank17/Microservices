const authentication = require('./authentication')
const services = require('../services')
module.exports = {

    Servicetoken : async (req , res ) => {
        try {

            let signature = req.headers['x-api-key']        
            let  decoded = req.jwtDecode
            let authorization = req.headers.authorization
            

            if( signature == null || signature == undefined || signature == '' ) {
                return res.status(400)
            }         
            // permissions
            let permissions 
            if (decoded.type == "DEVELOP") {
                permissions  = decoded.permission
            } else {
                permissions  = await services.permissionService.GetPermissionByRole({token : authorization })
                permissions   = permissions.permissions
            } 
            

            let token  = await authentication.serviceToken( decoded , signature )

            res.status(200).json( { apiKey : token , permissions :  permissions  } )


        }catch(err) {

            console.log(' MESSAGE : ' ,err.message)
            console.log(' STACK : ' ,err.stack)

            res.status(500).send( { status : false , message : err.message } )
        }
    }    
} 