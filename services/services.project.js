
const {Projects} = require('../models/models.project');
const mongoose = require('mongoose');
const validate = require('validate.js');

/**
 * Get a global setting by user id
*/
module.exports.getProject= async function(userId){
};

/**
 * Edit a global setting
*/
module.exports.updateProject= async function (newSetting, image){
    // user id can not be null
    // check it
    let response={};
    if(validate.isEmpty(newSetting._id)){
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
module.exports.deleteProject= async function(userId){
}


