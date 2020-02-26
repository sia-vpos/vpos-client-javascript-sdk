const httpsUtil = require('https');
const xmlUtils = require('./XMLUtils');
const fs = require('fs');
const hostUrlFormatter = require('./HostUrlFormatter');

const AuthorizationList =
    [
        'AuthorizationType',
        'TransactionID',
        'Network',
        'OrderID',
        'OrderId',
        'TransactionAmount',
        'AuthorizedAmount',
        'Currency',
        'AccountedAmount',
        'RefundedAmount',
        'TransactionResult',
        'Timestamp',
        'AuthorizationNumber',
        'AcquirerBIN',
        'MerchantID',
        'TransactionStatus',
        'ResponseCodeISO',
        'PanTail',
        'PanExpiryDate',
        'PaymentTypePP',
        'RRN',
        'CardType'
    ];

const OperationsList =
    [
        'TransactionID',
        'TimestampReq',
        'TimestampElab',
        'SrcType',
        'Amount',
        'Result',
        'Status',
        'OpDescr'
    ];

let AposPaymentClient = class APOSPaymentClient {


    options = {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'charset': 'utf-8'
        },
        method: 'POST'

    }


    simpleClient = (urlWebApi) => {
        this.options.host = hostUrlFormatter(urlWebApi).host;
        this.options.path = hostUrlFormatter(urlWebApi).path;
    }

    proxyClient = (urlWebApi, proxyName, proxyPort) => {
        this.options.host = hostUrlFormatter(urlWebApi).host;
        this.options.path = hostUrlFormatter(urlWebApi).path;
        this.options.proxy = proxyName + ':' + proxyPort;
    }

    sslClient = (urlWebApi, pathKey, pathCert) => {
        this.options.host = hostUrlFormatter(urlWebApi).host;
        this.options.path = hostUrlFormatter(urlWebApi).path;
        this.options.key = fs.readFileSync(pathKey);
        this.options.cert = fs.readFileSync(pathCert);

    }


}


setProxy = (proxyName, proxyPort) => {
    this.options.proxy = proxyName + ':' + proxyPort;

}

aposClientSetup = (hostUrl) => {
    const setup = new AposPaymentClient();
    setup.simpleClient(hostUrl);

    return setup.options;

};

aposProxyClientSetup = (hostUrl, proxyName, proxyPort) => {
    const setup = new AposPaymentClient();
    setup.proxyClient(hostUrl, proxyName, proxyPort);
    return setup.options;

};

aposSSLClientSetup = (hostUrl, pathKey, pathCert, setProxy = null, proxyName = null, proxyPort = null) => {
    const setup = new AposPaymentClient();

    setup.sslClient(hostUrl, pathKey, pathCert);

    if (setProxy && proxyName !== null && proxyPort !== null) {
        setProxy(proxyName, proxyPort);
    }

    return setup.options;

};

verifyMacResponse = (response, encoder) => {

    const NEUTRAL_MAC_VALUE = "NULL";
    let rezMAC = [response.Timestamp, response.Result]
    let responseMac = encoder.getMAC(rezMAC);

    if (response.MAC !== NEUTRAL_MAC_VALUE && response.MAC !== responseMac)
        throw new Error("Response MAC is not valid");


    if (response.Data !== null && typeof response.Data.Operation !== 'undefined') {
        let opMacData = [];
        Object.keys(response.Data.Operation).forEach((data) => {
            opMacData.push(response.Data.Operation[data])
        })
        let operationMac = encoder.getMAC(opMacData);
        if (response.Data.Operation.Mac !== NEUTRAL_MAC_VALUE && !response.Data.Operation.Mac === operationMac)
            throw new Error("Operation MAC is not valid");

    }

    if (response.Data !== null && typeof response.Data.Authorization !== 'undefined') {
        let authMacData = [];
        Object.keys(response.Data.Authorization).forEach((auth) => {
            if (typeof auth === 'string') {
                if (AuthorizationList.includes(auth))
                    authMacData.push(response.Data.Authorization[auth]);
            } else if (typeof auth === 'object') {
                Object.keys(auth).forEach((data) => {
                    if (AuthorizationList.includes(data))
                        authMacData.push(auth[data]);

                })
                let authorizationMac = encoder.getMAC(authMacData);
                authMacData = [];
                if (data.MAC !== NEUTRAL_MAC_VALUE && data.MAC !== authorizationMac)
                    throw new Error("Authorization MAC is not valid");
            }
        })

        if (authMacData.length) {
            let authorizationMac = encoder.getMAC(authMacData);
            if (response.Data.Authorization.MAC !== NEUTRAL_MAC_VALUE && response.Data.Authorization.MAC !== authorizationMac)
                throw new Error("Authorization MAC is not valid");

        }
    }
}


aposCaller = function (options, body, encoder) {
    console.log(body);
    const req = httpsUtil.request(options, (res) => {
        res.setEncoding('utf8');
        let buffer = "";
        let result = "";

        if (res.statusCode) {
            res.on('data', function (chunk) {
                buffer = chunk;
            });
            res.on('end', function (chunk) {
                if (typeof buffer !== 'undefined' && buffer !== null) {
                    result = xmlUtils.fromXML(buffer);
                    verifyMacResponse(result, encoder);
                    console.log(buffer);
                } else {
                    throw new Error("Bad Request");
                }
            })
        }
    });


    req.on('error', (e) => {
        console.log('problem with request: ' + e.message);
    });

    req.write(body);
    req.end();

}


module.exports = {
    aposClientSetup: aposClientSetup,
    aposProxyClientSetup: aposProxyClientSetup,
    aposSSLClientSetup: aposSSLClientSetup,
    aposCaller: aposCaller

}


