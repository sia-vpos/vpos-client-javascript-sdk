class StatusRequest {


    originalReqRefNum;
    orderid;
    productRef;
    options;
    macFields = [
        "operation",
        "timestamp",
        "shopid",
        "operatorid",
        "originalReqRefNum",
        "orderid",
        this.getOptions() !== "" ? "options" : "",
        this.getProductRef() !== "" ? "productRef" : ""


    ]

    constructor(originalReqRefNum, orderid, productRef = "", options = "") {
        this.originalReqRefNum = originalReqRefNum;
        this.orderid = orderid;
        this.productRef = productRef;
        this.options = options;

    }

    getOriginalReqRefNum() {
        return this.originalReqRefNum;
    }

    setOriginalReqRefNum(value) {
        this.originalReqRefNum = value;
    }

    getOrderID() {
        return this.orderID;
    }

    setOrderID(value) {
        this.orderID = value;
    }

    getProductRef() {
        return this.productRef;
    }

    setProductRef(value) {
        this.productRef = value;
    }

    getOptions() {
        return this.options;
    }

    setOptions(value) {
        this.options = value;
    }

    stringer = () => {

        var arr = [
            "operation",
            "timestamp",
            "shopid",
            "operatorid",
            "originalReqRefNum",
            "orderid",
            "options",
            "productRef"
        ];
        var buffer = "";
        arr.forEach((key) => {
            buffer += key.toUpperCase() + " : " + this[key] + "\n";
        })

        return buffer;

    }

    toString = () => {

        return this.stringer();

    }


}

module.exports = StatusRequest;
