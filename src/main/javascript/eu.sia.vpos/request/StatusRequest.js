class StatusRequest {


    reqRefNum;
    orderid;
    productRef;
    options;


    constructor(orderid, ReqRefNum = "",  productRef = "", options = "") {
        this.reqRefNum = ReqRefNum;
        this.orderid = orderid;
        this.productRef = productRef;
        this.options = options;

    }

    getOriginalReqRefNum() {
        return this.reqRefNum;
    }

    setOriginalReqRefNum(value) {
        this.reqRefNum = value;
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
