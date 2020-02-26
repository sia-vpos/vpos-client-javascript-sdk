const GeneralRequest = require('./GeneralRequest');

class ConfirmRequest extends GeneralRequest {

    accountingMode;
    closeOrder;
    ipAddress;

    constructor(transactionid, orderid, amount, currency, exponent, accountingMode = "", closeOrder = "", ipAddress = "", opDescr = "", options = "") {
        super(transactionid, orderid, amount, currency, exponent, opDescr = "", options = "");
        this.accountingMode = accountingMode.match('((D)|(I)){1}') ? accountingMode : null;
        this.closeOrder = closeOrder.match('((S)|(N)){1}') ? closeOrder : null;
        this.ipAddress = ipAddress.match('^(?=.*[^\\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.?){4}$') ? ipAddress : null;
    }

    get ipAddress() {
        return this.ipAddress;
    }

    set ipAddress(ipAddress) {
        this.ipAddress = ipAddress;
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