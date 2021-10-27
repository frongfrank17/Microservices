const authorise = require('./verifyJWT')
const Milddle =  require('./Middleware')
module.exports = Object.assign({}, { authorise , Milddle })