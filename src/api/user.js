import request from '@/utils/request'

export function login(params) {
  const obj = {
    url: '/auth/login',
    params: params
  }
  return request.jsonPost(obj)
}

export function getInfo(token) {
  const obj = {
    url: '/auth/getUserInfo',
    params: token
  }
  return request.jsonPost(obj)
}

export function logout(params) {
  const obj = {
    url: '/auth/logout',
    params: params
  }
  return request.jsonGet(obj)
}
