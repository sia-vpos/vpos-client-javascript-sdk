const x = require('../utils/XMLUtils');
const encode = require('../utils/Encoder');
const encoder = new encode;

buildRefundRequest = () => {
    const refundRequest = require('../request/RefudRequest');
    const Header = require('../request/Header');

    let refund = new refundRequest();
    let header = new Header();
    let xmlBody = "";
    let xmlBuffer = "";

    let xmlRequest = {

        "Operation": "REFUND",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256()
    }


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
        "opDescr": refund.opDescr !== "" ? refund.opDescr : "",
        "Options": refund.options !== "" ? refund.options : ""

    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Refund');

}

buildConfirmRequest = () => {
    const confirmRequest = require('../request/ConfirmRequest');
    const Header = require('../request/Header');

    let confirm = new confirmRequest();
    let header = new Header();
    let xmlBody = "";
    let xmlBuffer = "";

    let xmlRequest = {

        "Operation": "DEFERREDREQUEST",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256()

    }

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
        "Options": confirm.options
    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'DeferredRequest');


}

buildBookingRequest = () => {
    const bookingRequest = require('../request/GeneralRequest');
    const Header = require('../request/Header');

    let booking = new bookingRequest();
    let header = new Header();

    let xmlRequest = {

        "Operation": "ACCOUNTING",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256()

    }

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

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Accounting');

}

buildOrderStatusRequest = (shopid, operatorid, reqRefNum, originalReqRefNum, orderid, productref, options) => {
    const OrderStatusRequest = require('../request/StatusRequest');
    const Header = require('../request/Header');

    let header = new Header(shopid, operatorid, reqRefNum);
    let orderStatus = new OrderStatusRequest(originalReqRefNum, orderid, productref, options);

    let xmlRequest = {

        "Operation": "ORDERSTATUS",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256(),

    }

    let xmlHeader = {

        "ShopID": header.ShopID,
        "OperatorID": header.OperatorID,
        "ReqRefNum": header.ReqRefNum,

    }

    let xmlFields = {

        "OrderID": orderStatus.orderID,
        "ProductRef": orderStatus.productRef,
        "Options ": orderStatus.options

    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'OrderStatus')

}

buildVerifyRequest = (key,) => {
    const verifyRequest = require('../request/StatusRequest');
    const Header = require('../request/Header');
    const encoder = require('../utils/Encoder');

    let header = new Header();
    let verifyRequestInstance = new verifyRequest();

    let xmlRequest = {

        "Operation": "VERIFY",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256(key),

    }

    let xmlHeader = {

        "ShopID": header.ShopID,
        "OperatorID": header.OperatorID,
        "ReqRefNum": header.ReqRefNum,

    }

    let xmlFields = {

        "OriginalReqRefNum": verifyRequestInstance.originalReqRefNum,
        "Options": verifyRequestInstance.options

    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'VerifyRequest');

}
buildData3DS = () => {
    const data3DS = require('../request/data3DS');
    const masterpassData = require('../request/MasterpassData');
    let data3DSInstance = new data3DS();
    let masterpassDataInstance = new masterpassData();

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
buildAuth3DSStep1Request = (data3DSObj = null) => {
    const auth3DSStep1Request = require('../request/Auth3DSStep1Request');
    const Header = require('../request/Header');

    let header = new Header();
    let auth3DSStep1 = new auth3DSStep1Request();
    let data3DSInstance = data3DSObj !== null ? data3DSObj : null;

    let xmlRequest = {
        "Operation": "AUTHORIZATION3DSSTEP1",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256()
    }

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
        "accountingMode": auth3DSStep1.accountingMode,
        "Network": auth3DSStep1.network,
        "EmailCH": auth3DSStep1.emailCH,
        "UserId": auth3DSStep1.userID,
        "OpDescr": auth3DSStep1.opDescr,
        "InPerson": auth3DSStep1.inPerson,
        "MerchantURL": auth3DSStep1.merchantURL,
        "ProductRef": auth3DSStep1.productRef,
        "Name": auth3DSStep1.name,
        "Surname": auth3DSStep1.surname,
        "TaxID": auth3DSStep1.taxID
    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'AuthorizationRequest',data3DSInstance);
}

build3DSStep2AuthRequest = () => {
    const auth3DSStep2Request = require('../request/Auth3DSStep2Request');
    const Header = require('../request/Header');

    let header = new Header();
    let auth3DSStep2 = new auth3DSStep2Request();

    let xmlRequest = {

        "Operation": "AUTHORIZATION3DSSTEP2",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder.getMAC256()

    }

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

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Authorization3DS');

}

getBPWXmlRequest = (requestDataXml) => {
    const BPWXmlRequest = require('../request/BPWXmlRequest');

    let xmlBody = "";

    xmlBody = x.populateSingleXMLElement('Release', '02') + requestDataXml;


    return xmlBody = x.populateSingleXMLElement('BPWXmlRequest', xmlBody);

}

xmlBodyBuilder = (xmlRequest, xmlHeader, xmlFields, requestName, masterPass = null) => {

    let xmlBody = "";
    let xmlBuffer = "";

    xmlRequest.getOwnPropertyNames((key) => {
        xmlBody += x.populateSingleXMLElement(key, xmlRequest[key])
    })

    xmlBody = x.populateSingleXMLElement('Request', xmlBody);

    xmlHeader.getOwnPropertyNames((key) => {
        xmlBuffer += x.populateSingleXMLElement(key, xmlHeader[key]);
    })

    xmlBuffer = x.populateSingleXMLElement('Header', xmlBuffer);

    if (masterPass) {

        let xml3DS = "";
        let xmlMasterpass = "";

        masterPass.xml3DS.getOwnPropertyNames((key) => {
            xml3DS += x.populateSingleXMLElement(key, xml3DS[key])
        });

        xml3DS = x.populateSingleXMLElement('Data3DS', xml3DS);

        masterPass.xmlMasterPass.getOwnPropertyNames((key) => {
            xmlMasterpass += x.populateSingleXMLElement(key, xmlMasterpass[key])
        })

        xmlMasterpass = x.populateSingleXMLElement('MasterpassData', xmlMasterpass);

        xmlBuffer = xml3DS + xmlMasterpass;
    }


    xmlFields.getOwnPropertyNames((key) => {
        if (xmlFields[key] !== "")
            xmlBuffer += x.populateSingleXMLElement(key, xmlFields[key]);
    })

    xmlBuffer = x.populateSingleXMLElement('Data', x.populateSingleXMLElement(requestName, xmlBuffer));

    return xmlBody += xmlBuffer;


}