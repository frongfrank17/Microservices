const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = (process.env.SERVICE_USER || 'http://localhost:3201');
module.exports.Login =  (payload) => {
   return new Promise((resolve, reject) => {

        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json'},
            url: (serviceUrl) + '/user/login',
            method: 'POST',
            json: payload,
        }
        
        request(opts, function(error, response, body) {
            if (error){ reject(error) }
            else if (response.statusCode == 200) resolve(body)
            else reject(body)
        })
   })
}
