const { ProfileSetting } = require("../models/models.profile");
const validate = require('validate.js');

/**
 * Get a global setting by user id
 */
module.exports.getProfileSetting = async function (id) {

    let response = {};
    try{
        const setting = await ProfileSetting.findOne({_id:id}).exec();
        if(!validate.isEmpty(setting)){
            response = {status:200, data: setting};
        }
        else{
            response = {status:404, message:"Profile setting not found"};
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
module.exports.updateProfileSetting = async function (newSetting, files) {
    let response = {};
    //console.log(newSetting);
    let update = {
        _id: newSetting._id,
        token: newSetting.token,
        name: newSetting.name,
        phone: newSetting.phone,
        address: newSetting.address,
        socialLink: {
            facebook: newSetting.facebook ? newSetting.facebook : null,
            twitter: newSetting.twitter ? newSetting.twitter : null,
            youtube: newSetting.youtube ? newSetting.youtube : null
        },
        email: newSetting.email,
        aboutme: newSetting.aboutme,
        image: files.image[0].filename,
        profileVideo: files.profileVideo[0].filename,
        shortbio: newSetting.shortbio,
        fullbio: newSetting.fullbio
    };

    try {
        const result = await ProfileSetting.findOneAndUpdate(
            { _id: newSetting._id },
            update,
            { upsert: true, new: true }
        );
        if (!validate.isEmpty(result)) {
            response = { status: 200, data:result};
        } else {
            response = {status: 500, message:"Some error occured"};
        }
    } catch (err) {
        console.log(err);
        response = {status: 500, message:"Some error occured"};
    }
    return response;
};

/**
 * Delete a global setting
 */
module.exports.deleteProfileSetting = async function (userId) {};
