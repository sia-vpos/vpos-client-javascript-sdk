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
    data3DSJson;
    notCompulsoryFields = {
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

    constructor() {
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
        return this.data3DSJson;
    }

    set data3DSJson(value) {
        this.data3DSJson = value;
    }

    get notCompulsoryFields() {
        return this.notCompulsoryFields;
    }

    set notCompulsoryFields(value) {
        this.notCompulsoryFields = value
    }

}


class Data3DSJson {

    threeDSRequestorChallengeInd;
    addrMatch;
    chAccAgeInd;
    chAccChange;
    chAccChangeInd;
    chAccDate;
    chAccPwChange;
    chAccPwChangeInd;
    nbPurchaseAccount;
    txnActivityDay;
    txnActivityYear;
    shipAddressUsage;
    shipAddressUsageInd;
    shipNameIndicator;
    acctID;
    billAddrCity;
    billAddrCountry;
    billAddrLine1;
    billAddrLine2;
    billAddrLine3;
    billAddrPostCode;
    billAddrState;
    homePhone;
    mobilePhone;
    shipAddrCity;
    shipAddrCountry;
    shipAddrLine1;
    shipAddrLine2;
    shipAddrLine3;
    shipAddrPostCode;
    shipAddrState;
    workPhone;
    deliveryEmailAddress;
    deliveryTimeframe;
    preOrderDate;
    preOrderPurchaseInd;


    get threeDSRequestorChallengeInd() {
        return this.threeDSRequestorChallengeInd;
    }

    set threeDSRequestorChallengeInd(value) {
        this.threeDSRequestorChallengeInd = value;
    }

    get addrMatch() {
        return this.addrMatch;
    }

    set addrMatch(value) {
        this.addrMatch = value;
    }

    get chAccAgeInd() {
        return this.chAccAgeInd;
    }

    set chAccAgeInd(value) {
        this.chAccAgeInd = value;
    }

    get chAccChange() {
        return this.chAccChange;
    }

    set chAccChange(value) {
        this.chAccChange = value;
    }

    get chAccChangeInd() {
        return this.chAccChangeInd;
    }

    set chAccChangeInd(value) {
        this.chAccChangeInd = value;
    }

    get chAccDate() {
        return this.chAccDate;
    }

    set chAccDate(value) {
        this.chAccDate = value;
    }

    get chAccPwChange() {
        return this.chAccPwChange;
    }

    set chAccPwChange(value) {
        this.chAccPwChange = value;
    }

    get chAccPwChangeInd() {
        return this.chAccPwChangeInd;
    }

    set chAccPwChangeInd(value) {
        this.chAccPwChangeInd = value;
    }

    get nbPurchaseAccount() {
        return this.nbPurchaseAccount;
    }

    set nbPurchaseAccount(value) {
        this.nbPurchaseAccount = value;
    }

    get txnActivityDay() {
        return this.txnActivityDay;
    }

    set txnActivityDay(value) {
        this.txnActivityDay = value;
    }

    get txnActivityYear() {
        return this.txnActivityYear;
    }

    set txnActivityYear(value) {
        this.txnActivityYear = value;
    }

    get shipAddressUsage() {
        return this.shipAddressUsage;
    }

    set shipAddressUsage(value) {
        this.shipAddressUsage = value;
    }

    get shipAddressUsageInd() {
        return this.shipAddressUsageInd;
    }

    set shipAddressUsageInd(value) {
        this.shipAddressUsageInd = value;
    }

    get shipNameIndicator() {
        return this.shipNameIndicator;
    }

    set shipNameIndicator(value) {
        this.shipNameIndicator = value;
    }

    get acctID() {
        return this.acctID;
    }

    set acctID(value) {
        this.acctID = value;
    }

    get billAddrCity() {
        return this.billAddrCity;
    }

    set billAddrCity(value) {
        this.billAddrCity = value;
    }

    get billAddrCountry() {
        return this.billAddrCountry;
    }

    set billAddrCountry(value) {
        this.billAddrCountry = value;
    }

    get billAddrLine1() {
        return this.billAddrLine1;
    }

    set billAddrLine1(value) {
        this.billAddrLine1 = value;
    }

    get billAddrLine2() {
        return this.billAddrLine2;
    }

    set billAddrLine2(value) {
        this.billAddrLine2 = value;
    }

    get billAddrLine3() {
        return this.billAddrLine3;
    }

    set billAddrLine3(value) {
        this.billAddrLine3 = value;
    }

    get billAddrPostCode() {
        return this.billAddrPostCode;
    }

    set billAddrPostCode(value) {
        this.billAddrPostCode = value;
    }

    get billAddrState() {
        return this.billAddrState;
    }

    set billAddrState(value) {
        this.billAddrState = value;
    }

    get homePhone() {
        return this.homePhone;
    }

    set homePhone(value) {
        this.homePhone = value;
    }

    get mobilePhone() {
        return this.mobilePhone;
    }

    set mobilePhone(value) {
        this.mobilePhone = value;
    }

    get shipAddrCity() {
        return this.shipAddrCity;
    }

    set shipAddrCity(value) {
        this.shipAddrCity = value;
    }

    get shipAddrCountry() {
        return this.shipAddrCountry;
    }

    set shipAddrCountry(value) {
        this.shipAddrCountry = value;
    }

    get shipAddrLine1() {
        return this.shipAddrLine1;
    }

    set shipAddrLine1(value) {
        this.shipAddrLine1 = value;
    }

    get shipAddrLine2() {
        return this.shipAddrLine2;
    }

    set shipAddrLine2(value) {
        this.shipAddrLine2 = value;
    }

    get shipAddrLine3() {
        return this.shipAddrLine3;
    }

    set shipAddrLine3(value) {
        this.shipAddrLine3 = value;
    }

    get shipAddrPostCode() {
        return this.shipAddrPostCode;
    }

    set shipAddrPostCode(value) {
        this.shipAddrPostCode = value;
    }

    get shipAddrState() {
        return this.shipAddrState;
    }

    set shipAddrState(value) {
        this.shipAddrState = value;
    }

    get workPhone() {
        return this.workPhone;
    }

    set workPhone(value) {
        this.workPhone = value;
    }

    get deliveryEmailAddress() {
        return this.deliveryEmailAddress;
    }

    set deliveryEmailAddress(value) {
        this.deliveryEmailAddress = value;
    }

    get deliveryTimeframe() {
        return this.deliveryTimeframe;
    }

    set deliveryTimeframe(value) {
        this.deliveryTimeframe = value;
    }

    get preOrderDate() {
        return this.preOrderDate;
    }

    set preOrderDate(value) {
        this.preOrderDate = value;
    }

    get preOrderPurchaseInd() {
        return this.preOrderPurchaseInd;
    }

    set preOrderPurchaseInd(value) {
        this.preOrderPurchaseInd = value;
    }


}

module.exports = {
    PaymentInfo: PaymentInfo,
    Data3DSJson: Data3DSJson

}