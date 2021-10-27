const authentication = require('./authentication')
const services = require('../services')
const tokenModel = require('../models/token.model')
module.exports = {
    getDevelopTokenByUsername : async  ( req , res ) => {
        try {
        
        } catch(err) {
            console.log( "MESSAGE : " , err.message) 
            console.log( "STACK : " , err.stack)
            return res.status(500).send({  message : err.message})
        }
    }   ,
    revokeTokenByUsername : async (req , res) => {
        try{} catch (err) {

            console.error("MESSAGE : " ,  err.message) 
            console.error("STACK : " , err.stack)
            res.status(500).send({ message : err.message } )
        }  

    } 
  
} 