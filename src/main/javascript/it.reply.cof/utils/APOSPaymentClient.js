const httpsUtil = require("https");
const requester = require('./RequestBuilder');

let AposPaymentClient = class APOSPaymentClient {
    constructor() {
        this.urlWebApi = "https://atpostest.ssb.it/atpos/apibo/apiBOXML.app";
    }

    //Vpos simple client
    simpleClient = (urlWebApi) => {
        this.urlWebApi = urlWebApi;
    }

    //VposClient w proxy
    proxyClient = (urlWebApi, proxyName, proxyPort) => {
        this.urlWebApi(urlWebApi);
        this.proxy = true;
        this.proxyName = proxyName;
        this.proxyPort = proxyPort;
    }

    //Vpos Client w SSL
    sslClient = (urlWebApi, ppp, keyStore, keyFile) => {
        this.urlWebApi = urlWebApi;
        this.ssl = true;
        this.ppp = ppp;
        this.keyStore = keyStore;
        this.keyFile = keyFile;
    }

    setProxy(proxyName, proxyPort) {
        this.proxy = true;
        this.proxyName = proxyName;
        this.proxyPort = proxyPort;

    }

    executeCall(BPWXMLRequest) {
        let inputXML = "data=";
        inputXML = parseRequest(BPWXMLRequest);

    }
}

let body = 'data=';
console.log("REQUEST BODY:\n" + body);

const options = {
    host: 'atpostest.ssb.it',
    path: '/atpos/apibo/apiBOXML.app',
    proxy: 'proxy-dr.reply.it:8080',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset': 'utf-8'
    },
    method: 'POST'
}

const req = httpsUtil.request(options, (res) => {
    res.setEncoding('utf8');
    console.log("\nSTATUS CODE: " + res.statusCode + "\n");
    var buffer = "";
    if (res.statusCode) {
        res.on('data', function (chunk) {
            buffer = chunk;
        });
        res.on('end', function (chunk) {
            console.log(buffer);
        })
    }
});


req.on('error', (e) => {
    console.log('problem with request: ' + e.message);
});

req.write(body);
req.end();

