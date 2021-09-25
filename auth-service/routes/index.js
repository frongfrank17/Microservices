const { authorise } = require('../untils/index')
const server = require('express').Router()
const TokenContrller = require('../controllers/token.controller')

server.post('/token' ,TokenContrller.Accesstoken )
server.get('/decode', authorise.isAuthen )

module.exports = server