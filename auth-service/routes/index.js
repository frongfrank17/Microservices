const { authorise } = require('../untils/index')
const server = require('express').Router()
const TokenContrller = require('../controllers/token.controller')
const DecodeContrller = require('../controllers/decode.controller')
server.post('/login' ,TokenContrller.Accesstoken )
server.post('/personal' ,  authorise.isAuthen , TokenContrller.Developtoken )
server.get('/decode', authorise.isAuthen_ )
server.get('/service/key' , authorise.isAuthen , DecodeContrller.Servicetoken)

module.exports = server