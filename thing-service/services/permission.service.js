const request = require('request');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'
const serviceUrl = (process.env.SERVICE_PERMISSION || 'http://10.224.187.41:3004');

module.exports.getPermissionByRole = (payload) => {
    return new Promise((resolve, reject) => {

        let apiUrl = new URL((serviceUrl) + '/permission/role/' + payload.role)

        const opts = {
            gzip: true,
            headers: { 'Content-Type': 'application/json' },
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