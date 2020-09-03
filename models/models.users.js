
const mongoose = require('mongoose');
const {isEmail} = require('../services/services.validation');
const Schema = mongoose.Schema;


// user schema

const UserSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        immutable:true,
        validate:{
            validator:function(v){
                return isEmail(v);
            },
            message:props=>` ${props.value} is not a valid email`
        }
    },
    password:{type:String, required:true}
});

const User = mongoose.model('Users', UserSchema);

exports.User= User;
