/**
 * This module contains Passport configuration.
 * @module Config/Passport
 */

const passportJWT = require("passport-jwt");
const passport = require("passport");
const env = require("dotenv");
env.config();

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

/**
 * Extract token from cookie
 */
let cookieExtractor = function (req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token;
};

/**
 * Configure JWT Options
 */
let jwtOptions = {};
// This for extracting token from cookie
//jwtOptions.jwtFromRequest = ExtractJwt.fromExtractors([cookieExtractor]);
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET_KEY;

/**
 * JWT verification function.
 */
function verifyJWT(jwtPayload, next) {
    if (jwtPayload) {
        next(null, { userName: jwtPayload.userName });
    } else {
        next(null, false);
    }
}

/**
 * Define strategy.
 */
let strategy = new JwtStrategy(jwtOptions, verifyJWT);
passport.use(strategy);

/**
 * Export passport to be attached in app.
 */
exports.passport = passport;

/**
 * Authentication for route protection.
 * This will be added to the routes to be protected
 */
exports.protectRoute = passport.authenticate("jwt", { session: false });
