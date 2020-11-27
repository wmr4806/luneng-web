<template>
  <video
    :id="videoId"
    controls
    autoplay
    muted
    :width="width"
    :height="height"
  >您的浏览器不支持Video标签</video>
</template>

<script>
import flvjs from 'flv.js'
export default {
  name: 'MyVideo',
  props: {
    videoId: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'flv'
    },
    width: {
      type: [String, Number],
      default: 640
    },
    height: {
      type: [String, Number],
      default: 360
    }
  },
  data() {
    return {
      flvPlayer: Object
    }
  },
  created() {},
  mounted() {
    // this.$nextTick(() => {
    //   this.play()
    // })
  },
  methods: {
    destroy(flvPlayer) {
      if (flvPlayer && flvPlayer._emitter && flvPlayer.destroy) {
        flvPlayer.destroy()
        flvPlayer = null
      }
    },
    play() {
      if (flvjs.isSupported()) {
        this.destroy(this.flvPlayer)
        this.flvPlayer = flvjs.createPlayer({
          url: this.url,
          type: this.type,
          cors: true,
          enableWorker: true, // 浏览器端开启flv.js的worker,多进程运行flv.js
          isLive: true, // 直播模式
          hasAudio: false, // 关闭音频
          hasVideo: true,
          stashInitialSize: 128,
          enableStashBuffer: false // 播放flv时，设置是否启用播放缓存，只在直播起作用。
        })
        this.flvPlayer.attachMediaElement(document.getElementById(this.videoId))
        this.flvPlayer.load()
        // this.flvPlayer.play()
        this.flvPlayer.on('error', (err) => {
          console.log('===', err)
        })
      }

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          if (this.flvPlayer) {
            const buffered = this.flvPlayer.buffered
            if (buffered.length > 0) {
              const end = buffered.end(0)
              if (end - this.flvPlayer.currentTime > 0.15) {
                this.flvPlayer.currentTime = end - 0.1
              }
            }
          }
        }
      })

      setInterval(function() {
        if (this.flvPlayer) {
          const buffered = this.flvPlayer.buffered
          if (buffered.length > 0) {
            const end = buffered.end(0)
            if (end - this.flvPlayer.currentTime > 0.15) {
              this.flvPlayer.currentTime = end - 0.1
            }
          }
        }
      }, 3000)
    }
  }
}
</script>

<style scoped>

</style>
