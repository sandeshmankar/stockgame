import Cookies from "js-cookie";
import config from "../config/config.global";
import CryptoJS from "crypto-js";

const Cookie = Cookies.withConverter({
  read: (value, name) => {
    // Decrypt cookie value
    const decryptValue = CryptoJS.AES.decrypt(
      value,
      config.secureStorageSecretKey
    ).toString(CryptoJS.enc.Utf8);
    return decryptValue;
  },
  write: (value, name) => {
    // Encrypt cookie value
    const encryptValue = CryptoJS.AES.encrypt(
      value,
      config.secureStorageSecretKey
    ).toString();
    return encryptValue;
  }
});

export default Cookie;
