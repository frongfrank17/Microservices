const mongoose = require('mongoose')

const RoleSchema = new mongoose.Schema({

    role : { type : String , require : true } , 
    member : {type : Array }  
})
module.exports = mongoose.model('roles', RoleSchema, 'roles')
