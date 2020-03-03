const httpsUtil = require('https');
const xmlUtils = require('../utils/XMLUtils');
const Encoder = require('../utils/Encoder');
const RequestBuilder = require('../utils/RequestBuilder');
const VPosClientException = require('../utils/VPosClientException');

class VPosClient {

    shopID;
    merchantKey;
    encoder;
    redirectEncoder;
    options = {};
    requester = new RequestBuilder();

    constructor(shopID, algorithm, secretKey, merchantKey, options) {
        this.shopID = shopID;
        this.merchantKey = merchantKey;
        this.encoder = new Encoder(algorithm, secretKey);
        this.redirectEncoder = new Encoder(algorithm, merchantKey);
        this.options = options;
    }


    authorize = (headerItem, dataItem) => {

        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuthorizationRequest(headerItem, dataItem, this.encoder));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }

        })

    }

    threeDSAuthorize0 = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DS2Step0Request(headerItem, dataItem, this.encoder, this.merchantKey));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }

        })
    }

    threeDSAuthorize1 = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DS2Step1Request(headerItem, dataItem, this.encoder));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }

        })

    }

    threeDSAuthorize2 = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DS2Step2Request(headerItem, dataItem, this.encoder));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }

        })
    }

    capture = (headerItem, dataItem) => {

        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildCaptureRequest(headerItem, dataItem, this.encoder));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }

        })


    }

    refund = (headerItem, dataItem) => {

        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildRefundRequest(headerItem, dataItem, this.encoder));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }
        })

    }

    getOrderStatus = (headerItem, dataItem) => {
        let options = this.options;
        let body = 'data=';
        body += this.requester.buildBPWXmlRequest(this.requester.buildOrderStatusRequest(headerItem, dataItem, this.encoder));
        return new Promise((resolve, reject) => {
            try {
                resolve(aposCaller(options, body, this.encoder));
            } catch (e) {
                e = new VPosClientException(e.message)
                reject(e)
            }

        })
    }

    verifyMACREDIRECT = (myUrl) => {

        let queryBegin = myUrl.indexOf('?') + 1;
        let query = myUrl.substring(queryBegin);
        let qO = JSON.parse('{"' + query.replace(/&/g, '","')
            .replace(/=/g, '":"') + '"}',
            (key, value) => {
                return key === "" ? value : decodeURIComponent(value)
            });
        let receivedMac = qO.MAC;

        let MACFIELDS = [
            "ORDERID",
            "SHOPID",
            "AUTHNUMBER",
            "AMOUNT",
            "CURRENCY",
            "EXPONENT",
            "TRANSACTIONID",
            "ACCOUNTINGMODE",
            "AUTHORMODE",
            "RESULT",
            "TRANSACTIONTYPE",
            "ISSUERCOUNTRY",
            "AUTHCODE",
            "PAYERID",
            "PAYER",
            "PAYERSTATUS",
            "HASHPAN",
            "PANALIASREV",
            "PANALIAS",
            "PANALIASEXPDATE",
            "PANALIASTAIL",
            "MASKEDPAN",
            "PANTAIL",
            "PANEXPIRYDATE",
            "ACCOUNTHOLDER",
            "IBAN",
            "ALIASSTR",
            "ACQUIRERBIN",
            "MERCHANTID",
            "CARDTYPE"
        ];

        let macObj = {};

        MACFIELDS.forEach((key) => {
            if (qO.hasOwnProperty(key)) {
                macObj[key] = qO[key];
            }
        })

        if (receivedMac !== this.encoder.getMAC(macObj)) {
            return false;
        }

        return true;

    }

    buildHTMLRedirectFragment = (paymentInfos, urlApos, data3DSJson = null, merchantKey) => {

        const paymentInfo = paymentInfos;
        const HtmlGenerator = require('../utils/HTMLGenerator');
        const aesEncoder = require('../utils/AESEncoder');

        if (data3DSJson) {
            paymentInfo.data3DSJson = data3DSJson;
        }

        let myObject = {

            'URLMS': paymentInfo.urlMs,
            'URLDONE': paymentInfo.urlDone,
            'ORDERID': paymentInfo.orderId,
            'SHOPID': paymentInfo.shopId,
            'AMOUNT': paymentInfo.amount,
            'CURRENCY': paymentInfo.currency,
            'EXPONENT': paymentInfo.exponent ? paymentInfo.exponent : null,
            'ACCOUNTINGMODE': paymentInfo.accountingMode,
            'AUTHORMODE': paymentInfo.authorMode,
            'OPTIONS': paymentInfo.notCompulsoryFields.OPTIONS ? paymentInfo.notCompulsoryFields.OPTIONS : null,
            'NAME': paymentInfo.notCompulsoryFields.NAME ? paymentInfo.notCompulsoryFields.NAME : null,
            'SURNAME': paymentInfo.notCompulsoryFields.SURNAME ? paymentInfo.notCompulsoryFields.SURNAME : null,
            'TAXID': paymentInfo.notCompulsoryFields.TAXID ? paymentInfo.notCompulsoryFields.TAXID : null,
            'LOCKCARD': paymentInfo.notCompulsoryFields.LOCKCARD ? paymentInfo.notCompulsoryFields.LOCKCARD : null,
            'COMMIS': paymentInfo.notCompulsoryFields.COMMIS ? paymentInfo.notCompulsoryFields.COMMIS : null,
            'ORDDESCR': paymentInfo.notCompulsoryFields.ORDDESCR ? paymentInfo.notCompulsoryFields.ORDDESCR : null,
            'VSID': paymentInfo.notCompulsoryFields.VSID ? paymentInfo.notCompulsoryFields.VSID : null,
            'OPDESCR': paymentInfo.notCompulsoryFields.OPDESCR ? paymentInfo.notCompulsoryFields.OPDESCR : null,
            'REMAININGDURATION': paymentInfo.notCompulsoryFields.REMAININGDURATION ? paymentInfo.notCompulsoryFields.REMAININGDURATION : null,
            'USERID': paymentInfo.notCompulsoryFields.USERID ? paymentInfo.notCompulsoryFields.USERID : null,
            'PHONENUMBER': paymentInfo.notCompulsoryFields.PHONENUMBER ? paymentInfo.notCompulsoryFields.PHONENUMBER : null,
            'CAUSATION': paymentInfo.notCompulsoryFields.CAUSATION ? paymentInfo.notCompulsoryFields.CAUSATION : null,
            'USER': paymentInfo.notCompulsoryFields.USER ? paymentInfo.notCompulsoryFields.USER : null,
            'PRODUCTREF': paymentInfo.notCompulsoryFields.PRODUCTREF ? paymentInfo.notCompulsoryFields.PRODUCTREF : null,
            'ANTIFRAUD': paymentInfo.notCompulsoryFields.ANTIFRAUD ? paymentInfo.notCompulsoryFields.ANTIFRAUD : null,

        }

        if (typeof paymentInfo.threeDSData !== 'undefined' && paymentInfo.threeDSData !== null) {
            myObject['3DSDATA'] = aesEncoder(merchantKey, JSON.stringify(paymentInfo.threeDSData));

        }

        myObject['MAC'] = this.redirectEncoder.getMAC(myObject);
        myObject['URLBACK'] = paymentInfo.urlBack;

        if (paymentInfo.notCompulsoryFields.LANG) {
            myObject.LANG = paymentInfo.notCompulsoryFields.LANG;
        }
        if (paymentInfo.notCompulsoryFields.SHOPEMAIL) {
            myObject.SHOPEMAIL = paymentInfo.notCompulsoryFields.SHOPEMAIL;
        }


        return HtmlGenerator.htmlToBase64(urlApos, myObject);


    }

}

