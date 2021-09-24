const server = require('express').Router()
const { authorise } = require('../untils/index')
const roleController = require('../controllers/roles.controller')

server.get('/role/username/:username', authorise.isAuthen, roleController.getRoleByUsername)

module.exports = server