<template>
  <el-row type="flex" align="middle">
    <el-col :span="5" :offset="0" :push="1">
      <div class="box" style="margin-left: 5%">
        <el-tag
          v-for="(item,i) in tags.newWind"
          :key="i"
          type="info"
          effect="plain"
        >
          <div>
            {{ item.label }}
            <span style="font-weight: bold;">{{ ahu.newWind[i] || '' }} {{ item.unit }}</span>
          </div>
        </el-tag>
      </div>
    </el-col>

    <el-col :span="9">
      <div style="position:relative;top:-20px;left:0;">
        <el-tag type="info" effect="plain" style="margin:  0 0 0 26%;">
          CO2浓度:
          <span style="font-weight: bold;">{{ ahu.co2 || '' }}ppm</span>
        </el-tag>
        <el-tag type="info" effect="plain" style="margin:  0 0 0 26%;">
          回风温度:
          <span style="font-weight: bold;">{{ ahu.returnWind || '' }}°C</span>
        </el-tag>
        <el-tag type="info" effect="plain" style="margin:  0 0 0 41%;">
          <span style="font-weight: bold;">{{ ahu.machineName || '' }}</span>
        </el-tag>
        <!-- <el-image
          :src="require(`@/assets/build/wind.gif`)"
          style="left: -12rem;z-index: 2;top: 3.5rem;transform: rotate(90deg)"
          fit="fill"
          lazy
        /> -->
      </div>
      <div style="text-align: center;" @click.capture.stop="() => {}">
        <el-image
          :src="require(`@/assets/build/wind.gif`)"
          style="left: 1rem;z-index: 2;top: -1.5rem;"
          fit="fill"
          lazy
        />
        <el-image
          :src="require(`@/assets/build/${speed}`)"
          style="width: 40%;position: relative;z-index: 1"
          fit="fill"
          lazy
        />
        <el-image
          :src="require(`@/assets/build/wind.gif`)"
          style="left: 0rem;z-index: 2;top: -2.5rem;"
          fit="fill"
          lazy
        />
      </div>
      <div style="text-align: center;" @click.capture.stop="() => {}">
        <el-image
          :src="require(`@/assets/build/${pipe.open ? 'pipe_up.gif' : 'pipe.png'}`)"
          :class="isWinter ? 'filter' : ''"
          style="width: .75rem;margin:-2rem 0 0 1.6rem"
          fit="fill"
          lazy
        />
        <el-image
          :src="require(`@/assets/build/${pipe.open ? 'pipe_down.gif' : 'pipe.png'}`)"
          :class="isWinter ? 'filter' : ''"
          style="width: .75rem;margin:-2rem 0 0 2.2rem;position: absolute"
          fit="fill"
          lazy
        />
        <el-image
          :src="require(`@/assets/build/handle_${pipe.open ? 'open' : 'close'}.png`)"
          style="width: 1.9rem;margin:0 0 0 -1.75rem;position: absolute"
          fit="fill"
          lazy
        />
        <el-tag type="info" effect="plain" style="margin:  0 0 0 -14.5%;position: absolute">
          水阀开度:
          <span style="font-weight: bold;">{{ ahu.water }}%</span>
        </el-tag>
      </div>
    </el-col>

    <!--    <div class="box" style="right: 15%">-->
    <!--      <el-tag-->
    <!--        v-for="(item,index) in tags.sendWind"-->
    <!--        :key="index"-->
    <!--        type="info"-->
    <!--        effect="plain"-->
    <!--      >-->
    <!--        <div>-->
    <!--          {{ item.label }} :-->
    <!--          <span style="font-weight: bold;">{{ ahu.sendWind[index] || '' }}{{ item.unit }}</span>-->
    <!--        </div>-->
    <!--      </el-tag>-->
    <!--    </div>-->
    <!--    <div class="box" style="right: 2%">-->
    <!--      <el-tag-->
    <!--        v-for="(item,index) in tags.opsizime"-->
    <!--        :key="index"-->
    <!--        type="info"-->
    <!--        effect="plain"-->
    <!--      >-->
    <!--        <div>-->
    <!--          <div>{{ item.label }} : <span style="font-weight: bold;">{{ ahu.sendWind[index] || '' }}{{ item.unit }}</span></div>-->
    <!--          <div style="margin:20px"><el-button type="primary" size="small">开始优化</el-button></div>-->
    <!--          <div style="margin:20px"><el-button type="success" size="small">停止优化</el-button></div>-->
    <!--        </div>-->
    <!--      </el-tag>-->
    <!--    </div>-->
    <el-col :span="4" :pull="1">
      <div class="box" style="position:relative;top:-45px;left:-34px">
        <el-tag
          v-for="(item,i) in tags.machine"
          :key="i"
          type="info"
          effect="plain"
        >
          <div>
            {{ item.label }} :
            <span style="font-weight: bold;">{{ ahu.machine && ahu.machine[i] }}{{ item.unit }}</span>
          </div>
        </el-tag>
      </div>
    </el-col>
    <el-col :span="8" :offset="1" :pull="1">
      <div ref="figure" class="chart" style="width: 100%;height:18rem;" />
    </el-col>
  </el-row>
