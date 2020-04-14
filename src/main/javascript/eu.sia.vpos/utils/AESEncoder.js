crypto = require("crypto");


/**
 * @param apiSecretMerchant secret key used to perform encryption
 * @param jsonObject        string representation of a JSON object
 * @return the input string encrypted with the first 16 bytes of the merchant's secret key
 * @throws COFException in case of failure
 */

aesEncrypt = (key, str) => {

    let bitkey = key.substring(0, 16);
    let iv = Buffer.alloc(16);
    const cipher = crypto.createCipheriv('aes-128-cbc', bitkey, iv);
    let crypt = cipher.update(str, 'utf8', 'base64');
    crypt += cipher.final("base64");
    return crypt;

}

module.exports = aesEncrypt;