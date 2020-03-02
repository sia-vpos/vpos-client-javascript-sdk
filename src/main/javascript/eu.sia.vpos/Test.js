const SHOP_ID = "129286666666667";
const PAN_ALIAS = "0000847379064699692";
const API_RESULT_KEY = "qJS-dSZx7DG-dyetrvTyS-a4CGLkBkCxY-n-SuCb-sdUbhgv5Ghea7tuXap-m4cC-RM-q-a8JGRPA-zV-dSLwnpGs4VkkrNU-Jqz";
const SECRET_KEY_MERCHANT = "dnC8ybnbPaBSNYHsN5vq-pcaf5QXV2YHpFStxjGfY3wftC-7-PZkL5dbhP--em-DV24-YeCKMKr-ENZ-nE3JHMvqeyYDKJ3wK8b2";
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

let options = ClientConfig.aposProxyClientSetup(URL_WEB_API, PROXYNAME, PROXYPORT);
let client = new Client(SHOP_ID, 'sha256', API_RESULT_KEY, SECRET_KEY_MERCHANT,options);
let header = new Requests.Header(client.shopID, OPERATOR_ID);

let ThreeDSData = {"browserAcceptHeader":"1024","browserIP":"1.12.123.255","browserJavaEnabled":"true","browserLanguage":"IT","browserColorDepth":"16","browserScreenHeight":"100","browserScreenWidth":"100","browserTZ":"-120","browserUserAgent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 firefox/47.0"};
let ThreeDS2Step0 = new Requests.ThreeDSStep0(ThreeDSData, "345620200302121451563", "0000409500729966732", "111",
                                                "2112", "6600", "978", "2", "I", "98", "https://atpostest.ssb.it/atpos/apibo/en/3ds-notification.html",
                                                     "fake@mail.it", "", "", "", "", "", "", "",
                                                    "", "", "", "", "", "", "", "",
                                                       "")
client.threeDSAuthorize0(header, ThreeDS2Step0).then(console.log).catch(console.log)

//client.injectHtmlTemplate(base64temp, '5000', customTemplatePath); ok

//console.log(client.tokenize(SHOP_ID, URL_BACK,URL_DONE, URLMS, URL_REDIRECT, client.encoder, API_RESULT_KEY)); ok

/* let paymentReq = new Requests.PaymentInfo('10000','978', '102345331127444321', SHOP_ID,URL_BACK, URL_DONE, URLMS, 'I', 'I');
paymentReq.notCompulsoryFields = {'OPTIONS': 'GM'};

console.log(client.getHtmlPaymentDocument(paymentReq, URL_REDIRECT, "",null, client.encoder, API_RESULT_KEY)) ok

 */
/*
let auth3dsStep1 = new Requests.Auth3DSStep1(false, '33214224384476', '0000409500729966732','111', '2112', '220000',
        '978', '2', 'D', '98', 'http://jnfjdshjfhjd.it',
            'fake@mail.it', '', '', '', '', '', '', '',
            '', '', '', '', '', 'N');

client.start3dsAuth(header, auth3dsStep1);


 */

/*
let auth3DSStep2 = new Requests.Auth3DSStep2('20200226460652087670648325818183', PaRes);



client.start3DSAuthStep2(header, auth3DSStep2);
*/

/*

let confirmReq = new Requests.GeneralRequest('8032112928AT2vhlw7ark1ac4', '33214224384476', '10000', '978', '2');
console.log(client.confirmTransaction(header, confirmReq));
*/

/*
 let verifyReq = new Requests.StatusRequest('20200226254460307767601200335882', '33214224384476');

let result = client.verifyRequest(header, verifyReq).then(console.log).catch(console.log);
*/

/*let refundReq = new Requests.GeneralRequest('8032112928AT21d7xhj4w31r4', '34524328664682324', '20', '978', '2')

client.refundPayment(header, refundReq);  */

/*
let orderStatusReq = new Requests.StatusRequest('20200226048647404218723060008016', '34524328664682324');

client.getOrderStatus(header, orderStatusReq).then(console.log);
*/

/*
let url = "http://localhost:8080/payment-gateway/vpos/tokenize?ORDERID=102345331127444321&SHOPID=129281292800109&AUTHNUMBER=714509&AMOUNT=10000&CURRENCY=978&TRANSACTIONID=8032112928SL11h15g9igcwr4&ACCOUNTINGMODE=I&AUTHORMODE=I&RESULT=00&TRANSACTIONTYPE=TT09&PANALIASREV=&PANALIAS=0000284414795379578&PANALIASEXPDATE=2112&PANALIASTAIL=0031&MASKEDPAN=525590xxxxxx0031&PANTAIL=0031&PANEXPIRYDATE=2112&NETWORK=02&MAC=53b942bae89d9712468354a14fed02f93cea9312fd8cdd16ceb225db5968666a";
client.verifyURL(url)
 */
