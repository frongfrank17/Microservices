const User = require('../models/user.model')

module.exports = {

    checkLogin: async (req , res) => {
        try {
            const { username, password } = req.body
            console.log(req.body)
            const user = await User.findOne({username: username} , { username : 1 ,  passwordHashSalt :1 , email : 1 , _id : 0 } ).exec()
            console.log(user)
            if(!user) {
                return res.status(400)
            }  
            let chkPwd = await User.comparePassword( user.passwordHashSalt , password)
            console.log(chkPwd)
            if(chkPwd == false ) {
                return res.status(400).json({ status : chkPwd, message : "invalid username or password" } )
            }  
 
            res.status(200).json({ status : chkPwd ,  mesage : "create success" , data :  {    username  : user.username ,  email : user.email}  } )
        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.status(500).send(err.message);
        }
    } , 
    register: async (req , res) => {
        try {
            const { username, password , email } = req.body

            const user = await User.create({ username: username , email : email , passwordHashSalt  :  password } )
            if(!user) {
                return res.status(400)
            }  
            res.status(200).json({ mesage : "create success" , data : user } )
        } catch (err) {
            console.log(err.message)
            console.log(err.stack)
            res.status(500).send(err.message);
        }
    }
}

