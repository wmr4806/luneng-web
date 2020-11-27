<template>
  <div class="container">

    <el-row>
      <el-col :span="12">
        <my-video
          ref="video1"
          video-id="video1"
          :url="url1"
          :width="width"
          :height="width/16*9"
        />
      </el-col>
      <el-col :span="12">
        <my-video
          ref="video2"
          video-id="video2"
          :url="url2"
          :width="width"
          :height="width/16*9"
        />
      </el-col>
    </el-row>

    <el-row style="margin-top: 1rem">
      <el-col :span="12">
        <my-video
          ref="video3"
          video-id="video3"
          :url="url3"
          :width="width"
          :height="width/16*9"
        />
      </el-col>
      <el-col :span="12">
        <my-video
          ref="video4"
          video-id="video4"
          :url="url4"
          :width="width"
          :height="width/16*9"
        />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MyVideo from './MyVideo'
import { getTurnRtspToRtmp } from '@/api/videoData'
import mapId from './mapId'
export default {
  name: 'CCTV',
  components: { MyVideo },
  data() {
    return {
      url1: '',
      url2: '',
      url3: '',
      url4: '',
      width: document.documentElement.clientWidth / 2 - 130,
      height: document.documentElement.clientHeight / 2,
      timer: null
    }
  },
  watch: {
    url1: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video1.play()
      })
    },
    url2: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video2.play()
      })
    },
    url3: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video3.play()
      })
    },
    url4: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video4.play()
      })
    }
  },
  created() {
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._getTurnRtspToRtmp('1号楼3F', url => {
        this.url1 = url
      })
      this._getTurnRtspToRtmp('1号楼13F', url => {
        this.url2 = url
      })
      this._getTurnRtspToRtmp('2号楼5F', url => {
        this.url3 = url
      })
      this._getTurnRtspToRtmp('2号楼B1F', url => {
        this.url4 = url
      })
      let i = 39
      this.timer = setInterval(() => {
        if (i > 73)i = 39
        this._getTurnRtspToRtmp(mapId.get(`item${i}`), url => {
          this.url1 = url
        })
        this._getTurnRtspToRtmp(mapId.get(`item${i + 1}`), url => {
          this.url2 = url
        })
        this._getTurnRtspToRtmp(mapId.get(`item${i + 2}`), url => {
          this.url3 = url
        })
        this._getTurnRtspToRtmp(mapId.get(`item${i + 3}`), url => {
          this.url4 = url
        })
        i += 4
      }, 1000 * 60 * 10)
    })
  },
  methods: {
    _getTurnRtspToRtmp(id, callback) {
      getTurnRtspToRtmp(id).then(res => {
        console.log('getTurnRtspToRtmp', res.data)
        let data = res && res.data && res.data.split('/TV')[1]
        data = 'http://101.132.169.245:90/live?port=1935&app=myTV&stream=TV' + data
        callback(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container{
    background-color: #18111f;
    height: 100vh;
    padding: 0.5rem;
}
</style>
