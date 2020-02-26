const SHOP_ID = "129281292800109";
const PAN_ALIAS = "0000847379064699692";
const MAC_KEY_VPOS = "fU-9et-s-Sj8W---E8uhUDu9fEzqr8hH3L95s48r9nq-cq3cBXbp-tZsvGQU--t-nqmtaW-7x-7-C2PdcuFdbHuShQ-pYVWnr-4-";
const API_RESULT_KEY = "E-vmE-GHXmx73-Lfg24LztZ-7-yCyVsKn4QXphL5qzf-Kr-Cf-JWpZwZgaZRA5dR9V677xL4uCbc-Ce--8h2-tdrSu--QKjF-nZh";
const MAC_KEY_REDIRECT = "VnFBty7us-7QubjwHcjFaq4hb5-5n5-VdaymsXfqukzd3nhYhsLvuL5nFs-sCrJT--n9-J7zghhUYpFUw6q4KxCQ-XND6dV—abW";
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

const Client = require('./client/VPOSClientWithProxy');
const Requests = require('./request/Requests');

let client = new Client(URL_WEB_API, 'sha256', API_RESULT_KEY, PROXYNAME, PROXYPORT);  //use MAC_KEY_REDIRECT for payments/html methods, API_RESULT_KEY for proper api requests
let header = new Requests.Header(SHOP_ID, OPERATOR_ID);


//client.injectHtmlTemplate(base64temp, '5000', customTemplatePath); ok

//console.log(client.tokenize(SHOP_ID, URL_BACK,URL_DONE, URLMS, URL_REDIRECT, client.encoder, API_RESULT_KEY)); ok

/* let paymentReq = new Requests.PaymentInfo('10000','978', '102345331127444321', SHOP_ID,URL_BACK, URL_DONE, URLMS, 'I', 'I');
paymentReq.notCompulsoryFields = {'OPTIONS': 'GM'};

console.log(client.getHtmlPaymentDocument(paymentReq, URL_REDIRECT, "",null, client.encoder, API_RESULT_KEY)); ok */
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
let confirmReq = new Requests.ConfirmRequest('8032112928AT2vhlw7ark1ac4', '33214224384476', '10000', '978', '2', 'I', 'S');
client.confirmTransaction(header, confirmReq);
*/

/*
 let verifyReq = new Requests.StatusRequest('20200226254460307767601200335882', '33214224384476');

client.verifyRequest(header, verifyReq);
*/

/*let refundReq = new Requests.GeneralRequest('8032112928AT21d7xhj4w31r4', '34524328664682324', '20', '978', '2')

client.refundPayment(header, refundReq);  */

/*let orderStatusReq = new Requests.StatusRequest('20200226048647404218723060008016', '34524328664682324');

client.getOrderStatus(header, orderStatusReq); */

