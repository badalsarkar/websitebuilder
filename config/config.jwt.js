/**
 * This module contains configuration related to JWT
 * @module Config/JWT
*/

const jwt = require('jsonwebtoken');

let tokenExpiryTime='15m';
let secretKey = process.env.JWT_SECRET_KEY;

function generateJWT(payload){
    return jwt.sign(payload, secretKey, { expiresIn: tokenExpiryTime });
}

module.exports.generateJWT= generateJWT;

