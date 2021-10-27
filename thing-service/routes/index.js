const server = require('express').Router()
const { authorise , Middleware } = require('../untils/index')
const thingController = require('../controllers/things.controller')

server.get('/thingdemo', Middleware.Middleware , thingController.thingTable , (req , res) => { 
        console.log(req.files)
        res.status(200).send(req.files)
 })

module.exports = server