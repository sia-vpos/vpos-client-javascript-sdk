const Auth3DSStep1 = require('./Auth3DSStep1Request');
const Auth3DSStep2 = require('./Auth3DSStep2Request');
const ConfirmRequest = require('./ConfirmRequest');
const Data3DS = require('./Data3DS');
const GeneralRequest = require('./GeneralRequest');
const Header = require('./Header');
const MasterpassData = require('./MasterpassData');
const PaymentInfo = require('./PaymentInfo');
const Request = require('./Request');
const StatusRequest = require('./StatusRequest');

module.exports = {

    Header: Header,
    Auth3DSStep1: Auth3DSStep1,
    Data3DS: Data3DS,
    MasterpassData: MasterpassData,
    Auth3DSStep2: Auth3DSStep2,
    ConfirmRequest: ConfirmRequest,
    GeneralRequest: GeneralRequest,
    PaymentInfo: PaymentInfo.PaymentInfo,
    Data3DSJson: PaymentInfo.Data3DSJson,
    Request: Request,
    StatusRequest: StatusRequest

}