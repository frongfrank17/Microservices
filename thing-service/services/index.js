const packageService = require('./package.service')
const permissionService = require('./permission.service')
const OauthService = require('./Oauth.service')
module.exports = Object.assign({}, { packageService, permissionService , OauthService })