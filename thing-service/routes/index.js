const server = require('express').Router()
const { authorise } = require('../untils/index')
const thingController = require('../controllers/things.controller')

server.get('/thing', authorise.isAuthen, thingController.thingTable)

module.exports = server