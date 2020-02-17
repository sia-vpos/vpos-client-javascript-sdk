const x = require('./XMLUtils');
const fs = require('fs');
const reqRef = require('./ReqRefGenerator');
const key = 'fU-9et-s-Sj8W---E8uhUDu9fEzqr8hH3L95s48r9nq-cq3cBXbp-tZsvGQU--t-nqmtaW-7x-7-C2PdcuFdbHuShQ-pYVWnr-4-';


class RequestBuilder {

    xmlBodyBuilder = (xmlRequest, xmlHeader, xmlFields, requestName, masterPass = null) => {

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

        if (masterPass) {

            let xml3DS = "";
            let xmlMasterpass = "";

            Object.getOwnPropertyNames(masterPass.xml3DS).forEach(key => {
                xml3DS += x.populateSingleXMLElement(key, xml3DS[key])
            });

            xml3DS = x.populateSingleXMLElement('Data3DS', xml3DS);

            Object.getOwnPropertyNames(masterPass.xmlMasterPass).forEach(key => {
                xmlMasterpass += x.populateSingleXMLElement(key, xmlMasterpass[key])
            })

            xmlMasterpass = x.populateSingleXMLElement('MasterpassData', xmlMasterpass);

            xmlBuffer = xml3DS + xmlMasterpass;
        }


        Object.getOwnPropertyNames(xmlFields).forEach(key => {
            if (xmlFields[key] !== "" && typeof xmlFields[key] !== 'undefined')
                xmlBuffer += "\t" + x.populateSingleXMLElement(key, xmlFields[key]) + "\n";
        })

        xmlBuffer = "\n" + x.populateSingleXMLElement('Data', "\n" + x.populateSingleXMLElement(requestName, xmlBuffer) + "\n");

        return xmlBody += xmlBuffer;


    }

