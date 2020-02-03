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

const body = 'data=<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<BPWXmlRequest>' +
    '<Release>02</Release>' +
    '<Request>' +
    '<Operation>VERIFY</Operation>' +
    '<Timestamp>2020-02-03T10:45:10.284</Timestamp>' +
    '<MAC>2868343ee5542beb37e10499ff397cb3359f46053f1da38ccdf9d9dc922efa44</MAC>' +
    '</Request>' +
    '<Data>' +
    '<VerifyRequest>' +
    '<Header>' +
    '<ShopID>129281292800109</ShopID>' +
    '<OperatorID>Giammaicol</OperatorID>' +
    '<ReqRefNum>20200203348292671587284472685941</ReqRefNum>' +
    '</Header>' +
    '<OriginalReqRefNum>20200121747989345505071695860709</OriginalReqRefNum>' +
    '</VerifyRequest>' +
    '</Data>' +
    '</BPWXmlRequest>';

const options = {
    host: 'atpostest.ssb.it',
    path: '/atpos/apibo/apiBOXML.app',
    proxy: 'proxy-dr.reply.it:8080',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'charset' : 'utf-8'
    },
    method: 'POST'
}

const req = httpsUtil.request(options, (res) => {
    res.setEncoding('utf8');
    console.log("STATUS CODE: " + res.statusCode);
    var buffer = "";
    if(res.statusCode) {
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

