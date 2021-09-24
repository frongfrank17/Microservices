const server = require('express').Router()
const { authorise } = require('../untils/index')
const permissionController = require('../controllers/permission.controller')

server.get('/permission/role/:role', authorise.isAuthen, permissionController.getPermissionByRole)

module.exports = server