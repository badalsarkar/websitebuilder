
const {Reviews} = require('../models/models.reviews');
const validate = require('validate.js');
const mongoose = require('mongoose');
/**
 * Get a global setting by user id
*/
module.exports.getReviews= async function(userId){
    let response = {};
    try{
        const reviews = await Reviews.find({userId:userId}).exec();
        if(!isEmpty(reviews)){
            response = {status: 200, data:reviews};
        }
        else{
            response = {status:404, message:"No review found"};
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
module.exports.updateReviews= async function (newSetting ){
    let response={};
    //console.log(newSetting);
    if(validate.isEmpty(newSetting._id)){
        newSetting._id = new mongoose.Types.ObjectId();
    }
    let update={
        userId: newSetting.userId,
        title:newSetting.title,
        text:newSetting.text,
        link:newSetting.link,
        rating:newSetting.rating
    }
    try{
        const result = await Reviews.updateOne({_id:newSetting._id},update,{upsert:true});
        if(result){
          response = {status:200, message:"Review setting successfully updated"};
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
module.exports.deleteReview=  async function(userId){
}


