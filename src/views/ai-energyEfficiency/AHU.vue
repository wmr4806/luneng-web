<template>
  <div v-loading="loading" style="background-color:#18111f;height:125vh">
    <el-card style="background-color:#18111f;color:#fff;border:none;border-bottom:1px solid #fff;">
      <div class="container">
        <el-row style="padding: 1rem 0">
          <span style="margin-right: 2px">4号楼:</span>
          <el-select v-model="floor" placeholder="请选择" class="ahu-input" @change="selectFloor">
            <el-option
              v-for="({ label,value }) in floors"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
          <span style="margin:0 1rem">模式:</span>
          <el-select v-model="mode" placeholder="请选择" class="ahu-input" @change="selectMode">
            <el-option
              v-for="({ label,value }) in modes"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
          <el-popover
            v-model="showTime"
            placement="bottom-end"
            title="在时间段内搜索:"
            trigger="click"
          >
            <div class="time">
              <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                size="small"
                :picker-options="options"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <div class="footer">
                <el-button size="mini" type="text" @click="showTime = false">取消</el-button>
                <el-button type="primary" size="mini" @click="getHistoryData">确定</el-button>
              </div>
            </div>
            <!-- <el-button slot="reference" type="primary" style="margin-left: 1rem;">历史数据</el-button> -->
          </el-popover>
          <div style="float: right;display:inline-block;position: relative;top:-5px;margin-right:5px">
            <div>
              流量计1：<el-tag
                v-for="(item,index) in tags.flowOne"
                :key="index"
                type="info"
                effect="plain"
                style="margin-left: 5px"
              >
                <div>
                  {{ item.label }}：
                  <span style="font-weight: bold;">{{ flow.flowOneData[index] }} {{ item.unit }}</span>
                </div>
              </el-tag>
            </div>
            <div>
              流量计2：<el-tag
                v-for="(item,indey) in tags.flowTwo"
                :key="indey"
                type="info"
                effect="plain"
                style="margin-left: 5px"
              >
                <div>
                  {{ item.label }}：
                  <span style="font-weight: bold;">{{ flow.flowTwoData[indey] }} {{ item.unit }}</span>
                </div>
              </el-tag>
            </div>
          </div>
          <el-divider />
          <el-switch
            v-model="workMode"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            active-text="智能优化控制"
            inactive-text="系统原有控制"
            @change="changeWorkMode"
          />
        </el-row>
        <a-h-u-machine
          v-for="(item,index) in values[mode]"
          :key="index"
          :index="index"
          :fan="fan[index]"
          :pipe="pipe[index]"
          :ahu="item"
          :is-winter="mode === 1"
          :work-mode="Number(workMode)"
          :floor="floor"
        />
      </div>
    </el-card>
    <div ref="figure1" style="width: 100%;height:25rem;background-color:#18111f" />
  </div>
</template>

