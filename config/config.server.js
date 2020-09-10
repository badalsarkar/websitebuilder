//this file contains several configuration for the server

var bodyParser = require("body-parser");
const env = require("dotenv");
const { connectToDb } = require("./config.database");
const cors = require('cors');
const cookieParser = require('cookie-parser');


/******************************
 * port and host configuration
 * ****************************/
env.config();
let port;
let host = process.env.HOST;
port = process.env.PORT;


/**
 * CORS configuaration
 * https://expressjs.com/en/resources/middleware/cors.html#configuration-options
 * https://stackoverflow.com/questions/46288437/set-cookies-for-cross-origin-requests
*/
const corsConfig = {
    origin: true,
    credentials: true //for sending cookie in the header
};

/**
 * Attaches several middleware to the express app.
*/
exports.configureDependencies = function (app) {
    try {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(cookieParser());
        app.use(cors(corsConfig));
    } catch (err) {
        console.log(err);
    }
    return app;
};

/********************************************
 * start the server
 *********************************************/
exports.startServer = async function (app) {
    try {
        await connectToDb();
        app.listen(port, () => {
            console.log(`Server is listening to port ${port} on ${host}`);
        });
    } catch (err) {
        //print connection error
        console.log(err);
        process.exit(1);
    }
};
