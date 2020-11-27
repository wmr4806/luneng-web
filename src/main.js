require('es6-promise').polyfill()
import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import 'echarts/map/js/china.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './permission' // permission control
import '@/utils/dateUtils.js'
import * as filters from './filters' // global filters
import dataV from '@jiaminghi/data-view'
import './assets/common.less'

import bus from '@/utils/bus.js'
Vue.prototype.$bus = bus

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
Vue.use(dataV)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
