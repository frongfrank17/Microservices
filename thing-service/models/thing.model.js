const mongoose = require('mongoose')

const ThingSchema = new mongoose.Schema({
    name: {type: String, required: true },
    UID:  {type: String, required: true },
    CCTV: {type: String, default: '-'},
    Alarm: {type: String, default: '-'},
    package: {type: Array, default: []}
})
module.exports = mongoose.model('things', ThingSchema , 'things')
