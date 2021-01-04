<template>
  <div class="jinggao">
    <div ref="zhezhao" class="zhezhao">
      <div class="zhezhao1" />
      <div class="zhezhao2" @click="mPlay">点击开启警报音效</div>
    </div>
    <audio id="audio" ref="myaudio" :src="audiosrc" controls style="display:none" type="audio/mp3" allow="autoplay" autoplay />
    <p v-show="displayp" class="jinggaop">{{ jinggaop }}</p>
    <div class="thingjs"></div>
    <img src="" alt="">
    <!-- <div style="background-color: red; width:40px; height: 40px; position: absolute; top: 0" @click="mPlay"></div> -->
    <div class="jinggaovideo">
      <video class="myvideo" src="" />
      <div class="no-video">
        <img class="videoimg" src="./img/video.png" alt="">
      </div>
      <JingVideo
        v-show="displayvideo"
        ref="myVideo"
        class="video-js"
        video-id="myVideo"
        :url="url"
        :width="width"
        :height="width/16*9"
      />
    </div>
    <div v-if="IsShow" ref="scale" class="mainFrame">
      <iframe
        id="mainFrame"
        ref="mainFrame"
        name="mainFrame"
        class="video-js"
        :src="BIMSrc"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        scrolling="no"
        allowtransparency="true"
      />
      <!-- <Eventbim  class="video-js"/> -->
      <img src="./img/scale.png" alt="" @click="scale">
    </div>
  </div>
</template>

