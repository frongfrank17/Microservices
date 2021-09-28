const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = ('http://10.224.188.14' ||
    process.env.SERVICE_ROLE// || 'http://localhost:3204'
);
 
module.exports.GetRole =  (payload) => {
    return new Promise((resolve, reject) => {
 
         const opts = { gzip:true,
             headers: {'Content-Type': 'application/json'},
             url: (serviceUrl) + '/role/'+payload.username,
             method: 'GET',
             json: true,
         }
         
         request(opts, function(error, response, body) {
             if (error){ reject(error) }
             else if (response.statusCode == 200) resolve(body)
             else reject(body)
         })
    })
 }