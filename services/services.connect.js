/**
 * @module Services/Connect
 * @description
 * Several methods related to Connect Object
 */

// All Modules
const { Connect } = require("../models/models.connect");
const validate = require("validate.js");
const mongoose = require("mongoose");

/**
 * Get a global setting by user id
 */
module.exports.getConnection = async function (userId) {
    let response = {};
    try {
        const connections = await Connect.find({ userId: userId }).exec();
        if (!validate.isEmpty(connections)) {
            response = { status: 200, data: connections };
        } else {
            response = { status: 404, message: "No connections for user" };
        }
    } catch (err) {
        response = { status: 500, message: "Some error occured" };
    }
    return response;
};

/**
 * Edit a global setting
 */
module.exports.updateConnection = async function (newSetting) {
    let response = {};
    //console.log(newSetting);
    if (validate.isEmpty(newSetting._id)) {
        newSetting._id = new mongoose.Types.ObjectId();
    }
    let update = {
        userId: newSetting.userId,
        title: newSetting.title,
        text: newSetting.text,
        link: newSetting.link
    };
    try {
        const result = await Connect.updateOne(
            { _id: newSetting._id },
            update,
            { upsert: true }
        );
        if (result) {
            response = {
                status: 200,
                message: "Connection list setting successfully updated"
            };
        } else {
            console.log(result);
        }
    } catch (err) {
        console.log(err);
    }
    return response;
};

/**
 * Delete a global setting
 */
module.exports.deleteReview = async function (userId) {};
