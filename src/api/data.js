import request from '@/utils/request'

export const getVAVList = (build, floor, type) => {
  return request.post('/opc/getVAVList', {
    build,
    floor,
    type
  })
}
export const getWarmAHUList = (build, floor) => {
  return request.post('/opc/getAHUList', {
    build,
    floor
  })
}
// 算法
export const getAHUEnableAlgorithm = params => {
  return request.get(`/auth/enableAlgorithm/${params}`)
}
// AHU季节
export const getAHUSwitchSeason = params => {
  return request.get(`/auth/switchSeason/${params}`)
}
export const getEnableNow = () => {
  return request.get('/opc/getEnableNow')
}
// 排风
export const getPFMap = arr => {
  return request.post('/opc/getPFList', arr)
}
export const getHeatSourceList = (build) => {
  return request.get('/opc/getHeatSourceList', {
    params: {
      build
    }
  })
}
export const getColdSourceList = (build) => {
  return request.get('/opc/getColdSourceList', {
    params: {
      build
    }
  })
}
// 电量

export const getSelectElectricalHistoryMonth = () => {
  return request.post('/opc/selectElectricalHistoryMonth')
}

export const getSelectElectrical = (range) => {
  return request.post('/opc/selectElectrical', { range })
}
export const getSelectElectricalHistory = () => {
  return request.get('/opc/selectCountElectricalHistory')
}
export const getSelectElectricalHistoryHour = () => {
  return request.post('/opc/selectElectricalHistoryHour')
}
export const getSelectCurrentTotalElectrical = () => {
  return request.get('/opc/selectCurrentTotalElectrical')
}
export const getSelectElectricalOptions = () => {
  return request.post('/opc/selectElectricalOptions')
}
export const getSelectElectricalOptionsByBuild = () => {
  return request.get('/opc/selectElectricalOptionsByBuild')
}
// 人流
export const getOnlinePeopleCount = () => {
  return request.get('/opc/getOnlinePeopleCount')
}
// 事件态势
export const getEventsCount = () => {
  return request.get('/auth/getEventsCount')
}
// 流量计

export const getAiInfos = () => {
  return request.get('/opc/getAiInfos')
}
// 工单
export const getQueryOrderStats = () => {
  return request.get('/manage/queryOrderStats')
}

export const getTurnRtspToRtmp = id => {
  return request.post(`/onvif/turnRtspToRtmp`, { id })
}

export const getAlmEvents = (build, floor) => {
  return request.get(`/auth/getAlmEvents`, { params: {
    build,
    floor
  }})
}
// 七日人流
export const getAccessLog = () => {
  return request.get('/opc/getAccessLog?type=0')
}

// 车辆
export const getParkingLotInfo = () => {
  return request.get('/manage/getParkingLotInfo')
}
// 事件
export const getEvents = () => {
  return request.get('/auth/getEvents?count=30')
}
// 巡更
export const getQueryPatrolTaskInfoLast7Days = () => {
  return request.get('/manage/queryPatrolTaskInfoLast7Days')
}
// 任务
export const getPatrolSummaryDimensionByDay = () => {
  return request.post('/manage/getPatrolSummaryDimensionByDay')
}
// 天气
export const getWeather = () => {
  return request.get('/manage/weather/cityName')
}
// message
export const getMessage = () => {
  return request.post('/auth/getMessage')
}
// testBigScreen
export const getTest = () => {
  return request.get('/auth/testScreen')
}
