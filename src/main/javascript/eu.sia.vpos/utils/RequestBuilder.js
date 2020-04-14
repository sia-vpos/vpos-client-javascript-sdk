
const x = require('./XMLUtils');
const reqRef = require('./ReqRefGenerator');


class RequestBuilder {

    xmlBodyBuilder = (xmlRequest, xmlHeader, xmlFields, requestName) => {

        let xmlBody = "\n";
        let xmlBuffer = "\n";

        Object.getOwnPropertyNames(xmlRequest).forEach(key => {
            xmlBody += "\t" + x.populateSingleXMLElement(key, xmlRequest[key]) + "\n"
        })

        xmlBody = x.populateSingleXMLElement('Request', xmlBody);

        Object.getOwnPropertyNames(xmlHeader).forEach(key => {
            xmlBuffer += "\t" + x.populateSingleXMLElement(key, xmlHeader[key]) + "\n";
        })

        xmlBuffer = "\n" + x.populateSingleXMLElement('Header', xmlBuffer) + "\n";

        Object.getOwnPropertyNames(xmlFields).forEach(key => {
            if (xmlFields[key] !== "" && typeof xmlFields[key] !== 'undefined' && xmlFields[key] !== null) {
                xmlBuffer += "\t" + x.populateSingleXMLElement(key, xmlFields[key]) + "\n";
            }
        })

        xmlBuffer = "\n" + x.populateSingleXMLElement('Data', "\n" + x.populateSingleXMLElement(requestName, xmlBuffer) + "\n");

        return xmlBody += xmlBuffer;


    }

