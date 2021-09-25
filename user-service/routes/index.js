const server = require('express').Router()
const { authorise } = require('../untils/index')
const userController = require('../controllers/user.controller')

server.post('/user/login',  userController.checkLogin)
server.post('/user/register', userController.register)
module.exports = server