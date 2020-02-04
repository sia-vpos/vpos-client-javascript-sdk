class MasterpassData{

    pp_AuthenticationMethod;
    pp_CardEnrollMethod;

    constructor() {
        /*
         * no args constructor
         * */
    }

    constructor(pp_AuthenticationMethod, pp_CardEnrollMethod) {

        this.pp_AuthenticationMethod = pp_AuthenticationMethod;
        this.pp_CardEnrollMethod = pp_CardEnrollMethod;


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

    toString(){
        return "pp_AuthenticationMethod: " + this.pp_AuthenticationMethod + " pp_CardEnrollMethod: " + this.pp_CardEnrollMethod;

    }

}

module.exports = MasterpassData;