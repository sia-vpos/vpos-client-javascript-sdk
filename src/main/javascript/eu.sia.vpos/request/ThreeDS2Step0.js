class ThreeDS2Step0{

    orderID;
    pan;
    cvv2;
    expDate;
    amount;
    currency;
    exponent;
    accountingMode;
    network;
    emailCH;
    nameCH;
    userID;
    acquirer;
    ipAddress;
    usrAuthFlag;
    opDescr;
    options;
    antifraud;
    productRef;
    name;
    surname;
    taxID;
    createPanAlias;
    threeDSData;
    notifURL;
    cPROF;
    threeDSMtdNotifURL;
    challengeWinSize;

    get orderID() {
        return this.orderID;
    }

    set orderID(value) {
        this.orderID = value;
    }

    get pan() {
        return this.pan;
    }

    set pan(value) {
        this.pan = value;
    }

    get cvv2() {
        return this.cvv2;
    }

    set cvv2(value) {
        this.cvv2 = value;
    }

    get expDate() {
        return this.expDate;
    }

    set expDate(value) {
        this.expDate = value;
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

    get accountingMode() {
        return this.accountingMode;
    }

    set accountingMode(value) {
        this.accountingMode = value;
    }

    get network() {
        return this.network;
    }

    set network(value) {
        this.network = value;
    }

    get emailCH() {
        return this.emailCH;
    }

    set emailCH(value) {
        this.emailCH = value;
    }

    get nameCH() {
        return this.nameCH;
    }

    set nameCH(value) {
        this.nameCH = value;
    }

    get userID() {
        return this.userID;
    }

    set userID(value) {
        this.userID = value;
    }

    get acquirer() {
        return this.acquirer;
    }

    set acquirer(value) {
        this.acquirer = value;
    }

    get ipAddress() {
        return this.ipAddress;
    }

    set ipAddress(value) {
        this.ipAddress = value;
    }

    get usrAuthFlag() {
        return this.usrAuthFlag;
    }

    set usrAuthFlag(value) {
        this.usrAuthFlag = value;
    }

    get opDescr() {
        return this.opDescr;
    }

    set opDescr(value) {
        this.opDescr = value;
    }

    get options() {
        return this.options;
    }

    set options(value) {
        this.options = value;
    }

    get antifraud() {
        return this.antifraud;
    }

    set antifraud(value) {
        this.antifraud = value;
    }

    get productRef() {
        return this.productRef;
    }

    set productRef(value) {
        this.productRef = value;
    }

    get name() {
        return this.name;
    }

    set name(value) {
        this.name = value;
    }

    get surname() {
        return this.surname;
    }

    set surname(value) {
        this.surname = value;
    }

    get taxID() {
        return this.taxID;
    }

    set taxID(value) {
        this.taxID = value;
    }

    get createPanAlias() {
        return this.createPanAlias;
    }

    set createPanAlias(value) {
        this.createPanAlias = value;
    }

    get threeDSData() {
        return this.threeDSData;
    }

    set threeDSData(value) {
        this.threeDSData = value;
    }

    get notifURL() {
        return this.notifURL;
    }

    set notifURL(value) {
        this.notifURL = value;
    }

    get cPROF() {
        return this.cPROF;
    }

    set cPROF(value) {
        this.cPROF = value;
    }

    get threeDSMtdNotifURL() {
        return this.threeDSMtdNotifURL;
    }

    set threeDSMtdNotifURL(value) {
        this.threeDSMtdNotifURL = value;
    }

    get challengeWinSize() {
        return this.challengeWinSize;
    }

    set challengeWinSize(value) {
        this.challengeWinSize = value;
    }
    

    constructor(threeDSData, orderID, pan, cvv2 = "", expDate, amount, currency,
                exponent, accountingMode, network, notifURL, emailCH , nameCH = "",userID = "", acquirer = "", ipAddress = "",
                usrAuthFlag = "", opDescr = "", options = "", antifraud = "", productRef = "", name = "", surname = "",
                taxID = "", createPanAlias = "",  cProf = "", threeDSMtdNotifURL = "", challengeWinSize = ""
    ) {
        this.threeDSData = threeDSData;
        this.orderID = orderID !== null ? orderID : null;
        this.pan = pan.match('^[0-9]{10,19}') ? pan : null;
        this.cvv2 = cvv2.match('^[0-9]') ? cvv2 : null;
        this.expDate = expDate.match('^[0-9]{2}(0[0-9]|1[0-2])') ? expDate : null;
        this.amount = amount.match('^[0-9]{2,8}') ? amount : null;
        this.currency = currency.match('^[0-9]{3}') ? currency : null;
        this.exponent = exponent.match('[0-9]{1}') ? exponent : null;
        this.accountingMode = accountingMode.match('(D|I){1}') ? accountingMode : null;
        this.network = network.match('^[0-9]{2}') ? network : null;
        this.emailCH = emailCH.match('\\S{7,50}') && emailCH !== "" ? emailCH : null;
        this.nameCH = nameCH.match('.{2,42}') ? nameCH : null;
        this.userID = userID.match('.{1,255}') ? userID : null;
        this.acquirer = acquirer.match('[A-Za-z0-9]{5}') ? acquirer : null;
        this.ipAddress = ipAddress.match('^(?=.*[^\\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.?){4}$') ? ipAddress : null;
        this.usrAuthFlag = usrAuthFlag.match('[0-2]{1}') ? usrAuthFlag : null;
        this.taxID = taxID.match('^([A-Z0-9]{16}|[0-9]{11})') ? taxID : null;
        this.createPanAlias = createPanAlias.match('S') ? createPanAlias : null;
        this.notifURL = notifURL;
        this.threeDSMtdNotifURL = threeDSMtdNotifURL;
        this.challengeWinSize = challengeWinSize;
        this.cPROF = cProf;

    }
    

}

module.exports = ThreeDS2Step0;