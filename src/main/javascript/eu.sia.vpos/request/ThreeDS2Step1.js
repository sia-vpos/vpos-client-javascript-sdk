class ThreeDS2Step1{

    ThreeDSTransID;
    ThreeDsMtdComplInd;

    constructor(ThreeDSTransID, ThreeDsMtdComplInd) {
        this.ThreeDSTransID = ThreeDSTransID;
        this.ThreeDsMtdComplInd = ThreeDsMtdComplInd.match('([Y]|[N]){1}') ? ThreeDsMtdComplInd : null;
    }


}

module.exports = ThreeDS2Step1;