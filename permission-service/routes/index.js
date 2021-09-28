const server = require('express').Router()
const { authorise } = require('../untils/index')
const permissionController = require('../controllers/permission.controller')

server.get('/permission/get' , authorise.isAuthen ,permissionController.getPermissionByRole)

module.exports = server