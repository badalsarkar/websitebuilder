

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// user schema

const ConnectSchema = new Schema({
    _id: {type:Mongoose.Types.ObjectId},
    userId:{type:Mongoose.Types.ObjectId, ref:"users"},
    title:{type:String},
    link:{type:String},
    text:{type:String}
});


const Connect = Mongoose.model("Connection",ConnectSchema);

exports.Connect = Connect;
