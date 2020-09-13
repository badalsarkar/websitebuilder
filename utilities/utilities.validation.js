/**
 * @module Utilities/Validation
 * Contains various utility validation function
*/
const validate = require('validate.js');

module.exports.isEmpty = function (item){
    return validate.isEmpty(item);
}


/**
 * Validates email address
 * For email address validation {@link https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address|read here}
 *
 * @param   {!string}   email       -Email address to be validated.
 * @returns {boolean}   True if the address is an email address.
 */
exports.isEmail = function (email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
};

