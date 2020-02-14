const paymentClient = require('../utils/APOSPaymentClient').aposClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const setProxy = require('../utils/APOSPaymentClient').setProxy;
const request = require('../utils/RequestBuilder')

class VPOSClientStandard {

    client = function(urlAPI, myRequest){

       let options = paymentClient(urlAPI);
       let body = "data=";

        if (myRequest && typeof(myRequest) === "function") {

            body += myRequest;
            return aposCaller(options, body);

        }



    }

    proxyClient = function(urlAPI, proxyName, proxyPort, myRequest){

        let options = paymentClient(urlAPI)
        setProxy(options, proxyName, proxyPort);
        let body = "data=";

        if (myRequest && typeof(myRequest) === "function") {

            body += myRequest();
        }


        return aposCaller(options, body);

    }

    getHtmlPaymentDocument = request.getHtmlPaymentDocument;

    injectHtmlTemplate = request.injectHtmlTemplate;

}

