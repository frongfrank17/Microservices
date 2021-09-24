const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({} , {})
module.exports = mongoose.model('permissions', PermissionSchema, 'permissions')