<script>
import { getMessage } from '@/api/data'
import id from '@/views/bimEmpty/bimId/index'
import { fireObj } from '@/views/bimEmpty/constant'
// import Eventbim from '@/views/bimEmpty/bim'
import JingVideo from '@/views/ai-security/MyVideo'
const {
  alarm: { Alarm },
} = id
export default {
  components: {
    // Eventbim,
    JingVideo
  },
  data() {
    return {
      audioPlay: true,
      scalediv: true,
      IsShow: false,
      displayvideo: false,
      displayp: false,
      url: '',
      deviceId: '',
      audiosrc: '',
      timer: '',
      width: '400px',
      id: {
        id: '4号楼3F'
      },
      jinggaop: ''

    }
  },
  computed: {
    BIMSrc() {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:9090/#/bimLinks' : 'http://101.132.169.245/#/bimLinks'
    }
  },
  watch: {
    url: function(val, old) {
      this.$nextTick(() => {
        if (this.url) {
          this.$refs.myVideo.play()
        }
      })
    },
    audiosrc: function(val, old) {
      this.$nextTick(() => {
        if (this.audiosrc) {
          this.$refs.myaudio.play()
        }
      })
    }
  },
  mounted() {
    this.video()
    this.timer = setInterval(() => {
      this.video()
    }, 1000 * 30)
    // this.audiosrc = require('@/assets/ai-govern/mm.mp3')
    // setTimeout(() => {
    //   this.IsShow = true
    //   localStorage.setItem('eventParams', JSON.stringify({building: 4, floor: 3, id: '00a45412',none: 1}))
    // }, 100)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    mPlay() {
      this.$refs.zhezhao.style.display = 'none'
      this.audiosrc = ''
      this.$refs.myaudio.play()
      this.$refs.myaudio.pause()
    },
    async video() {
      const data = await getMessage()
      console.log('getMessage', data)
      // this.audiosrc = require('@/assets/ai-govern/mm.mp3')
      // this.IsShow = true
      // localStorage.setItem('eventParams', JSON.stringify({building: 4, floor: 3, id: '00a45412',none: 1}))
      //   setTimeout(() => {
      //   this.IsShow = true
      //   // localStorage.setItem('eventParams', JSON.stringify({building: 4, floor: 3, id: '00a45412',none: 1}))
      //   localStorage.setItem('eventParams', JSON.stringify({building: 4, floor: 5, id: '00a42274',none: 1}))
      // }, 10)
      if (data && data.msg !== 'null') {
        if (data && data.videoUrl === '') {
          this.audiosrc = require('@/assets/ai-govern/mm.mp3')
        }
        this.jinggaop = data.msg
        this.displayp = true
        setTimeout(() => {
          this.displayp = false
          // this.IsShow = false
          this.audiosrc = ''
        }, 1000 * 60)
        const deviceId = data && data.msg && data.msg.split('id=')[1] && data.msg.split('id=')[1].split(', deviceId=')[1].split(',')[0]
        const regexp = /\[(.+?)\]/g
        const m = data.msg && data.msg.match(regexp)[0].split('F')[0]
        const building = m.substring(1, 2)
        let floor = m.substring(4, 5)
        const obj = fireObj()
        if (building === '4' || building === '3') {
          if (floor !== 'B') {
            const key = `B${building}F${floor}`
            obj[key].forEach((v, k) => {
              if (k === deviceId) {
                this.IsShow = true
                localStorage.setItem('eventParams', JSON.stringify({ building, floor, id: deviceId, none: 1 }))
                setTimeout(() => {
                  const a = localStorage.getItem('eventParams')
                  a && localStorage.removeItem('eventParams')
                }, 1000 * 2)
              }
            })
            Alarm.forEach((v, k) => {
              if (k === deviceId) {
                this.IsShow = true
                localStorage.setItem('eventParams', JSON.stringify({ building, floor, id: deviceId, none: 1 }))
                setTimeout(() => {
                  const a = localStorage.getItem('eventParams')
                  a && localStorage.removeItem('eventParams')
                }, 1000 * 2)
              }
            })
          } else {
            floor = -(m.substring(5, 6))
            const key = `B${building}F${floor}`
            obj[key].forEach((v, k) => {
              if (k === deviceId) {
                this.IsShow = true
                localStorage.setItem('eventParams', JSON.stringify({ building, floor, id: deviceId, none: 1 }))
                setTimeout(() => {
                  const a = localStorage.getItem('eventParams')
                  a && localStorage.removeItem('eventParams')
                }, 1000 * 2)
              }
            })
            Alarm.forEach((v, k) => {
              if (k === deviceId) {
                this.IsShow = true
                localStorage.setItem('eventParams', JSON.stringify({ building, floor, id: deviceId, none: 1 }))
                setTimeout(() => {
                  const a = localStorage.getItem('eventParams')
                  a && localStorage.removeItem('eventParams')
                }, 1000 * 2)
              }
            })
          }
        }
      }
      if (data && data.videoUrl !== '') {
        this.displayvideo = true
        this.url = data && data.videoUrl
        this.jinggaop = data.msg && data.msg.split('id=')[0]
        this.displayp = true
        this.audiosrc = require('@/assets/ai-govern/b.mp3')
        setTimeout(() => {
          this.url = ''
          this.audiosrc = ''
          this.displayvideo = false
          this.displayp = false
          this.IsShow = false
        }, 1000 * 60 * 2)
      }
    },
    scale() {
      this.$refs.scale.style.width = '100%'
      this.$refs.scale.style.height = '100%'
      this.scalediv = !this.scalediv
      if (!this.scalediv) {
        this.$refs.scale.style.width = '50%'
        this.$refs.scale.style.height = '200px'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.jinggao {
  width: 100%;
  height: 100%;
}
.jinggaop {
  position: absolute;
  top: 60%;
  width: 60%;
  left: 20%;
  color: #f56c6c;
}
.jinggaovideo {
  position: absolute;
  width: 50%;
  height: 200px;
  bottom: 0;
  left: 50%;
}
.myvideo {
  width: 100%;
  height: 100%;
}
.video-js{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0%;
  top: 0%;
}
.videoimg {
  position: absolute;
  width: 50%;
  bottom: 22%;
  left: 40%;
}
.dialog {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color:transparent;
  top: 0%;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.mainFrame {
  position: absolute;
  width: 50%;
  height: 200px;
  bottom: 0;
  left: 0;
  img {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 20px;
    left: 20px;
  }
}
.zhezhao{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}
.zhezhao1{
  width: 100%;
  height: 100%;
  background: black;
  opacity: .5;
}
.zhezhao2{
  position: absolute;
  width: 20%;
  left: 40%;
  top: 35%;
  height: 100px;
  border: 1px solid #cccccc;
  border-radius:10px ;
  color: white;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  cursor: pointer;
}

.thingjs {
  width: 100%;
  height: 25px;
  position: absolute;
  right: -5px;
  bottom: 0px;
  background: rgb(0, 8, 23);
}
</style>
