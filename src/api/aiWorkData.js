import request from '@/utils/request'

// 设备巡检任务信息接口

export const getDeviceTaskData = (params) => {
  return request.post('/manage/getDeviceTaskData', params)
}

// 新增工单

// export const getCreateOrder = (params) => {
//   return request.post('/manage/createOrder', params)
// }

// 提交过的工单

export const getQueryServiceOrderByCust = (params) => {
  return request.post('/manage/queryServiceOrderByCust', params)
}

// 工单详情

export const getServiceOrderDetailById = (serviceOrderId) => {
  return request.post('/manage/getServiceOrderDetailById', {
    serviceOrderId
  })
}
// 工单跟踪
export const getOrderTrackInfoById = (serviceOrderId) => {
  return request.post('/manage/getOrderTrackInfoById', {
    serviceOrderId
  })
}

// 取消工单

export const getDiscontinueOrder = (parmms) => {
  return request.post('/manage/discontinueOrder', parmms)
}

// 上传图片

export const getUploadImg = (MultipartFile) => {
  return request.post('/manage/upload', {
    MultipartFile
  })
}
