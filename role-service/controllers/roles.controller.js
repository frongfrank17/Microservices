const Role = require('../models/role.model')

module.exports = {

    getRoleByUsername: async (req, res) => {

        try {
            const username = req.param.username
            const role = await Role.find({username: username})

            res.status(200).send(role)
        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.status(500).send(err.message)
        }
    }
}