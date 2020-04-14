class GeneralRequest {

    transactionID;
    orderID;
    amount;
    currency;
    exponent;
    opDescr;
    options;


    constructor(transactionid, orderid, amount, currency, exponent = "", opDescr = "", options = "") {

        this.transactionID = transactionid.length <= 25 && transactionid.length > 0 ? transactionid : null;
        this.orderID = orderid.match('[a-zA-Z0-9\\\\\\-\\_]{1,50}') ? orderid : null;
        this.amount = amount.match('[0-9]{2,8}') ? amount : null;
        this.currency = currency.match('[0-9]{3}') ? currency : null;
        this.exponent = exponent.match('[0-9]{1}') ? exponent : null;
        this.opDescr = opDescr.match('.{1,100}') ? opDescr : null;
        this.options = options.match('[A-Za-z]*') ? options : null;

        return this;

    }

    get options() {
        return this.options;

    }

    set options(options) {
        this.options = options;

    }

    get opDescr() {
        return this.opDescr
    }

    set opDescr(opDescr) {
        this.opDescr = opDescr;
    }


    get TransactionID() {
        return this.transactionID;
    }

    set TransactionID(transactionID) {
        this.transactionID = transactionID;
    }

    get OrderID() {
        return this.orderID;
    }

    set OrderID(orderID) {
        this.orderID = orderID;
    }

    get Amount() {
        return this.amount;
    }

    set Amount(amount) {
        this.amount = amount;
    }

    get Currency() {
        return this.currency;
    }

    set Currency(currency) {
        this.currency = currency;
    }

    get Exponent() {
        return this.exponent;
    }

    set Exponent(exponent) {
        this.exponent = exponent;
    }

    toString() {
        return "Header: {" + this.header.toString() + " }\n" + "TransactionID: " + this.transactionID + " OrderID: " + this.orderID
            + " Amount: " + this.amount + " Currency: " + this.currency + "\nExponent: " + this.exponent;

    }
}

module.exports = GeneralRequest;