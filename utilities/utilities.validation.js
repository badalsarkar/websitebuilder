/**
 * @module Utilities/Validation
 * Contains various utility validation function
*/
const validate = require('validate.js');

module.exports.isEmpty = function (item){
    return validate.isEmpty(item);
}
