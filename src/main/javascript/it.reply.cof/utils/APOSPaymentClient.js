const httpsUtil = require('https');
const requester = require('./RequestBuilder');
const xmlUtils = require('./XMLUtils');
const fs = require('fs');
const hostUrlFormatter = require('./HostUrlFormatter')

let AposPaymentClient = class APOSPaymentClient {

    simpleClient = (urlWebApi) => {
        options.host = hostUrlFormatter(urlWebApi).host;
        options.path = hostUrlFormatter(urlWebApi).path;
    }

    proxyClient = (urlWebApi, proxyName, proxyPort) => {
        options.host = hostUrlFormatter(urlWebApi).host;
        options.path = hostUrlFormatter(urlWebApi).path;
        options.proxy = proxyName + ':' + proxyPort;
    }

    sslClient = (urlWebApi, pathKey, pathCert) => {
        options.host = hostUrlFormatter(urlWebApi).host;
        options.path = hostUrlFormatter(urlWebApi).path;
        options.key = fs.readFileSync(pathKey);
        options.cert = fs.readFileSync(pathCert);

    }


}

let body = 'data=';


setProxy = (proxyName, proxyPort) => {
    options.proxy = proxyName + ':' + proxyPort;

}


aposCaller = function(options, body) {

    const req = httpsUtil.request(options, (res) => {
        res.setEncoding('utf8');
        let buffer = "";
        let result = "";

        if (res.statusCode) {
            res.on('data', function (chunk) {
                buffer = chunk;
            });
            res.on('end', function (chunk) {
               result = xmlUtils.fromXML(buffer);
                return result;

            })
        }
    });


    req.on('error', (e) => {
        console.log('problem with request: ' + e.message);
    });

    req.write(body);
    req.end();

}

aposClientSetup = (hostUrl) => {
    const setup = new AposPaymentClient();
    let body = 'data=';
    const options = {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'charset': 'utf-8'
        },
        method: 'POST'

    }
    setup.simpleClient(hostUrl);

    return options;

};

aposProxyClientSetup = (hostUrl, proxyName, proxyPort) => {
    const setup = new AposPaymentClient();
    let body = 'data=';
    const options = {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'charset': 'utf-8'
        },
        method: 'POST'

    }

    setup.proxyClient(hostUrl, proxyName, proxyPort);

    return options;

};

aposSSLClientSetup = (hostUrl, pathKey, pathCert, setProxy = null, proxyName = null, proxyPort = null) => {
    const setup = new AposPaymentClient();
    let body = 'data=';
    const options = {

        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'charset': 'utf-8'
        },
        method: 'POST'

    }

    setup.sslClient(hostUrl, pathKey, pathCert);

    if(setProxy && proxyName !== null && proxyPort !== null){
        setProxy(proxyName, proxyPort);
    }

    return options;

};




