const jwt = require('jsonwebtoken')
const config = require('../config')
//const redis = require('redis');
const { promisify } = require('util');
const moment = require('moment');
// const clientRedis = redis.createClient(config.serverSettings.portredis,config.serverSettings.ipredis);
// clientRedis.auth(config.serverSettings.passwordredis);
// const getexistsAsync = promisify(clientRedis.exists).bind(clientRedis);
// const getAsync = promisify(clientRedis.get).bind(clientRedis);

module.exports.isAuthen = (req, res, next) => { 
      try {
        const authorization = req.headers.authorization
        if (!authorization || !(authorization.search('Bearer ') === 0)) {
            return next(new Error('Missing Authorization Header'))
        }
    
        const token = authorization.split(' ')[1]
        if (!token) {
            return next(new Error('Missing Bearer Token'))
        }
    
        try {
            const decoded = jwt.verify(token ,config.tokenSettings.developKey)
            if(decoded.type == "DEVELOP" || decoded.permission.includes('create:thing') ) {
                req.jwtDecode = decoded
            } else {
                return next(new Error('Missing Token And Permission'))
            }
           
        } catch(err) {
            res.statusCode = 401;
            return res.send({'message': 'Invalid Access Token'});
        }
        next()
      } catch (error) {
          res.status(500).send({'message': 'Invalid Access Token'})
      }
   
}
