/**
 * @module Services/Project 
 * @description
 * Several methods related to Project object
*/

// All modules
const {Projects} = require('../models/models.project');
const mongoose = require('mongoose');
const validate = require('validate.js');

/**
 * Get a global setting by user id
*/
module.exports.getProject= async function(userId){
    let response ={};
    try{
        const projects = await Projects.find({userId:userId}).exec();
        if(!isEmpty(projects)){
            response = {status: 200, data:projects};
        }
        else{
            response= {status:404, message:"No projects found for user"};
        }
    }
    catch(err){
        console.log(err);
        response = {status:500, message:"Some error occured"};
    }
    return response;
};

/**
 * Edit a global setting
*/
module.exports.updateProject= async function (newSetting, image){
    // user id can not be null
    // check it
    let response={};
    if(isEmpty(newSetting._id)){
        newSetting._id = new mongoose.Types.ObjectId();
    }
    // update data
    let update = {
        userId: newSetting.userId,
        token:newSetting.token,
        image:image.filename,
        link: newSetting.link,
        text: newSetting.text,
        title: newSetting.title
    };
    try{
        const result = await Projects.updateOne({_id:newSetting._id},update,{upsert:true});
        if(result){
            response = {status:200, message:"Project setting successfully updated"};
        }
        else{
            console.log(result);
        }
    }
    catch(err){
        console.log(err);
    }
    return response;
}

/**
 * Delete a global setting
*/
module.exports.deleteProject= async function(userId, projectId){
    let response ={};
    console.log(userId);
    console.log(projectId);
    try{
        let result =await Projects.deleteOne({_id:projectId, userId:userId});
        if(result.deletedCount==1){
            response={status:200, message: "Deleted"}
        }
        else{
            response = {status: 404, message: "Project not found"}
        }
    }
    catch(err){
        console.log(err);
        response={status:500, message:"Could not delete"};
    }
    return response;
};


