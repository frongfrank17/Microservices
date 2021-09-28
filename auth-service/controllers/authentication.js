
const config = require('../config')
const jwt = require('jsonwebtoken')
const genKey = require('./genkey')

 module.exports = {
        AccessToken   : async (payload) => {
            const key = genKey()
        
            const accessToken = jwt.sign(payload , config.tokenSettings.publicKey , {expiresIn : '1hr'})
         
            return  accessToken
        } 
 }