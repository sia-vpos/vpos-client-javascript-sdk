const httpsUtil = require("https");

let AposPaymentClient = class APOSPaymentClient{
   constructor() {
        this.urlWebApi = "https://atpostest.ssb.it/atpos/apibo/apiBOXML.app";
    }

    //Vpos simple client
  /*  constructor(urlWebApi) {
        this.urlWebApi = urlWebApi;
    }

    //VposClient w proxy
    constructor(urlWebApi, proxyName, port) {
        this.urlWebApi(urlWebApi);
        this.proxy = true;
        this.proxyName = proxyName;
        this.proxyPort = port;
    }

    //Vpos Client w SSL
    constructor(urlWebApi, ppp, keyStore, keyFile) {
        this.urlWebApi = urlWebApi;
        this.ssl = true;
        this.ppp = ppp;
        this.keyStore = keyStore;
        this.keyFile = keyFile;
    } */

    setProxy(proxyName, proxyPort){
        this.proxy = true;
        this.proxyName = proxyName;
        this.proxyPort = proxyPort;

    }

    executeCall(BPWXMLRequest){
        let inputXML = "data=";
        inputXML = parseRequest(BPWXMLRequest);

    }
}

const options = {
    host: 'atpostest.ssb.it',
    port: 8080,
    path:'/atpos/apibo/apiBO.app',
    method: 'POST'
}
let req = httpsUtil.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('BODY: ' + chunk);
    });
});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write("props");
req.end();