</template>

<script>
import echarts from 'echarts'
import { getWarmAHUList } from '@/api/data'

export default {
  name: 'AHUMachine',
  props: {
    isWinter: {
      type: Boolean,
      default: false
    },
    fan: {
      type: Object,
      default() {
        return {
          open: false,
          speed: 0
        }
      }
    },
    pipe: {
      type: Object,
      default() {
        return {
          open: false
        }
      }
    },
    workMode: {
      type: Number,
      default: 0
    },
    index: {
      type: Number,
      default: 0
    },
    floor: {
      type: Number,
      default: 3
    },
    ahu: {
      type: Object,
      default() {
        return {
          newWind: [],
          sendWind: [],
          machine: [],
          machineName: '',
          water: '',
          returnWind: '',
          co2: ''
        }
      }
    }
  },
  data() {
    return {
      chart: '',
      time: [],
      temp: [],
      pressure: [],
      freq: [],
      spressure: []
      // fan: {
      //   open: true,
      //   speed: 2
      // },
      // pipe: {
      //   open: true
      // }
    }
  },
  computed: {
    tags() {
      return {
        newWind: [{ label: '新风阀开度', unit: '%' }, { label: '新风温度', unit: '°C' }, { label: '新风湿度', unit: '%' }],
        sendWind: [{ label: '送风温度', unit: '°C' }, { label: '送风湿度', unit: '%' }, { label: '送风静压' }],
        machine: [{ label: '送风压力', unit: 'Pa' }, { label: '风机频率', unit: 'Hz' }, { label: '送风温度', unit: '℃' }],
        opsizime: [{ label: '送风温度优化值', unit: '°C' }]
      }
    },
    speed() {
      const { fan: { open, speed = 0 }} = this
      const handle = s => {
        switch (s) {
          case 0:
            return 'low'
          case 1:
            return 'mid'
          case 2:
            return 'high'
          default:
            return 'low'
        }
      }
      return open ? `ahu_${handle(speed)}.gif` : 'ahu.png'
    },
    keys() {
      return this.index === 1 ? [`AHU4-${this.floor}-2-SP1_CV`, `AHU4-${this.floor}-2-SF_CV`, `AHU4-${this.floor}-2-ST_CV`] : [`AHU4-${this.floor}-1-SP1_CV`, `AHU4-${this.floor}-1-SF_CV`, `AHU4-${this.floor}-1-ST_CV`]
    },
    ahufan() {
      return [`AHU4-${this.floor}-${this.index + 1}-S_CV`]
      // return [`AHU4-${this.floor}-${this.index + 1}-C_CV`, `AHU4-${this.floor}-${this.index + 1}-S_CV`, `AHU4-${this.floor}-${this.index + 1}-ALM_CV`, `AHU4-${this.floor}-${this.index + 1}-SF_CV`]
    }
  },
  watch: {
    'freq': function(newV) {
      const { temp, pressure, setSeries, time } = this
      setSeries('figure', time, [
        {
          name: '送风温度',
          type: 'line',
          data: temp
        },
        {
          name: '送风压力',
          type: 'line',
          data: pressure
        },
        {
          name: '风机频率',
          type: 'line',
          data: newV
        }
      ])
    },
    'workMode': function(newV) {
      this.setToolTip(newV)
    },
    floor(newVal, oldVal) {
      console.log('newVal', newVal, oldVal)
      this.time = []
      this.temp = []
      this.pressure = []
      this.freq = []
      this._getWarmAHUList()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._getWarmAHUList()
      const { $refs: { figure }, init, setToolTip, workMode } = this
      init(figure, '')
      setToolTip(workMode)
      const timer = () => {
        setTimeout(() => {
          this._getWarmAHUList()
          timer()
        }, 1000 * 5)
      }
      timer()
    })
  },
  methods: {
    _getWarmAHUList() {
      if (this.time.length === 7) {
        this.time.splice(0, 1)
      }
      getWarmAHUList('4', this.floor).then(res => {
        const arrs = [this.pressure, this.freq, this.temp]
        this.keys.forEach((k, index) => arrs[index].push(res && res.data && res.data[k].value))
        // this.ahufan.forEach((item, index) => {
        //   this.fan.open = res.data[item].value === 'false'
        //   this.pipe.open = res.data[item].value === 'false'
        // })
      })
      this.time.push(new Date().format('HH:mm:ss'))
    },
    init(ref, title) {
      const chart = echarts.init(ref)
      const { setOption } = this
      if (chart) {
        chart.setOption(setOption(title))
        this.chart = chart
      }
    },
    setOption(title) {
      return {
        title: {
          text: title,
          left: 'center'
        },
        legend: {
          data: ['送风压力', '风机频率', '送风温度'],
          left: 50,
          top: 20,
          textStyle: {
            color: '#1e98d3'
          }
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [],
          axisLabel: {
            rotate: '30'
          },
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        yAxis: {
          // name: '送风压力(Pa)\n or \n风机频率(Hz)\n or \n送风温度(°C)',
          // nameTextStyle: {
          //   lineHeight: 8,
          //   fontSize: 8,
          //   padding: [3, 0, 0, 3]
          // },
          type: 'value',
          axisLabel: {
            fontWeight: '900',
            fontSize: '14'
          },
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          },
          min: value => Math.floor(value.min) - 5,
          max: value => Math.ceil(value.max) + 5
        }
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     start: 0,
        //     end: 80
        //   }, {
        //     start: 0,
        //     end: 80,
        //     handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
        //     handleSize: '80%',
        //     handleStyle: {
        //       color: '#fff',
        //       shadowBlur: 3,
        //       shadowColor: 'rgba(0, 0, 0, 0.6)',
        //       shadowOffsetX: 2,
        //       shadowOffsetY: 2
        //     }
        //   }
        // ]
      }
    },
    setToolTip(workMode) {
      const chart = this.chart
      chart && chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter: (workMode ? '智能优化控制模式' : '原有控制模式') + ':<br />{a0}: {c0} °C<br />{a1}: {c1} Pa<br />{a2}: {c2} Hz'
        }
      })
    },
    setSeries(id, xData, series) {
      const chart = this.chart
      chart && chart.setOption({
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData
        },
        series
      })
    }
  }
}
</script>

<style scoped lang="less">
  .box {
    /*position: absolute;*/
    /*top: 0;*/
    /*width: 15%;*/
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }

  span {
    margin: 0.5rem 1rem;
  }

  .filter {
    filter: hue-rotate(144deg);
    -webkit-filter: hue-rotate(144deg);
  }

  .chart {
    width: 100%;
    height: 15rem;
  }

  .el-tag--plain, .el-tag--info {
    font-size: 16px;
    font-weight: 800;
    color: #000000;
    background-color: #c5bdbd;

  }
</style>
