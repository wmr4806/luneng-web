<template>
  <div class="container">
    <div v-show="fireTotalNumShow" v-drag class="total-num">
      <div
        style="color:#ffffff; position:absolute;right:10px;top:1px;cursor: pointer;padding-bottom: 5px"
        @click="closeTotalNum"
      >关闭</div>
      <div style="color:#ffffff">
        <div>火警设备：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">正常：{{ totalData && totalData.normal }}个</div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="airTotalNumShow" v-drag class="total-num">
      <div
        style="color:#ffffff; position:absolute;right:10px;top:1px;cursor: pointer;padding-bottom: 5px"
        @click="closeTotalNum"
      >关闭</div>
      <div style="color:#ffffff">
        <div>空调机组：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">正常：{{ totalData && totalData.normal }}个</div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="cctvTotalNumShow" v-drag class="total-num">
      <div
        style="color:#ffffff; position:absolute;right:10px;top:1px;cursor: pointer;padding-bottom: 5px"
        @click="closeTotalNum"
      >关闭</div>
      <div style="color:#ffffff">
        <div>摄像机：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">正常：{{ totalData && totalData.normal }}个</div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="havcTotalNumShow" v-drag class="total-num">
      <div
        style="color:#ffffff; position:absolute;right:10px;top:1px;cursor: pointer;padding-bottom: 5px"
        @click="closeTotalNum"
      >关闭</div>
      <div style="color:#ffffff">
        <div>变风量空调机组：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">正常：{{ totalData && totalData.normal }}个</div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="vavIsShow" v-drag class="deviceInfo">
      <div
        style="color:#ffffff; position:absolute;right:10px;top:1px;cursor: pointer;"
        @click="closeInfo"
      >关闭</div>
      <div style="color:#ffffff">实际温度：{{ vavData.value | toFixedNum }}℃</div>
      <div style="color:#ffffff">阀门开度：{{ vavData.dpr | toFixedNum }}%</div>
      <div style="color:#ffffff">送风压力：{{ vavData.da | toFixedNum }}Pa</div>
      <div style="color:#ffffff">送风风量：{{ vavData.sa | toFixedNum }}</div>
      <div style="color:#ffffff">热舒适度：{{ vavData.pmv | toFixedNum(3) }}</div>
    </div>
    <div v-show="coldAndHeatIsShow" v-drag class="deviceInfo">
      <div
        style="color:#ffffff; position:absolute;right:10px;top:1px; cursor: pointer;"
        @click="closeInfo"
      >关闭</div>
      <div v-for="item in coldAndHeatData" :key="item.id" style="color:#ffffff">
        {{ item.name }}：{{ item.value }}{{ item.unit }}
      </div>
    </div>
    <div v-if="ahu1Data || ahu2Data">
      <div v-show="ahu1IsShow" v-drag class="deviceInfo">
        <div
          style="color:#ffffff; position:absolute;right:10px;top:1px; cursor: pointer;"
          @click="closeInfo"
        >关闭</div>
        <div style="color:#ffffff">
          CO2浓度：{{
            ahu1Data[`AHU${building}-${floor}-1-CO2_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-CO2_CV`].value
          }}ppm
        </div>
        <div style="color:#ffffff">
          回风温度：{{
            ahu1Data[`AHU${building}-${floor}-1-RT_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-RT_CV`].value
          }}℃
        </div>
        <div style="color:#ffffff">
          回风湿度：{{
            ahu1Data[`AHU${building}-${floor}-1-RH_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-RH_CV`].value
          }}%
        </div>
        <div style="color:#ffffff">
          送风温度：{{
            ahu1Data[`AHU${building}-${floor}-1-ST_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-ST_CV`].value
          }}℃
        </div>
        <div style="color:#ffffff">
          送风湿度：{{
            ahu1Data[`AHU${building}-${floor}-1-SH_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-SH_CV`].value
          }}%
        </div>
        <div style="color:#ffffff">
          送风压力：{{
            ahu1Data[`AHU${building}-${floor}-1-SP1_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-SP1_CV`].value
          }}Pa
        </div>
        <div style="color:#ffffff">
          频率反馈：{{
            ahu1Data[`AHU${building}-${floor}-1-SF_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-SF_CV`].value
          }}Hz
        </div>
        <div style="color:#ffffff">
          故障状况：{{
            ahu1Data[`AHU${building}-${floor}-1-ALM_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-ALM_CV`].value === "false"
              ? "设备正常"
              : "设备故障"
          }}
        </div>
      </div>
      <div v-show="ahu2IsShow" v-drag class="deviceInfo">
        <div
          style="color:#ffffff; position:absolute;right:10px;top:1px; cursor: pointer;"
          @click="closeInfo"
        >关闭</div>
        <div style="color:#ffffff">
          CO2浓度：{{
            ahu2Data[`AHU${building}-${floor}-2-CO2_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-CO2_CV`].value
          }}ppm
        </div>
        <div style="color:#ffffff">
          回风温度：{{
            ahu2Data[`AHU${building}-${floor}-2-RT_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-RT_CV`].value
          }}℃
        </div>
        <div style="color:#ffffff">
          回风湿度：{{
            ahu2Data[`AHU${building}-${floor}-2-RH_CV`] && ahu2Data[`AHU${building}-${floor}-2-RH_CV`].value
          }}%
        </div>
        <div style="color:#ffffff">
          送风温度：{{
            ahu2Data[`AHU${building}-${floor}-2-ST_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-ST_CV`].value
          }}℃
        </div>
        <div style="color:#ffffff">
          送风湿度：{{
            ahu2Data[`AHU${building}-${floor}-2-SH_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-SH_CV`].value
          }}%
        </div>
        <div style="color:#ffffff">
          送风压力：{{
            ahu2Data[`AHU${building}-${floor}-2-SP1_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-SP1_CV`].value
          }}Pa
        </div>
        <div style="color:#ffffff">
          频率反馈：{{
            ahu2Data[`AHU${building}-${floor}-2-SF_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-SF_CV`].value
          }}Hz
        </div>
        <div style="color:#ffffff">
          故障状况：{{
            ahu2Data[`AHU${building}-${floor}-2-ALM_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-ALM_CV`].value === "false"
              ? "设备正常"
              : "设备故障"
          }}
        </div>
      </div>
    </div>
    <div v-if="videoIsShow" v-drag class="video-js">
      <div
        style="color:#ffffff; position:relative;left:340px;top:30px;cursor: pointer;z-index:999"
        @click="closeVideo"
      >关闭</div>
      <MyVideo
        ref="myVideo"
        video-id="myVideo"
        :url="url"
        :width="width"
        :height="(width / 16) * 9"
      />
    </div>
    <iframe
      id="mainFrame"
      ref="mainFrame"
      name="mainFrame"
      class="mainFrame"
      :src="bimSrc"
      frameborder="0"
      allowtransparency="true"
      @load="loadBim"
    />
  </div>
