import request from '@/utils/request'

export const getTurnRtspToRtmp = id => {
  return request.post(`/onvif/turnRtspToRtmp`, { id })
}
export const getStopVideo = id => {
  return request.get(`/onvif/stopVideo/${id}`)
}
// 设备管理

// 增
export const getInsretVideo = params => {
  return request.post('/onvif/insertVideo', params)
}
// 删
export const getDeleteVideo = id => {
  return request.post('/onvif/deleteVideo', id)
}
// 改
export const getEditVideo = params => {
  return request.post('/onvif/editVideo', params)
}
// 查
export const getVideoByPageByWhere = params => {
  return request.post('/onvif/getVideoByPageByWhere', params)
}

