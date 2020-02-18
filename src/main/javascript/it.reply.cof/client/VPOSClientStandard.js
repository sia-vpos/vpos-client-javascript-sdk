const paymentClient = require('../utils/APOSPaymentClient').aposClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const RequestBuilder = require('../utils/RequestBuilder');
const COFException = require('../utils/COFException');

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
        try {
            let options = this.options;
            let body = 'data=';
            body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DSStep1Request(headerItem, dataItem, data3DSObject, this.encoder));
            aposCaller(options, body, this.encoder);
        } catch(e){
            throw new COFException(e.message);
        }

    }

    start3DSAuthStep2 = (headerItem, dataItem) => {
        try {
            let options = this.options;
            let body = 'data=';
            body += this.requester.buildBPWXmlRequest(this.requester.build3DSStep2AuthRequest(headerItem, dataItem, this.encoder));
            aposCaller(options, body, this.encoder);
        } catch(e){
            throw new COFException(e.message);
        }
    }

    confirmTransaction = (headerItem, dataItem) => {
        try {
            let options = this.options;
            let body = 'data=';
            body += this.requester.buildBPWXmlRequest(this.requester.buildConfirmRequest(headerItem, dataItem, this.encoder));
            aposCaller(options, body, this.encoder);
        }catch(e){
            throw new COFException(e.message);
        }

    }

    refundPayment = (headerItem, dataItem) => {
        try {
            let options = this.options;
            let body = 'data=';
            body += this.requester.buildBPWXmlRequest(this.requester.buildRefundRequest(headerItem, dataItem, this.encoder));
            aposCaller(options, body, this.encoder);
        }catch(e){
            throw new COFException(e.message);
        }

    }

    verifyRequest = (headerItem, dataItem) => {
        try {
            let options = this.options;
            let body = 'data=';
            body += this.requester.buildBPWXmlRequest(this.requester.buildVerifyRequest(headerItem, dataItem, this.encoder));
            aposCaller(options, body, this.encoder);
        }catch(e){
            throw new COFException(e.message);
        }

    }

    getOrderStatus = (headerItem, dataItem) => {
        try {
            let options = this.options;
            let body = 'data=';
            body += this.requester.buildBPWXmlRequest(this.requester.buildOrderStatusRequest(headerItem, dataItem, this.encoder));
            aposCaller(options, body, this.encoder);
        }catch(e){
            throw new COFException(e.message);
        }

    }


}

module.exports = VPOSClientStandard;