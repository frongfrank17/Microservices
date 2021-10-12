const server = require('express').Router()
const { authorise , Middleware } = require('../untils/index')
const thingController = require('../controllers/things.controller')

server.get('/thingdemo', Middleware.Middleware , thingController.thingTable)

module.exports = server