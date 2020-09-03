


const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// user schema

const ProfileSchema= new Schema({
    _id:{type:Mongoose.Types.ObjectId, ref:"users"},
    token:{type:String},
    name:{type:String},
    phone:{type:String},
    address:{type:String},
    socialLink:{type:Map, of:String},
    email:{type:String},
    aboutme:{type:String},
    image:{type:String},
    profileVideo:{type:String},
    shortbio:{type:String},
    fullbio:{type:String}
});

const ProfileSetting = Mongoose.model("profile",ProfileSchema );

exports.ProfileSetting = ProfileSetting;
