class AESEncoder{

     const CHARSET = "UTF_8";
     const ENCRYPTION = "AES";
     const ALGORITHM = "AES/CBC/PKCS5Padding";

     crypto = require("crypto");

     AESEncoder(){};

    /**
     * @param apiSecretMerchant secret key used to perform encryption
     * @param jsonObject        string representation of a JSON object
     * @return the input string encrypted with the first 16 bytes of the merchant's secret key
     * @throws COFException in case of failure
     */
    encode3DSData(apiSecretMerchant,jsonObject) throws COFException {
    // Initialization vector
    var iv = [, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var buffer = Buffer.alloc(16);

    // AES Key from the API merchant key
    key = apiSecretMerchant.substring(0, 16).byte;
    IvParameterSpec ivParameterSpec = new IvParameterSpec(iv);
    SecretKeySpec secretKeySpec = new SecretKeySpec(key, ENCRYPTION);

    // What we should encrypt
    byte[] toEncrypt = jsonObject.getBytes(CHARSET);

    // Encrypt
    try {
    Cipher cipher = Cipher.getInstance(ALGORITHM);
    cipher.init(Cipher.ENCRYPT_MODE, secretKeySpec, ivParameterSpec);
    byte[] encrypted = cipher.doFinal(toEncrypt);
    // Convert to base64
    return DatatypeConverter.printBase64Binary(encrypted);
}}}