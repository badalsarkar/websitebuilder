
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// user schema

const ReviewSchema = new Schema({
    _id:{type: Mongoose.Types.ObjectId},
    userId:{type:Mongoose.Types.ObjectId, ref:"users", required: true},
    title:{type:String},
    link:{type:String},
    text:{type:String}
});


const Reviews = Mongoose.model("Reviews",ReviewSchema );

exports.Reviews = Reviews;
