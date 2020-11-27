import request from '@/utils/request'

export const getBIM = () => {
  return request.get('/')
}
