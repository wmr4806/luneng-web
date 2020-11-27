import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  roles: [],
  userInfo: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params).then(response => {
        if (response.code === '200') {
          const { token, userId } = response.data
          commit('SET_TOKEN', token)
          setToken(token, userId)
          resolve()
        } else {
          reject(response.msg)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  validateOldPassword({ commit }, params) {
    return new Promise((resolve, reject) => {
      login(params).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('验证失败, 请重新登录')
        }

        const { userInfo, roles, menuList } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('获取角色失败')
        }
        commit('SET_ROLES', roles)
        commit('SET_USER_INFO', userInfo)
        resolve(menuList)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.userInfo.userId).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_USER_INFO', null)
        removeToken()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
