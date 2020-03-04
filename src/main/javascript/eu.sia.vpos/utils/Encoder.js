'use strict';
const crypto = require("crypto");

class Encoder {

    algorithm;
    key;

    constructor(algorithm, key) {
        this.algorithm = algorithm;
        this.key = key;

    }

    get algorithm() {
        return this.algorithm
    }

    set algorithm(value) {
        this.algorithm = value;
    }

    get key() {
        return this.key;
    }

    set key(value) {
        this.key = value;
    }

    getMAC = function (myObject) {
        let myString = "";
        try {
            let appendField = function (value, key) {
                let result = "";
                if (Array.isArray(myObject)) {
                    if (value !== null) {
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
                    if (field !== 'length')
                        myString += appendField(myObject[field], field.toUpperCase());
                }
            });

            let that = this;

            myString = myString.substring(1);
            const hmac = crypto.createHmac(that.algorithm, that.key);
            hmac.update(myString, "utf8");
            return hmac.digest("hex");
        } catch (e) {
            throw new Error('Something went wrong while calculating the MAC');
        }
    }


}


module.exports = Encoder;