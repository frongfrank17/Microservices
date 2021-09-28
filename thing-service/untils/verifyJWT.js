const jwt = require('jsonwebtoken')
const config = require('../config')
const crypto = require('crypto');
const hashHmacSha256 = string => crypto
  .createHmac('sha256', config.tokenSettings.publicKey)
  .update(string)
  .digest('hex');
module.exports.isAuthen = (req, res, next) => { 

    const authorization = req.headers.authorization
    if (!authorization || !(authorization.search('Bearer ') === 0)) {
        return next(new Error('Missing Authorization Header'))
    }

    const token = authorization.split(' ')[1]

    if (!token) {
        return next(new Error('Missing Bearer Token'))
    }

    try {
        let key =genKey()
        console.log(key)
        const decoded = jwt.verify(token ,config.tokenSettings.publicKey)
  
        req.jwtDecode = decoded
   
    } catch(err) {
            console.log(err.stack)
        res.statusCode = 401;
        return res.send({'message': 'Invalid Access Token'});
    }

    next()
}

// Server-Side
function genKey() {

    //console.log("rawKEY"+rawKey)
    const key = hashHmacSha256( config.tokenSettings.publicKey);
    return key;
  }
