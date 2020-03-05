const SHOP_ID = "129281292800109";
const PAN_ALIAS = "0000847379064699692";
const API_RESULT_KEY = "E-vmE-GHXmx73-Lfg24LztZ-7-yCyVsKn4QXphL5qzf-Kr-Cf-JWpZwZgaZRA5dR9V677xL4uCbc-Ce--8h2-tdrSu--QKjF-nZh";
const SECRET_KEY_MERCHANT = "fU-9et-s-Sj8W---E8uhUDu9fEzqr8hH3L95s48r9nq-cq3cBXbp-tZsvGQU--t-nqmtaW-7x-7-C2PdcuFdbHuShQ-pYVWnr-4-";
const URL_REDIRECT = "https://atpostest.ssb.it/atpos/pagamenti/main";
const URL_DONE = "http://localhost:8080/payment-gateway/vpos/tokenize";
const URL_BACK = "http://localhost:8080/payment-gateway/vpos/tokenize";
const URLMS = "https://te.t-frutta.eu/TImooneyWS/app_api/v10/payment/";
const URL_WEB_API = "https://atpostest.ssb.it/atpos/apibo/apiBOXML.app";
const customTemplatePath = ".\\resources\\template.html";
const base64temp = "PGh0bWw+Cgo8Ym9keT4KICAgIDxzdHlsZT4KICAgICAgICBib2R5IHsKICAgICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCdodHRwczovL2kuZ2lwaHkuY29tL21lZGlhLzNvRWpJNlNJSUhCZFJ4WEk0MC9naXBoeS53ZWJwJyk7CiAgICAgICAgICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7CiAgICAgICAgICAgIGJhY2tncm91bmQtYXR0YWNobWVudDogZml4ZWQ7CiAgICAgICAgICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjsKICAgICAgICB9CiAgICA8L3N0eWxlPgo8L2JvZHk+Cgo8L2h0bWw+";
const PaRes = "eNpVUttSwjAQ/RWGd5o2LaUyS2bQKlZbqAqjPIZ2sZ2hBZIUka834SKapz17NrtnLzAtBGL4hlkjkEGCUvJPbJX5oP3MomidNZJnDhJ4ucxdbbHpzpVQCtv5I3aDNLhK24Z7FDIcl0zx7ItCuQCdT6RFbxWDHi2vY3GzLuxA6ojzhAqFFHIbJvf0BOBNS8QjYcRWFrKngtUGnLVvuSTCQIw3ZuqmVGZuYAO5AGjEihVKbWSf6HJc5FKhteMSxa7MUFrYkCWqEixbpCICYeyFVx2hhL6vz7MmeLCAFX4eTRSHnsfd2z4dOzNPuPJkNgJgIyLlCRm1quvFbDu13/b7bA3L0A6MMEY1bdla5xnDxpQZXknD/fWBblRgnX2zm16g27sgwP1mXaP5BeTXhhxlxlyXOtRzaeD7ntfttTTKgwB5NrV3aPZSqb0mOPt2F/m6fzjIZ/aq3BycJW8mUwMHs6BphipR4qdZxTNQOAmBTkfALkfDvandTP1hYxwY=";
const OPERATOR_ID = "John Doe";
const PROXYNAME = "proxy-dr.reply.it";
const PROXYPORT = 8080;

const ClientConfig = require('./utils/ClientConfigurator');
const Client = require('./client/VPosClient');
const Requests = require('./request/Requests');

let config = ClientConfig.aposProxyClientSetup(SHOP_ID, "sha256",API_RESULT_KEY, SECRET_KEY_MERCHANT, URL_WEB_API, PROXYNAME, PROXYPORT);
let client = new Client(config);
let header = new Requests.Header(client.shopID, OPERATOR_ID);