</template>

<script>
import {
  getTurnRtspToRtmp,
  getVAVList,
  getWarmAHUList,
  getAlmEvents,
  getColdSourceList,
  getHeatSourceList
} from '@/api/data'
import MyVideo from '@/views/ai-security/MyVideo'
import id from '@/views/bimEmpty/bimId/index'
import { mapId } from '@/views/ai-BA/mapId'
const {
  alarm: { Alarm },
  cctvNum: { cctvNum },
  havcNum: { havcNum },
  airNum: { airNum },
  fireNum: { fireNum },
  'idB4F-4': { fireB4F14 },
  'idB4F-3': { fireB4F13 },
  'idB4F-2': { fireB4F12 },
  'idB4F-1': { fireB4F11, coldAndHeatMap },
  coldAndHeat: { coldAndHeat1, coldAndHeat2 },
  idB4F1: { ahuIdB4F1, fireB4F1 },
  idB4F2: { ahuIdB4F2, vavIdB4F2, fireB4F2 },
  idB4F3: { cctvId, vavIdB4F3, ahuIdB4F3, fireB4F3 },
  idB4F4: { ahuIdB4F4, vavIdB4F4, fireB4F4 },
  idB4F5: { ahuIdB4F5, vavIdB4F5, fireB4F5 },
  idB4F6: { ahuIdB4F6, vavIdB4F6, fireB4F6 },
  idB4F7: { ahuIdB4F7, vavIdB4F7, fireB4F7 },
  idB4F8: { ahuIdB4F8, vavIdB4F8, fireB4F8 }
} = id
export default {
  name: 'FireControlBIM',
  filters: {
    toFixedNum(val, num = 1) {
      return Number(val).toFixed(num)
    }
  },
  directives: {
    drag: function(el) {
      const dragBox = el
      dragBox.onmousedown = (e) => {
        const disX = e.clientX - dragBox.offsetLeft
        const disY = e.clientY - dragBox.offsetTop
        document.onmousemove = (e) => {
          const left = e.clientX - disX
          const top = e.clientY - disY
          dragBox.style.left = left + 'px'
          dragBox.style.top = top + 'px'
        }
        document.onmouseup = (e) => {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  },
  components: {
    MyVideo
  },
  props: {
    floor: {
      type: Number,
      required: true
    },
    building: {
      type: Number,
      required: true
    },
    none: {
      type: Number,
      default: 0
    },
    bimId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // floor: 1,
      coldAndHeatIsShow: false,
      coldAndHeatData: [],
      floors: [],
      // building: 4,
      buildings: [
        {
          label: `3号楼`,
          value: 3
        },
        {
          label: `4号楼`,
          value: 4
        }
      ],
      vavIsShow: false,
      Id: '',
      url: '',
      // none: 0,
      alarmId: [],
      width: '380px',
      videoIsShow: false,
      ahu1IsShow: false,
      ahu2IsShow: false,
      fireTotalNumShow: false,
      airTotalNumShow: false,
      cctvTotalNumShow: false,
      havcTotalNumShow: false,
      selectIsShow: true,
      vavData: {},
      ahu1Data: {},
      ahu2Data: {},
      totalData: {},
      alarmArrData: []
    }
  },
  computed: {
    bimSrc() {
      return process.env.NODE_ENV === 'development'
        ? `http://localhost/ForgeViewerA.html?FLURN=B${this.building}F${this.floor}/3d.svf`
        : `http://101.132.169.245/bim/ForgeViewerA.html?FLURN=B${this.building}F${this.floor}/3d.svf`
    }
  },
  watch: {
    url: function(val, old) {
      this.$nextTick(() => {
        this.$refs.myVideo.play()
      })
    }
  },
  created() {
    window['handleBim'] = (id, child) => {
      this.callbackBim(id, child)
    }
  },
  mounted() {
    // this.test()
    this.getFloor3()
    const url = document.location.href.toString()
    const a = url && url.split('?') && url.split('?')[1] && url.split('?')[1].split('&')
    if (a && a.length === 4) {
      const bigNone = Number(a[0].split('=')[1])
      const bigBuilding = a[1].split('=')[1]
      const bigFloor = a[2].split('=')[1]
      const bigId = a[3].split('=')[1]
      this.selectIsShow = false
      this.building = bigBuilding
      this.floor = bigFloor
      const key = `B${bigBuilding}F${bigFloor}`
      const obj = {
        'B4F-4': fireB4F14,
        'B4F-3': fireB4F13,
        'B4F-2': fireB4F12,
        'B4F-1': fireB4F11,
        B4F1: fireB4F1,
        B4F2: fireB4F2,
        B4F3: fireB4F3,
        B4F4: fireB4F4,
        B4F5: fireB4F5,
        B4F6: fireB4F6,
        B4F7: fireB4F7,
        B4F8: fireB4F8
      }
      const arr = [Alarm, obj[key]]
      arr.forEach((i) => {
        i.forEach((v, k) => {
          if (bigId === k) {
            setTimeout(() => {
              this.clickMethod([bigNone, v])
            }, 1300)
          }
        })
      })
    }
    const callbackId = JSON.parse(
      localStorage.getItem('eventParams')
    )
    if (this.bimId) {
      // const { building, floor, id, none } = callbackId
      // this.selectIsShow = false
      // this.building = building
      // this.floor = floor
      const key = `B${this.building}F${this.floor}`
      const obj = {
        'B4F-4': fireB4F14,
        'B4F-3': fireB4F13,
        'B4F-2': fireB4F12,
        'B4F-1': fireB4F11,
        B4F1: fireB4F1,
        B4F2: fireB4F2,
        B4F3: fireB4F3,
        B4F4: fireB4F4,
        B4F5: fireB4F5,
        B4F6: fireB4F6,
        B4F7: fireB4F7,
        B4F8: fireB4F8
      }
      const arr = [Alarm, obj[key]]
      arr.forEach((i) => {
        i.forEach((v, k) => {
          if (this.bimId === k) {
            setTimeout(() => {
              this.clickMethod([this.none, v])
            }, 1300)
          }
        })
      })
      this.selectIsShow = false
    } else {
      getAlmEvents(this.building, this.floor)
        .then((res) => {
          if (res.code === '200') {
            this.alarmArrData = res.data
            Alarm.forEach((v, k) => {
              res.data.forEach((id) => {
                if (id === k) {
                  this.alarmId.push(v)
                }
              })
            })
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.clickMethod([this.none, ...this.alarmId])
          }, 800)
        })
    }
  },
  methods: {
    // 切换楼层时
    getDifferentBim() {
      getAlmEvents(this.building, this.floor)
        .then((res) => {
          if (res.code === '200') {
            Alarm.forEach((v, k) => {
              res.data.forEach((id) => {
                if (id === k) {
                  this.alarmId.push(v)
                }
              })
            })
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.clickMethod([this.none, ...this.alarmId])
          }, 800)
        })
    },
    _getTurnRtspToRtmp(id) {
      getTurnRtspToRtmp(id).then(res => {
        let data = res && res.data && res.data.split('/TV')[1]
        data = 'http://101.132.169.245:90/live?port=1935&app=myTV&stream=TV' + data
        this.url = data
      })
    },
    clickMethod(arr) {
      const obj = document.createElement('iframe')
      obj.name = 'tmp_frame'
      obj.src =
        process.env.NODE_ENV === 'development'
          ? 'http://localhost/index.html?id=' +
            JSON.stringify([`B${this.building}F${this.floor}`, ...arr]) +
            '&type=eq_id'
          : 'http://101.132.169.245/bim/index.html?id=' +
        JSON.stringify([`B${this.building}F${this.floor}`, ...arr]) +
        '&type=eq_id'
      obj.style.display = 'none'
      document.body.appendChild(obj)
    },
    // 点击模型时
    callbackBim(id, child) {
      this.Id = id
      console.log('fireControlBIM', id, typeof id)
      child.length >= 1 ? this.showCCTVTotalNum(id, child) : ''
      this.showHavcTotalNum(id)
      this.showAirTotalNum(id)
      this.showFireTotalNum(id)
      cctvId.forEach((val, key) => {
        if (id === String(val)) {
          this.videoIsShow = true
          this._getTurnRtspToRtmp(key)
        }
      })
      if (this.building === 4 && this.floor === 1) {
        ahuIdB4F1.forEach((v, k) => {
          if (id !== String(v)) {
            this.ahu2IsShow = false
          }
          if (id === String(v)) {
            getWarmAHUList(this.building, this.floor).then((res) => {
              if (res.data && v === 5670) {
                this.ahu2IsShow = true
                this.ahu2Data = res.data
              }
            })
          }
        })
      } else {
        this.showDifferentFloorData(id)
      }
    },
    showFireTotalNum(id) {
      const obj = {
        'B4F-4': fireB4F14,
        'B4F-3': fireB4F13,
        'B4F-2': fireB4F12,
        'B4F-1': fireB4F11,
        B4F1: fireB4F1,
        B4F2: fireB4F2,
        B4F3: fireB4F3,
        B4F4: fireB4F4,
        B4F5: fireB4F5,
        B4F6: fireB4F6,
        B4F7: fireB4F7,
        B4F8: fireB4F8
      }
      const key = `B${this.building}F${this.floor}`
      if (id !== String(fireNum[`fire${key}`])) {
        this.fireTotalNumShow = false
      }
      if (id === String(fireNum[`fire${key}`])) {
        this.totalData.total = obj[key].size
        this.totalData.breakdown = 0
        this.totalData.normal = obj[key].size
        if (obj[key].size > 0) {
          this.fireTotalNumShow = true
        }
      }
    },
    showAirTotalNum(id) {
      const obj = {
        B4F1: ahuIdB4F1,
        B4F2: ahuIdB4F2,
        B4F3: ahuIdB4F3,
        B4F4: ahuIdB4F4,
        B4F5: ahuIdB4F5,
        B4F6: ahuIdB4F6,
        B4F7: ahuIdB4F7,
        B4F8: ahuIdB4F8
      }
      const key = `B${this.building}F${this.floor}`
      if (id !== String(airNum[`air${key}`])) {
        this.airTotalNumShow = false
      }
      if (id === String(airNum[`air${key}`])) {
        this.totalData.total = obj[key].size
        this.totalData.breakdown = 0
        this.totalData.normal = obj[key].size
        if (obj[key].size > 0) {
          this.airTotalNumShow = true
        }
      }
    },
    showHavcTotalNum(id) {
      const obj = {
        B4F2: vavIdB4F2,
        B4F3: vavIdB4F3,
        B4F4: vavIdB4F4,
        B4F5: vavIdB4F5,
        B4F6: vavIdB4F6,
        B4F7: vavIdB4F7,
        B4F8: vavIdB4F8
      }
      const key = `B${this.building}F${this.floor}`
      if (id !== String(havcNum[`havc${key}`])) {
        this.havcTotalNumShow = false
      }
      if (id === String(havcNum[`havc${key}`])) {
        this.totalData.total = obj[key].size
        this.totalData.breakdown = 0
        this.totalData.normal = obj[key].size
        if (obj[key].size > 0) {
          this.havcTotalNumShow = true
        }
      }
    },
    showCCTVTotalNum(id, child) {
      const key = `B${this.building}F${this.floor}`
      if (id !== String(cctvNum[`cctv${key}`])) {
        this.cctvTotalNumShow = false
      }
      if (id === String(cctvNum[`cctv${key}`])) {
        const num = Math.random().toFixed() * 4 + 3
        // const a = child.slice(3, 5).map((item) => item.displayValue);
        const a = child[num]
        const b = child[num - 2]
        const c = [a, b]
        this.clickMethod(c)
        this.totalData.total = child.length
        this.totalData.breakdown = c.length
        this.totalData.normal = child.length - c.length
        if (child.length > 0) {
          this.cctvTotalNumShow = true
        }
      }
    },
    showDifferentFloorData(id) {
      const arr = {
        'B4F-1': coldAndHeatMap,
        B4F2: [vavIdB4F2, ahuIdB4F2],
        B4F3: [vavIdB4F3, ahuIdB4F3],
        B4F4: [vavIdB4F4, ahuIdB4F4],
        B4F5: [vavIdB4F5, ahuIdB4F5],
        B4F6: [vavIdB4F6, ahuIdB4F6],
        B4F7: [vavIdB4F7, ahuIdB4F7],
        B4F8: [vavIdB4F8, ahuIdB4F8]
      }
      const key = `B${this.building}F${this.floor}`
      if (key === 'B4F-1') {
        arr['B4F-1'].forEach((v, k) => {
          if (id !== String(v)) {
            this.coldAndHeatIsShow = false
          }
          if (id === String(v) && (k === 'che1' || k === 'che2')) {
            const arr = [coldAndHeat1, coldAndHeat2]
            getColdSourceList('cd').then(res => {
              this.coldAndHeatData = []
              arr.forEach(key => {
                key.forEach(item => {
                  item['value'] = res.data[item.id].value
                })
              })
              if (k === 'che1') {
                this.coldAndHeatData = [...coldAndHeat1]
                this.coldAndHeatIsShow = true
              } else {
                this.coldAndHeatData = [...coldAndHeat2]
                this.coldAndHeatIsShow = true
              }
            })
          } else if (id === String(v) && (k === 'hhe1' || k === 'hhe2')) {
            const arr = [coldAndHeat1, coldAndHeat2]
            getHeatSourceList('cd').then(res => {
              this.coldAndHeatData = []
              const mapData = {}
              mapId.forEach((val, key) => {
                mapData[key] = {
                  value: res.data[val].value
                }
              })
              arr.forEach(key => {
                key.forEach(item => {
                  item['value'] = mapData[item.id].value
                })
              })
              if (k === 'hhe1') {
                this.coldAndHeatData = [...coldAndHeat1]
                this.coldAndHeatIsShow = true
              } else {
                this.coldAndHeatData = [...coldAndHeat2]
                this.coldAndHeatIsShow = true
              }
            })
          }
        })
      } else if (key === 'B4F-2' || key === 'B4F-3' || key === 'B4F-4') {
        return
      } else {
        const dataMap = arr[key]
        dataMap[0].forEach((v, k) => {
          if (id !== String(v)) {
            this.vavIsShow = false
          }
          if (id === String(v)) {
            getVAVList(this.building, this.floor).then((res) => {
              this.vavData = res.data[k]
              if (res.data[k]) {
                this.vavIsShow = true
              }
            })
          }
        })
        dataMap[1].forEach((v, k) => {
          if (id !== String(v)) {
            this.ahu1IsShow = false
            this.ahu2IsShow = false
          }
          if (id === String(v)) {
            getWarmAHUList(this.building, this.floor).then((res) => {
              if (res.data && k === `B${this.building}F${this.floor}1`) {
                this.ahu1IsShow = true
                this.ahu1Data = res.data
              } else if (res.data && k === `B${this.building}F${this.floor}2`) {
                this.ahu2IsShow = true
                this.ahu2Data = res.data
              }
            })
          }
        })
      }
    },
    loadBim() {
      localStorage.removeItem('eventParams')
    },
    selectFloor(val) {
      this.floor = val
      this.alarmId = []
      this.videoIsShow = false
      this.vavIsShow = false
      this.ahu1IsShow = false
      this.ahu2IsShow = false
      this.airTotalNumShow = false
      this.fireTotalNumShow = false
      this.havcTotalNumShow = false
      this.cctvTotalNumShow = false
      this.coldAndHeatIsShow = false
      this.totalData = {}
      setTimeout(() => {
        this.getDifferentBim()
      }, 0)
    },
    selectBuilding(val) {
      this.building = val
      this.alarmId = []
      this.videoIsShow = false
      this.vavIsShow = false
      this.ahu1IsShow = false
      this.ahu2IsShow = false
      this.airTotalNumShow = false
      this.fireTotalNumShow = false
      this.havcTotalNumShow = false
      this.cctvTotalNumShow = false
      this.coldAndHeatIsShow = false
    },
    getFloor3() {
      const f = new Array(8).fill(-1).map((item, index) => ({
        label: `第${index + 1}层`,
        value: index + 1
      }))
      this.floors = [
        { label: '负四层', value: -4 },
        { label: '负三层', value: -3 },
        { label: '负二层', value: -2 },
        { label: '负一层', value: -1 },
        { label: '整栋', value: 0 },
        ...f,
        { label: 'RF', value: 9 }
      ]
    },
    closeInfo() {
      this.vavIsShow = false
      this.ahu1IsShow = false
      this.ahu2IsShow = false
      this.coldAndHeatIsShow = false
    },
    closeVideo() {
      this.videoIsShow = false
      this.url = ''
    },
    closeTotalNum() {
      this.airTotalNumShow = false
      this.fireTotalNumShow = false
      this.havcTotalNumShow = false
      this.cctvTotalNumShow = false
    },
    test() {
      var a = document.getElementsByClassName('el-input__inner');
      [].slice.call(a).forEach(item => {
        item.style.background = '#021323'
        item.style.border = '1px solid #646464'
        item.style.borderRadius = '20px'
        item.style.color = '#fff'
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  background-color: #e3e3e3;
  height: calc(100vh);
  // padding: 0.5rem;
}
.mainFrame {
  width: 100%;
  height: 100%;
}
.selectbtn {
  display: flex;
  position: absolute;
  left: 13vw;
  top: 1vh;
  width: 13%;
  height: 10%;
}
.el-input--medium {
  font-weight: 900;
  font-size: 20px;
}
.deviceInfo {
  position: absolute;
  left: 55vw;
  top: 5vh;
  padding: 10px;
  padding-top: 30px;
  background-color: #1f2123;
  cursor: move;
  z-index: 999;
  div {
      margin-bottom: 5px;
  }
}
.total-num {
  position: absolute;
  left: 40vw;
  top: 5vh;
  padding: 10px;
  padding-top: 30px;
  // width: 10%;
  // height: 20%;
  background-color: #1f2123;
  cursor: move;
  z-index: 999;
}
.video-js {
  position: absolute;
  left: 75vw;
  top: 5vh;
  width: 15%;
  height: 20%;
  cursor: move;
  z-index: 3000;
  // background-color: #303133;
}
.drag {
  width: 100%;
  height: 500px;
  background-color: #fff;
}
.drag_box {
  width: 150px;
  height: 90px;
  border: 1px solid #666;
  background-color: #ccc;
  /* 使用定位，脱离文档流 */
  position: relative;
  top: 100px;
  left: 100px;
  /* 鼠标移入变成拖拽手势 */
  cursor: move;
  z-index: 3000;
}
/deep/.select-option {
  background-color: #021323;
  border-radius: 0.08rem;
  border: solid 0.06rem #1c395d;
  font-family: PingFangSC-Regular;
  .el-select-dropdown__item.selected {
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: rgba(74, 141, 253, 1);
  }
  li {
    background: transparent;
    color: #fff;
    font-size: 0.28rem;
  }
  .el-select-dropdown__item:hover,
  .el-select-dropdown__item.hover {
    background-color: rgba(110, 147, 206, 0.2);
    margin-right: 1px;
  }
  .popper__arrow::after {
    border-bottom-color: #021323;
  }
  .popper__arrow {
    border-bottom-color: #021323;
  }
  .el-select-dropdown__empty {
    padding: 0.2rem;
    font-size: 0.28rem;
  }
}
.ahref {
  display: block;
  position: absolute;
  width: 76px;
  border-radius: 20px;
  border: 1px solid #646464;
  padding: 12px 12px;
  line-height: 1;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  top: 0;
  z-index: 9;
  left: -80px;
  text-decoration: none;
  color: #fff;
  background-color: #021323;
}
.el-input__inner {
  background-color: red !important;
}
.el-input {
  input {
    background-color: red !important;
  }
}
</style>