function aposCaller(options, body, encoder) {
    console.log(body);
    return new Promise((resolve, reject) => {
        const req = httpsUtil.request(options, (res) => {
            res.setEncoding('utf8');
            let buffer = "";
            let result = "";

            if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('Something went wrong while making the HTTP request.\nStatus Code: ' + res.statusCode));
            }

            res.on('data', function (chunk) {
                buffer = chunk;
            });
            res.on('end', function (chunk) {
                if (typeof buffer !== 'undefined' && buffer !== null) {
                    try {
                        result = xmlUtils.fromXML(buffer);
                        console.log(result);
                        verifyMacResponse(result, encoder);
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    throw new Error("Bad Request");
                }
            })

        });

        req.on('error', (e) => {
            reject(e);
        });

        req.write(body);
        req.end();
    });

}

verifyMacResponse = (response, encoder) => {

    const NEUTRAL_MAC_VALUE = "NULL";
    let rezMAC = [response.Timestamp, response.Result]
    let responseMac = encoder.getMAC(rezMAC);

    if (response.MAC !== NEUTRAL_MAC_VALUE && response.MAC !== responseMac)
        throw new Error("Response MAC is not valid");


    if (response.Data !== null && typeof response.Data.Operation !== 'undefined') {
        let opMacData = [];
        Object.keys(response.Data.Operation).forEach((data) => {
            if (OperationList.includes(data))
                opMacData.push(response.Data.Operation[data])
        })
        let operationMac = encoder.getMAC(opMacData);
        if (response.Data.Operation.Mac !== NEUTRAL_MAC_VALUE && !response.Data.Operation.Mac === operationMac)
            throw new Error("Operation MAC is not valid");

    }

    if (response.Data !== null && typeof response.Data.Authorization !== 'undefined') {
        let authMacData = [];
        Object.keys(response.Data.Authorization).forEach((auth) => {
            if (typeof auth === 'string') {
                if (AuthorizationList.includes(auth))
                    authMacData.push(response.Data.Authorization[auth]);
            } else if (typeof auth === 'object') {
                Object.keys(auth).forEach((data) => {
                    if (AuthorizationList.includes(data))
                        authMacData.push(auth[data]);

                })
                let authorizationMac = encoder.getMAC(authMacData);
                authMacData = [];
                if (data.MAC !== NEUTRAL_MAC_VALUE && data.MAC !== authorizationMac)
                    throw new Error("Authorization MAC is not valid");
            }
        })

        if (authMacData.length) {
            let authorizationMac = encoder.getMAC(authMacData);
            if (response.Data.Authorization.MAC !== NEUTRAL_MAC_VALUE && response.Data.Authorization.MAC !== authorizationMac)
                throw new Error("Authorization MAC is not valid");

        }
    }
}

const AuthorizationList = [
    'AuthorizationType',
    'TransactionID',
    'Network',
    'OrderID',
    'OrderId',
    'TransactionAmount',
    'AuthorizedAmount',
    'Currency',
    'AccountedAmount',
    'RefundedAmount',
    'TransactionResult',
    'Timestamp',
    'AuthorizationNumber',
    'AcquirerBIN',
    'MerchantID',
    'TransactionStatus',
    'ResponseCodeISO',
    'PanTail',
    'PanExpiryDate',
    'PaymentTypePP',
    'RRN',
    'CardType'
];

const OperationList = [
    'TransactionID',
    'TimestampReq',
    'TimestampElab',
    'SrcType',
    'Amount',
    'Result',
    'Status',
    'OpDescr'
];


module.exports = VPosClient;