var mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
name:{
    type: String,
    required:true,
    min:5,
    max:30,
    default:'User'
},

password:{
    type: String,
    require:true,
    min:8,
    max:32
},

email:{
    type: String,
    required:true,
    min:6
},


role:{
    type:String,
    default:'ADMIN',
    required:true
}


})

module.exports = mongoose.model('User',UserSchema);