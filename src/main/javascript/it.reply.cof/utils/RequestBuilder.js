const x = require('../utils/XMLUtils');

buildRefundRequest = () => {
    const refundRequest = require('../request/RefudRequest');
    const Header = require('../request/Header');

}

buildConfirmRequest = () => {
    const confirmRequest = require('../request/ConfirmRequest');
    const Header = require('../request/Header');


}

buildBookingRequest = () => {
    const bookingRequest = require('../request/GeneralRequest');
    const Header = require('../request/Header');

}

buildOrderStatusRequest = (shopid, operatorid, reqRefNum, originalReqRefNum, orderid, productref, options) => {
    const OrderStatusRequest = require('../request/StatusRequest');
    const Header = require('../request/Header');
    let requestHeader = new Header(shopid, operatorid, reqRefNum);
    let request = new OrderStatusRequest(originalReqRefNum, orderid, productref, options);
    let macFields =
        ["operation",
        "timestamp",
        "shopid",
        "operatorid",
        "originalReqRefNum",
        "orderid",
        request.getOptions() !== "" ? "options" : "",
        request.getProductRef() !== "" ? "productRef" : ""
        ];

    let XMLRequest = (key) => {

        return x.tagOpener('BPWXmlRequest') +
            x.populateSingleXMLElement('Release', '02') +
            x.tagOpener('Request') +
            x.populateSingleXMLElement('Operation', 'ORDERSTATUS') +
            x.populateSingleXMLElement('Timestamp', request.timestamp) +
            x.populateSingleXMLElement('MAC', encoder.getMAC256(this, key)) + //fix encoder
            x.tagCloser('Request') +
            x.tagOpener('Data') +
            x.tagOpener('OrderStatus') +
            x.tagOpener('Header') +
            x.populateSingleXMLElement('ShopID', this.shopid) +
            x.populateSingleXMLElement('OperatorID', this.operatorid) +
            x.populateSingleXMLElement('originalReqRefNum', this.originalReqRefNum) +
            x.tagCloser('Header') +
            x.populateSingleXMLElement('OrderID', this.orderid) +
            (this.productRef !== "" ? x.populateSingleXMLElement('ProductRef', this.productRef) : "") +
            x.tagCloser('OrderStatus') +
            (this.options !== "" ? x.populateSingleXMLElement('Options', this.options) : "") +
            x.tagCloser('Data') +
            x.tagCloser('BPWXmlRequest');
    }
}

buildVerifyRequest = () => {
    const verifyRequest = require('../request/StatusRequest');
    const Header = require('../request/Header');


}

buildAuth3DSStep1Request = () => {
    const auth3DSStep1Request = require('../request/Auth3DSStep1Request');
    const Header = require('../request/Header');

}

build3DSStep2AuthRequest = () => {
    const auth3DSStep2Request = require('../request/Auth3DSStep2Request');
    const Header = require('../request/Header');


}

getBPWXmlRequest = () => {
    const BPWXmlRequest = require('../request/BPWXmlRequest');

}