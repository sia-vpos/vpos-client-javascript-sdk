class Request {

    Operation;
    Timestamp;
    MAC;

    constructor(Operation, Timestamp) {
        this.Operation = Operation;
        this.Timestamp = Timestamp;

    }

    //Setters
    setOperation(Operation) {
        this.Operation = Operation;

    }

    setTimestamp(Timestamp) {
        this.Timestamp = Timestamp;

    }

    setMAC(MAC) {
        this.MAC = MAC;

    }

    //Getters
    getOperation() {
        return this.Operation;

    }

    getTimestamp() {
        return this.Timestamp;

    }

    getMAC() {
        return this.MAC;

    }

    toString() {
        return "Timestamp: " + this.Timestamp + " Operation :" + this.Operation;

    }
}

module.exports = Request;