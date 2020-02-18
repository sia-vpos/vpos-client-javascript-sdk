class MasterpassData {

    pp_AuthenticationMethod;
    pp_CardEnrollMethod;

    constructor(pp_AuthenticationMethod, pp_CardEnrollMethod) {

        this.pp_AuthenticationMethod = pp_AuthenticationMethod.match('[MERCHANT ONLY]|[3DS]|[NO AUTHENTICATION]){3,20}') ? pp_CardEnrollMethod : null;
        this.pp_CardEnrollMethod = pp_CardEnrollMethod.match('[Manual]|[Direct Provisioned]|[3DS Manual]|[NFC Tap]){6,20}') ? pp_CardEnrollMethod : null;


    }

    get pp_AuthenticationMethod() {
        return this.pp_AuthenticationMethod;
    }

    set pp_AuthenticationMethod(pp_AuthenticationMethod) {
        this.pp_AuthenticationMethod = pp_AuthenticationMethod;
    }

    get pp_CardEnrollMethod() {
        return this.pp_CardEnrollMethod;
    }

    set pp_CardEnrollMethod(pp_CardEnrollMethod) {
        this.pp_CardEnrollMethod = pp_CardEnrollMethod;
    }

    toString() {
        return "pp_AuthenticationMethod: " + this.pp_AuthenticationMethod + " pp_CardEnrollMethod: " + this.pp_CardEnrollMethod;

    }

}

module.exports = MasterpassData;