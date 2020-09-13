const mongoose = require("mongoose");
const { isEmail } = require("../utilities/utilities.validation");
const validate = require("validate.js");
const bcrypt = require('bcrypt');
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
    verified: { type: Boolean, default: false }
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


// Compile User model
const User = mongoose.model("Users", UserSchema);
exports.User = User;
