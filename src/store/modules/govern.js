const state = {
  workOrder: ''
}

const mutations = {
  WORK_ORDER: (state, workOrder) => {
    state.workOrder = workOrder
  }
}
const actions = {
  workOrder({ commit }) {
    commit('WORK_ORDER', {
      id: 0,
      eventType: 'ai触发工单',
      time: '2020-4-2 1:37:52',
      equipmentType: '温度报警器',
      equipmentIP: '192.168.6.145',
      region: '上海市浦东新区国耀路223号',
      position: '3号楼会议室',
      status: '未处理',
      remark: '温度超过警戒值'
    },)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
