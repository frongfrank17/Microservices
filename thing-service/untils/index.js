const authorise = require('./verifyJWT')
const Middleware = require('./Middleware')
module.exports = Object.assign({}, { authorise , Middleware })