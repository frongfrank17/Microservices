const userService = require('./user.service')
const roleService = require('./roles.service')
const permissionService = require('./permission.service')
module.exports = Object.assign({}, { userService , roleService , permissionService})