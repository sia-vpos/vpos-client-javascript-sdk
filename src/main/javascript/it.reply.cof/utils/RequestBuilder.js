const x = require('../utils/XMLUtils');
const encoder = ""; //require('../utils/Encoder');

buildRefundRequest = (

    ShopID, OperatorID, ReqRefNum,
    TransactionID, OrderID, Amount, Currency,
    Exponent, OpDescr = "", Options = ""

    ) => {

    const refundRequest = require('../request/GeneralRequest');
    const Header = require('../request/Header');

    let refund = new refundRequest(TransactionID, OrderID, Amount, Currency, Exponent, OpDescr, Options);
    let header = new Header(ShopID, OperatorID, ReqRefNum);
    let xmlBody = "";
    let xmlBuffer = "";

    let xmlRequest = {

        "Operation": "REFUND",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder
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
        "opDescr": refund.opDescr,
        "Options": refund.options

    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'Refund');

}

buildConfirmRequest = (

    ShopID, OperatorID, ReqRefNum,
    TransactionID, OrderID, Amount, Currency,
    Exponent, AccountingMode, CloseOrder,OpDescr = "", Options = ""

    ) => {

    const confirmRequest = require('../request/ConfirmRequest');
    const Header = require('../request/Header');
    let confirm = new confirmRequest(TransactionID, OrderID, Amount, Currency, Exponent, AccountingMode, CloseOrder, OpDescr, Options);
    let header = new Header(ShopID, OperatorID, ReqRefNum);
    let xmlBody = "";
    let xmlBuffer = "";

    let xmlRequest = {

        "Operation": "DEFERREDREQUEST",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder

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

buildBookingRequest = (

    ShopID, OperatorID, ReqRefNum,
    TransactionID, OrderID, Amount, Currency,
    Exponent, OpDescr = "", Options = ""

    ) => {

    const bookingRequest = require('../request/GeneralRequest');
    const Header = require('../request/Header');

    let booking = new bookingRequest(TransactionID, OrderID, Amount, Currency, Exponent, OpDescr, Options);
    let header = new Header(ShopID, OperatorID, ReqRefNum);

    let xmlRequest = {

        "Operation": "ACCOUNTING",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder

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

buildOrderStatusRequest = (

    ShopID, OperatorID, ReqRefNum,
    OriginalReqRefNum, OrderID, ProductRef = "", Options = ""

    ) => {
    const OrderStatusRequest = require('../request/StatusRequest');
    const Header = require('../request/Header');

    let header = new Header(ShopID, OperatorID, ReqRefNum);
    let orderStatus = new OrderStatusRequest(OriginalReqRefNum, OrderID, ProductRef, Options);

    let xmlRequest = {

        "Operation": "ORDERSTATUS",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder

    }

    let xmlHeader = {

        "ShopID": header.ShopID,
        "OperatorID": header.OperatorID,
        "ReqRefNum": header.ReqRefNum,

    }

    let xmlFields = {

        "OrderID": orderStatus.orderid,
        "ProductRef": orderStatus.productRef,
        "Options ": orderStatus.options

    }

    return xmlBodyBuilder(xmlRequest, xmlHeader, xmlFields, 'OrderStatus')

}

buildVerifyRequest = (

    ShopID, OperatorID, ReqRefNum,
    OriginalReqRefNum, OrderID, ProductRef = "", Options = ""

    ) => {
    const verifyRequest = require('../request/StatusRequest');
    const Header = require('../request/Header');
    const encoder = require('../utils/Encoder');

    let header = new Header(ShopID, OperatorID, ReqRefNum);
    let verifyRequestInstance = new verifyRequest(OriginalReqRefNum, OrderID, ProductRef, Options);

    let xmlRequest = {

        "Operation": "VERIFY",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder

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
buildData3DS = (

    Service, Eci, XID, CAVV,
    PaResStatus, ScEnrollStatus, SignatureVerification,
    pp_AuthenticationMethod, pp_CardEnrollMethod

    ) => {
    const data3DS = require('../request/data3DS');
    const masterpassData = require('../request/MasterpassData');
    let data3DSInstance = new data3DS(Service, Eci, XID, CAVV, PaResStatus, ScEnrollStatus, SignatureVerification);
    let masterpassDataInstance = new masterpassData(pp_AuthenticationMethod, pp_CardEnrollMethod);

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

    ShopID, OperatorID, ReqRefNum,
    IsMasterpass = false, OrderID, Pan, CVV2, ExpDate,
    Amount, Currency, Exponent, AccountingMode, Network, EmailCH,
    UserID, Acquirer, IpAddress, UsrAuthFlag, OpDescr, Options,
    Antifraud, ProductRef, Name, Surname, TaxID, CreatePanAlias,
    InPerson, MerchantURL,

    data3DSObj = null

    ) => {
    const auth3DSStep1Request = require('../request/Auth3DSStep1Request');
    const Header = require('../request/Header');

    let header = new Header(ShopID, OperatorID, ReqRefNum);
    let auth3DSStep1 = new auth3DSStep1Request(

        IsMasterpass, OrderID, Pan, CVV2, ExpDate, Amount, Currency,
        Exponent, AccountingMode, Network, EmailCH, UserID, Acquirer,
        IpAddress, UsrAuthFlag, OpDescr, Options, Antifraud, ProductRef, Name,
        Surname, TaxID, CreatePanAlias, InPerson, MerchantURL

    );
    let data3DSInstance = data3DSObj !== null ? data3DSObj : null;

    let xmlRequest = {
        "Operation": "AUTHORIZATION3DSSTEP1",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder
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

build3DSStep2AuthRequest = (

    ShopID, OperatorID, ReqRefNum,
    OriginalReqRefNum, PaRes, Acquirer, Options

) => {
    const auth3DSStep2Request = require('../request/Auth3DSStep2Request');
    const Header = require('../request/Header');

    let header = new Header(ShopID, OperatorID, ReqRefNum);
    let auth3DSStep2 = new auth3DSStep2Request(OriginalReqRefNum, PaRes, Acquirer, Options);

    let xmlRequest = {

        "Operation": "AUTHORIZATION3DSSTEP2",
        "Timestamp": new Date().toISOString().substring(0, 23),
        "MAC": encoder
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

    let xmlBody = "";

    xmlBody = x.populateSingleXMLElement('Release', '02') + requestDataXml;


    return xmlBody = x.populateSingleXMLElement('BPWXmlRequest', xmlBody);

}

xmlBodyBuilder = (xmlRequest, xmlHeader, xmlFields, requestName, masterPass = null) => {

    let xmlBody = "";
    let xmlBuffer = "";

    Object.getOwnPropertyNames(xmlRequest).forEach( key => {
        xmlBody += x.populateSingleXMLElement(key, xmlRequest[key])
    })

    xmlBody = x.populateSingleXMLElement('Request', xmlBody);

    Object.getOwnPropertyNames(xmlHeader).forEach(key => {
        xmlBuffer += x.populateSingleXMLElement(key, xmlHeader[key]);
    })

    xmlBuffer = x.populateSingleXMLElement('Header', xmlBuffer);

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
        if (xmlFields[key] !== "" && xmlFields[key] !== undefined)
            xmlBuffer += x.populateSingleXMLElement(key, xmlFields[key]);
    })

    xmlBuffer = x.populateSingleXMLElement('Data', x.populateSingleXMLElement(requestName, xmlBuffer));

    return xmlBody += xmlBuffer;


}

