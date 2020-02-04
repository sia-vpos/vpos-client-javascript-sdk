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
            if ( myObject[field] !== "" && myObject[field] !== undefined) {
                console.log("Key: " + field + " Value: " + myObject[field])
                myString += appendField(myObject[field], field.toUpperCase());
            }
        });

       myString = myString.substring(1);
       console.log(myString);
       const hmac = crypto.createHmac(algorithm, key);
       hmac.update(myString, "utf8");
       return hmac.digest("hex");

    }


   function getMAC256(myObject, key ) {
      let item = myObject;
       return getMAC(algorithms.algos.HMAC_SHA_256, item, key)
   };

   function getMAC512(myObject, key){
       let item = myObject;
       return getMAC(algorithms.algos.HMAC_SHA_512, item, key)
   }

    module.exports = {
        getMAC256 : getMAC256,
        getMAC512 : getMAC512

    }



