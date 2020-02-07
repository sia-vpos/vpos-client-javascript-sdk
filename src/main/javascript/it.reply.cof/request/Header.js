class Header{

    ShopID;
    OperatorID;
    ReqRefNum;



    constructor(ShopID, OperatorID, ReqRefNum){
        this.ShopID = ShopID;
        this.OperatorID = OperatorID;
        this.ReqRefNum = ReqRefNum;

        return this;
    }

    //Setters
    setShopID(ShopID){
        this.ShopID = ShopID;
    }
    setOperatorID(OperatorID){
        this.OperatorID = OperatorID;
    }
    setReqRefNum(ReqRefNum){
        this.ReqRefNum = ReqRefNum;
    }

    //Getters
    getShopID(){
        return this.ShopID
    }
    getOperatorID(){
        return this.OperatorID
    }
    getReqRefNum(){
        return this.ReqRefNum
    }

    toString(){
        return "ShopID: " + this.ShopID + " OperatorID: " + this.OperatorID + " ReqRefNum: " + this.ReqRefNum;

    }
}

module.exports = Header;