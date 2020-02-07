
class GeneralRequest{

    header;
    transactionID;
    orderID;
    amount;
    currency;
    exponent;
    opDescr;
    options;


    constructor() {
        /*
        * no args constructor
        * */
    }

    get options(){
        return this.options;

    }

    set options(options){
        this.options = options;

    }

    get opDescr(){
        return this.opDescr
    }

    set opDescr(opDescr){
        this.opDescr = opDescr;
    }

    get Header() {
        return this.header;
    }

    set Header(Header) {
        this.header = Header();
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

    toString(){
        return "Header: {" + this.header.toString() + " }\n"+ "TransactionID: " + this.transactionID + " OrderID: " + this.orderID
                + " Amount: " + this.amount + " Currency: " + this.currency + "\nExponent: " + this.exponent;

    }
}

module.exports = GeneralRequest;