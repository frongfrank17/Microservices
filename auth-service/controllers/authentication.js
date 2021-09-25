const jwt = require('jsonwebtoken')
const genKey = require('./genkey')

 module.exports = {
        AccessToken   : async (payload) => {
            const key = genKey()
            console.info(key)
  
            const accessToken = jwt.sign(payload , key , {expiresIn : '1hr'})
         
            return  accessToken
        } 
 }