class RefundRequest extends GeneralReques{

    opDescr;
    options;

    constructor() {
        super();
    }

    constructor(Header, transactionID, orderID, amount, currency, exponent, opDescr, options) {
        super(Header, transactionID, orderID, amount, currency, exponent);
        this.opDescr = opDescr;
        this.options = options;
    }

    get opDescr() {
        return this.opDescr;
    }

    set opDescr(opDescr) {
        this.opDescr = opDescr;
    }

    get options() {
        return this.options;
    }

    set options(options) {
        this.options = options;
    }

    toString(){
        return super.toString() + " OpDescr: " + this.opDescr +" Options: " + this.options;
    }

}

module.exports = RefundRequest;