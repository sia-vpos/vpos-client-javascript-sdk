class StatusRequest{

    #header;
    #originalReqRefNum;
    #orderID;
    #productRef;
    #options;

    constructor() {
        /*
        * no args constructor
        * */
    }
    constructor(Header, originalReqRefNum, orderID, productRef, options) {
        this.#header = Header();
        this.#originalReqRefNum = originalReqRefNum;
        this.#orderID = orderID;
        this.#productRef = productRef;
        this.#options = options;

    }

    getHeader() {
        return this.#header;
    }

    setHeader(value) {
        this.#header = value;
    }

    getOriginalReqRefNum() {
        return this.#originalReqRefNum;
    }

    setOriginalReqRefNum(value) {
        this.#originalReqRefNum = value;
    }

    getOrderID() {
        return this.#orderID;
    }

    setOrderID(value) {
        this.#orderID = value;
    }

    getProductRef() {
        return this.#productRef;
    }

    setProductRef(value) {
        this.#productRef = value;
    }

    getOptions() {
        return this.#options;
    }

    setOptions(value) {
        this.#options = value;
    }

    toString(){
        return "Header: {" + this.getHeader().toString() + " }\n" + "OriginalRefReqNum: " + this.#originalReqRefNum + " OrderID: " + this.#orderID
                + " ProductRef: " + this.#productRef + " Options: " + this.#options;

    }
    
}