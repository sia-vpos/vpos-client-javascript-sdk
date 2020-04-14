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
        if (proxyUsername && proxyPassword) {
            let auth = 'Basic ' + new Buffer(proxyUsername + ":" + proxyPassword).toString('base64');
            this.options.headers['Proxy-Authorization'] = auth;
        }
    }

    sslClient = (urlWebApi, key, cert) => {
        this.options.host = hostUrlFormatter(urlWebApi).host;
        this.options.path = hostUrlFormatter(urlWebApi).path;
        this.options.key = key;
        this.options.cert = cert;

    }

}

setProxy = (configurator, proxyName, proxyPort, proxyUsername = null, proxyPassword = null) => {
    configurator.options.proxy = proxyName + ':' + proxyPort;
    if (proxyUsername && proxyPassword) {
        let auth = 'Basic ' + new Buffer(proxyUsername + ":" + proxyPassword).toString('base64');
        configurator.options.headers['Proxy-Authorization'] = auth;
    }
}

aposClientSetup = (shopID, redirectUrl, algorithm, apiKey, merchantKey, hostUrl, timeout = null) => {
    const setup = new ClientConfigurator();
    setup.simpleClient(hostUrl);
    let setter = {
        "shopID": shopID,
        "algorithm": algorithm,
        "apiKey": apiKey,
        "merchantKey": merchantKey,
        "redirectUrl" : redirectUrl
    }
    if(timeout && typeof timeout === 'number'){
        setup.options[timeout] = timeout;
    }

    return {
        "setter": setter,
        "options": setup.options
    };

};

aposProxyClientSetup = (shopID, redirectUrl, algorithm, apiKey, merchantKey, hostUrl, proxyName, proxyPort, proxyUsername = null, proxyPassword = null, timeout = null) => {
    const setup = new ClientConfigurator();
    setup.proxyClient(hostUrl, proxyName, proxyPort, proxyUsername, proxyPassword);
    let setter = {
        "shopID": shopID,
        "algorithm": algorithm,
        "apiKey": apiKey,
        "merchantKey": merchantKey,
        "redirectUrl" : redirectUrl

    }

    if(timeout && typeof timeout === 'number'){
        setup.options[timeout] = timeout;
    }

    return {
        "setter": setter,
        "options": setup.options
    };
};

aposSSLClientSetup = (shopID, redirectUrl, algorithm, apiKey, merchantKey, hostUrl, pathKey, pathCert, setProxy = null, proxyName = null, proxyPort = null, proxyUsername = null, proxyPassword = null, timeout = null) => {
    const setup = new ClientConfigurator();

    setup.sslClient(hostUrl, pathKey, pathCert);

    let setter = {
        "shopID": shopID,
        "algorithm": algorithm,
        "apiKey": apiKey,
        "merchantKey": merchantKey,
        "redirectUrl" : redirectUrl
    }

    if (setProxy && proxyName && proxyPort) {
        setProxy(setup, proxyName, proxyPort, proxyUsername, proxyPassword);
    }

    if(timeout && typeof timeout === 'number'){
        setup.options[timeout] = timeout;
    }

    return setup.options;

};


module.exports = {
    aposClientSetup: aposClientSetup,
    aposProxyClientSetup: aposProxyClientSetup,
    aposSSLClientSetup: aposSSLClientSetup,
    setProxy: setProxy
}


