function COFException(message) {
    this.message = message;
    if ("captureStackTrace" in Error) {
        Error.captureStackTrace(this, COFException);
    }
    else
        this.stack = (new Error()).stack;
}

COFException.prototype = Object.create(Error.prototype);
COFException.prototype.name = "COFException";
COFException.prototype.constructor = COFException;

//draft
