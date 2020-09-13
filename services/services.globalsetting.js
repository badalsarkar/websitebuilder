const {GlobalSettings} = require('../models/models.globalsetting');
const validate = require('validate.js');
const path = require('path');


/**
 * Get a global setting by user id
*/
module.exports.getGlobalSetting= async function(_id){
    let response = {};
    const setting = await GlobalSettings.findOne({_id:_id}).exec();
    if(!isEmpty(setting)){
        response = {status:200, data:setting};
    }
    else{
        response={status: 404, message:"Setting not found"}
    }
    return response;
};

/**
 * Edit a global setting
*/
module.exports.updateGlobalSetting= async function (newSetting, logo){
    let response={};
    let update = {
        logo:logo.filename,
        slogan:newSetting.slogan,
        token:newSetting.token
    };

    try{
        const result = await GlobalSettings.findOneAndUpdate({_id:newSetting._id},update,{upsert:true, new:true});
        if(result){
            response = {status:200, data: result};
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
module.exports.deleteGlobalSetting= async function(userId){
}


