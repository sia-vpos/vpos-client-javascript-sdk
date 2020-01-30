const COFException = require("./exception/COFException");
const fs = require("fs");
const FORM_PATTERN = "PGZvcm0gYWN0aW9uPSJbQVBPU19VUkxdIiBtZXRob2Q9IlBPU1QiPjxpbnB1dCBuYW1lPSJQQUdFIiB0eXBlPSJoaWRkZW4iIHZhbHVlPSJMQU5EIj5bUEFSQU1FVEVSU108aW5wdXQgaWQ9InN1Ym1pdCIgc3R5bGU9ImRpc3BsYXk6IG5vbmU7IiB0eXBlPXN1Ym1pdCAgdmFsdWU9Ii4iPjwvZm9ybT4=";
const INPUT_PATTERN = "PGlucHV0IHR5cGU9ImhpZGRlbiIgbmFtZT0iS0VZIiB2YWx1ZT0iVkFMVUUiPg==";
const SCRIPT = "PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTt9LCBbREVMQVldKTt9PC9zY3JpcHQ+";
const HTML_PATH = "..\\resources\\default.html";
const CUSTOM_HTML_PATH = "";


function htmlToBase64(isCustomHTML, urlApos, params){
    let html = "";
    let path =  typeof isCustomHTML === "boolean" && isCustomHTML ? CUSTOM_HTML_PATH : HTML_PATH;
            try {
                html = fs.readFileSync(path);
            } catch (e) {
                console.log("inside HTMLGenerator's htmlToBase64 function");
                throw COFException.constructor(e.message);
            }

    return Buffer.from(html.toString()
                           .replace("[APOS_URL]", urlApos)).toString()
                           .replace("[PARAMETERS]", generateParamsHTML(params))
                           .toString("base64");
}

function base64ToHtml(base64, delay){
    let html = Buffer.from(base64, "base64").toString();
    let decodedFormPattern = Buffer.from(FORM_PATTERN, "base64").toString();
    let decodedScript = Buffer.from(SCRIPT, "base64").toString();


    html = html.replace("</body>", decodedFormPattern + "</body>");
    html = html.replace("</html>", decodedScript + "</html>");
    html = html.replace("[DELAY]", delay.toString());

    return html;

}


function generateParamsHTML(params){
    let result = "";
    let decodedInputPattern = Buffer.from(INPUT_PATTERN, "base64").toString();
    Object.keys(params).forEach(function(key){
        if(params[key] !== null && params[key] !== undefined && params[key].trim() !== ""){
            let toAppend = decodedInputPattern.replace("KEY", key)
                .replace("VALUE", params[key]);
                result += toAppend;
        }
    })
    return result;
}
 module.exports = {
    htmlToBase64 : htmlToBase64(),
    base64ToHtml : base64ToHtml()

  }
