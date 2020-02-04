const encoder = require('C:\\Users\\danie\\Documents\\GitHub\\javascript-library\\src\\main\\javascript\\it.reply.cof\\utils\\mac\\Encoder.js')
const x = require('C:\\Users\\danie\\Documents\\GitHub\\javascript-library\\src\\main\\javascript\\it.reply.cof\\utils\\builders\\XMLUtils.js')

class StatusRequest{


    operation = 'ORDERSTATUS';
    timestamp;
    originalReqRefNum;
    orderid;
    productRef;
    options;


    constructor(originalReqRefNum, orderid, productRef = "", options = "") {
        this.timestamp = new Date().toISOString().substring(0,23);
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

    toString = () =>{

        return this.stringer();

    }


    
}

module.exports = StatusRequest;