    buildRefundRequest = (
        headerItem, refundItem, encoder
    ) => {

        const refundRequest = require('../request/GeneralRequest');
        const Header = require('../request/Header');

        let refund = refundItem;
        let header = headerItem;
        let xmlBody = "";
        let xmlBuffer = "";

        let xmlRequest = {

            "Operation": "REFUND",
            "Timestamp": new Date().toISOString().substring(0, 23),
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

    buildConfirmRequest = (
        headerItem, confirmItem, encoder
    ) => {

        const confirmRequest = require('../request/ConfirmRequest');
        const Header = require('../request/Header');
        let confirm =  confirmItem;
        let header =  headerItem;
        let xmlBody = "";
        let xmlBuffer = "";

        let xmlRequest = {

            "Operation": "DEFERREDREQUEST",
            "Timestamp": new Date().toISOString().substring(0, 23),
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
            "AccountingMode": confirm.accountingMode,
            "CloseOrder": confirm.closeOrder,
            "IpAddress": confirm.ipAddress,
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
            "ACCOUNTINGMODE": xmlFields.AccountingMode,
            "CLOSEORDER": xmlFields.CloseOrder,
            "IPADDRESS": xmlFields.IpAddress !== "" && xmlFields.IpAddress !== null ? xmlFields.IpAddress : null,
            "OPDESCR": xmlFields.OpDescr !== "" && xmlFields.OpDescr !== null ? xmlFields.OpDescr : null,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null

        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'DeferredRequest');


    }

    buildBookingRequest = (
        headerItem, bookingItem, encoder
    ) => {

        const bookingRequest = require('../request/GeneralRequest');
        const Header = require('../request/Header');

        let booking = bookingItem;
        let header = headerItem;

        let xmlRequest = {

            "Operation": "ACCOUNTING",
            "Timestamp": new Date().toISOString().substring(0, 23),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum

        }

        let xmlFields = {

            "TransactionID": booking.transactionID,
            "OrderID": booking.orderID,
            "Amount": booking.amount,
            "Currency": booking.currency,
            "Exponent": booking.exponent,
            "opDescr": booking.opDescr,
            "Options": booking.options,

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

    buildOrderStatusRequest = (
        headerItem, orderStatusItem, encoder
    ) => {
        const OrderStatusRequest = require('../request/StatusRequest');
        const Header = require('../request/Header');

        let header = new Header(ShopID, OperatorID);
        let orderStatus = new OrderStatusRequest(OriginalReqRefNum, OrderID, ProductRef, Options);

        let xmlRequest = {

            "Operation": "ORDERSTATUS",
            "Timestamp": new Date().toISOString().substring(0, 23),
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

    buildVerifyRequest = (
       headerItem, verifyItem , encoder
    ) => {
        const verifyRequest = require('../request/StatusRequest');
        const Header = require('../request/Header');

        let header = headerItem;
        let verifyRequestInstance = verifyItem;

        let xmlRequest = {

            "Operation": "VERIFY",
            "Timestamp": new Date().toISOString().substring(0, 23),
            "MAC": ""

        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {

            "OriginalReqRefNum": verifyRequestInstance.originalReqRefNum,
            "Options": verifyRequestInstance.options

        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "ORIGINALREQREFNUM": xmlFields.OriginalReqRefNum,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null
        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'VerifyRequest');

    }

    buildData3DS = (
        data3DSItem, masterpassDataItem
    ) => {

        const data3DS = require('../request/data3DS');
        const masterpassData = require('../request/MasterpassData');
        let data3DSInstance = data3DSItem;
        let masterpassDataInstance = masterpassDataItem;

        let xml3DS = {
            "Service": data3DSInstance.service,
            "Eci": data3DSInstance.eci,
            "Xid": data3DSInstance.xid,
            "CAVV": data3DSInstance.cavv,
            "ParesStatus": data3DSInstance.paresStatus,
            "scEnrollStatus": data3DSInstance.scEnrollStatus,
            "SignatureVerifytion": data3DSInstance.signatureVerification,

        }

        let xmlMasterPass = {

            "PP_AuthenticateMethod": masterpassDataInstance.pp_AuthenticationMethod,
            "PP_CardEnrollMethod": masterpassDataInstance.pp_CardEnrollMethod

        }

        return {xml3DS, xmlMasterPass};

    }

    buildAuth3DSStep1Request = (
       headerItem, auth3DS1Item,
        data3DSObj = null, encoder
    ) => {
        const auth3DSStep1Request = require('../request/Auth3DSStep1Request');
        const Header = require('../request/Header');

        let header = headerItem;
        let auth3DSStep1 = auth3DS1Item;

        let data3DSInstance = data3DSObj === null || !Object.keys(data3DSObj).length ? null : data3DSObj;

        let xmlRequest = {
            "Operation": "AUTHORIZATION3DSSTEP1",
            "Timestamp": new Date().toISOString().substring(0, 23),
            "MAC": ""
        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum,

        }

        let xmlFields = {
            "OrderID": auth3DSStep1.orderID,
            "Pan": auth3DSStep1.pan,
            "cvv2": auth3DSStep1.cvv2,
            "ExpDate": auth3DSStep1.expDate,
            "Amount": auth3DSStep1.amount,
            "Currency": auth3DSStep1.currency,
            "Exponent": auth3DSStep1.exponent,
            "AccountingMode": auth3DSStep1.accountingMode,
            "Network": auth3DSStep1.network,
            "EmailCH": auth3DSStep1.emailCH,
            "UserId": auth3DSStep1.userID,
            "Acquirer": auth3DSStep1.acquirer,
            "IpAddress": auth3DSStep1.ipAddress,
            "UsrAuthFlag": auth3DSStep1.usrAuthFlag,
            "OpDescr": auth3DSStep1.opDescr,
            "Options": auth3DSStep1.options,
            "Antifraud": auth3DSStep1.antifraud,
            "ProductRef": auth3DSStep1.productRef,
            "Name": auth3DSStep1.name,
            "Surname": auth3DSStep1.surname,
            "TaxID": auth3DSStep1.taxID,
            "CreatePanAlias": auth3DSStep1.createPanAlias,
            "InPerson": auth3DSStep1.inPerson,
            "MerchantURL": auth3DSStep1.merchantURL,
        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "ORDERID": xmlFields.OrderID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "PAN": xmlFields.Pan,
            "CVV2": xmlFields.cvv2,
            "EXPDATE": xmlFields.ExpDate,
            "AMOUNT": xmlFields.Amount,
            "CURRENCY": xmlFields.Currency,
            "EXPONENT": xmlFields.Exponent !== "" && xmlFields.Exponent !== null ? xmlFields.Exponent : null,
            "ACCOUNTINGMODE": xmlFields.AccountingMode,
            "NETWORK": xmlFields.Network,
            "EMAILCH": xmlFields.EmailCH !== "" && xmlFields.EmailCH !== null ? xmlFields.EmailCH : null,
            "USERID": xmlFields.UserId !== "" && xmlFields.UserId !== null ? xmlFields.UserId : null,
            "ACQUIRER": xmlFields.Acquirer !== "" && xmlFields.Acquirer !== null ? xmlFields.Acquirer : null,
            "IPADDRESS": xmlFields.IpAddress !== "" && xmlFields.IpAddress !== null ? xmlFields.IpAddress : null,
            "USRAUTHFLAG": xmlFields.UsrAuthFlag !== "" && xmlFields.UsrAuthFlag !== null ? xmlFields.UsrAuthFlag : null,
            "OPDESCR": xmlFields.OpDescr !== "" && xmlFields.OpDescr !== null ? xmlFields.OpDescr : null,
            "OPTIONS": xmlFields.Options !== "" && xmlFields.Options !== null ? xmlFields.Options : null,
            "ANTIFRAUD": xmlFields.Antifraud !== "" && xmlFields.Antifraud !== null ? xmlFields.Antifraud : null,
            "PRODUCTREF": xmlFields.ProductRef !== "" && xmlFields.ProductRef !== null ? xmlFields.ProductRef : null,
            "NAME": xmlFields.Name !== "" && xmlFields.Name !== null ? xmlFields.Name : null,
            "SURNAME": xmlFields.Surname !== "" && xmlFields.Surname !== null ? xmlFields.Surname : null,
            "TAXID": xmlFields.TaxID !== "" && xmlFields.TaxID !== null ? xmlFields.TaxID : null,
            "CREATEPANALIAS": xmlFields.CreatePanAlias !== "" && xmlFields.CreatePanAlias !== null ? xmlFields.CreatePanAlias : null,
            "INPERSON": xmlFields.InPerson !== "" && xmlFields.InPerson !== null ? xmlFields.InPerson : null,
            "MERCHANTURL": xmlFields.MerchantURL !== "" && xmlFields.MerchantURL !== null ? xmlFields.MerchantURL : null

        }

        if (auth3DSStep1.isMasterPass && data3DSInstance) {
            let xml3DS = data3DSObj.xml3DS;
            let masterPass = data3DSObj.xmlMasterPass;
            macObject.SERVICE = xml3DS.Service;
            macObject.XID = xml3DS.Xid;
            macObject.CAVV = xml3DS.CAVV;
            macObject.ECI = xml3DS.Eci;
            macObject.PP_AUTHENTICATEMETHOD = masterPass.PP_AuthenticateMethod;
            macObject.PP_CARDENROLLMETHOD = masterPass.PP_CardEnrollMethod;

        }

        xmlRequest.MAC = encoder.getMAC(macObject);
        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'AuthorizationRequest', data3DSInstance);
    }

    build3DSStep2AuthRequest = (
         headerItem, auth3DS12item, encoder
    ) => {
        const auth3DSStep2Request = require('../request/Auth3DSStep2Request');
        const Header = require('../request/Header');

        let header = headerItem;
        let auth3DSStep2 = auth3DS12item;

        let xmlRequest = {

            "Operation": "AUTHORIZATION3DSSTEP2",
            "Timestamp": new Date().toISOString().substring(0, 23),
            "MAC": ""
        }

        header.ReqRefNum = reqRef.generator(xmlRequest.Timestamp);

        let xmlHeader = {

            "ShopID": header.ShopID,
            "OperatorID": header.OperatorID,
            "ReqRefNum": header.ReqRefNum

        }


        let xmlFields = {

            "OriginalReqRefNum": auth3DSStep2.originalReqRefNum,
            "Acquirer": auth3DSStep2.acquirer,
            "PaRes": auth3DSStep2.paRes,
            "Options": auth3DSStep2.options,

        }

        let macObject = {
            "OPERATION": xmlRequest.Operation,
            "TIMESTAMP": xmlRequest.Timestamp,
            "SHOPID": xmlHeader.ShopID,
            "OPERATORID": xmlHeader.OperatorID,
            "REQREFNUM": xmlHeader.ReqRefNum,
            "ORIGINALREQREFNUM": xmlFields.OriginalReqRefNum,
            "PARES": xmlFields.PaRes,
            "ACQUIRER": xmlFields.Acquirer !== "" && xmlFields.Acquirer !== null ? xmlFields.Acquirer : null

        }

        xmlRequest.MAC = encoder.getMAC(macObject);

        xmlFields.PaRes = decodeURI(xmlFields.PaRes);

        return this.xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Authorization3DS');

    }

    buildBPWXmlRequest = (requestDataXml) => {

        let xmlBody = "";

        xmlBody = "\n" + x.populateSingleXMLElement('BPWXmlRequest', "\n" + x.populateSingleXMLElement('Release', '02') + "\n" + requestDataXml + "\n");

        return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' + xmlBody;

    }
    
    getHtmlPaymentDocument = (paymentInfos, urlApos, templatePath = "", data3DSJson = null, encoder) => {

        const paymentInfo = require('../request/PaymentInfo');
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

        if (typeof paymentInfo.data3DSJson !== 'undefined' && paymentInfo.data3DSJson !== null) {
            myObject['3DSDATA'] = aesEncoder(key, JSON.stringify(paymentInfo.data3DSJson));

        }

        myObject['MAC'] = encoder.getMAC(myObject);
        myObject['URLBACK'] = paymentInfo.urlBack;

        if (paymentInfo.notCompulsoryFields.LANG) {
            myObject.LANG = paymentInfo.notCompulsoryFields.LANG;
        }
        if (paymentInfo.notCompulsoryFields.SHOPEMAIL) {
            myObject.SHOPEMAIL = paymentInfo.notCompulsoryFields.SHOPEMAIL;
        }


        return HtmlGenerator.htmlToBase64(templatePath, urlApos, myObject);


    }

    tokenizeCard = (shopId, urlBack, urlDone, urlMs, urlApos, templatePath = "") => {
        const paymentInfo = require('../request/PaymentInfo');
        const HtmlGenerator = require('../utils/HTMLGenerator');

        paymentInfo.amount = '10';
        paymentInfo.currency = '978';
        paymentInfo.orderId = 'Virtualizza Carta';
        paymentInfo.shopId = shopId;
        paymentInfo.urlBack = urlBack;
        paymentInfo.urlDone = urlDone;
        paymentInfo.urlMs = urlMs;
        paymentInfo.accountingMode = 'D';
        paymentInfo.authorMode = 'I';
        paymentInfo.nonCompulsoryFields = {'OPTIONS': 'GM'};

        return HtmlGenerator.htmlToBase64(templatePath, urlApos, paymentInfo);

    }

    injectHtmlTemplate = (base64TemplateString, delay, filePath) => {
        const base64ToHtml = require('../utils/HTMLGenerator').base64ToHtml;

        let html = base64ToHtml(base64TemplateString, delay);

        try {
            let stream = fs.createWriteStream(filePath);
            stream.once('open', function (fd) {
                stream.end(html);

                fs.access(filePath, fs.F_OK, (err) => {
                    if (err) {
                        err.message = "something went wrong during the file creation"
                        throw err;
                    }

                })
            })

        } catch (e) {
           console.log(e.message)
        }

    }

}
module.exports = RequestBuilder;

