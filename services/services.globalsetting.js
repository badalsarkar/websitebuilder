const {GlobalSettings} = require('../models/models.globalsetting');
const {async} = require('validate.js');


/**
 * Get a global setting by user id
*/
module.exports.getGlobalSetting= async function(userId){
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
        const result = await GlobalSettings.updateOne({_id:newSetting._id},update,{upsert:true});
        if(result){
            response = {status:200, message:"Global setting successfully updated"};
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


