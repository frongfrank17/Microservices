const Controller = require('../controllers/controller.js');
const {authorise} = require('../untils')

module.exports = (server) => {
    server.post('/receive-device-gps',authorise.isAuthen, Controller.receiveGPS);
  
}


