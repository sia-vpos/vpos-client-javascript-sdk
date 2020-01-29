class Auth3DSStep2Request{
    
    #header;
    #originalReqRefNum;
    #paRes;
    #acquirer;

    constructor() {
        /*
        * no args constructor
        * */
    }
    
    get header() {
        return this.#header;
    }

    set header(Header) {
        this.#header = Header();
    }

    get originalReqRefNum() {
        return this.#originalReqRefNum;
    }

    set originalReqRefNum(originalReqRefNum) {
        this.#originalReqRefNum = originalReqRefNum;
    }

    get paRes() {
        return this.#paRes;
    }

    set paRes(paRes) {
        this.#paRes = paRes;
    }

    get acquirer() {
        return this.#acquirer;
    }

    set acquirer(acquirer) {
        this.#acquirer = acquirer;
    }

    toString(){
        return "Header: {" + this.#header.toString() + "}" + " OriginalReqRefNum: " + this.#originalReqRefNum + " PaRes: " + this.#paRes + " Acquirer: " + this.#acquirer;
    }
    
    
}