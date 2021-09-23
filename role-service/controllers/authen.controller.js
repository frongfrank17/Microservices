const User = require('../models/user.model')
const Token = require('./token')
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();

module.exports = {
    access_token : async (req ,res ) => {
        try {
            let { username , password  } = req.body 
     
            let check = await User.find(req.body ).lean().exec() 

    
            if(check.length > 0  ) {
                let u = check[0]
                
                let accessToken =  Token.generateAccessToken({ user_id : u.user_id , username : u.username , email : u.email , admin : u.admin })    
                req.accessToken = `bearer ${accessToken}`
      
                res.status(200).json({ type : 'bearer' , accessToken : accessToken } )     
            }   else {
                return res.status(400).send({ message : 'Invalid username password '} )
            } 
           
        }catch(err) {
            console.log('MESSAGE : ' , err.message)
            console.log('STACK : ' , err.stack)
            res.status(500).json({ message : err.message} )
        } 
     } , 
    register : async (req ,res ) => {
        try {
            let {  username , password  } = req.body 
            if(   !username  &&!password)  {
                return  res.status(400).send({ message : 'Invalid '} )
            }
            const uidgen = await uidgen.generate();
            let user_id = await uidgen
            let payload = Object.assign( {user_id : user_id } , req.body)
            let create = await User.create(payload).catch(err => {
                return res.status(400).send({ message : err} )
            } )

            res.status(200).send("create success")

           
        }catch(err) {
            console.log('MESSAGE : ' , err.message)
            console.log('STACK : ' , err.stack)
            res.status(500).json({ message : err.message} )
        } 
     } , 

     
     access_token_ : async (req ,res , next ) => {
        try {
            let { username , password  } = req.body 
     
            let check = await User.find(req.body ).lean().exec() 

    
            if(check.length > 0  ) {
                let u = check[0]
                
                let accessToken =  Token.generateAccessToken({ user_id : u.user_id , username : u.username , email : u.email , admin : u.admin })    
                req.accessToken = `bearer ${accessToken}`
                next()
              //  res.status(200).json({ type : 'bearer' , accessToken : accessToken } )     
            }   else {
                return res.status(400).send({ message : 'Invalid username password '} )
            } 

           
        }catch(err) {
            console.log('MESSAGE : ' , err.message)
            console.log('STACK : ' , err.stack)
            res.status(500).json({ message : err.message} )
        } 
     } , 
    
} 