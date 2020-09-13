
/**
 * Custom error calss
*/
class MyCustomError extends Error{

    constructor(message){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
} 

module.exports.MyCustomError = MyCustomError;


/**
 * Custom error class.
 *
 */
class DuplicateDataError extends MyCustomError {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports.DuplicateDataError = DuplicateDataError;

/**
 * Database error
 * This error is thrown when there is unexpected error in database
*/
class DatabaseError extends MyCustomError {
    constructor(message){
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports.DatabaseError = DatabaseError;


