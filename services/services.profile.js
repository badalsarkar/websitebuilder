
const {ProfileSetting} = require('../models/models.profile');
const {async} = require('validate.js');


/**
 * Get a global setting by user id
*/
module.exports.getProfileSetting= async function(userId){
};

/**
 * Edit a global setting
*/
module.exports.updateProfileSetting= async function (newSetting, files){
    let response={};
    //console.log(newSetting);
    let update={
        _id:newSetting._id,
        token:newSetting.token,
        name:newSetting.name,
        phone:newSetting.phone,
        address:newSetting.address,
        socialLink:{
            facebook: (newSetting.facebook?newSetting.facebook:null),
            twitter:(newSetting.twitter?newSetting.twitter:null),
            youtube: (newSetting.youtube?newSetting.youtube:null)
        },
        email:newSetting.email,
        aboutme:newSetting.aboutme,
        image:files.image[0].filename,
        profileVideo: files.profileVideo[0].filename,
        shortbio: newSetting.shortbio,
        fullbio:newSetting.fullbio
    }

    try{
        const result = await ProfileSetting.updateOne({_id:newSetting._id},update,{upsert:true});
        if(result){
          response = {status:200, message:"Profile setting successfully updated"};
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
module.exports.deleteProfileSetting= async function(userId){
}


