import request from '@/utils/request'

export function post(params) {
  return request.jsonPost(params)
}

export function get(params) {
  return request.jsonGet(params)
}