let ThreeDSData = {
    "browserAcceptHeader": "1024",
    "browserIP": "1.12.123.255",
    "browserJavaEnabled": "true",
    "browserLanguage": "it",
    "browserColorDepth": "16",
    "browserScreenHeight": "100",
    "browserScreenWidth": "100",
    "browserTZ": "-60",
    "browserUserAgent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 firefox/47.0",
    "addrMatch": "n",
    "chAccChangeInd": "04",
    "chAccChange": "20190211",
    "chAccChangeInd": "03",
    "chAccDate": "20190210",
    "chAccPwChange": "20190214",
    "chAccPwChangeInd": "04",
    "nbPurchaseAccount": "1000",
    "txnActivityDay": "100",
    "txnActivityYear": "100",
    "shipAddressUsage": "20181220",
    "shipAddressUsageInd": "03",
    "shipNameIndicator": "01",
    "billAddrCity": "billaddrcity",
    "billAddrCountry": "004",
    "billAddrLine1": "billaddrline1",
    "billAddrLine2": "billaddrline2",
    "billAddrLine3": "billaddrline3",
    "billAddrPostCode": "billaddrpostcode",
    "billAddrState": "11",
    "homePhone": "39-321818198",
    "mobilePhone": "33-312",
    "shipAddrCity": "zio",
    "shipAddrCountry": "008",
    "shipAddrLine1": "shipaddrline1",
    "shipAddrLine2": "shipaddrline2",
    "shipAddrLine3": "shipaddrline3",
    "shipAddrPostCode": "shipaddrpostcode",
    "shipAddrState": "222",
    "workPhone": "39-0321818198",
    "deliveryEmailAddress": "a-b@example.com",
    "deliveryTimeframe": "02",
    "preOrderDate": "20181220",
    "preOrderPurchaseInd": "01",
    "reorderItemsInd": "02",
    "shipIndicator": "01"
}
/*
let ThreeDS2Step0 = new Requests.ThreeDSStep0(ThreeDSData, "345612350302121451563", "0000409500729966732", "111",
    "2112", "6600", "978", "2", "I", "98", "https://atpostest.ssb.it/atpos/apibo/en/3ds-notification.html",
    "fake@mail.it", "", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "",
    "")

client.threeDSAuthorize0(header, ThreeDS2Step0).then(console.log).catch(console.log)
*/

//client.injectHtmlTemplate(base64temp, '5000', customTemplatePath); ok

//console.log(client.tokenize(SHOP_ID, URL_BACK,URL_DONE, URLMS, URL_REDIRECT, client.encoder, API_RESULT_KEY)); ok


 let paymentReq = new Requests.PaymentInfo('10000','978', '13123865345124321', SHOP_ID,URL_BACK, URL_DONE, URLMS, 'D', 'I');
paymentReq.notCompulsoryFields = {'OPTIONS': 'GM'};

console.log(client.buildHTMLRedirectFragment(paymentReq, URL_REDIRECT, "", API_RESULT_KEY));



/*
let orderStatusReq = new Requests.StatusRequest('', '12345676912345649849');

client.getOrderStatus(header, orderStatusReq).then(console.log);


 */


/*
let url = "http://localhost:8080/payment-gateway/vpos/tokenize?ORDERID=102345331127444321&SHOPID=129281292800104&AUTHNUMBER=595865&AMOUNT=10000&CURRENCY=978&TRANSACTIONID=8032112928SL11qhnjpkgpdz4&ACCOUNTINGMODE=I&AUTHORMODE=I&RESULT=00&TRANSACTIONTYPE=TT01&PANALIASREV=&PANALIAS=0000024376231761231&PANALIASEXPDATE=2112&PANALIASTAIL=0027&MASKEDPAN=459825xxxxxx0027&PANTAIL=0027&PANEXPIRYDATE=2112&NETWORK=01&MAC=31d8ad560d8720f38fe86ebb29f660b68121630f2c401db1fe2fd53bf12486b8"
console.log(client.verifyMACREDIRECT(url))


 */

/*
let dataItem = new Requests.CaptureRequest("8032112928SL2596myzk06sb4", "12345676912345649849", "10000",
                "978", "2") ;
client.capture(header, dataItem).then(console.log)
 */



/*
let dataItem = new Requests.GeneralRequest("8032112928SL11hr54ke2ygo4", "131238654324321", "10", "978"
                    ,"2")
client.refund(header, dataItem).then((obj)=>console.log(obj.Data.Operation.Authorization))
*/