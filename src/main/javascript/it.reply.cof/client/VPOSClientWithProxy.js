const paymentClient = require('../utils/APOSPaymentClient').aposProxyClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const setProxy = require('../utils/APOSPaymentClient').setProxy;

class VPOSClientWithProxy{

    proxyClient = function (urlAPI, proxyName, proxyPort, myRequest) {

        let option = paymentClient(urlAPI,proxyName, proxyPort);
        let body = 'data=';

        if (myRequest && typeof(myRequest) === "function") {

            body += myRequest;
            return aposCaller(options, body);
        }

    }
}