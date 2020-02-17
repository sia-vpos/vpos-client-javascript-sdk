const paymentClient = require('../utils/APOSPaymentClient').aposProxyClientSetup;
const aposCaller = require('../utils/APOSPaymentClient').aposCaller;
const RequestBuilder = require('../utils/RequestBuilder');
const Encoder = require('../utils/Encoder');
const fromXML = require('../utils/XMLUtils').fromXML;
const VPOSClientStandard = require ('./VPOSClientStandard');
const Header = require('../request/Header');
const Auth3DS = require('../request/Auth3DSStep1Request');
const startKey = 'E-vmE-GHXmx73-Lfg24LztZ-7-yCyVsKn4QXphL5qzf-Kr-Cf-JWpZwZgaZRA5dR9V677xL4uCbc-Ce--8h2-tdrSu--QKjF-nZh';


class VPOSClientWithProxy  extends VPOSClientStandard{

    constructor(urlAPI ,algorithm, secretKey, proxyName, proxyPort) {
        super(urlAPI, algorithm, secretKey);
        this.options = paymentClient(urlAPI, proxyName, proxyPort);
    }



}

let VPOS = new VPOSClientWithProxy('https://atpostest.ssb.it/atpos/apibo/apiBOXML.app', 'sha256', startKey,'proxy-dr.reply.it' , '8080');

const headerItem = new Header('129281292800109', 'John Doe');
const dataItem = new Auth3DS(false, '103456669541456081', '0000409500729966732', '111',
    '2112', '2000', '978', '1', 'I', '98', 'http://jnfjdshjfhjd.it');
    VPOS.start3dsAuth(headerItem, dataItem, null);