const paymentClient = require('../utils/APOSPaymentClient').aposClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const RequestBuilder = require('../utils/RequestBuilder');
const Encoder = require('../utils/Encoder');

class VPOSClientStandard {

    encoder;
    options = {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'charset': 'utf-8'
        },
        method: 'POST'

    };
    requester = new RequestBuilder();

    constructor(urlAPI, algorithm, secretKey) {
        this.encoder = new Encoder(algorithm, secretKey);
        this.options = paymentClient(urlAPI);

    }


    start3dsAuth = (headerItem, dataItem, data3DSObject) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DSStep1Request(headerItem, dataItem, data3DSObject, this.encoder));
        aposCaller(options, body, this.encoder);

    }

    start3DSAuthStep2 = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.build3DSStep2AuthRequest(headerItem, dataItem, this.encoder));
        aposCaller(options, body, this.encoder);

    }

    confirmTransaction = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildConfirmRequest(headerItem, dataItem, this.encoder));
        aposCaller(options, body, this.encoder);

    }

    refundPayment = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildRefundRequest(headerItem, dataItem, this.encoder));
        aposCaller(options, body, this.encoder);

    }

    verifyRequest = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildVerifyRequest(headerItem, dataItem, this.encoder));
        aposCaller(options, body, this.encoder);

    }

    getOrderStatus = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildOrderStatusRequest(headerItem, dataItem, this.encoder));
        aposCaller(options, body, this.encoder);

    }


}

module.exports = VPOSClientStandard;