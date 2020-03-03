const COFException = require("./VPosClientException");
const fs = require("fs");
const FORM_PATTERN = "PGZvcm0gYWN0aW9uPSJbQVBPU19VUkxdIiBtZXRob2Q9IlBPU1QiPjxpbnB1dCBuYW1lPSJQQUdFIiB0eXBlPSJoaWRkZW4iIHZhbHVlPSJMQU5EIj5bUEFSQU1FVEVSU108aW5wdXQgaWQ9InN1Ym1pdCIgc3R5bGU9ImRpc3BsYXk6IG5vbmU7IiB0eXBlPXN1Ym1pdCAgdmFsdWU9Ii4iPjwvZm9ybT4=";
const INPUT_PATTERN = "PGlucHV0IHR5cGU9ImhpZGRlbiIgbmFtZT0iS0VZIiB2YWx1ZT0iVkFMVUUiPg==";
const SCRIPT = "PHNjcmlwdCB0eXBlPSJ0ZXh0L2phdmFzY3JpcHQiPndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0JykuY2xpY2soKTt9LCBbREVMQVldKTt9PC9zY3JpcHQ+";
const HTML_PATH = ".\\resources\\default.html";
const defaultHTML = "<div><form id=\"myForm\"action=\"[APOS_URL]\" method=\"POST\"><input name=\"PAGE\" type=\"hidden\" value=\"LAND\">[PARAMETERS]</form><script>document.getElementById('myForm').submit();</script></div>";


function htmlToBase64(urlPayment, params) {
    let html = defaultHTML;

    return Buffer.from(Buffer.from(html.toString()
        .replace("[APOS_URL]", urlPayment)).toString()
        .replace("[PARAMETERS]", generateParamsHTML(params)))
        .toString('base64');
}

function base64ToHtml(base64, delay) {
    let html = Buffer.from(base64, "base64").toString();
    let decodedFormPattern = Buffer.from(FORM_PATTERN, "base64").toString();
    let decodedScript = Buffer.from(SCRIPT, "base64").toString();


    html = html.replace("</body>", decodedFormPattern + "</body>");
    html = html.replace("</html>", decodedScript + "</html>");
    html = html.replace("[DELAY]", delay.toString());

    return html;

}


function generateParamsHTML(params) {
    let result = "";
    let decodedInputPattern = Buffer.from(INPUT_PATTERN, "base64").toString();
    Object.keys(params).forEach(function (key) {
        if (params[key] !== null && typeof params[key] === 'string' && params[key] !== "") {
            let toAppend = decodedInputPattern.replace("KEY", key)
                .replace("VALUE", params[key]);
            result += toAppend;
        }
    })
    return result;
}

module.exports = {
    htmlToBase64: htmlToBase64,
    base64ToHtml: base64ToHtml

}
