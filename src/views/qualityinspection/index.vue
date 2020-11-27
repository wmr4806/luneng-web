<template>
  <div class="container">
    <el-row style="top:20px">
      <el-col :span="12">
        <el-select v-model="area" popper-class="select-test" placeholder="请选择地区" @change="changeArea">
          <el-option
            v-for="{label,value} in areaOptions"
            :key="label"
            :label="label"
            :value="value"
          />
        </el-select>
      </el-col>
      <el-col :span="12">
        <el-select
          v-model="floor"
          popper-class="select-test"
          placeholder="请选择楼层"
          :disabled="isAreaSelected"
          @change="changeFloor"
        >
          <el-option
            v-for="(item, index) in floorOptions"
            :key="index"
            :label="item[0]"
            :value="item[1]"
          />
        </el-select>
      </el-col>
    </el-row>
    <el-row style="top: 50px">
      <el-col :span="12">
        <my-video
          ref="video5"
          video-id="video5"
          :url="url5"
          :width="width"
          :height="(width / 16) * 9"
        />
      </el-col>
      <el-col :span="12">
        <my-video
          ref="video6"
          video-id="video6"
          :url="url6"
          :width="width"
          :height="(width / 16) * 9"
        />
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col :span="12">
        <my-video
          ref="video7"
          video-id="video7"
          :url="url7"
          :width="width"
          :height="(width / 16) * 9"
        />
      </el-col>
      <el-col :span="12">
        <my-video
          ref="video8"
          video-id="video8"
          :url="url8"
          :width="width"
          :height="(width / 16) * 9"
        />
      </el-col>
    </el-row> -->

  </div>
</template>

<script>
import MyVideo from '@/views/ai-security/MyVideo'
import { getTurnRtspToRtmp } from '@/api/videoData'
import mapId from '@/views/ai-security/mapId'
export default {
  name: 'QualityInspection',
  components: { MyVideo },
  data() {
    return {
      url5: '',
      url6: '',
      url7: '',
      url8: '',
      width: document.documentElement.clientWidth / 2 - 130,
      height: document.documentElement.clientHeight / 2,
      timer: null,
      isAreaSelected: true,
      floor: '1号楼3F',
      floorOptions: [],
      area: '鲁能',
      itemIndex: 5,
      areaOptions: [
        {
          value: '鲁能',
          label: '鲁能'
        },
        {
          value: '福州',
          label: '福州'
        },
        {
          value: '湖州',
          label: '湖州'
        },
        {
          value: '苏州',
          label: '苏州'
        }
      ]
    }
  },
  watch: {
    url5: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video5.play()
      })
    },
    url6: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video6.play()
      })
    },
    url7: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video7.play()
      })
    },
    url8: function(val, old) {
      this.$nextTick(() => {
        this.$refs.video8.play()
      })
    }
  },
  created() {},
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted() {
    const a = document.getElementsByClassName('el-select-dropdown__list');
    [].slice.call(a).forEach((item) => {
      item.style.width = '360px'
    })
    this.$nextTick(() => {
      this._getTurnRtspToRtmp('1号楼3F', (url) => {
        this.url5 = url
      })
      this._getTurnRtspToRtmp('1号楼B1F', (url) => {
        this.url6 = url
      })
      // this._getTurnRtspToRtmp("2号楼1F", (url) => {
      //   this.url7 = url;
      // });
      // this._getTurnRtspToRtmp("2号楼B1F", (url) => {
      //   this.url8 = url;
      // });

      this.timer = setInterval(() => {
        if (this.itemIndex > 70) this.itemIndex = 1
        this.videoGroup()
        this.itemIndex += 4
      }, 1000 * 60 * 10)
      this.changeArea('鲁能')
    })
  },
  methods: {
    changeArea(area) {
      this.isAreaSelected = false
      mapId.forEach((e, k) => {
        this.floorOptions.push([e, k])
      })
    },
    changeFloor(item) {
      this.itemIndex = item.split('item')[1]
      this.videoGroup(this.itemIndex)
      let index = Number(this.itemIndex)
      this.timer = setInterval(() => {
        if (index > 70) index = 1
        this.videoGroup()
        index += 4
      }, 1000 * 60 * 10)
    },
    videoGroup(itemIndex) {
      const index = Number(itemIndex)
      this._getTurnRtspToRtmp(mapId.get(`item${index}`), (url) => {
        this.url5 = url
      })
      this._getTurnRtspToRtmp(mapId.get(`item${index + 1}`), (url) => {
        this.url6 = url
      })
      console.log(mapId.get(`item${index + 1}`))
      console.log((`item${index + 1}`))
      // this._getTurnRtspToRtmp(mapId.get(`item${index + 2}`), (url) => {
      //   this.url7 = url;
      // });
      // this._getTurnRtspToRtmp(mapId.get(`item${index + 3}`), (url) => {
      //   this.url8 = url;
      // });
    },
    _getTurnRtspToRtmp(id, callback) {
      getTurnRtspToRtmp(id).then((res) => {
        console.log('getTurnRtspToRtmp', res.data)
        let data = res && res.data && res.data.split('/TV')[1]
        data =
          'http://101.132.169.245:90/live?port=1935&app=myTV&stream=TV' + data
        callback(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #18111f;
  height: 100vh;
  padding: 0.5rem;
}
.select-test {
    .el-select-dropdown__item {
      width: 120px;
      float: left;
    }
  }
</style>
