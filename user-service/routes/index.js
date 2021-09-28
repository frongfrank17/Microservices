const server = require('express').Router()
const { authorise } = require('../untils/index')
const userController = require('../controllers/user.controller')

server.post('/userdemo/login',  userController.checkLogin)
server.post('/userdemo/register', userController.register)
module.exports = server