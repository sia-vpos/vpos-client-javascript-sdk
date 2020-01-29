class Authorization{

    constructor() {
        /*
        *no args constructor
         **/
    }

    #paymentType;
    #authorizationType;
    #transactionID;
    #network;
    #orderID;
    #transactionAmount;
    #authorizedAmount;
    #currency;
    #exponent;
    #accountedAmount;
    #refundedAmount;
    #transactionResult;
    #timestamp;
    #authorizationNumber;
    #acquirerBin;
    #merchantID;
    #transactionStatus;
    #responseCodeISO;
    #panTail;
    #panExpiryDate;
    #paymentTypePP;
    #RRN;
    #cardType;
    #MAC;

    get paymentType() {
        return this.#paymentType;
    }

    set paymentType(paymentType) {
        this.#paymentType = paymentType;
    }

    get authorizationType() {
        return this.#authorizationType;
    }

    set authorizationType(authorizationType) {
        this.#authorizationType = authorizationType;
    }

    get transactionID() {
        return this.#transactionID;
    }

    set transactionID(transactionID) {
        this.#transactionID = transactionID;
    }

    get network() {
        return this.#network;
    }

    set network(network) {
        this.#network = network;
    }

    get orderID() {
        return this.#orderID;
    }

    set orderID(orderID) {
        this.#orderID = orderID;
    }

    get transactionAmount() {
        return this.#transactionAmount;
    }

    set transactionAmount(transactionAmount) {
        this.#transactionAmount = transactionAmount;
    }

    get authorizedAmount() {
        return this.#authorizedAmount;
    }

    set authorizedAmount(authorizedAmount) {
        this.#authorizedAmount = authorizedAmount;
    }

    get currency() {
        return this.#currency;
    }

    set currency(currency) {
        this.#currency = currency;
    }

    get exponent() {
        return this.#exponent;
    }

    set exponent(exponent) {
        this.#exponent = exponent;
    }

    get accountedAmount() {
        return this.#accountedAmount;
    }

    set accountedAmount(accountedAmount) {
        this.#accountedAmount = accountedAmount;
    }

    get refundedAmount() {
        return this.#refundedAmount;
    }

    set refundedAmount(refundedAmount) {
        this.#refundedAmount = refundedAmount;
    }

    get transactionResult() {
        return this.#transactionResult;
    }

    set transactionResult(transactionResult) {
        this.#transactionResult = transactionResult;
    }

    get timestamp() {
        return this.#timestamp;
    }

    set timestamp(timestamp) {
        this.#timestamp = timestamp;
    }

    get authorizationNumber() {
        return this.#authorizationNumber;
    }

    set authorizationNumber(authorizationNumber) {
        this.#authorizationNumber = authorizationNumber;
    }

    get acquirerBin() {
        return this.#acquirerBin;
    }

    set acquirerBin(acquirerBin) {
        this.#acquirerBin = acquirerBin;
    }

    get merchantID() {
        return this.#merchantID;
    }

    set merchantID(merchantID) {
        this.#merchantID = merchantID;
    }

    get transactionStatus() {
        return this.#transactionStatus;
    }

    set transactionStatus(transactionStatus) {
        this.#transactionStatus = transactionStatus;
    }

    get responseCodeISO() {
        return this.#responseCodeISO;
    }

    set responseCodeISO(responseCodeISO) {
        this.#responseCodeISO = responseCodeISO;
    }

    get panTail() {
        return this.#panTail;
    }

    set panTail(panTail) {
        this.#panTail = panTail;
    }

    get panExpiryDate() {
        return this.#panExpiryDate;
    }

    set panExpiryDate(panExpiryDate) {
        this.#panExpiryDate = panExpiryDate;
    }

    get paymentTypePP() {
        return this.#paymentTypePP;
    }

    set paymentTypePP(paymentTypePP) {
        this.#paymentTypePP = paymentTypePP;
    }

    get RRN() {
        return this.#RRN;
    }

    set RRN(RRN) {
        this.#RRN = RRN;
    }

    get cardType() {
        return this.#cardType;
    }

    set cardType(cardType) {
        this.#cardType = cardType;
    }

    get MAC() {
        return this.#MAC;
    }

    set MAC(MAC) {
        this.#MAC = MAC;
    }

    toString(){
        return "PaymentType: " + this.#paymentType + " AuthorizationType: " + this.#authorizationType + " TransactionID: " + this.#transactionID
                + " Network: " + this.#network + "\nOrderID: " + this.#orderID + " TransactionAmount: " + this.#transactionAmount +
                " AuthorizedAmount: " + this.#authorizedAmount + " Currency: " + this.#currency + "\nExponent: " + this.#exponent + " AccountedAmount: "
                + this.#accountedAmount + " RefundedAmount: " + this.#refundedAmount + " TransactionResult: " + this.#transactionResult + "\nTimestamp: "
                + this.#timestamp + " AuthorizationNumber:  " + this.#authorizationNumber + " AcquirerBIN:" + this.#acquirerBin + " MerchantID: " +
                this.#merchantID + "\nTransactionStatus: " + this.#transactionStatus + " ResponseCodeISO: " + this.#responseCodeISO + " PanTail: " +
                this.#panTail + " PanExpiryDate: " + this.#panExpiryDate + "\nPaymentTypePP: " + this.#paymentTypePP + " RRN: " + this.#RRN +
                " CardType: " + this.#cardType + " MAC: " + this.#MAC;

    }

}