const GeneralRequest = require('./GeneralRequest');

class ConfirmRequest extends GeneralRequest{

    accountingMode;
    closeOrder;

    constructor(transactionid, orderid, amount, currency, exponent, accountingMode, closeOrder, opDescr = "", options = "") {
        super(transactionid, orderid, amount, currency, exponent, opDescr = "", options = "");
        this.accountingMode = accountingMode;
        this.closeOrder = closeOrder;
    }

    get accountingMode() {
        return this.accountingMode;
    }

    set accountingMode(value) {
        this.accountingMode = value;
    }

    get closeOrder() {
        return this.closeOrder;
    }

    set closeOrder(value) {
        this.closeOrder = value;
    }

    get options() {
        return this.options;
    }

    set options(value) {
        this.options = value;
    }

    toString() {
        return super.toString() + "\nAccountingMode: " + this.accountingMode + " CloseOrder: " + this.closeOrder + " Options: " + this.options;
    }

}

module.exports = ConfirmRequest;