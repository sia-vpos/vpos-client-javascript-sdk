const httpsUtil = require('https');
const xmlUtils = require('../utils/XMLUtils');
const Encoder = require('../utils/Encoder');
const RequestBuilder = require('../utils/RequestBuilder');
const VPosClientException = require('../utils/VPosClientException');

class VPosClient {

    shopID;
    merchantKey;
    apiKey;
    redirectUrl;
    encoder;
    redirectEncoder;
    options = {};

    requester = new RequestBuilder();

    constructor(config) {
        this.shopID = config.setter.shopID;
        this.apiKey = config.setter.apiKey;
        this.merchantKey = config.setter.merchantKey;
        this.encoder = new Encoder(config.setter.algorithm, config.setter.apiKey);
        this.redirectEncoder = new Encoder(config.setter.algorithm, config.setter.merchantKey);
        this.options = config.options;
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
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DS2Step0Request(headerItem, dataItem, this.encoder, this.apiKey));

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
        body += this.requester.buildBPWXmlRequest(this.requester.buildAuth3DS2Step1Request(headerItem, dataItem, this.encoder))
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

    verifyMACRedirect = (myUrl) => {

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
            //"EXPONENT",
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
            "TRECURR",
            "CRECURR",
            "MASKEDPAN",
            "PANTAIL",
            "PANEXPIRYDATE",
            "ACCOUNTHOLDER",
            "IBAN",
            "ALIASSTR",
            "EMAILCH",
            "CFISC",
            "ACQUIRERBIN",
            "MERCHANTID",
            "CARDTYPE",
            "AMAZONAUTHID",
            "AMAZONCAPTUREID",
            "CHINFO"
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

    buildHTMLRedirectFragment = (paymentInfos, urlApos, data3DSJson = null, merchantKey, tokenConfig = null) => {

        const paymentInfo = paymentInfos;
        const HtmlGenerator = require('../utils/HTMLGenerator');
        const aesEncoder = require('../utils/AESEncoder');

        let myObject = {};

        if (data3DSJson) {
            paymentInfo.data3DSJson = data3DSJson;
        }

        if (!tokenConfig) {

            myObject = {

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
                '3DSDATA' : paymentInfo.threeDSData ? paymentInfo.threeDSData : null,
                'TRECURR': paymentInfo.trecurr,
                'CRECURR': paymentInfo.crecurr,

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

        } else {
            myObject = {

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
                '3DSDATA' : paymentInfo.threeDSData ? paymentInfo.threeDSData : null,
                'TRECURR': paymentInfo.trecurr,
                'CRECURR': paymentInfo.crecurr,

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
        }
        return HtmlGenerator.htmlOutput(urlApos, myObject, tokenConfig);


    }

}

function aposCaller(options, body, encoder) {
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
                        console.log(buffer);
                        result = xmlUtils.fromXML(buffer);
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

    if(response.Data !== null && typeof response.Data.ThreeDSMethod !== 'undefined'){
        let threeDSMethodDataMac = [];
        Object.keys(response.Data.ThreeDSMethod).forEach((data) => {
            if (ThreeDSMethodList.includes(data))
                threeDSMethodDataMac.push(response.Data.ThreeDSMethod[data])
        })
        let threeDSMethodMac = encoder.getMAC(threeDSMethodDataMac);
        if (response.Data.ThreeDSMethod.MAC !== NEUTRAL_MAC_VALUE && response.Data.ThreeDSMethod.MAC !== threeDSMethodMac)
            throw new Error("ThreeDSMethod MAC is not valid");
    }

    if(response.Data !== null && typeof response.Data.ThreeDSChallenge !== 'undefined'){
        let threeDSChallengeDataMac = [];
        Object.keys(response.Data.ThreeDSChallenge).forEach((data) => {
            if (ThreeDSChallengeList.includes(data))
                threeDSChallengeDataMac.push(response.Data.ThreeDSChallenge[data])
        })
        let threeDSChallengeMac = encoder.getMAC(threeDSChallengeDataMac);
        if (response.Data.ThreeDSChallenge.MAC !== NEUTRAL_MAC_VALUE && response.Data.ThreeDSChallenge.MAC !== threeDSChallengeMac)
            throw new Error("ThreeDSChallenge MAC is not valid");
    }

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

    if(response.Data !== null && typeof response.Data.PanAliasData !== 'undefined'){
        let panAliasDataMac = [];
        Object.keys(response.Data.PanAliasData).forEach((data) => {
            if (PanAliasList.includes(data))
                panAliasDataMac.push(response.Data.PanAliasDAta[data])
        })
        let panAliasMac = encoder.getMAC(panAliasDataMac);
        if (response.Data.PanAliasData.MAC !== NEUTRAL_MAC_VALUE && response.Data.PanAliasData.MAC !== panAliasDataMac)
            throw new Error("PanAlias MAC is not valid");

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

const PanAliasList = [
    'PanAlias',
    'PanAliasRev',
    'PanAliasExpDate',
    'PanAliasTail'
];

const ThreeDSChallengeList = [
    'ThreeDSTransId',
    'CReq',
    'ACSUrl'
];

const ThreeDSMethodList = [
    'ThreeDSTransId',
    'ThreeDSMethodData',
    'ThreeDSMethodUrl'
]


module.exports = VPosClient;