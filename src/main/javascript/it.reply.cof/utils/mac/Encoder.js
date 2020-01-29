'use strict';
//"working" draft
    const crypto = require("crypto");

   let getMAC = function ( myObject, key){
        let myString = "";

       let appendField = function (value, key){
           let result = "";
           if(key === undefined || key === null || key === ""){
               if(value !== null &&  value.trim() !== ""){
                   result += ("&")
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
                myString += appendField(myObject[field], key);
            }
            myString = myString.substring(1);

        });
       const hmac = crypto.createHmac("sha256", key);
       console.log("myString: " + myString);
       hmac.update(myString, "utf8");
       return hmac.digest("hex");

    }


    let prova = {
        test : "prova",

        macFields : ["test"]
    }


    console.log("finally: " + getMAC(prova, "chiave"));





