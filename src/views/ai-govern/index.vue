<template>
  <el-card style="background-color:#18111f;border:none">
    <div style="position:relative;">
      <el-image
        :src="require('@/assets/ai-govern/background.png')"
        style="width: 100vw; height: 100vh; overflow: hidden;"
        fit="fill"
      />
      <message v-if="singleShow" class="alarmbox" :message="message" :is-show="isShow" />
      <message v-if="temp" class="leftbox" :message="message" :is-show="isShow" />
      <message v-if="disAppear" class="btnbox" :message="msg" :is-show="isShow" />
      <!-- <iframe v-if="temp" class="forge" src="http://101.132.169.245/bim/ForgeViewerA.html?FLURN=3F-VIEW/3d.svf" frameborder="0" /> -->
      <iframe
        v-if="temp"
        id="mainFrame"
        ref="mainFrame"
        name="mainFrame"
        class="forge"
        :src="BIMSrc"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="true"
      />
      <!-- <h2 style="position: absolute; top:24%; left: 15%">testimg</h2> -->
      <el-image
        v-if="isShow"
        class="alarm"
        :src="require('@/assets/ai-govern/a.gif')"
        fit="fill"
      />
      <div v-if="temp">
        <el-col :span="12">
          <MyVideo
            ref="myVideo"
            class="video-js"
            video-id="myVideo"
            :url="url"
            :width="width"
            :height="width/16*9"
          />
        </el-col></div>
      <audio id="audio" src="@/assets/ai-govern/b.mp3" controls style="display:none" />
    </div>
    <el-button v-if="bim" type="danger" class="btn" @click="disappear">消除警报</el-button>
  </el-card>
</template>

