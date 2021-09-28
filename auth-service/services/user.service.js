const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = ( 
  //  'http://10.224.188.14' ||
    process.env.SERVICE_USERDEMO || 'http://localhost:3206'
);
module.exports.Login =  (payload) => {
   return new Promise((resolve, reject) => {
       console.log("LOGIN")
console.log(serviceUrl)
        const opts = { gzip:true,
            headers: {'Content-Type': 'application/json'},
            url: (serviceUrl) + '/userdemo/login',
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
