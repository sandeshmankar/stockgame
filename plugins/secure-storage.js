import config from "../config/config.global";

const CryptoJS = require("crypto-js");
const SecureStorage = require("secure-web-storage");

const SECRET_KEY = config.secureStorageSecretKey;

const secureStorage = new SecureStorage(localStorage, {  
  hash: function hash(key) {
    // Encrypt key
    key = CryptoJS.SHA256(key, SECRET_KEY);
    return key.toString();
  },
  encrypt: function encrypt(data) {
    // Encrypt the value stored with key-value pair in local storage
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);
    data = data.toString();
    return data;
  },
  decrypt: function decrypt(data) {
    // Decrypt the value with the key-value pair in local storage
    try {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    } catch (ex) {
      // If the user edits the vuex state in local storage(the vuex state data will get invalid)
      console.log(ex);
    }
  }
});

export default secureStorage;