    buildAuthorizationRequest = (headerItem, authorizeItem, encoder) => {

        let authorize = authorizeItem;
        let header = headerItem;

        let xmlRequest = {

            "Operation": "AUTHORIZATION",
            "Timestamp": generateTimestamp(),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {

            "OrderID": authorize.orderID,
            "PAN": authorize.pan,
            "CVV2": authorize.cvv2,
            "CreatePanAlias": authorize.createPanAlias,
            "ExpDate": authorize.expDate,
            "Amount": authorize.amount,
            "Currency": authorize.currency,
            "Exponent": authorize.exponent,
            "AccountingMode": authorize.accountingMode,
            "Network": authorize.network,
            "EmailCH": authorize.emailCH,
            "UserID": authorize.userID,
            "Acquirer": authorize.acquirer,
            "UsrAuthFlag": authorize.usrAuthFlag,
            "OpDescr": authorize.opDescr,
            "Options": authorize.options,
            "Antifraud": authorize.antifraud,
            "ProductRef": authorize.productRef,
            "Name": authorize.name,
            "Surname": authorize.surname,
            "TaxID": authorize.taxID,
        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "ORDERID" : xmlFields.OrderID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "PAN": xmlFields.PAN,
            "CVV2": xmlFields.CVV2 !== "" && xmlFields.CVV2 !== null ? xmlFields.CVV2 : null,
            "EXPDATE": xmlFields.ExpDate,
            "AMOUNT": xmlFields.Amount,
            "CURRENCY": xmlFields.Currency,
            "EXPONENT": xmlFields.Exponent !== "" && xmlFields.Exponent !== null ? xmlFields.Exponent : null,
            "ACCOUNTINGMODE": xmlFields.AccountingMode,
            "NETWORK": xmlFields.Network,
            "EMAILCH": xmlFields.EmailCH !== "" && xmlFields.EmailCH !== null ? xmlFields.EmailCH : null,
            "USERID": xmlFields.UserID !== "" && xmlFields.UserID !== null ? xmlFields.UserID : null,
            "ACQUIRER": xmlFields.Acquirer !== "" && xmlFields.Acquirer !== null ? xmlFields.Acquirer : null,
            "IPADDRESS": xmlFields.IpAddress !== "" && xmlFields.IpAddress !== null ? xmlFields.IpAddress : null,
            "OPDESCR": xmlFields.OpDescr !== "" && xmlFields.OpDescr !== null ? xmlFields.OpDescr : null,
            "USRAUTHFLAG": xmlFields.UsrAuthFlag !== "" && xmlFields.UsrAuthFlag !== null ? xmlFields.UsrAuthFlag : null,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null,
            "ANTIFRAUD": xmlFields.Antifraud !== "" && xmlFields.Antifraud !== null ? xmlFields.Antifraud : null,
            "PRODUCTREF": xmlFields.ProductRef !== "" && xmlFields.ProductRef !== null ? xmlFields.ProductRef : null,
            "NAME": xmlFields.Name !== "" && xmlFields.Name !== null ? xmlFields.Name : null,
            "SURNAME": xmlFields.Surname !== "" && xmlFields.Surname !== null ? xmlFields.Surname : null,
            "TAXID": xmlFields.TaxID !== "" && xmlFields.TaxID !== null ? xmlFields.TaxID : null
        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'AuthorizationRequest');

    }

    buildAuth3DS2Step0Request = (headerItem, threeDS2Step0Item, encoder, apiKey) => {

        let threeDS2Step0 = threeDS2Step0Item;
        let header = headerItem;
        const aesEncoder = require('../utils/AESEncoder');

        let xmlRequest = {

            "Operation": "THREEDSAUTHORIZATION0",
            "Timestamp": generateTimestamp(),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {

            "OrderID": threeDS2Step0.orderID,
            "PAN": threeDS2Step0.pan,
            "CVV2": threeDS2Step0.cvv2,
            "CreatePanAlias": threeDS2Step0.createPanAlias,
            "ExpDate": threeDS2Step0.expDate,
            "Amount": threeDS2Step0.amount,
            "Currency": threeDS2Step0.currency,
            "Exponent": threeDS2Step0.exponent,
            "AccountingMode": threeDS2Step0.accountingMode,
            "Network": threeDS2Step0.network,
            "EmailCH": threeDS2Step0.emailCH,
            "NameCH": threeDS2Step0.nameCH,
            "UserID": threeDS2Step0.userID,
            "Acquirer": threeDS2Step0.acquirer,
            "OpDescr": threeDS2Step0.opDescr,
            "IpAddress": threeDS2Step0.ipAddress,
            "UsrAuthFlag": threeDS2Step0.usrAuthFlag,
            "Antifraud": threeDS2Step0.antifraud,
            "ProductRef": threeDS2Step0.productRef,
            "Name": threeDS2Step0.name,
            "Surname": threeDS2Step0.surname,
            "TaxID": threeDS2Step0.taxID,
            "ThreeDSData":  threeDS2Step0.threeDSData ? aesEncoder(apiKey, JSON.stringify(threeDS2Step0.threeDSData)) : null,
            "NotifUrl": threeDS2Step0.notifURL,
            "ChallengeWinsize": threeDS2Step0.challengeWinSize,
            "CPROF": threeDS2Step0.cPROF,
            "ThreeDSMtdNotifUrl": threeDS2Step0.threeDSMtdNotifURL,
            "Options": threeDS2Step0.options,

        }


        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "ORDERID" : xmlFields.OrderID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "PAN": xmlFields.PAN,
            "CVV2": xmlFields.CVV2 !== "" && xmlFields.CVV2 !== null ? xmlFields.CVV2 : null,
            "EXPDATE": xmlFields.ExpDate,
            "AMOUNT": xmlFields.Amount,
            "CURRENCY": xmlFields.Currency,
            "EXPONENT": xmlFields.Exponent !== "" && xmlFields.Exponent !== null ? xmlFields.Exponent : null,
            "ACCOUNTINGMODE": xmlFields.AccountingMode,
            "NETWORK": xmlFields.Network,
            "EMAILCH": xmlFields.EmailCH !== "" && xmlFields.EmailCH !== null ? xmlFields.EmailCH : null,
            "USERID": xmlFields.UserID !== "" && xmlFields.UserID !== null ? xmlFields.UserID : null,
            "ACQUIRER": xmlFields.Acquirer !== "" && xmlFields.Acquirer !== null ? xmlFields.Acquirer : null,
            "IPADDRESS": xmlFields.IpAddress !== "" && xmlFields.IpAddress !== null ? xmlFields.IpAddress : null,
            "OPDESCR": xmlFields.OpDescr !== "" && xmlFields.OpDescr !== null ? xmlFields.OpDescr : null,
            "USRAUTHFLAG": xmlFields.UsrAuthFlag !== "" && xmlFields.UsrAuthFlag !== null ? xmlFields.UsrAuthFlag : null,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null,
            "ANTIFRAUD": xmlFields.Antifraud !== "" && xmlFields.Antifraud !== null ? xmlFields.Antifraud : null,
            "PRODUCTREF": xmlFields.ProductRef !== "" && xmlFields.ProductRef !== null ? xmlFields.ProductRef : null,
            "NAME": xmlFields.Name !== "" && xmlFields.Name !== null ? xmlFields.Name : null,
            "SURNAME": xmlFields.Surname !== "" && xmlFields.Surname !== null ? xmlFields.Surname : null,
            "TAXID": xmlFields.TaxID !== "" && xmlFields.TaxID !== null ? xmlFields.TaxID : null,
            "THREEDSDATA": xmlFields.ThreeDSData != null ? xmlFields.ThreeDSData : null,
            "NAMECH" : xmlFields.NameCH,
            "NOTIFURL": xmlFields.NotifUrl,
            "THREEDSMTDNOTIFURL": xmlFields.ThreeDSMtdNotifUrl !== "" && xmlFields.ThreeDSMtdNotifUrl !== null ? xmlFields.ThreeDSMtdNotifUrl : null,
            "CHALLENGEWINSIZE": xmlFields.ChallengeWinsize !== "" && xmlFields.ChallengeWinsize !== null ? xmlFields.ChallengeWinsize : null

        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        xmlFields.ThreeDSData = encodeURIComponent(xmlFields.ThreeDSData);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'ThreeDSAuthorization0Request');


    }

    buildAuth3DS2Step1Request = (headerItem, threeDS2Step1Item, encoder) => {

        let threeDS2Step1 = threeDS2Step1Item;
        let header = headerItem;

        let xmlRequest = {

            "Operation": "THREEDSAUTHORIZATION1",
            "Timestamp": generateTimestamp(),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {
            "ThreeDsTransID": threeDS2Step1.ThreeDSTransID,
            "ThreeDsMtdComplInd": threeDS2Step1Item.ThreeDsMtdComplInd
        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "THREEDSTRANSID": xmlFields.ThreeDsTransID,
            "THREEDSMTDCOMPLIND": xmlFields.ThreeDsMtdComplInd

        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'ThreeDSAuthorizationRequest1');


    }

    buildAuth3DS2Step2Request = (headerItem, threeDS2Step2Item, encoder) => {

        let threeDS2Step2 = threeDS2Step2Item;
        let header = headerItem;

        let xmlRequest = {

            "Operation": "THREEDSAUTHORIZATION2",
            "Timestamp": generateTimestamp(),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {
            ThreeDsTransID: threeDS2Step2.ThreeDsTransId
        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "THREEDSTRANSID": xmlFields.ThreeDsTransID
        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'ThreeDSAuthorizationRequest2');

    }

    buildCaptureRequest = (
        headerItem, confirmItem, encoder
    ) => {

        let confirm = confirmItem;
        let header = headerItem;

        let xmlRequest = {

            "Operation": "ACCOUNTING",
            "Timestamp": generateTimestamp(),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {

            "TransactionID": confirm.transactionID,
            "OrderID": confirm.orderID,
            "Amount": confirm.amount,
            "Currency": confirm.currency,
            "Exponent": confirm.exponent,
            "OpDescr": confirm.opDescr,
            "Options": confirm.options

        }

        let macObject = {

            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "TRANSACTIONID": xmlFields.TransactionID,
            "ORDERID": xmlFields.OrderID,
            "AMOUNT": xmlFields.Amount !== "" && xmlFields.Amount !== null ? xmlFields.Amount : null,
            "CURRENCY": xmlFields.Currency !== "" && xmlFields.Currency !== null ? xmlFields.Currency : "",
            "EXPONENT": xmlFields.Exponent !== "" && xmlFields.Exponent !== null ? xmlFields.Exponent : null,
            "OPDESCR": xmlFields.OpDescr !== "" && xmlFields.OpDescr !== null ? xmlFields.OpDescr : null,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null

        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Accounting');


    }

    buildRefundRequest = (
        headerItem, refundItem, encoder
    ) => {

        let refund = refundItem;
        let header = headerItem;
        let xmlBody = "";
        let xmlBuffer = "";

        let xmlRequest = {

            "Operation": "REFUND",
            "Timestamp": generateTimestamp(),
            "MAC": ""
        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }


        let xmlFields = {

            "TransactionID": refund.transactionID,
            "OrderID": refund.orderID,
            "Amount": refund.amount,
            "Currency": refund.currency,
            "Exponent": refund.exponent,
            "opDescr": refund.opDescr,
            "Options": refund.options

        }

        let macObject = {

            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "TRANSACTIONID": xmlFields.TransactionID,
            "ORDERID": xmlFields.OrderID,
            "AMOUNT": xmlFields.Amount,
            "CURRENCY": xmlFields.Currency,
            "EXPONENT": xmlFields.Exponent !== "" && xmlFields.Exponent !== null ? xmlFields.Exponent : null,
            "OPDESCR": xmlFields.opDescr !== "" && xmlFields.opDescr !== null ? xmlFields.opDescr : null,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null

        };

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Refund');

    }

    buildOrderStatusRequest = (
        headerItem, orderStatusItem, encoder
    ) => {


        let header = headerItem;
        let orderStatus = orderStatusItem;

        let xmlRequest = {

            "Operation": "ORDERSTATUS",
            "Timestamp": generateTimestamp(),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {

            "OrderID": orderStatus.orderid,
            "ProductRef": orderStatus.productRef,
            "Options": orderStatus.options

        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "ORDERID": xmlFields.OrderID,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null,
            "PRODUCTREF": xmlFields.ProductRef !== "" && xmlFields.ProductRef !== null ? xmlFields.ProductRef : null

        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'OrderStatus')

    }

    buildBPWXmlRequest = (requestDataXml) => {

        let xmlBody = "";

        xmlBody = "\n" + x.populateSingleXMLElement('BPWXmlRequest', "\n" + x.populateSingleXMLElement('Release', '02') + "\n" + requestDataXml + "\n");

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + xmlBody;

    }

}

generateTimestamp = () =>{
    let date = new Date();
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().substring(0,23);
}

module.exports = RequestBuilder;

