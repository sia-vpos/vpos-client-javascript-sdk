class Auth3DSStep1Request {

    isMasterPass;
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
    inPerson;
    merchantURL;

    constructor(isMasterpass = false, orderID, pan, cvv2 = "", expDate, amount, currency,
                exponent, accountingMode, network, merchantURL = "", emailCH = "", userID = "", acquirer = "", ipAddress = "",
                usrAuthFlag = "", opDescr = "", options = "", antifraud = "", productRef = "", name = "", surname = "",
                taxID = "", createPanAlias = "", inPerson = ""
    ) {
        this.isMasterPass = isMasterpass;
        this.orderID = orderID.match('^[a-zA-Z0-9\\\\\\-\\_]{1,50}') ? orderID : null;
        this.pan = pan.match('^[0-9]{10,19}') ? pan : null;
        this.cvv2 = cvv2.match('^[0-9]') ? cvv2 : null;
        this.expDate = expDate.match('^[0-9]{2}(0[0-9]|1[0-2])') ? expDate : null;
        this.amount = amount.match('^[0-9]{2,8}') ? amount : null;
        this.currency = currency.match('^[0-9]{3}') ? currency : null;
        this.exponent = exponent.match('[0-9]{1}') ? exponent : null;
        this.accountingMode = accountingMode.match('(D|I){1}') ? accountingMode : null;
        this.network = network.match('^[0-9]{2}') ? network : null;
        this.merchantURL = merchantURL.match('[A-Za-z0-9_\\-/:. ]') ? merchantURL : null;
        this.emailCH = emailCH.match('.{7,50}') ? emailCH : null;
        this.userID = userID.match('.{1,255}') ? userID : null;
        this.acquirer = acquirer.match('[A-Za-z0-9]{5}') ? acquirer : null;
        this.ipAddress = ipAddress.match('^(?=.*[^\\.]$)((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.?){4}$') ? ipAddress : null;
        this.usrAuthFlag = usrAuthFlag.match('[0-2]{1}') ? usrAuthFlag : null;
        this.taxID = taxID.match('^([A-Z0-9]{16}|[0-9]{11}') ? taxID : null;
        this.createPanAlias = createPanAlias.match('S') ? createPanAlias : null;
        this.inPerson = inPerson.match('([S]|[N]){1}') ? inPerson : null;

    }

    get isMasterpass() {
        return this.isMasterPass;
    }

    set isMasterpass(masterpass) {
        this.isMasterPass = masterpass;
    }

    get header() {
        return this.header;
    }

    set header(Header) {
        this.header = Header();
    }

    get data3DS() {
        return this.data3DS;
    }

    set data3DS(Data3DS) {
        this.data3DS = Data3DS();
    }

    get masterpassData() {
        return this.masterpassData;
    }

    set masterpassData(MasterpassData) {
        this.masterpassData = MasterpassData();
    }

    get orderID() {
        return this.orderID;
    }

    set orderID(orderID) {
        this.orderID = orderID;
    }

    get pan() {
        return this.pan;
    }

    set pan(pan) {
        this.pan = pan;
    }

    get cvv2() {
        return this.cvv2;
    }

    set cvv2(cvv2) {
        this.cvv2 = cvv2;
    }

    get expDate() {
        return this.expDate;
    }

    set expDate(expDate) {
        this.expDate = expDate;
    }

    get amount() {
        return this.amount;
    }

    set amount(amount) {
        this.amount = amount;
    }

    get currency() {
        return this.currency;
    }

    set currency(currency) {
        this.currency = currency;
    }

    get exponent() {
        return this.exponent;
    }

    set exponent(exponent) {
        this.exponent = exponent;
    }

    get accountingMode() {
        return this.accountingMode;
    }

    set accountingMode(accountingMode) {
        this.accountingMode = accountingMode;
    }

    get network() {
        return this.network;
    }

    set network(network) {
        this.network = network;
    }

    get emailCH() {
        return this.emailCH;
    }

    set emailCH(emailCH) {
        this.emailCH = emailCH;
    }

    get userID() {
        return this.userID;
    }

    set userID(userID) {
        this.userID = userID;
    }

    get acquirer() {
        return this.acquirer;
    }

    set acquirer(acquirer) {
        this.acquirer = acquirer;
    }

    get ipAddress() {
        return this.ipAddress;
    }

    set ipAddress(ipAddress) {
        this.ipAddress = ipAddress;
    }

    get usrAuthFlag() {
        return this.usrAuthFlag;
    }

    set usrAuthFlag(usrAuthFlag) {
        this.usrAuthFlag = usrAuthFlag;
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

    get antifraud() {
        return this.antifraud;
    }

    set antifraud(antifraud) {
        this.antifraud = antifraud;
    }

    get productRef() {
        return this.productRef;
    }

    set productRef(productRef) {
        this.productRef = productRef;
    }

    get name() {
        return this.name;
    }

    set name(name) {
        this.name = name;
    }

    get surname() {
        return this.surname;
    }

    set surname(surname) {
        this.surname = surname;
    }

    get taxID() {
        return this.taxID;
    }

    set taxID(taxID) {
        this.taxID = taxID;
    }

    get createPanAlias() {
        return this.createPanAlias;
    }

    set createPanAlias(createPanAlias) {
        this.createPanAlias = createPanAlias;
    }

    get inPerson() {
        return this.inPerson;
    }

    set inPerson(inPerson) {
        this.inPerson = inPerson;
    }

    get merchantURL() {
        return this.merchantURL;
    }

    set merchantURL(merchantURL) {
        this.merchantURL = merchantURL;
    }

    toString() {
        return "Header: {" + this.header.toString() + "}\n" + "Data3DS: {" + this.data3DS.toString() + "}\n" + "MasterpassData: {" + this.masterpassData.toString() + "}\n" +
            "OrderID: " + this.orderID + " PAN: " + this.pan + " CVV2: " + this.cvv2 + " ExpDate: " + this.expDate + " Amount: " + this.amount + "\nCurrency: " + this.currency +
            " Exponent: " + this.exponent + " AccountingMode: " + this.accountingMode + " Network: " + this.network + " EmailCH: " + this.emailCH + "\nUserID: " + this.userID +
            " Acquirer: " + this.acquirer + " IpAddress: " + this.ipAddress + " UsrAuthFlag: " + this.usrAuthFlag + " OpDescr: " + this.opDescr + "\nOptions: " + this.options +
            " Antifraud: " + this.antifraud + " ProductRef: " + this.productRef + " Name: " + this.name + " Surname: " + this.surname + "\nTaxID:" + this.taxID +
            " CreatePanAlias: " + this.createPanAlias + " InPerson: " + this.inPerson + " MerchantURL: " + this.merchantURL;

    }


}

module.exports = Auth3DSStep1Request;