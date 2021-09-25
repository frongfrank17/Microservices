const mongoose = require('mongoose')
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,  
        required: true, 
        unique: true, 
        lowercase: true},
    email: {
        type: String,  
        required: true, 
        unique: true, 
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'is invalid'],
        uniqueCaseInsensitive: true}, 
    passwordHashSalt : { type : String , require : true      } 
})
UserSchema.pre('save' , async function (next) {
    let salt = await bcrypt.genSalt()
    console.log(salt)
    this.passwordHashSalt = await bcrypt.hash(this.passwordHashSalt , salt)
    next() 
})
UserSchema.statics.comparePassword = function  ( passowrdHashSalt , password)  {

            return bcrypt.compareSync(password,passowrdHashSalt) 

}
module.exports = mongoose.model('users', UserSchema , 'users')
