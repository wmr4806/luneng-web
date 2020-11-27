import { MessageBox } from 'element-ui'
import store from '@/store'
import router from '@/router'
// import bus from '@/utils/bus'
const BASE_URL = `ws://101.132.169.245:8072/authListener/`
let Socket = ''
let setIntervalWebsocketPush = null

/** 建立连接 */
export function createSocket(userId) {
  if (!Socket) {
    console.log('建立websocket连接')
    Socket = new WebSocket(BASE_URL + userId)
    Socket.onopen = onOpen
    Socket.onmessage = onMessage
    Socket.onerror = onError
    Socket.onclose = onClose
  } else {
    console.log('websocket已连接')
  }
}
/** 打开WS之后发送心跳 */
export function onOpen() {
  console.log('onOpen')
  sendPing() // 发送心跳
}
/** WS数据接收统一处理 */
export function onMessage(data) {
  // console.log('onMessage')
  const obj = JSON.parse(data.data)
  // if (obj.msg.substring(0, 2) === '消防') {
  //   router.push('/Govern')
  //   bus.$emit('obj', obj)
  // }
  if (obj.msg.indexOf('id=') > 0 && obj.msg.indexOf(', deviceId=') > 0 && obj.msg.indexOf('T=') > 0) {
    console.log('socket', obj)
    if (obj.msg.split('id=')[1].split(', deviceId=')[0] !== '') {
      // bus.$emit('obj', obj)
      // router.push('/Govern')
      const url = document.location.href.toString()
      const a = url && url.split('#') && url.split('#')[1]
      if (a === '/bimLink' || a === '/datav' || a === '/Govern') return
      router.push({
        name: 'Govern',
        params: {
          obj
        }
      })
    }
  }
  console.log('obj', obj)
  if (obj.code === '403') {
    MessageBox.alert(obj.msg, '提示', {
      confirmButtonText: '退出',
      callback: async() => {
        await store.dispatch('user/logout')
        router.push('/login')
      }
    })
  }
}
/** 连接失败重连 */
export function onError() {
  clearInterval(setIntervalWebsocketPush)
  Socket.close()
  createSocket(store.state.userInfo.userId)
}
/** 关闭WS */
export function onClose() {
  console.log('onClose')
  clearInterval(setIntervalWebsocketPush)
}
/** 发送数据
 * @param eventType
 */
export function sendMessage(eventTypeArr) {
  const obj = {
    appId: 'airShip',
    cover: 0,
    event: eventTypeArr
  }
  if (Socket !== null && Socket.readyState === 3) {
    Socket.close()
    createSocket(store.state.userInfo.userId) // 重连
  } else if (Socket.readyState === 1) {
    Socket.send(JSON.stringify(obj))
  } else if (Socket.readyState === 0) {
    setTimeout(() => {
      Socket.send(JSON.stringify(obj))
    }, 3000)
  }
}
/** 发送心跳 */
export function sendPing() {
  Socket.send('ping')
  setIntervalWebsocketPush = setInterval(() => {
    Socket.send('ping')
    // const obj = { msg: '消防警报:设备[4号楼3F烟感64]发生通讯故障, 请联系相关工作人员检查确认, id=4号楼3F, deviceId=00a45412, T=41.64013' }
    // if (obj.msg.indexOf('id=') > 0 && obj.msg.indexOf(', deviceId=') > 0 && obj.msg.indexOf('T=') > 0) {
    //   console.log('socket', obj)
    //   if (obj.msg.split('id=')[1].split(', deviceId=')[0] !== '') {
    //     // router.push('/Govern')
    //     // bus.$emit('obj', obj)
    //     let url = document.location.href.toString()
    //   const a = url && url.split('#') && url.split('#')[1]
    //   if (a === '/bimLink' || a === '/datav' || a === '/Govern')return
    //   router.push({
    //     name: 'Govern',
    //     params: {
    //       obj: obj
    //     }
    //   })
    //   }
    // }
  }, 5000)
}
