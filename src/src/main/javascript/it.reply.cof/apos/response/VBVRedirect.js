class VBVRedirect {

    constructor() {
        /*
        *no args constructor
         **/
    }

    #paReq;
    #acsURL;


    get paReq() {
        return this.#paReq;
    }

    set paReq(paReq) {
        this.#paReq = paReq;
    }

    get acsURL() {
        return this.#acsURL;
    }

    set acsURL(acsURL) {
        this.#acsURL = acsURL;
    }

    toString(){
        return "PaReq: " + this.#paReq + " AcsURL: " + this.#acsURL;
    }
}