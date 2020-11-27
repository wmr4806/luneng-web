import request from '@/utils/request'

// export const getbim = () => {
//   return request({
//     baseURL: 'http://192.168.1.119:8071/public-gateway',
//     url: '/manage/getDongFloorId',
//     method: 'get'
//   })
// }
export const getfloors = (pid) => {
  return request({
    // baseURL: 'http://192.168.1.119:8071/public-gateway',
    url: `/manage/getFloor?pid=${pid}`,
    method: 'get'
  })
}

// export const getfloor = data => {
//   return request({
//     baseURL: 'http://192.168.1.125:8071/public-gateway',
//     url: '/opc/getAHUList',
//     method: 'post',
//     data: data
//   })
// }
export const getfloor1 = () => {
  return request({
    // baseURL: 'http://192.168.1.125:8071/public-gateway',
    url: '/opc/selectAHUList1',
    method: 'get'
  })
}
export const getfloor2 = () => {
  return request({
    // baseURL: 'http://192.168.1.125:8071/public-gateway',
    url: '/opc/selectCountElectricalHistory12',
    method: 'get'
  })
}

export const findauth = () => {
  return request({
    // baseURL: 'http://192.168.1.119:8071/public-gateway',
    url: '/auth/findAllStatusIsUntreated',
    method: 'get'
  })
}

