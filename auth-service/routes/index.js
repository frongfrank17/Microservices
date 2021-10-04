const { authorise } = require('../untils/index')
const server = require('express').Router()
const TokenContrller = require('../controllers/token.controller')

server.post('/login' ,TokenContrller.Accesstoken )
server.post('/personal' ,  authorise.isAuthen , TokenContrller.Developtoken )
server.get('/decode', authorise.isAuthen_ )

module.exports = server