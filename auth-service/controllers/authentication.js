
const config = require('../config')
const jwt = require('jsonwebtoken')
const genKey = require('./genkey')

 module.exports = {
        AccessToken   : async (payload) => {
            const key = genKey()
        
            const accessToken = jwt.sign(payload ,config.tokenSettings.publicKey, {expiresIn : '1hr'})
         
            return  accessToken
        } , 
        DevelopToken :  async (payload) => {
            /* 
            username = owner 
            token =  onelink
            role = '' 
            permission = [ 'create:data' ]
            */
           
            const DevelopToken = jwt.sign( payload ,  config.tokenSettings.developKey)
            return  DevelopToken
        } ,
        serviceToken  : async (payload , signature) => {
            let key = config.tokenSettings.serviceKey+signature
            console.log(key)
           const ServiceToken = jwt.sign(payload ,key ) 
           return ServiceToken
        } 
 }