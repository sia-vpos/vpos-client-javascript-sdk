const paymentClient = require('../utils/APOSPaymentClient').aposSSLClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const request = require('../utils/RequestBuilder');


class VPOSClientSSL{

    sslClient = function(urlAPI, pathKey, pathCert, myRequest){

        let options = paymentClient(urlAPI, pathKey, pathCert)
        let body = 'data='

        if (myRequest && typeof(myRequest) === "function") {

            body += myRequest;
            return aposCaller(options, body);
        }

    }

    getHtmlPaymentDocument = request.getHtmlPaymentDocument;

    injectHtmlTemplate = request.injectHtmlTemplate;

}