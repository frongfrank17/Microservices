const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
role : {type : String } , 
permissions : {type : Array }  
} 
)
module.exports = mongoose.model('permissions', PermissionSchema, 'permissions')
