const Controller = require('../controllers/controller.js');
const {authorise, Milddle} = require('../untils')

module.exports = (server) => {
    server.post('/receive-device-gps', Milddle.Middleware, Controller.receiveGPS);
  
}


