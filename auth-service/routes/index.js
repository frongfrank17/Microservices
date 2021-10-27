const { authorise } = require('../untils/index')
const client = require('../memory/Caching')
const server = require('express').Router()
const TokenContrller = require('../controllers/token.controller')
const DecodeContrller = require('../controllers/decode.controller')
server.post('/login' ,TokenContrller.Accesstoken )
server.post('/personal' ,  authorise.isAuthen , TokenContrller.Developtoken )
server.get('/decode', authorise.isAuthen_ )
server.get('/service/key' , authorise.isAuthen , DecodeContrller.Servicetoken)
server.get('/session' , async (req, res ) => {
    let ses = await client.asyncGet('foo_rand000000000000')

   
    res.status(200).send(ses)
} )
module.exports = server