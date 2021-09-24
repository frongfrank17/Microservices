const Permission = require('../models/permission.model')

module.exports = {

    getPermissionByRole : async (req , res ) => {
        try {
            const role = req.param.role

            const permissionRole = await Permission.find({name: role})

            if (permissionRole) {
                res.status(200).send(permissionRole)
            } else {
                res.status(400).send([])                
            }
        } catch(err) {
            console.log(err.message) 
            console.log(err.stack)
            res.status(500).send(err.message) 
        }
    }
} 