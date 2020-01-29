class Operation{

    constructor() {
        /*
        *no args constructor
         **/
    }

    #transactionID;
    #timestampReq;
    #timestampElab;
    #srcType;
    #amount;
    #result;
    #status;
    #opDescr;
    #MAC;
    #operation;
    #authorization;


    get transactionID() {
        return this.#transactionID;
    }

    set transactionID(transactionID) {
        this.#transactionID = transactionID;
    }

    get timestampReq() {
        return this.#timestampReq;
    }

    set timestampReq(timestampReq) {
        this.#timestampReq = timestampReq;
    }

    get timestampElab() {
        return this.#timestampElab;
    }

    set timestampElab(timestampElab) {
        this.#timestampElab = timestampElab;
    }

    get srcType() {
        return this.#srcType;
    }

    set srcType(srcType) {
        this.#srcType = srcType;
    }

    get amount() {
        return this.#amount;
    }

    set amount(amount) {
        this.#amount = amount;
    }

    get result() {
        return this.#result;
    }

    set result(result) {
        this.#result = result;
    }

    get status() {
        return this.#status;
    }

    set status(status) {
        this.#status = status;
    }

    get opDescr() {
        return this.#opDescr;
    }

    set opDescr(opDescr) {
        this.#opDescr = opDescr;
    }

    get MAC() {
        return this.#MAC;
    }

    set MAC(MAC) {
        this.#MAC = value;
    }

    get operation() {
        return this.#operation;
    }

    set operation(operation) {
        this.#operation = operation;
    }

    get authorization() {
        return this.#authorization;
    }

    set authorization(authorization) {
        this.#authorization = authorization;
    }

    toString(){
        return "TransactionID: " + this.#transactionID + " TimestampReq: "+ this.#timestampReq + " TimestampElab: " +
            this.#timestampElab + " SrcType: " + this.#srcType + "\nAmount: " + this.#amount + " Result: " + this.#result +
            " Status: " + this.#status + " OpDescr: " + this.#opDescr + "\nMAC: " + this.#MAC + " Operation: " + this.#operation +
            " {Authorization:" + this.#authorization.toString();
    }
}