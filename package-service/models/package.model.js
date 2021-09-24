const mongoose = require('mongoose')

const PackageSchema = new mongoose.Schema({
    name: {type: String, required: true },
    permission: {type: Array, default: []}
})
module.exports = mongoose.model('packages', PackageSchema , 'packages')
