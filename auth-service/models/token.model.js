const mongoose = require('mongoose')

const TokenSchema = new mongoose.Schema({
    token_name  : {type: String, required: true },
    username    :  {type: String, required: true },
    token :  { type :String , required : true }  ,
    status : {type : Boolean , default : true} , 
    permission  : {   type : Array  } ,

} , { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }  ,  { strict : false })
module.exports = mongoose.model('token_develop', TokenSchema , 'token_develop')
