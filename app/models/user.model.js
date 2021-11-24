const mongoose = require('mongoose');
    const userschema = mongoose.Schema({
        
        password: { type: String, required: true},
        username:String,
        role:String,
        email:{type:String,required:true,unique:true},
        // isAdmin: Boolean
    });

    module.exports = mongoose.model('users', userschema);