import CryptoJS from 'crypto-js'

const KEY = CryptoJS.enc.Utf8.parse('0000000000000000')
const IV = CryptoJS.enc.Utf8.parse('0000000000000000')
/**
 * AES加密
 * 参数加密方式
 * @return String
 */
export function Encrypt(param) {
  const paramCrypto = CryptoJS.enc.Utf8.parse(JSON.stringify(param))
  const encrypted = CryptoJS.AES.encrypt(paramCrypto, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES解密
 * 参数解密方式
 * @return String
 */
export function Decrypt(param) {
  const paramCrypto = CryptoJS.enc.Utf8.parse(JSON.stringify(param))
  const decrypt = CryptoJS.AES.decrypt(paramCrypto, KEY, {
    iv: IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7 })
  return CryptoJS.enc.Base64.stringify(decrypt.ciphertext)
}