<script>
import MyVideo from '@/views/ai-security/MyVideo'
import message from './message'
import { getTurnRtspToRtmp } from '@/api/videoData'
import { fireObj } from '@/views/bimEmpty/constant'
import id from '@/views/bimEmpty/bimId/index'
const {
  alarm: { Alarm }
} = id
export default {
  name: 'AIGovern',
  components: {
    message,
    MyVideo
  },
  data() {
    return {
      isShow: false,
      singleShow: true,
      temp: false,
      bim: false,
      disAppear: false,
      width: document.documentElement.clientWidth / 2 - 130,
      url: '',
      msg: '<h2>工单已触发</h2>',
      id: '',
      temputer: '',
      deviceId: ''
    }
  },
  computed: {
    BIMSrc() {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:9090/#/bimLink' : 'http://101.132.169.245/#/bimLink'
    },
    message() {
      return ` 消防报警 <br/> 位置：${this.id || ''} <br/> 室内温度<strong style="font-size: 30px; color:red">${this.temputer.split('.')[0] || ''}℃</strong>`
    }
  },
  watch: {
    url: function(val, old) {
      this.$nextTick(() => {
        this.$refs.myVideo.play()
      })
    },
    id: function(val, old) {
      this.id = val
    },
    temputer(val) {
      this.temputer = val
      console.log(val, this.temputer)
    }
  },
  created() {
    // this.$bus.$on('obj', this.test)
  },
  mounted() {
    const obj = this.$route.params.obj
    if (obj) {
      this.isShow = true
      this.singleShow = false
      this.temp = true
      this.playAudio()
      const id = obj.msg.split('id=')[1].split(', deviceId=')[0]
      this.id = id
      const deviceId = obj.msg.split('id=')[1].split(', deviceId=')[1].split(', T=')[0]
      this.deviceId = deviceId
      this.temputer = obj.msg.split('T=')[1]
      console.log('摄像头ID', id)
      if (id) {
        getTurnRtspToRtmp(id).then(res => {
          console.log('_getTurnRtspToRtmp', id)
          let data = res && res.data && res.data.split('/TV')[1]
          data = 'http://101.132.169.245:90/live?port=1935&app=myTV&stream=TV' + data
          this.url = data
        }, 1000)
      }
      if (deviceId) {
        const regexp = /\[(.+?)\]/g
        const m = obj.msg && obj.msg.match(regexp)[0].split('F')[0]
        const building = m.substring(1, 2)
        let floor = m.substring(4, 5)

        if (building === '4' || building === '3') {
          if (floor !== 'B') {
            floor = m.substring(4, 5)
          } else {
            floor = -(m.substring(5, 6))
          }
          const key = `B${building}F${floor}`
          const obj = fireObj()
          const arr = [Alarm, obj[key]]
          arr.forEach((i) => {
            i.forEach((v, k) => {
              if (id === k) {
                this.bim = true
                localStorage.setItem('eventParams', JSON.stringify({ building, floor, id: deviceId, none: 1 }))
                setTimeout(() => {
                  const a = localStorage.getItem('eventParams')
                  a && localStorage.removeItem('eventParams')
                }, 1000 * 2)
              }
            })
          })
        }
      }
      // setTimeout(() => {
      //   if (id) {
      //     this._getTurnRtspToRtmp(id)
      //   }
      // }, 1000)
    }
    // this.$bus.$on('obj', this.test)
    // this.test({ msg: '消防警报:设备[4号楼5F烟感64]发生通讯故障, 请联系相关工作人员检查确认, id=4号楼5F, deviceId=00a40be0, T=41.64013' })

    // this.$nextTick(() => {
    //     this.$bus.$on('obj', (obj) => {
    //     console.log('$bus ai-govern')
    //     this.isShow = true
    //     this.singleShow = false
    //     this.temp = true
    //     this.playAudio()
    //     const id = obj.msg.split('id=')[1].split(', deviceId=')[0]
    //     this.id = id
    //     this.temputer = obj.msg.split('T=')[1]
    //     if (id) {
    //       this._getTurnRtspToRtmp(id)
    //     }
    //   })
    // })
    // this.$nextTick(() => {
    //   this._getTurnRtspToRtmp(2, url => {
    //     this.url = url
    //   })
    // })
    // const params = {
    //   url: '/onvif/startVideo',
    //   params: ''
    // }
    // this.$store.dispatch('http/get', params)
    // setTimeout(() => {
    //   console.log(6666, this.id)
    //   this.isShow = true
    //   this.playAudio()
    //   setTimeout(() => {
    //     this.singleShow = false
    //     setTimeout(() => {
    //       this.temp = true
    //       this._getTurnRtspToRtmp()
    //     }, 1000)
    //   }, 2000)
    // }, 4000)
  },
  methods: {
    // test(data) {
    //   this.isShow = true
    //   this.singleShow = false
    //   this.temp = true
    //   const { msg } = data
    //   console.log(msg)
    //   console.log(msg.split('id=')[1])
    //   const id = msg.split('id=')[1].split(', deviceId=')[0]
    //   this.id = id
    //   this.temputer = msg.split('T=')[1]
    //   if (id) {
    //     this._getTurnRtspToRtmp(id)
    //   }
    // },
    // _getTurnRtspToRtmp(id) {
    //   console.log('_getTurnRtspToRtmp', id)
    //   getTurnRtspToRtmp(id).then(res => {
    //     let data = res && res.data && res.data.split('/TV')[1]
    //     data = 'http://101.132.169.245:90/live?port=1935&app=myTV&stream=TV' + data
    //     this.url = data
    //     console.log(data)
    //     // this.playAudio()
    //   })
    // },
    disappear() {
      // getStopVideo(this.id).then(res => {
      //   console.log('getStopVideo', res)
      //   if (res.code === '200') {
      //     this.$message({
      //       message: '录像已暂停',
      //       type: 'success'
      //     })
      //   } else {
      //     this.$message({
      //       message: '录像暂停失败',
      //       type: 'error'
      //     })
      //   }
      // }).catch(() => {
      // })
      this.$store.dispatch('govern/workOrder')
      this.temp = false
      this.disAppear = true
      this.isShow = false
      // this.pausedAudio()
    },
    playAudio() {
      var x = document.getElementById('audio')
      x.play()
    },
    pausedAudio() {
      var x = document.getElementById('audio')
      x.paused()
    }
  }
}
</script>

<style scoped lang="less">
  .alarmbox {
    position: absolute;
    top: 430px;
    right: 70px;
  }
  .leftbox {
    position: absolute;
    left: .625rem;
    top: .5rem;
    width: 32%;
  }
  .forge {
    position: absolute;
    width: 32%;
    height: 40%;
    top: 7rem;
    left: .625rem;
    border: .1875rem solid rgb(14,240,252);
  }
  .alarm {
    position: absolute;
    height: 6.25rem;
    width: 6.25rem;
    top: 28.75rem;
    right: 23.75rem;
  }
  .video-js {
    position: absolute;
    left: .625rem;
    top: 28rem;
    width: 32%;
  }
  .btn {
    position: absolute;
    left: 80%;
    bottom: 22%;
  }
  .btnbox {
    position: absolute;
    left: 75%;
    bottom: 32%;
  }
</style>
