/**
 * @module Models/GlobalSettings 
 * @description
 * Database model for GlobalSettings resource
*/

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// user schema
let GlobalSettingSchema= new Schema({
    logo:{type:String},
    slogan:{type:String},
    token:{type:String}
});

exports.GlobalSettings= GlobalSettingSchema;
