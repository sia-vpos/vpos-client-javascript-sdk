const paymentClient = require('../utils/APOSPaymentClient').aposSSLClientSetup;
const RequestBuilder = require('../utils/RequestBuilder');
const VPOSClientStandard = require('./VPOSClientStandard');

class VPOSClientSSL extends VPOSClientStandard {

    encoder;
    options;
    requester = new RequestBuilder();


    constructor(algorithm, secretKey, urlAPI, pathKey, pathCert) {
        super(urlAPI, algorithm, secretKey);
        this.options = paymentClient(urlAPI, pathKey, pathCert)

    }


}

