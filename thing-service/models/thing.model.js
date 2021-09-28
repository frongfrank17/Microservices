const mongoose = require('mongoose')

const ThingSchema = new mongoose.Schema({
    name: {type: String, required: true },
    uid:  {type: String, required: true },
    cctv: {type: String, default: '-'},
    alarm: {type: String, default: '-'},
    package: {type: Array}
} ,  { strict : false })
module.exports = mongoose.model('things', ThingSchema , 'things')