<script>
import echarts from 'echarts'
import AHUMachine from './AHUMachine'
import { getWarmAHUList, getAHUEnableAlgorithm, getAiInfos, getEnableNow } from '@/api/data'
// import { color } from 'echarts/lib/export'
export default {
  name: 'AHU',
  components: { AHUMachine },
  data() {
    return {
      loading: true,
      flow: {
        flowOneData: [],
        flowTwoData: []
      },
      floor: 3,
      floors: [],
      mode: 0,
      modes: [
        { value: 0, label: '夏季模式' },
        { value: 1, label: '冬季模式' }
        // { value: 2, label: '过渡模式' }
      ],
      fan: [{
        open: true,
        speed: 2
      }, {
        open: true,
        speed: 2
      }],
      pipe: [
        {
          open: true
        },
        {
          open: true
        }
      ],
      values: [],
      showTime: false,
      timeRange: [],
      workMode: '0',
      options: {
        disabledDate: time => time.getTime() > new Date()
      },
      warmAHUList: [],
      xTime: [],
      timer: null,
      timeId: ''
    }
  },
  computed: {
    tags() {
      return {
        flowOne: [{ label: '流量', unit: 'm3/h' }, { label: '送水', unit: '℃' }, { label: '回水', unit: '℃' }, { label: '供热量', unit: 'kw' }, { label: '电量', unit: 'kwh' }],
        flowTwo: [{ label: '流量', unit: 'm3/h' }, { label: '送水', unit: '℃' }, { label: '回水', unit: '℃' }, { label: '供热量', unit: 'kw' }, { label: '调用次数', unit: '次' }]
      }
    },
    ahuData() {
      return [
        [
          {
            newWind: ['', 'N/a', 'N/a'],
            sendWind: ['', ''],
            water: '',
            returnWind: '',
            co2: '',
            machine: ['', '', ''],
            machineName: 'AHU1'
          },
          {
            newWind: ['', 'N/a', 'N/a'],
            sendWind: ['', ''],
            water: '',
            returnWind: '',
            co2: '',
            machine: ['', '', ''],
            machineName: 'AHU2'
          }
        ],
        [
          {
            newWind: [17, 'N/a', 'N/a'],
            sendWind: [18.2, 13],
            water: 78,
            returnWind: 22.3,
            co2: 41,
            machine: [18, 100, 24],
            machineName: 'AHU1'
          },
          {
            newWind: [27, 'N/a', 'N/a'],
            sendWind: [18.6, 18],
            water: 84,
            returnWind: 23.6,
            co2: 45,
            machine: [12, 10, 20],
            machineName: 'AHU2'
          }
        ],
        [
          {
            newWind: [50, 21.5, 70],
            sendWind: [21.8, 76],
            water: 0,
            returnWind: 23.4,
            co2: 75,
            machine: [44, 45, 18],
            machineName: 'AHU1'
          },
          {
            newWind: [60, 20.5, 75],
            sendWind: [22.1, 76],
            water: 0,
            returnWind: 22.8,
            co2: 25,
            machine: [20, 11, 32],
            machineName: 'AHU2'
          }
        ]
      ]
    },
    series() {
      return [{
        name: 'AHU1',
        // value: 12,
        data: [13.7, 12.9, 18, 12.3, 12.9, 11.8, 13, 12.4, 6, 8.2, 9.2, 12.3, 9.3, 8.7, 4.3, 8.2]
      }, {
        name: 'AHU2',
        // value: 10,
        data: [6, 8.2, 9.2, 11.3, 9.3, 8.7, 8.3, 8.2, 13.7, 12.9, 11, 8.3, 11.9, 7.8, 11, 4.4]
      }].map(({ name, data }) => {
        return {
          name: `${name}风机功率曲线`,
          type: 'line',
          data
          // markLine: {
          //   symbol: ['circle', 'none'],
          //   data: [
          //     {
          //       silent: false,
          //       lineStyle: {
          //         type: 'dashed'
          //       },
          //       label: {
          //         position: 'end',
          //         formatter: `${name}风机功率: (${value} KW)`
          //       },
          //       yAxis: value
          //     }
          //   ]
          // }
        }
      })
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted() {
    this._getAiInfos()
    this.changeSeason()
    getEnableNow().then(res => {
      if (res.code === '200' && res.data) {
        this.changeWorkMode('1')
        this.workMode = '1'
      }
    })
    this._getWarmAHUList()
    this.timer = setInterval(() => {
      this._getAiInfos()
      getWarmAHUList('4', this.floor).then((res) => {
        this.warmAHUList = res.data
        this.xTime.push(new Date().format('HH:mm:ss'))
        if (this.xTime.length === 12) {
          this.xTime.splice(0, 1)
        }
        const mychart = echarts && echarts.init(this.$refs.figure1)
        mychart.setOption({
          xAxis: {
            data: this.xTime,
            color: '#fff'
          }
        })
      })
    }, 1000 * 60)
    this.$nextTick(() => {
      const { $refs: { figure1 }, init, getFloor } = this
      init(figure1)
      getFloor()
      this.values = this.ahuData
      setTimeout(() => {
        this.loading = false
      }, 100)
      // setTimeout(getData, 1000)
    })
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    _getAiInfos() {
      getAiInfos().then(res => {
        const { flow: { flowOneData, flowTwoData }} = this
        const { calls, electric, flowOne = {}, flowTwo = {}} = res && res.data
        flowOneData.push(flowOne.flow, flowOne.inletWater, flowOne.returnWater, Math.abs(flowOne.cold), electric)
        flowTwoData.push(flowTwo.flow, flowTwo.inletWater, flowTwo.returnWater, Math.abs(flowTwo.cold), calls)
      })
    },
    _getWarmAHUList() {
      getWarmAHUList('4', this.floor).then(res => {
        this.warmAHUList = res.data
        console.log(res)
        // if (this.floor === 3) {
        //   this.pipe[0].open = this.fan[0].open = res.data[`AHU4-${this.floor}-1-S_CV`].value === 'true'
        // }
        // this.pipe[1].open = this.fan[1].open = res.data[`AHU4-${this.floor}-2-S_CV`].value === 'true'
        this.pipe.forEach((item, index) => {
          this.fan[index].open = item.open = res.data[`AHU4-${this.floor}-${index + 1}-SF_CV`].value >= 20
        })
        const { mode, ahuData } = this
        ahuData[mode].forEach((item, index) => {
          item.newWind.splice(0, 1, res.data[`AHU4-${this.floor}-${index + 1}-OAD_CV`].value)
          item.co2 = res.data[`AHU4-${this.floor}-${index + 1}-CO2_CV`].value
          item.water = res.data[`AHU4-${this.floor}-${index + 1}-RT_CV`].value
          item.returnWind = res.data[`AHU4-${this.floor}-${index + 1}-RT_CV`].value
          item.machine = []
          item.machine.push(res.data[`AHU4-${this.floor}-${index + 1}-SP1_CV`].value, res.data[`AHU4-${this.floor}-${index + 1}-SF_CV`].value >= 20 ? res.data[`AHU4-${this.floor}-${index + 1}-SF_CV`].value : 0, res.data[`AHU4-${this.floor}-${index + 1}-ST_CV`].value)
        })
      })
    },
    // async getData() {
    //   const { values, ahu, mode, getData } = this
    //   setTimeout(() => {
    //     this.values = []
    //     const handle = arr => {
    //       return [
    //         Math.floor((arr[0] + Math.random() * -2 + 1) * 10) / 10,
    //         Math.floor((arr[1] + Math.random() * -10 + 5) * 10) / 10
    //       ]
    //     }
    //     values[mode] = values[mode].map((item, index) => {
    //       return {
    //         newWind: [ahu[mode] && ahu[mode][index] && ahu[mode][index].newWind && ahu[mode][index].newWind[0], ...handle([ahu[mode][index].newWind[1], ahu[mode][index].newWind[2]])],
    //         sendWind: handle(ahu[mode][index].sendWind),
    //         water: ahu[mode][index].water,
    //         returnWind: Math.floor((ahu[mode][index].returnWind + Math.random() * -2 + 1) * 10) / 10
    //       }
    //     })
    //     this.values = values
    //     getData()
    //     // console.warn(this.values[mode][0].newWind, this.ahu[mode][0].newWind);
    //   }, 60 * 1000)
    // },
    async getHistoryData() {
      this.showTime = false
    },
    async changeWorkMode(val) {
      const params = val === '1' ? 'enable' : 'disable'
      getAHUEnableAlgorithm(params).then(() => {
        this.workMode === '0' ? '0' : '1'
        this.$message({
          type: 'success',
          message: `${['系统原有控制', '智能优化控制'][val]}`
        })
      })
      // this.$confirm('将要切换控制模式, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   const params = val === '1' ? 'enable' : 'disable'
      //   getAHUEnableAlgorithm(params).then(() => {
      //     this.$message({
      //       type: 'success',
      //       message: `切换到: ${['系统原有控制', '智能优化控制'][val]}`
      //     })
      //   })
      // }).catch(() => {
      //   this.workMode = this.workMode === 0 ? 1 : 0
      // })
    },
    async getFloor() {
      this.floors = new Array(8).fill(-1).map((item, index) => {
        return {
          label: `第${index + 1}层`,
          value: index + 1
        }
      })
    },
    selectFloor(val) {
      this.floor = val
      this._getWarmAHUList()
      this.$message({
        type: 'success',
        message: `切换到: 第${[val]}层`
      })
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
    selectMode(val) {
      // const params = val === '1' ? 'winter' : 'summer'
      // getAHUSwitchSeason(params).then(() => {
      //   this.mode = val
      //   this.$message({
      //     type: 'success',
      //     message: `切换到: ${['夏季模式', '冬季模式'][val]}`
      //   })
      // })
      this._getWarmAHUList()
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 600)
    },
    changeSeason() {
      const now = new Date()
      const month = now.getMonth()
      if (month >= 4 && month <= 10) {
        this.mode = 0
      } else {
        this.mode = 1
      }
    },
    init(ref) {
      const chart = echarts.init(ref)
      const { setOption, series } = this
      chart.setOption(setOption('AHU风机运行功率比较', [], series))
    },
    setOption(title, data, series) {
      return {
        title: {
          text: title,
          left: 'center',
          textStyle: {
            color: '#1e98d3'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['AHU1风机功率曲线', 'AHU2风机功率曲线'],
          left: 'center',
          top: '35',
          textStyle: {
            color: '#1e98d3'
          }
        },
        toolbox: {
          show: true,
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            // restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data,
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        yAxis: {
          // name: '风机功率(KW)',
          type: 'value',
          axisLabel: {
            formatter: '{value} KW',
            fontWeight: '900',
            fontSize: '18'
          },
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 80
          }, {
            start: 0,
            end: 80,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .time {
    padding: .1rem;

    .footer {
      text-align: right;
      margin: 1rem 0 0 0;
    }
  }
  .el-tag--plain, .el-tag--info {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    background-color: #c5bdbd;
  }
  .ahu-input {
    width: 8%;
  }
</style>
