class VPosClientException {
    constructor(message) {
        VPosClientException.prototype = Object.create(Error.prototype);
        VPosClientException.prototype.name = "COFException";
        this.message = message;

        if ("captureStackTrace" in Error) {
            Error.captureStackTrace(this, VPosClientException);
        } else
            this.stack = (new Error()).stack;
    }

}

module.exports = VPosClientException;
