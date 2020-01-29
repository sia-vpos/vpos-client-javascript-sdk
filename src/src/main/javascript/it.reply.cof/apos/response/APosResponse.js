class APosResponse{

    #result;
    #transType;
    #transactionID;
    #authorizationNumber;
    #acquiererBin;
    #merchantID;
    #transactionStatus;
    #transactionResult;
    #panAlias;
    #panAliasRev;
    #panAliasExpDate;
    #panAliasTail;
    #paReq;
    #acsURL;
    #orderID;
    #refundedAmount;
    #confirmedAmount;
    #respTimestamp;

    constructor() {
        /*
        *no args constructor
         **/
    }

    get result() {
        return this.#result;
    }

    set result(result) {
        this.#result = result;
    }

    get transType() {
        return this.#transType;
    }

    set transType(transType) {
        this.#transType = transType;
    }

    get transactionID() {
        return this.#transactionID;
    }

    set transactionID(transactionID) {
        this.#transactionID = transactionID;
    }

    get authorizationNumber() {
        return this.#authorizationNumber;
    }

    set authorizationNumber(authorizationNumber) {
        this.#authorizationNumber = authorizationNumber;
    }

    get acquiererBin() {
        return this.#acquiererBin;
    }

    set acquiererBin(acquiererBin) {
        this.#acquiererBin = acquiererBin;
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

    get transactionResult() {
        return this.#transactionResult;
    }

    set transactionResult(transactionResult) {
        this.#transactionResult = transactionResult;
    }

    get panAlias() {
        return this.#panAlias;
    }

    set panAlias(panAlias) {
        this.#panAlias = panAlias;
    }

    get panAliasRev() {
        return this.#panAliasRev;
    }

    set panAliasRev(panAliasRev) {
        this.#panAliasRev = panAliasRev;
    }

    get panAliasExpDate() {
        return this.#panAliasExpDate;
    }

    set panAliasExpDate(panAliasExpDate) {
        this.#panAliasExpDate = panAliasExpDate;
    }

    get panAliasTail() {
        return this.#panAliasTail;
    }

    set panAliasTail(panAliasTail) {
        this.#panAliasTail = panAliasTail;
    }

    get paReq() {
        return this.#paReq;
    }

    set paReq(paReq) {
        this.#paReq = paReq;
    }

    get acsURL() {
        return this.#acsURL;
    }

    set acsURL(acsURL) {
        this.#acsURL = acsURL;
    }

    get orderID() {
        return this.#orderID;
    }

    set orderID(orderID) {
        this.#orderID = orderID;
    }

    get refundedAmount() {
        return this.#refundedAmount;
    }

    set refundedAmount(refundedAmount) {
        this.#refundedAmount = refundedAmount;
    }

    get confirmedAmount() {
        return this.#confirmedAmount;
    }

    set confirmedAmount(confirmedAmount) {
        this.#confirmedAmount = confirmedAmount;
    }

    get respTimestamp() {
        return this.#respTimestamp;
    }

    set respTimestamp(respTimestamp) {
        this.#respTimestamp = respTimestamp;

    }

    toString(){
        return "Result: " + this.#result + " TransType: " + this.#transType + " TransactionID: " + this.#transactionID + " AuthorizationNumbrer: " + this.#authorizationNumber
                    + "\nAcquirerBin: " + this.#acquiererBin + " MerchantID: " + this.#merchantID + " TransactionStatus: " + this.#transactionStatus +
                    " TransactionResult: " + this.#transactionResult + "\nPanAlias: " + this.#panAlias + " PanAliasRev: " + this.#panAliasRev +
                    " PanAliasExpDate: " + this.#panAliasExpDate + " PanAliasTail: " + this.#panAliasTail + "\nPaReq: " + " AcsURL: " + this.#acsURL +
                    " OrderID: " + this.#orderID + " RefundedAmount: " + this.#refundedAmount + "\nConfirmedAmount: " + this.#confirmedAmount + " ResponseTimestamp: " +
                    this.#respTimestamp;

    }
    
}