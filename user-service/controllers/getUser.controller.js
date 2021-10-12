const User = require('../models/user.model')

module.exports = {

    checkLogin: async (req , res) => {
        try {
            
            const { username } = req.params
           
            const user = await User.findOne({username: username} , { username : 1 ,  passwordHashSalt :1 , email : 1 , _id : 0 } ).exec()
      
            if(!user) {

                return res.status(400)

            }  
 
            res.status(200).json({ status : chkPwd ,  mesage : "create success" , data :  {    username  : user.username ,  email : user.email}  } )

        } catch (err) {

            console.log(err.message)

            console.log(err.stack)

            res.status(500).send(err.message);

        }
    } 

}

