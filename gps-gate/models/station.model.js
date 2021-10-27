const mongoose = require('mongoose');

const Modelstations= new mongoose.Schema({},{strict: false})

module.exports = mongoose.model('stations', Modelstations,'stations')