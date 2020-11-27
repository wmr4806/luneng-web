/**
 * token 工具类
 */

import Cookies from 'js-cookie'
import { createSocket, onClose } from '@/utils/websocket'
const TokenKey = 'Admin-Token'
const UserId = 'userId'

export function getToken() {
  if (Cookies.get(TokenKey)) {
    createSocket(Cookies.get(UserId))
    return Cookies.get(TokenKey)
  }
  return false
}

export function setToken(token, userId) {
  if (Cookies.set(TokenKey, token) && Cookies.set(UserId, userId)) {
    createSocket(userId)
    return Cookies.set(TokenKey, token)
  }
  return false
}

export function removeToken() {
  if (Cookies.remove(TokenKey) && Cookies.remove(UserId)) {
    onClose()
    return Cookies.remove(TokenKey)
  }
  return false
}
