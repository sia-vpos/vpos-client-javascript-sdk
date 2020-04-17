const URL_DONE = "http://localhost:8080/payment-gateway/vpos/tokenize";
const URL_BACK = "http://localhost:8080/payment-gateway/vpos/tokenize";
const URLMS = "https://te.t-frutta.eu/TImooneyWS/app_api/v10/payment/";
const OPERATOR_ID = "OPERATOR";
const fs = require('fs');
const PROXYNAME = "proxy-dr.reply.it";
const PROXYPORT = 8080;

const Requests = require('./request/Requests');

const SHOP_ID = "129289999900002";
const API_RESULT_KEY = "hSAc7sg-z-vZ-296FuwwUaqHmzQ-eQ-E--2pXV-mEGh6YQtBdDK-NH9KeCyQrtBtmwFv-m6kEUtn27-6ATfkB-x2Dy3F4G-9t4sp";
const SECRET_KEY_MERCHANT = "au-PA-B2AAHsQSG-UuaVNcHFpBk3GJBNWqR3--Tyf-Fa-wav--ySqz9f24-yvP-RvbMQx-VYz9jVDNe-uMwTSt3-tvPukbJTTt-U";
const URL_REDIRECT = "https://atpostest.ssb.it/atpos/pagamenti/main";
const URL_WEB_API = "https://atpostest.ssb.it/atpos/apibo/apiBOXML.app";

const ClientConfig = require('./utils/ClientConfigurator');
const Client = require('./client/VPosClient');

let config = ClientConfig.aposClientSetup(SHOP_ID, URL_REDIRECT, "sha256", API_RESULT_KEY, SECRET_KEY_MERCHANT, URL_WEB_API);
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
    "addrmatch": "n",
    "chaccageind": "04",
    "chaccchange": "20190211",
    "chaccchangeind": "03",
    "chaccdate": "20190210",
    "chaccpwchange": "20190214",
    "chaccpwchangeind": "04",
    "nbpurchaseaccount": "1000",
    "txnactivityday": "100",
    "txnactivityyear": "100",
    "shipaddressusage": "20181220",
    "shipaddressusageind": "03",
    "shipnameindicator": "01",
    "billaddrcity": "billaddrcity",
    "billaddrcountry": "004",
    "billaddrline1": "billaddrline1",
    "billaddrline2": "billaddrline2",
    "billaddrline3": "billaddrline3",
    "billaddrpostcode": "billaddrpostcode",
    "billaddrstate": "11",
    "homephone": "39-321818198",
    "mobilephone": "33-312",
    "shipaddrcity": "zio",
    "shipaddrcountry": "008",
    "shipaddrline1": "shipaddrline1",
    "shipaddrline2": "shipaddrline2",
    "shipaddrline3": "shipaddrline3",
    "shipaddrpostcode": "shipaddrpostcode",
    "shipaddrstate": "222",
    "workphone": "39-0321818198",
    "deliveryemailaddress": "a-b@example.com",
    "deliveryTimeframe": "02",
    "preOrderDate": "20181220",
    "preOrderPurchaseInd": "01",
    "reorderItemsInd": "02",
    "shipIndicator": "01"
}

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low)
}

/*
let randomstring = "";

for (let i = 0; i < 15; i++) {
    randomstring += randomInt(0, 9);

}



let ThreeDS2Step0 = new Requests.ThreeDSStep0(ThreeDSData, randomstring, "4118830900940017", "142",
    "2112", "100", "978", "2", "D", "01", "https://atpostest.ssb.it/atpos/apibo/en/3ds-notification.html",
    "asdas@fgd.id", "Mario", "", "", "", "", "", "",
    "", "", "", "", "", "", "", "https://atpostest.ssb.it/atpos/apibo/en/3ds-notification.html",
    "")

client.threeDSAuthorize0(header, ThreeDS2Step0).then(console.log);
*/


/*
let  threeDS2Step1 = new Requests.ThreeDSStep1("734dh9ec-ebaa-5d84-91bd-06ec0611l927",
    'S')
client.threeDSAuthorize1(header, threeDS2Step1).then(console.log);





let threeDS2Step2 = new Requests.ThreeDSStep2('70f5ce1a-ad93-43a0-930a-3931c04c100d');
client.threeDSAuthorize2(header, threeDS2Step2).then(console.log);
*/


let paymentReq = new Requests.PaymentInfo(ThreeDSData, '100', '978', '8655321790ui67523', SHOP_ID, URL_BACK, URL_DONE, URLMS, 'D', 'D', 'U');
paymentReq.notCompulsoryFields =
    {
        'OPTIONS': 'M',
    };

let htmlString = "<!DOCTYPE html>\n" + "<html>\n" + "<head>\n" + "<meta charset=\"utf-8\">\n" + "</head>\n\n" +
    client.buildHTMLRedirectFragment(paymentReq, URL_REDIRECT, "", API_RESULT_KEY);
+"\n</html>";

let htmlPath = "C:\\Users\\danie\\Desktop\\test.html";

let stream = fs.createWriteStream(htmlPath);

stream.once('open', function (fd) {
    stream.end(htmlString);
});


/*

let orderStatusReq = new Requests.StatusRequest( 'provaz');

client.getOrderStatus(header, orderStatusReq).then(console.log);

 */


/*
let url = "http://localhost:8080/payment-gateway/vpos/tokenize?ORDERID=102345331127444321&SHOPID=129281292800104&AUTHNUMBER=595865&AMOUNT=10000&CURRENCY=978&TRANSACTIONID=8032112928SL11qhnjpkgpdz4&ACCOUNTINGMODE=I&AUTHORMODE=I&RESULT=00&TRANSACTIONTYPE=TT01&PANALIASREV=&PANALIAS=0000024376231761231&PANALIASEXPDATE=2112&PANALIASTAIL=0027&MASKEDPAN=459825xxxxxx0027&PANTAIL=0027&PANEXPIRYDATE=2112&NETWORK=01&MAC=31d8ad560d8720f38fe86ebb29f660b68121630f2c401db1fe2fd53bf12486b8"
console.log(client.verifyMACREDIRECT(url))


 */

/*

let dataItem = new Requests.CaptureRequest("8032112928AT2156yl2fneq44", "211234567876234235", "1000",
                "978", "2", "", "N")
client.capture(header, dataItem).then(console.log)


let dataItem = new Requests.GeneralRequest("8032112928AT2zfkg8rwq3kt4", "221stomp456775", "5010", "978"
                    ,"2")
client.refund(header, dataItem).then(console.log)




let dataItem = new Requests.Authorize("223gd4r6ww7955", "4598250000000027", "142", "2112", "100", "978", "", "I", "01", "dsdsd@gmail.it");
client.authorize(header, dataItem).then(console.log).catch(console.log);


 */

