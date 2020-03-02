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
    const setup = new ClientConfigurator();
    setup.simpleClient(hostUrl);

    return setup.options;

};

aposProxyClientSetup = (hostUrl, proxyName, proxyPort) => {
    const setup = new ClientConfigurator();
    setup.proxyClient(hostUrl, proxyName, proxyPort);
    return setup.options;

};

aposSSLClientSetup = (hostUrl, pathKey, pathCert, setProxy = null, proxyName = null, proxyPort = null) => {
    const setup = new ClientConfigurator();

    setup.sslClient(hostUrl, pathKey, pathCert);

    if (setProxy && proxyName !== null && proxyPort !== null) {
        setProxy(proxyName, proxyPort);
    }

    return setup.options;

};



module.exports = {
    aposClientSetup: aposClientSetup,
    aposProxyClientSetup: aposProxyClientSetup,
    aposSSLClientSetup: aposSSLClientSetup,
    setProxy : setProxy
}


