class Header {

    ShopID;
    OperatorID;
    ReqRefNum;


    constructor(ShopID, OperatorID) {
        this.ShopID = ShopID.match('[0-9]{15}') ? ShopID : null;
        this.OperatorID = OperatorID.match('[a-zA-Z0-9\\s]{8,18}') ? OperatorID : null;

        return this;
    }

    setShopID(ShopID) {
        this.ShopID = ShopID;
    }

    setOperatorID(OperatorID) {
        this.OperatorID = OperatorID;
    }

    setReqRefNum(ReqRefNum) {
        this.ReqRefNum = ReqRefNum;
    }

    getShopID() {
        return this.ShopID
    }

    getOperatorID() {
        return this.OperatorID
    }

    getReqRefNum() {
        return this.ReqRefNum
    }

    toString() {
        return "ShopID: " + this.ShopID + " OperatorID: " + this.OperatorID + " ReqRefNum: " + this.ReqRefNum;

    }
}

module.exports = Header;