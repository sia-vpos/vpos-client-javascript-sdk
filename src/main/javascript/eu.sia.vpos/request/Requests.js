const ThreeDSStep0 = require('./ThreeDS2Step0');
const ThreeDSStep1 = require('./ThreeDS2Step1');
const ThreeDSStep2 = require('./ThreeDS2Step2');
const CaptureRequest = require('./CaptureRequest');
const ThreeDSData = require('./ThreeDSData');
const GeneralRequest = require('./GeneralRequest');
const Header = require('./Header');
const PaymentInfo = require('./PaymentInfo');
const Request = require('./Request');
const StatusRequest = require('./StatusRequest');

module.exports = {

    Header: Header,
    ThreeDSStep0: ThreeDSStep0,
    ThreeDSStep1: ThreeDSStep1,
    ThreeDSStep2: ThreeDSStep2,
    ThreeDSData: ThreeDSData,
    PaymentInfo: PaymentInfo,
    CaptureRequest: CaptureRequest,
    GeneralRequest: GeneralRequest,
    Request: Request,
    StatusRequest: StatusRequest

}