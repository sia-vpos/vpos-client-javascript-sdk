class BPWXmlResponse{

    constructor() {
        /*
        *no args constructor
         **/
    }

    #timestamp;
    #result;
    #mac;
    #data;


    get timestamp() {
        return this.#timestamp;
    }

    set timestamp(value) {
        this.#timestamp = value;
    }

    get result() {
        return this.#result;
    }

    set result(result) {
        this.#result = result;
    }

    get mac() {
        return this.#mac;
    }

    set mac(mac) {
        this.#mac = mac;
    }

    get data() {
        return this.#data;
    }

    set data(data) {
        this.#data = data;
    }

    toString(){
        return "Timestamp: " + this.#timestamp + " Result: " + this.#result + " MAC: " + this.#mac + "\nData:" +
                this.#data.toString() ;

    }
}