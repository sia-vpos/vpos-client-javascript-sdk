const paymentClient = require('../utils/APOSPaymentClient').aposSSLClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const RequestBuilder = require('../utils/RequestBuilder');
const Encoder = require('../utils/Encoder');
const VPOSClientStandard = require ('./VPOSClientStandard');



class VPOSClientSSL extends  VPOSClientStandard{

    encoder;
    options;
    requester = new RequestBuilder();


    constructor(algorithm, secretKey, urlAPI, pathKey, pathCert) {
        super(urlAPI,algorithm, secretKey);
        this.options = paymentClient(urlAPI, pathKey, pathCert)

    }

    sslClient = function(){



    }

    verifyURL = (valueList, receivedMac, encoder) => {
        let calculatedMac = this.encoder.getMAC(valueList);

        if (calculatedMac !== receivedMac) {
            throw new Error("Mac doesn't match")
        }

    }

    start3dsAuth = () => {

        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DSStep1Request(x, y, z));
        let response = fromXML(aposCaller(this.options, body));

        //TODO fun fun fun


    }

    start3DSAuthStep2 = () => {

        let body = 'data=';

    }

    confirmTransaction = () => {

        let body = 'data=';

    }

    refundPayment = () => {

        let body = 'data=';

    }

    verifyRequest = () => {

        let body = 'data=';

    }

    getOrderStatus = () => {

        let body = 'data=';

    }

    verifyMacResponse = (response) => {

        const NEUTRAL_MAC_VALUE = "NULL";

        let responseMac = this.encoder.getMAC([response.Timestamp, response.Result]);

        if (!response.MAC === NEUTRAL_MAC_VALUE && !response.MAC === responseMac)
            throw new Error("Response MAC is not valid");


        if (response.Data !== null && response.Data.Operation !== null) {

            let opMacData = [];
            let operationMac = this.encoder.MAC(opMacData);
            if (!response.Data.Operation.Mac === NEUTRAL_MAC_VALUE && !response.Data.Operation.Mac === operationMac)
                throw new Error("Operation MAC is not valid");

        }

        if (response.Data !== null && response.Data.Authorization !== null) {
            Object.keys(response.Data.Authorizaion).forEach((auth) => {

                let authMacData = [];
                let authorizationMac = this.encoder.getMAC(authMacData);
                if (!auth.MAC === NEUTRAL_MAC_VALUE && !auth.MAC === authorizationMac)
                    throw new Error("Response MAC is not valid");

            })
        }

    }

}

