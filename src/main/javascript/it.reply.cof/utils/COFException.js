class COFException {
    constructor(message) {
        COFException.prototype = Object.create(Error.prototype);
        COFException.prototype.name = "COFException";
        this.message = message;

        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, COFException);
        } else
            this.stack = (new Error()).stack;
    }

}

module.exports = COFException;
