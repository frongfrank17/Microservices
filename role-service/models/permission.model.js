const mongoose = require('mongoose')

const PermissionSchema = new mongoose.Schema({
    scope_id : {type : String } ,  
    name : {type :  String} , 
    appcation : {type : String}  ,
    view : [
        {
            name : { type : String } , 
            actions : {type : Array}  
        }
    ] , 
    actions : {type : Array} ,  
    created_by : {type : String ,   required : true  } ,  
    updated_by : {type : String ,  required : true } ,  
} , {timestamps :  {  createdAt: 'created_at' , updatedAt : 'updated_at' } } )
module.exports = mongoose.model('permissions', PermissionSchema)
