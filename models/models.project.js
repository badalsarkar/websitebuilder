/**
 * @module Models/Project 
 * @description
 * Database model for Project Resource
*/

const Mongoose = require('mongoose');
const {http} = require('../utilities/utilities');
const {isEmpty} = require('../utilities/utilities.validation');
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

/**
 * Update or insert new project
*/
async function updateProject(projectData){
    // Create id for new project
    if(isEmpty(projectData._id)){
        projectData._id = new Mongoose.Types.ObjectId();
    }
    try{
        const project = await this.findOneAndUpdate({_id:projectData._id},
            projectData,{upsert:true, new:true}); 
        return {project:project};
    }
    catch(error){
        return {error:{status:http.serverError, message:"Unexpected server error"}}
    }
}
ProjectSchema.statics.updateProject = updateProject;

/**
 * Get all projects for a user
*/
async function getProjectForUser(userId){
    try{
        const projects = await this.find({userId:userId}).exec()
        if(isEmpty(projects)){
            return {error:{status:http.notFound, message:"No projects found for user"}};
        }
        else{
            return {projects:projects}};
    }
    catch(error){
        console.log("Error from model/model.project");
        console.log(err);
        return {error:{status:http.serverError, message:"Unexpected server error"}};
    }
}
ProjectSchema.statics.getProjectForUser = getProjectForUser;

/**
 * Delete one project by id
*/
async function deleteOneProject(userId, projectId){
    try{
        let result =await this.deleteOne({_id:projectId, userId:userId});
        if(result.deletedCount==1){
            return {result:{status:200, message: "Deleted"}};
        }
        else{
            return {result:{status: 404, message: "Project not found"}};
        }
    }
    catch(err){
        console.log(err);
        return {error:{status:http.serverError, message:"Unexpected server error"}}
    }
}
ProjectSchema.statics.deleteOneProject = deleteOneProject;



const Project = Mongoose.model("projects",ProjectSchema );
exports.Projects = Project;
