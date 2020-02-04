class BPWXmlResponse{

    release;
    request;
    data;

    get release() {
        return this.release;
    }

    set release(value) {
        this.release = value;
    }

    get request() {
        return this.request;
    }

    set request(request) {
        this.request = request;
    }

    get data() {
        return this.data;
    }

    set data(data) {
        this.data = data;
    }

    toString(){
        return "Release: " + this.release + "\nRequest: " + this.request.toString() + "\nData: " + this.data.toString();
    }
}

module.exports = BPWXmlRequest;