/**
 * @module Models/Project 
 * @description
 * Database model for Project Resource
*/

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

// user schema
const ProjectSchema= new Schema({
    _id:{type:Mongoose.Types.ObjectId},
    userId:{type:Mongoose.Types.ObjectId, ref:"users"},
    title:{type:String},
    image:{type:String},
    link:{type:String},
    text:{type:String}
});


const Project = Mongoose.model("projects",ProjectSchema );

exports.Projects = Project;
