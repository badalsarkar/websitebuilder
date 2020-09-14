/**
 * @module Models/User 
 * @description
 * Database model for User resource
*/

// All modules
const mongoose = require("mongoose");
const { isEmail, isEmpty } = require("../utilities/utilities.validation");
const validate = require("validate.js");
const bcrypt = require('bcrypt');
const {GlobalSettings}= require('./models.globalsetting');
const {ProfileSetting} = require('./models.profile');
const {http} = require("../utilities/utilities");
const Schema = mongoose.Schema;

// user schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        validate: {
            validator: function (v) {
                return isEmail(v);
            },
            message: props => ` ${props.value} is not a valid email`
        }
    },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    globalsetting: GlobalSettings,
    profilesetting:ProfileSetting
});

/**
 * Find user by username
 * @static
 * @todo error handler function
 */
async function findByUsername(username, fields, options) {
    try {
        const user = await this.findOne(
            { username: username },
            fields,
            options
        ).exec();
        return {user};
    } catch (err) {
        console.log("Error: from model/model.users file ");
        console.log(err);
        return {error: "Unexpected database error"};
    }
}
UserSchema.statics.findByUsername = findByUsername;

/**
 * Match user password
 * @instance
*/
async function passwordIsMatched(password){
    return await bcrypt.compare(password, this.password);
}
UserSchema.methods.passwordIsMatched = passwordIsMatched;

/**
 * Replace global setting
*/
async function replaceGlobalSetting(userId, newGlobalSetting){
    try{
        let user = await this.findById(userId).exec();
        if(isEmpty(user)){
            return {error:{status:http.notFound, message: "User not found"}};
        }
        if(isEmpty(user.globalsetting)){
            user.globalsetting={}
        }
        user.globalsetting = newGlobalSetting;
        await user.save();
        return {globalsetting:user.globalsetting};
    }
    catch(err){
        console.log(err);
        return {error: {status:http.serverError, message:"Unexpected database error"}};
    }
}
UserSchema.statics.replaceGlobalSetting = replaceGlobalSetting;

/**
 * Get global setting
*/
async function getGlobalSetting(userId){
    try{
        const globalSetting = await this.findById(userId, "globalsetting").exec();
        console.log(globalSetting);
        if(isEmpty(globalSetting)){
            return {error:{status: http.notFound, message:"Global setting not found"}};
        }
        else{
            return {globalSetting:globalSetting};
        }
    }
    catch(error){
        return {error:{status:http.serverError, message:"Unexpected server error"}};
    }
}
UserSchema.statics.getGlobalSetting = getGlobalSetting;

/**
 * Replace profile setting
*/
async function replaceProfileSetting(userId, newProfileSetting){
    try{
        let user = await this.findById(userId).exec();
        if(isEmpty(user)){
            return {error:{status:http.notFound, message: "User not found"}};
        }
        if(isEmpty(user.profilesetting)){
            user.profilesetting={}
        }
        user.profilesetting = newProfileSetting;
        await user.save();
        return {profilesetting:user.profilesetting};
    }
    catch(err){
        console.log(err);
        return {error: {status:http.serverError, message:"Unexpected database error"}};
    }
}
UserSchema.statics.replaceProfileSetting = replaceProfileSetting;

/**
 * Get profile setting
*/
async function getProfileSetting(userId){
    try{
        const profileSetting = await this.findById(userId, "profilesetting").exec();
        if(isEmpty(profileSetting)){
            return {error:{status: http.notFound, message:"Profile setting not found"}};
        }
        else{
            return {profileSetting:profileSetting};
        }
    }
    catch(error){
        return {error:{status:http.serverError, message:"Unexpected server error"}};
    }
}
UserSchema.statics.getProfileSetting = getProfileSetting;

/**
 * Check if a user exists in the database
*/
async function existsInDatabase(userId){
    try{
        const user= await this.findById(userId, "_id").exec()
        if(isEmpty(user)){
            return false;
        }
        else{
            return true;
        }
    }
    catch(error){
        return {error:{status:http.serverError, message:"Unexpected server error"}}
    }
}
UserSchema.statics.existsInDatabase = existsInDatabase;

// Compile User model
const User = mongoose.model("Users", UserSchema);
exports.User = User;
