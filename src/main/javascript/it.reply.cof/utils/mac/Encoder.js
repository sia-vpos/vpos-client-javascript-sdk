'use strict';
//"working" draft
    const crypto = require("crypto");
    const algorithms = require("./MacAlgorithms");

   let getMAC = function ( algorithm, myObject, key ){
        let myString = "";
        if(!algorithm || algorithm !== algorithms.algos.HMAC_SHA_512){
            algorithm = algorithms.algos.HMAC_SHA_256;
        }

       let appendField = function (value, key){
           let result = "";
           if(myObject.isResponse){
               if(value !== null &&  value.trim() !== ""){
                   result += ("&");
                   result += value;
               }
               return result;

           }else {
               if (value !== null) {
                   result += "&";
                   result += key;
                   result += "=";
                   result += value;
               }
               return result;
           }
       }

        myObject.macFields.forEach( function(field) {
            if (typeof field !== "function") {
                myString += appendField(myObject[field], field);
            }
        });

       myString = myString.substring(1);
       const hmac = crypto.createHmac(algorithm, key);
       hmac.update(myString, "utf8");
       return hmac.digest("hex");

    }


   function getMAC256(myObject, key ) {
       return getMAC(algorithms.algos.HMAC_SHA_256, myObject, key)
   };

   function getMAC512(myObject, key){
       return getMAC(algorithms.algos.HMAC_SHA_512, myObject, key)
   }

    module.exports = {
        getMAC256 : getMAC256(),
        getMAC512 : getMAC512()

    }



