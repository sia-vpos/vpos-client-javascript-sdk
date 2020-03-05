const fs = require('fs');
const hostUrlFormatter = require('./HostUrlFormatter');

let ClientConfigurator = class APOSPaymentClient {

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

    proxyClient = (urlWebApi, proxyName, proxyPort, proxyUsername = null, proxyPassword = null) => {
        this.options.host = hostUrlFormatter(urlWebApi).host;
        this.options.path = hostUrlFormatter(urlWebApi).path;
        this.options.proxy = proxyName + ':' + proxyPort;
        if(proxyUsername && proxyPassword){
            let auth = 'Basic ' + new Buffer( proxyUsername+ ":" + proxyPassword).toString('base64');
            this.options.headers['Proxy-Authorization']  = auth;
        }
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

aposClientSetup = (shopID, algorithm, secretKey, merchantKey, hostUrl) => {
    const setup = new ClientConfigurator();
    setup.simpleClient(hostUrl);
    let setter = {
        "shopID": shopID,
        "algorithm": algorithm,
        "secretKey": secretKey,
        "merchantKey": merchantKey
    }

    return {
        "setter": setter,
        "options": setup.options
    };

};

aposProxyClientSetup = (shopID, algorithm, secretKey, merchantKey, hostUrl, proxyName, proxyPort) => {
    const setup = new ClientConfigurator();
    setup.proxyClient(hostUrl, proxyName, proxyPort);
    let setter = {
        "shopID": shopID,
        "algorithm": algorithm,
        "secretKey": secretKey,
        "merchantKey": merchantKey
    }
    return setup.options;

};

aposSSLClientSetup = (shopID, algorithm, secretKey, merchantKey, hostUrl, pathKey, pathCert, setProxy = null, proxyName = null, proxyPort = null) => {
    const setup = new ClientConfigurator();

    setup.sslClient(hostUrl, pathKey, pathCert);

    let setter = {
        "shopID": shopID,
        "algorithm": algorithm,
        "secretKey": secretKey,
        "merchantKey": merchantKey
    }

    if (setProxy && proxyName !== null && proxyPort !== null) {
        setProxy(proxyName, proxyPort);
    }

    return setup.options;

};


module.exports = {
    aposClientSetup: aposClientSetup,
    aposProxyClientSetup: aposProxyClientSetup,
    aposSSLClientSetup: aposSSLClientSetup,
    setProxy: setProxy
}


