import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// const base = process.env.NODE_ENV === 'production' ? 'http://101.132.169.245:8071/public-gateway/' : '/api'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? 'http://101.132.169.245:8071/public-gateway/' : 'http://192.168.1.121:8071/public-gateway/', // url = base url + request url
  baseURL: 'http://101.132.169.245:8071/public-gateway/', // url = base url + request url
  timeout: 6000, // request timeout
  withCredentials: true, // 跨域请求时发送 cookies
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // 让每个请求携带token-- ['token']为自定义key 请根据实际情况自行修改
      config.headers['token'] = getToken()
      sessionStorage.setItem('token', store.getters.token)
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
// Message重复显示消息
// let messageInstance = null
// const overrideMessage = (options) => {
//   if (messageInstance) {
//     messageInstance.close()
//   }
//   messageInstance = Message(options)
// }
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (parseInt(res.code) === 403) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }).catch(() => {
        store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
    return res
  },
  error => {
    // overrideMessage({
    //   message: '服务器异常',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)
service.jsonPost = ({ url, params }) => {
  return service.post(url, params)
}
service.jsonGet = ({ url, params }) => {
  return service.get(url, { params })
}
export default service
