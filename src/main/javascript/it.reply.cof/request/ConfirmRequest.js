const GeneralRequest = require('./GeneralRequest');

class ConfirmRequest extends GeneralRequest{

    accountingMode;
    closeOrder;
    ipAddress;

    constructor(transactionid, orderid, amount, currency, exponent, accountingMode, closeOrder, ipAddress = "", opDescr = "", options = "") {
        super(transactionid, orderid, amount, currency, exponent, opDescr = "", options = "");
        this.accountingMode = accountingMode;
        this.closeOrder = closeOrder;
        this.ipAddress = ipAddress;
    }

    get ipAddress(){
        return this.ipAddress;
    }

    set ipAddress(ipAddress){
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