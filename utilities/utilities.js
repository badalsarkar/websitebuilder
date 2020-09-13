/**
 * This module contains different utility methods, used throughout the project.
 * @module Utilities/Utilities
 */

const validate = require("validate.js");
const mongoose = require("mongoose");
//const {MyCustomError} = require('./utilities.errorClass');

/**
 * @typedef module:Utilities~http
 * @property  {number} ok               -Represents http response code 200 (OK)
 * @property  {number} created          -Represents http response code 201(Created)
 * @property  {number} badRequest       -Represents http response code 400(Bad Request)
 * @property  {number} unauthorized     -Represents http response code 401(Unauthorized)
 * @property  {number} forbidden        -Represents http response code 403(Forbidden)
 * @property  {number} notFound         -Represents http response code 404(Not Found)
 * @property  {number} serverError      -Represents http response code 500(Internal Server Error)
 * @property  {number} unprocessable    -Represents http response code 422(Unprocessable Entity)
 *
 */
let http = {
    ok: 200,
    created: 201,
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500,
    unprocessable: 422
};
exports.http = http;







