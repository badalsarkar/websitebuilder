/**
 * This module contains database configuration.
 * @module  Config/Database
 */
const env = require("dotenv");
const mongoose = require("mongoose");
env.config();

let uri;
uri = process.env.DBURI;

/**
 * Database connection options
 */
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
};

/**
 * Connect to database
 */
exports.connectToDb = async function () {
    try {
        await mongoose.connect(uri, options);
        console.log("Connected to database");
    } catch (err) {
        throw err;
    }
};

