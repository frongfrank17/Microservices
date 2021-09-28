const server = require('express').Router()
const { authorise } = require('../untils/index')
const thingController = require('../controllers/things.controller')

server.get('/thingdemo', authorise.isAuthen, thingController.thingTable)

module.exports = server