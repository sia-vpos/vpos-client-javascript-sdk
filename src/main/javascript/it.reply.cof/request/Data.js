class Data{

    auth3DSStep1Request;
    auth3DSStep2Request;
    authorization = [];
    operation;
    panAliasData;
    orderStatusRequest; //StatusRequest;
    verifyRequest; //StatusRequest
    refundRequest; 
    verifyResponse;
    confirmRequest;
    vbvRedirect;

    get auth3DSStep1Request() {
        return this.auth3DSStep1Request;
    }

    set auth3DSStep1Request(Auth3DSStep1Request) {
        this.auth3DSStep1Request = Auth3DSStep1Request();
    }

    get auth3DSStep2Request() {
        return this.auth3DSStep2Request;
    }

    set auth3DSStep2Request(Auth3DSStep2Request) {
        this.auth3DSStep2Request = Auth3DSStep2Request;
    }

    get authorization() {
        return this.authorization;
    }

    set authorization(authorization) {
        this.authorization.push(authorization);
    }

    get operation() {
        return this.operation;
    }

    set operation(Operation) {
        this.operation = Operation;
    }

    get panAliasData() {
        return this.panAliasData;
    }

    set panAliasData(PanAliasData) {
        this.panAliasData = PanAliasData;
    }

    get orderStatusRequest() {
        return this.orderStatusRequest;
    }

    set orderStatusRequest(OrderStatusRequest) {
        this.orderStatusRequest = OrderStatusRequest;
    }

    get verifyRequest() {
        return this.verifyRequest;
    }

    set verifyRequest(VerifyRequest) {
        this.verifyRequest = VerifyRequest;
    }

    get refundRequest() {
        return this.refundRequest;
    }

    set refundRequest(RefundRequest) {
        this.refundRequest = RefundRequest;
    }

    get verifyResponse() {
        return this.verifyResponse;
    }

    set verifyResponse(VerifyResponse) {
        this.verifyResponse = VerifyResponse;
    }

    get confirmRequest() {
        return this.confirmRequest;
    }

    set confirmRequest(ConfirmRequest) {
        this.confirmRequest = ConfirmRequest;
    }

    get vbvRedirect() {
        return this.vbvRedirect;
    }

    set vbvRedirect(VbvRedirect) {
        this.vbvRedirect = value;
    }




    toString(){
        return "Auth3DSStep1Request: " + this.auth3DSStep1Request.toString() + "\n" + "Auth3DSStep2Request: " + this.auth3DSStep2Request.toString() + "\n" + "Authorization: " +
            this.authorization.forEach(() => toString()) + "\n" + "Operation: " + this.operation.toString() + "PanAliasData: " + this.panAliasData.toString() + "\n" +
            "OrderStatusRequest: " + this.orderStatusRequest.toString() + "\n" + "VerifyRequest: "  + this.verifyRequest.toString() + "\n" + "RefundRequest: " + this.refundRequest.toString() +
           "\n" + "VerifyResponse: " + this.verifyResponse.toString() + "\n" + "DeferredRequest: " + this.confirmRequest.toString() + "\n" + "VBVRedirect: " + this.vbvRedirect.toString();

    }



}

module.exports = Data;