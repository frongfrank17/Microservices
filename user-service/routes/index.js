const server = require('express').Router()
const { authorise } = require('../untils/index')
const userController = require('../controllers/user.controller')

server.get('/user/login', authorise.isAuthen, userController.checkLogin)

module.exports = server