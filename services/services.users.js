
const {User}= require('../models/models.users');
const validate = require('validate.js');
const bcrypt = require('bcrypt');
const Mongoose = require('mongoose');


module.exports.createUser=async function(userData){
        let response = {};
        try {
            //password can't be empty
            if (validate.isEmpty(userData.password)) {
                response = {status:400, message:"Password is needed"};
                //password1 and password2 must match
            } else if (userData.password != userData.repeatPass) {
                response={status:400, message:"Password mismatch"};
            } else {
                //hash and salt
                let hash = await bcrypt.hash(userData.password, 10);
                userData.password = hash;
                //create a confirmation token for the user
                //create user
                await User.init();
                let newUser = await User.create(userData);
                response={status:201, message:"Registration successfull"};
            }
        } catch (err) {
            if(err.code==11000){
                response={status:409, message:"User already exists"}
            }
            else{
                response={status:500, message:"Registration unsuccessful, try again later"};
            }
            console.log(err);
        }
        return response;
};


/**
 * Login
*/



// get a user by id
module.exports.getUser= async function(criteria){
    let user = await User.findOne(criteria).exec();
    if(!user){
        return {status:404, message:"User not found"};
    }
    else{
        return {status:200, data:user};
    }
}
