const CHARSET = "UTF_8";
const ENCRYPTION = "AES";
const ALGORITHM = "AES/CBC/PKCS5Padding";
const key = 'E-vmE-GHXmx73-Lfg24LztZ-7-yCyVsKn4QXphL5qzf-Kr-Cf-JWpZwZgaZRA5dR9V677xL4uCbc-Ce--8h2-tdrSu--QKjF-nZh'
crypto = require("crypto");


/**
 * @param apiSecretMerchant secret key used to perform encryption
 * @param jsonObject        string representation of a JSON object
 * @return the input string encrypted with the first 16 bytes of the merchant's secret key
 * @throws COFException in case of failure
 */

aesEncrypt = (key, str) => {

    let bitkey = key.substring(0, 16);
    let iv = '0000000000000000';
    console.log(bitkey);
    const cipher = crypto.createCipheriv('aes-128-cbc', bitkey, iv);
    let crypt = cipher.update(str, 'utf8', 'base64');
    crypt += cipher.final("base64");
    crypt = crypt.replace(/\+/g, "");
    return crypt;

}

module.exports = aesEncrypt;