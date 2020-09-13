/**
 * @module Services/Users
 * Provides several service function for User Object
*/

// All requires
const { User } = require("../models/models.users");
const { http } = require("../utilities/utilities");
const validate = require("validate.js");
const {isEmpty} = require('../utilities/utilities.validation');
const bcrypt = require("bcrypt");
const { generateJWT } = require("../config/config.jwt");
const Mongoose = require("mongoose");

// Create user
module.exports.createUser = async function (userData) {
    let response = {};
    try {
        //password can't be empty
        if (validate.isEmpty(userData.password)) {
            response = { status: 400, message: "Password is needed" };
            //password1 and password2 must match
        } else if (userData.password != userData.repeatPass) {
            response = { status: 400, message: "Password mismatch" };
        } else {
            //hash and salt
            let hash = await bcrypt.hash(userData.password, 10);
            userData.password = hash;
            //create a confirmation token for the user
            //create user
            await User.init();
            let newUser = await User.create(userData);
            response = {
                status: 201,
                message: "Registration successfull",
                data: newUser
            };
        }
    } catch (err) {
        if (err.code == 11000) {
            response = { status: 409, message: "User already exists" };
        } else {
            response = {
                status: 500,
                message: "Registration unsuccessful, try again later"
            };
        }
        console.log(err);
    }
    return response;
};

// User login
module.exports.login = async function (username, password) {
    const { error:dbErrorInFindingUser, user } = await User.findByUsername(
        username,
        "password username _id verified"
    );
    if (dbErrorInFindingUser) {
        return {
            status: http.serverError,
            message: "Unexpected server error. Try again later"
        };
    }
    if (isEmpty(user)) {
        return { status: http.notFound, message: "User not found" };
    }
    if (!user.verified) {
        return { status: http.unauthorized, message: "User not verified" };
    }
    //match password
    if (user.passwordIsMatched(password)) {
        // create token
        const token = generateJWT({ id: user._id });
        return { status: http.ok, token: token, message: "Login successful" };
    } else {
        return { status: http.unauthorized, message: "Unauthorized" };
    }
};

// get a user by id
module.exports.getUser = async function (criteria) {
    let user = await User.findOne(criteria).exec();
    if (!user) {
        return { status: 404, message: "User not found" };
    } else {
        return { status: 200, data: user };
    }
};
