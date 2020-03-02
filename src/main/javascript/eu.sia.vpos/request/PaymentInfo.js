class PaymentInfo {

    amount;
    currency;
    exponent;
    orderId;
    shopId;
    urlBack;
    urlDone;
    urlMs;
    accountingMode;
    authorMode;
    threeDSData;
    notCompulsoryFields;

    constructor(amount, currency, orderId, shopId, urlBack, urlDone, urlMS, accountingMode, authorMode) {
        this.amount = amount;
        this.currency = currency;
        this.orderId = orderId;
        this.shopId = shopId;
        this.urlBack = urlBack;
        this.urlDone = urlDone;
        this.urlMs = urlMS;
        this.accountingMode = accountingMode;
        this.authorMode = authorMode;
        this.notCompulsoryFields = {
            'LANG': '',
            'SHOPEMAIL': '',
            'OPTIONS': '',
            'LOCKCARD': '',
            'COMMIS': '',
            'EMAIL': '',
            'ORDDESCR': '',
            'VSID': '',
            'OPDESCR': '',
            'REMAININGDURATION': '',
            'USERID': '',
            'BP_POSTEPAY': '',
            'BP_CARDS': '',
            'PHONENUMBER': '',
            'CAUSATION': '',
            'USER': '',
            'NAME': '',
            'SURNAME': '',
            'TAXID': '',
            'PRODUCTREF': '',
            'ANTIFRAUD': ''

        };

    }

    get amount() {
        return this.amount;
    }

    set amount(value) {
        this.amount = value;
    }

    get currency() {
        return this.currency;
    }

    set currency(value) {
        this.currency = value;
    }

    get exponent() {
        return this.exponent;
    }

    set exponent(value) {
        this.exponent = value;
    }

    get orderId() {
        return this.orderId;
    }

    set orderId(value) {
        this.orderId = value;
    }

    get shopId() {
        return this.shopId;
    }

    set shopId(value) {
        this.shopId = value;
    }

    get urlBack() {
        return this.urlBack;
    }

    set urlBack(value) {
        this.urlBack = value;
    }

    get urlDone() {
        return this.urlDone;
    }

    set urlDone(value) {
        this.urlDone = value;
    }

    get urlMs() {
        return this.urlMs;
    }

    set urlMs(value) {
        this.urlMs = value;
    }

    get accountingMode() {
        return this.accountingMode;
    }

    set accountingMode(value) {
        this.accountingMode = value;
    }

    get authorMode() {
        return this.authorMode;
    }

    set authorMode(value) {
        this.authorMode = value;
    }

    get data3DSJson() {
        return this.threeDSData;
    }

    set data3DSJson(value) {
        this.threeDSData = value;
    }

    get notCompulsoryFields() {
        return this.notCompulsoryFields;
    }

    set notCompulsoryFields(value) {
        this.notCompulsoryFields = value
    }

}



module.exports = PaymentInfo;
