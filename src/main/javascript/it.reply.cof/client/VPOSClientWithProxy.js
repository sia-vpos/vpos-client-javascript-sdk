const paymentClient = require('../utils/APOSPaymentClient').aposProxyClientSetup;
const VPOSClientStandard = require('./VPOSClientStandard');

class VPOSClientWithProxy extends VPOSClientStandard {

    constructor(urlAPI, algorithm, secretKey, proxyName, proxyPort) {
        super(urlAPI, algorithm, secretKey);
        this.options = paymentClient(urlAPI, proxyName, proxyPort);
    }


}
