import { post, get } from '@/api/http'

const http = {
  namespaced: true,
  actions: {
    post: ({ commit }, params) => {
      console.log(params)
      return new Promise((resolve, reject) => {
        post(params).then(
          response => {
            console.log(response)
            resolve(response)
          }).catch(error => {
          reject(error)
        })
      })
    },
    get: ({ commit }, params) => {
      console.log(params)
      return new Promise((resolve, reject) => {
        get(params).then(
          response => {
            console.log(response)
            resolve(response)
          }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default http
