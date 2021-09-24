const User = require('../models/user.model')

module.exports = {

    checkLogin: async (req , res) => {
        try {
            const { username, password} = req.body
            const user = await User.findOne({username: username})
            if (!user) {
                res.status(400).send({message: "Login Fail"})
            }
            if (checkHash(password, user.password)) {
                user.pop('password')
                res.status(200).send(user)
            } else {
                res.status(400).send({message: "Login Fail"})
            }
        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.send(400, err.message);
        }
    }
}

function checkHash(password, hasPassword) {
    
    return true
}