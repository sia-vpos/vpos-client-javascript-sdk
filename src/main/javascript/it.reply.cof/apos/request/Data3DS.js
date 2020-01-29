class Data3DS{

    #service;
    #eci;
    #xid;
    #cavv;
    #paresStatus;
    #scEnrollStatus;
    #signatureVerification;

    get service() {
        return this.#service;
    }

    set service(service) {
        this.#service = service;
    }

    get eci() {
        return this.#eci;
    }

    set eci(eci) {
        this.#eci = eci;
    }

    get xid() {
        return this.#xid;
    }

    set xid(xid) {
        this.#xid = xid;
    }

    get cavv() {
        return this.#cavv;
    }

    set cavv(cavv) {
        this.#cavv = cavv;
    }

    get paresStatus() {
        return this.#paresStatus;
    }

    set paresStatus(paresStatus) {
        this.#paresStatus = paresStatus;
    }

    get scEnrollStatus() {
        return this.#scEnrollStatus;
    }

    set scEnrollStatus(scEnrollStatus) {
        this.#scEnrollStatus = scEnrollStatus;
    }

    get signatureVerification() {
        return this.#signatureVerification;
    }

    set signatureVerification(signatureVerification) {
        this.#signatureVerification = signatureVerification;
    }

    toString(){
        return "Service: " + this.#service + " Eci: " + this.#eci + " Xid: " + this.#xid + " CAVV: " + this.#cavv
                + "\nParResStatus: " + this.#paresStatus + " ScEnrollStatus: " + this.#scEnrollStatus +
                " SignatureVerification: " + this.#scEnrollStatus;

    }

}