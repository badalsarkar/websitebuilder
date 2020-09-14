/**
 * @module Services/Project 
 * @description
 * Several methods related to Project object
*/

// All modules
const {Projects} = require('../models/models.project');
const mongoose = require('mongoose');
const validate = require('validate.js');
const {http} = require('../utilities/utilities');
const {User} = require('../models/models.users');

/**
 * Get All Projects 
*/
module.exports.getProject= async function(userId){
    const {error, projects} = await Projects.getProjectForUser(userId);
    if(error){
        return {status:error.status, message:error.message}
    }
    return {status:http.ok, data:projects}
};

/**
 * Edit a global setting
*/
module.exports.updateProject= async function (userId, newSetting, image){
    // user id can not be null
    // check it
    // update data
    if(!await User.existsInDatabase(userId)){
        return {status:http.notFound, message:"User not found"}
    }
    let projectData = {
        userId: userId,
        token:newSetting.token,
        image:image.filename,
        link: newSetting.link,
        text: newSetting.text,
        title: newSetting.title,
        _id:newSetting._id
    };
    const{error, project} = await Projects.updateProject(projectData);
    if(error){
        return {status:error.status, message:error.message}
    }
    return {status:http.ok, data:project};
}

/**
 * Delete a global setting
*/
module.exports.deleteProject= async function(userId, projectId){
    const {error, result} = await Projects.deleteOneProject(userId, projectId);
    if(error){
        return {status: error.status, message:error.message};
    }
    else{
        return {status: result.status, message:result.message};
    }
};


