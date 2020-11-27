import request from '@/utils/request'
// 获取token
export const getuserABCD = data => {
  return request({
    url: `opc/userABCD?le=${data}`,
    method: 'get'
  })
}
// 电压偏差 获取下拉菜单
export const getdevice = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/device/deviceByTypeIds?buildId=${data.column01}&typeIds=${data.typeIds1}&typeIds=${data.typeIds2}`,
    method: 'get',
    headers: {
      Authorization: data.authorization
    }
  })
}
// 电压偏差 获取下拉菜单的值
export const getspecialLineRate = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/energy/analyze/voltageDeviation/specialLineRate?transformerId=${data.id}&start=${data.startTime}&end=${data.endTime}`,
    method: 'get',
    headers: {
      Authorization: data.token
    }
  })
}
// 电压偏差 获取柱状图的值
export const getqualifiedRate = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/energy/analyze/voltageDeviation/qualifiedRate?buildId=${data.id}&start=${data.startTime}&end=${data.endTime}`,
    method: 'get',
    headers: {
      Authorization: data.token
    }
  })
}
// 电压偏差 获取象形图的值
export const getmaxRate = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/energy/analyze/voltageDeviation/maxRate?buildId=${data.id}&start=${data.startTime}&end=${data.endTime}`,
    method: 'get',
    headers: {
      Authorization: data.token
    }
  })
}
// 负载分析获取变压器列表的值
export const getSorted = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/energy/analyze/transformer/getSortedTransformerLoadRatio`,
    method: 'post',
    headers: {
      Authorization: data.token
    },
    data
  })
}
// 负载分析获取变压曲线的值
export const getCurve = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/energy/analyze/transformer/getCurveTransformerLoadRatio`,
    method: 'post',
    headers: {
      Authorization: data.token
    },
    data
  })
}
// 负载分析 负载率特征值统计
export const getEigenvalue = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/energy/analyze/transformer/getEigenvalueTransformerLoadRatio`,
    method: 'post',
    headers: {
      Authorization: data.token
    },
    data
  })
}

// 用电数据获取列表
export const getdeviceTree = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/deviceTree/buildRoomTree?buildId=${data.id}`,
    method: 'get',
    headers: {
      Authorization: data.token
    }
  })
}
// 用电数据获取数据
export const getelectricity = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/electricity/query/data`,
    method: 'post',
    headers: {
      Authorization: data.token
    },
    data
  })
}
// 能耗分析 各项电量
export const gethistogram = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/analysis/histogram?buildingId=${data.id}&time=${data.time}&type=${data.type}`,
    method: 'get',
    headers: {
      Authorization: data.token
    }
  })
}
// 能耗分析 电量统计
export const getsangji = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/analysis/sangji?buildingId=${data.id}&time=${data.time}&type=${data.type}`,
    method: 'get',
    headers: {
      Authorization: data.token
    }
  })
}
// 能耗报表 总用电量
export const getqualform = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/statement/totalPower`,
    method: 'post',
    headers: {
      Authorization: data.token
    },
    data
  })
}
export const getsubentry = data => {
  return request({
    baseURL: 'http://wellsgroup.3322.org:18081/ibcloud-agent',
    url: `/statement/subentry`,
    method: 'post',
    headers: {
      Authorization: data.token
    },
    data
  })
}
// 访客记录
export const getrecord = data => {
  return request({
    url: `manage/findVisitorRegist`,
    method: 'post',
    data
  })
}
