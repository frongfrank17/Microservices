const Permission = require('../models/permission.model')

module.exports = {

    getPermissionByRole : async (req , res , next) => {
        try {
            let decode =  req.jwtDecode
            console.log(decode.role)

            const permissionRole = await Permission.findOne({ role : decode.role } , {_id : 0} )
     
            if (permissionRole) {
  
                res.status(200).send(permissionRole)
            } else {
                res.status(400)                
            }
        } catch(err) {
            console.log(err.message) 
            console.log(err.stack)
            res.status(500)
        }
    }
} 