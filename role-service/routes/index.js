const server = require('express').Router()
const { authorise } = require('../untils/index')
const roleController = require('../controllers/roles.controller')
const AddRoleController = require('../controllers/AddRole.controller')

server.get('/role/:username' ,  roleController.getRoleByUsername)
server.put('/role/:role/:username', authorise.isAuthen, AddRoleController.AddRole)
module.exports = server