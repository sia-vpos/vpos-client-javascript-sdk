'use strict';
const crypto = require("crypto");
const algorithms = require("./MacAlgorithms");

class Encoder{

    algorithm;
    key;

    constructor(algorithm, key) {
        this.algorithm = algorithm;
        this.key = key;

    }

    set algorithm(value){
        this.algorithm = value;
    }

    get algorithm(){
        return this.algorithm
    }

    set key(value){
        this.key = value;
    }

    get key(){
        return this.key;
    }

     getMAC = function (myObject) {
        let myString = "";

        let appendField = function (value, key) {
            let result = "";
            if (Array.isArray(myObject)) {
                if (value !== null && value !== "") {
                    result += ("&");
                    result += value;
                }
                return result;

            } else {
                if (value !== null) {
                    result += "&";
                    result += key;
                    result += "=";
                    result += value;
                }

                return result;
            }
        }

        Object.getOwnPropertyNames(myObject).forEach(function (field) {
            if (myObject[field] !== null && typeof myObject[field] !== 'undefined') {
                if(field !== 'length')
                myString += appendField(myObject[field], field.toUpperCase());
            }
        });

        let that = this;

        myString = myString.substring(1);
        console.log("\n" + "MAC string: " + myString + "\n");
        const hmac = crypto.createHmac(that.algorithm, that.key);
        hmac.update(myString, "utf8");
        return hmac.digest("hex");

    }

}





module.exports = Encoder;