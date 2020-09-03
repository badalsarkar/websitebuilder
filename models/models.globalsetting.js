

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// user schema

const GlobalSettingSchema= new Schema({
    _id:{type:Mongoose.Types.ObjectId, ref:"users"},
    logo:{type:String},
    slogan:{type:String},
    token:{type:String}
});

const GlobalSettings = Mongoose.model("Globalsettings", GlobalSettingSchema);

exports.GlobalSettings= GlobalSettings;
