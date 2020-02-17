const httpsUtil = require('https');
const xmlUtils = require('./XMLUtils');
const fs = require('fs');
const hostUrlFormatter = require('./HostUrlFormatter')

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
    let body = 'data=';

    setup.simpleClient(hostUrl);

    return setup.options;

};

aposProxyClientSetup = (hostUrl, proxyName, proxyPort) => {
    const setup = new AposPaymentClient();
    let body = 'data=';
    setup.proxyClient(hostUrl, proxyName, proxyPort);
    return setup.options;

};

aposSSLClientSetup = (hostUrl, pathKey, pathCert, setProxy = null, proxyName = null, proxyPort = null) => {
    const setup = new AposPaymentClient();
    let body = 'data=';

    setup.sslClient(hostUrl, pathKey, pathCert);

    if(setProxy && proxyName !== null && proxyPort !== null){
        setProxy(proxyName, proxyPort);
    }

    return setup.options;

};


aposCaller = function(options, body, encoder) {
    const req = httpsUtil.request(options, (res) => {
        res.setEncoding('utf8');
        let buffer = "";
        let result = "";

        if (res.statusCode) {
            res.on('data', function (chunk) {
                buffer = chunk;
            });
            res.on('end', function (chunk) {
                if(typeof buffer !== 'undefined' &&  buffer !== null) {
                    result = xmlUtils.fromXML(buffer);
                    verifyMacResponse(result, encoder);
                }else{
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

verifyMacResponse = (response, encoder) => {

    const NEUTRAL_MAC_VALUE = "NULL";
    let rezMAC = [response.Timestamp, response.Result]
    let responseMac = encoder.getMAC(rezMAC);

    if (!response.MAC === NEUTRAL_MAC_VALUE && !response.MAC === responseMac)
        throw new Error("Response MAC is not valid");
    if (!(!response.MAC === NEUTRAL_MAC_VALUE && !response.MAC === responseMac))
        console.log(response.MAC + " " + responseMac)

    if (response.Data !== null && typeof response.Data.Operation !== 'undefined') {
        let opMacData = [];
        Object.keys(response.Data.Operation).forEach((data)=>{
            opMacData.push(response.Data.Operation[data])
        })
        let operationMac = encoder.MAC(opMacData);
        if (!response.Data.Operation.Mac === NEUTRAL_MAC_VALUE && !response.Data.Operation.Mac === operationMac)
            throw new Error("Operation MAC is not valid");

    }

    if (response.Data !== null && typeof response.Data.Authorization !== 'undefined') {
        let authMacData = [];
        Object.keys(response.Data.Authorization).forEach((auth) => {
            if(typeof auth === 'string'){
                authMacData.push(response.Data.Authorization[auth]);
            }else if(typeof auth === 'object'){
                Object.keys(auth).forEach((data)=>{
                    authMacData.push(auth[data]);

                })
                let authorizationMac = encoder.getMAC(authMacData);
                authMacData = [];
                if (!auth.MAC === NEUTRAL_MAC_VALUE && !auth.MAC === authorizationMac)
                    throw new Error("Response MAC is not valid");
            }
        })

        if(authMacData.length) {
            let authorizationMac = encoder.getMAC(authMacData);
            if (!response.Data.Authorization.MAC === NEUTRAL_MAC_VALUE && !response.Data.Authorization.MAC === authorizationMac)
                throw new Error("Response MAC is not valid");

        }
    }
}


module.exports = {
    aposClientSetup: aposClientSetup,
    aposProxyClientSetup: aposProxyClientSetup,
    aposSSLClientSetup: aposSSLClientSetup,
    aposCaller : aposCaller

}


