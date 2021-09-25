const Role = require('../models/role.model')

module.exports = {

    getRoleByUsername: async (req, res) => {

        try {
            
            const role = await Role.find({member :  { $eq : req.params.username } })
            if(!role) {
             return   res.status(400).json({ message : "Not Data" ,  data : [] } )
            }  
            res.status(200).json({  data : role} )

        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.status(500).json({ message : err.message , data : [] } )
        }
    }
}