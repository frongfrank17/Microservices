const Role = require('../models/role.model')

module.exports = {

    AddRole : async (req, res) => {

        try {
                let {role , username} = req.params
               // const role = await Role.updateOne({ role : role }  ,  { $push : { member :  username  }   } )
            
                res.status(200).send( {message : "update role success"} )

        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.status(500).send(err.message)
        }
    }
}