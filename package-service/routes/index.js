const server = require('express').Router()
const { authorise } = require('../untils/index')
const packageController = require('../controllers/package.controller')

server.get('/package', authorise.isAuthen, packageController.getPackage)

module.exports = server