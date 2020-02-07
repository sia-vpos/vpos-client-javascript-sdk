class Auth3DSStep1Request{

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
                exponent, accountingMode, network, emailCH = "", userID = "", acquirer  = "", ipAddress  = "",
                usrAuthFlag = "", opDescr = "", options = "", antifraud = "", productRef = "", name = "", surname = "",
                taxID = "", createPanAlias = "", inPerson = "", merchantURL  = ""
    ) {
    }

    get isMasterpass(){
        return this.isMasterPass;
    }

    set isMasterpass(masterpass){
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

    constructor() {
        /*
        * no args constructor
        * */
    }

    toString(){
        return "Header: {" + this.header.toString() + "}\n" + "Data3DS: {" + this.data3DS.toString() + "}\n" + "MasterpassData: {" + this.masterpassData.toString() + "}\n" +
                "OrderID: " + this.orderID + " PAN: " + this.pan + " CVV2: " + this.cvv2 + " ExpDate: " + this.expDate + " Amount: " + this.amount + "\nCurrency: " + this.currency +
                " Exponent: " + this.exponent + " AccountingMode: " + this.accountingMode + " Network: " + this.network + " EmailCH: " + this.emailCH + "\nUserID: " + this.userID +
                " Acquirer: " + this.acquirer + " IpAddress: " + this.ipAddress + " UsrAuthFlag: " + this.usrAuthFlag + " OpDescr: " + this.opDescr + "\nOptions: " + this.options +
                " Antifraud: " + this.antifraud + " ProductRef: " + this.productRef + " Name: " + this.name + " Surname: " + this.surname + "\nTaxID:" + this.taxID +
                " CreatePanAlias: " + this.createPanAlias + " InPerson: " + this.inPerson + " MerchantURL: " + this.merchantURL;

    }


}
module.exports = Auth3DSStep1Request;