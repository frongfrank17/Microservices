const request = require('request');
const config = require('../config')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = ( 
   // 'http://10.224.188.14' || 
    process.env.SERVICE_PERMISSION || 'http://localhost:3201'
     || 
    'http://10.224.187.41:3004');

module.exports.Keyservice = (payload) => {
    return new Promise((resolve, reject) => {

        let apiUrl = new URL((serviceUrl) + '/Oauth/service/key')
       
        const opts = {
            gzip: true,
            headers: { 
            'Content-Type': 'application/json' ,
            'authorization' : payload.token , 
            'x-api-key' : config.tokenSettings.publicKey
        },
            url: apiUrl,
            method: 'GET',
            json: true
        }

        request(opts, function (error, response, body) {
            if (error) { reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
    })
}