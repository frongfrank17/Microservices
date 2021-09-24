const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({} , {})
module.exports = mongoose.model('roles', RoleSchema, 'roles')
