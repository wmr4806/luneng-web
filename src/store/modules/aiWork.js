import {
  getQueryServiceOrderByCust, getServiceOrderDetailById, getDiscontinueOrder, getOrderTrackInfoById

} from '@/api/aiWorkData'

const state = {
  // taskOrder: {},
  queryOrder: {},
  detailOrder: {},
  cancelOder: {},
  tarckOrder: {}
}

const mutations = {
  // SET_SHOW_TASKDATA: (state, data) => {
  //   state.taskData = data
  // },
  SHOW_SERVICE_ORDER: (state, data) => {
    state.queryOrder = data
  },
  SHOW_DETAIL_ORDER: (state, data) => {
    state.detailOrder = data
  },
  CANCEL_WORK_ORDER: (state, data) => {
    state.cancelOder = data
  },
  TRACK_WORK_ORDER: (state, data) => {
    state.tarckOrder = data
  }
}
const actions = {
  // deviceTaskData({ commit }, params) {
  //   return new Promise((resolve, reject) => {
  //     getDeviceTaskData(params).then(res => {
  //       console.log('deviceTaskData', res.data.data)
  //       if (res.code === '200') {
  //         commit('SET_SHOW_TASKDATA', res.data.data)
  //         resolve()
  //       } else {
  //         reject(res.data.msg)
  //       }
  //     }).catch(err => {
  //       reject(err)
  //     })
  //   })
  // },
  queryServiceOrderByCust({ commit }, params) {
    return new Promise((resolve, reject) => {
      getQueryServiceOrderByCust(params).then(res => {
        console.log('queryServiceOrderByCust', res.data.data)
        if (res.code === '200') {
          commit('SHOW_SERVICE_ORDER', res.data.data)
          resolve()
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  serviceOrderDetailById({ commit }, serviceOrderId) {
    return new Promise((resolve, reject) => {
      getServiceOrderDetailById(serviceOrderId).then(res => {
        console.log('getServiceOrderDetailById', res.data)
        if (res.code === '200') {
          commit('SHOW_DETAIL_ORDER', res.data)
          resolve()
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  discontinueOrder({ commit }, params) {
    return new Promise((resolve, reject) => {
      getDiscontinueOrder(params).then(res => {
        console.log('getDiscontinueOrder', res.data)
        if (res.code === '200') {
          commit('CANCEL_WORK_ORDER', res.data)
          resolve(res.data.msg)
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  orderTrackInfoById({ commit }, serviceOrderId) {
    return new Promise((resolve, reject) => {
      getOrderTrackInfoById(serviceOrderId).then(res => {
        console.log('getOrderTrackInfoById', res.data)
        if (res.code === '200') {
          commit('TRACK_WORK_ORDER', res.data)
          resolve()
        } else {
          reject(res.data.msg)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
