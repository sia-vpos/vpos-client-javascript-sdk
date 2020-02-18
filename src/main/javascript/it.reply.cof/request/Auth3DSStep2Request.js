class Auth3DSStep2Request {

    originalReqRefNum;
    paRes;
    acquirer;
    options;

    constructor(OriginalReqRefNum, PaRes, Acquirer = "", Options = "") {

        this.originalReqRefNum = OriginalReqRefNum.match('[20[0-9][0-9](0[1-9]|1[0-2])(0[1-9]|2[0-9]|3[0-1])]{8}\\d{24}') ? OriginalReqRefNum : null;
        this.paRes = PaRes;
        this.acquirer = Acquirer.match('[A-Za-z0-9]{5}') ? Acquirer : null;
        this.options = Options;

    }

    get options() {
        return this.options;
    }

    set options(options) {
        this.options = options;

    };

    constructor() {
        /*
        * no args constructor
        * */
    }

    get header() {
        return this.header;
    }

    set header(Header) {
        this.header = Header();
    }

    get originalReqRefNum() {
        return this.originalReqRefNum;
    }

    set originalReqRefNum(originalReqRefNum) {
        this.originalReqRefNum = originalReqRefNum;
    }

    get paRes() {
        return this.paRes;
    }

    set paRes(paRes) {
        this.paRes = paRes;
    }

    get acquirer() {
        return this.acquirer;
    }

    set acquirer(acquirer) {
        this.acquirer = acquirer;
    }

    toString() {
        return "Header: {" + this.header.toString() + "}" + " OriginalReqRefNum: " + this.originalReqRefNum + " PaRes: " + this.paRes + " Acquirer: " + this.acquirer;
    }


}

module.exports = Auth3DSStep2Request;