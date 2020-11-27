<template>
  <div v-loading="loading" style=" background: #18111f;height:170vh">
    <div style=" position: fixed; top: 88px; z-index: 10; background: #18111f;color:#fff;width:100%">
      <el-row style="padding: 1rem 0;">
        <!-- <span style="margin: 0 1rem; ">4号楼:</span> -->
        <span style="margin-right: 1rem">请选择所在楼号:</span>
        <el-select v-model="building" placeholder="请选择" @change="selectBuilding">
          <el-option
            v-for="({ label,value }) in buildings"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
        <el-select v-model="floor" placeholder="请选择" @change="selectFloor">
          <el-option
            v-for="({ label,value }) in floors"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select>
        <!-- <span style="margin:0 1rem">请选择工作模式:</span>
        <el-select v-model="mode" placeholder="请选择" @change="changeSelectMode">
          <el-option
            v-for="({ label,value }) in modes"
            :key="value"
            :label="label"
            :value="value"
          />
        </el-select> -->
      </el-row>
    </div>
    <VAVTOP v-if="building === 3 || building === 4" :vavlist="vavListTop" :floor="floor" :building="building" />
    <VAV1B2F v-else-if="building === 1" :floor="floor" :vavlist="vavListTop" />
    <VAV2B2F v-else-if="building === 2" :floor="floor" :vavlist="vavListTop" />
    <div v-if="building === 3 || building === 4" ref="figure1" style="width: 100%;height:55rem;" />
    <!-- <div ref="figure2" style="width: 100%;height:50rem;" /> -->
  </div>
</template>

<script>
import echarts from 'echarts'
import VAVTOP from './VAVTOP'
import VAV1B2F from './VAV1B2F'
import VAV2B2F from './VAV2B2F'
import { getVAVList } from '@/api/data'
export default {
  name: 'VAV',
  components: {
    VAVTOP,
    VAV1B2F,
    VAV2B2F
  },
  filters: {
    toFixedNum(val) {
      return Number(val).toFixed(1)
    }
  },
  data() {
    return {
      loading: false,
      vavList: [],
      vavListTop: {},
      timer: null,
      xTime: [],
      queue: [],
      floor: 3,
      floors: [],
      building: 4,
      buildings: [
        {
          label: `1号楼`,
          value: 1
        }, {
          label: `2号楼`,
          value: 2
        }, {
          label: `3号楼`,
          value: 3
        }, {
          label: `4号楼`,
          value: 4
        }
      ],
      stopOptimizeNum: '25.3',
      startOptimizeNum: '25.0',
      loaded: false,
      obj: {}
    }
  },
  computed: {
    legend() {
      return this.vavList.map((item, index) => `${item.item}`)
    },
    series() {
      return {
        pmv: this.vavList.map(item => ({
          name: item.item,
          symbolSize: 15,
          type: 'scatter',
          data: new Array(6).fill(1).map((key, index) => [index, this.queue && this.queue[index] && this.queue[index][`VAV${this.building}L${this.floor}F${item.item}-T_CV`] && this.queue[index][`VAV${this.building}L${this.floor}F${item.item}-T_CV`].pmv])
        })
        ),
        temp: new Array(42).fill(1).map((item, index) => {
          return {
            name: index,
            symbolSize: 20,
            type: 'scatter',
            data: []// new Array(7).fill(1).map((item, index) => [index, (Math.random() * 4 + 22).toFixed(1)])
          }
        })
      }
    }
  },
  destroyed() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  mounted() {
    // this.building === 3 ? this.getFloor3() : this.getFloor4()
    this.buildingAndFoolr()
    this._getAllVAVlist()
    this.timer = setInterval(() => {
      this._getAllVAVlist()
    }, 1000 * 60)
  },
  methods: {
    _getAllVAVlist() {
      getVAVList(this.building, this.floor, 'T').then(res => {
        this.vavList.push(...Object.values(res.data))
        this.vavListTop = res.data
        if (this.building === 3 || this.building === 4) {
          this.queue.push(res.data)
          if (this.queue.length === 6) {
            this.queue.splice(0, 1)
          }
          this.xTime.push(new Date().format('HH:mm:ss'))
          if (this.xTime.length === 6) {
            this.xTime.splice(0, 1)
          }
          const { $refs: { figure1 }, init, legend, series: { pmv }} = this
          init(figure1, '热舒适PMV指标计算值数据展示', 'PMV热舒适性指标说明:-1<PMV<+1表示可接受的热舒适环境；PMV<-1表示室内环境偏冷；PMV>+1表示室内环境偏热；', 'PMV热舒适性指标', '', legend, pmv)
          const echart = echarts && echarts.init(this.$refs.figure1)
          echart.setOption({
            xAxis: {
              data: this.xTime,
              type: 'category'
            }
          })
        }
      })
    },
    getFloor4() {
      this.floors = new Array(7).fill(-1).map((item, index) => {
        return {
          label: `第${index + 2}层`,
          value: index + 2
        }
      })
    },
    getFloor1() {
      this.floors = new Array(8).fill(-1).map((item, index) => {
        return {
          label: `第${index + 2}层`,
          value: index + 2
        }
      })
    },
    getFloor2() {
      this.floors = new Array(13).fill(-1).map((item, index) => {
        return {
          label: `第${index + 2}层`,
          value: index + 2
        }
      })
    },
    getFloor3() {
      const floor = new Array(9).fill(-1).map((item, index) => {
        return {
          label: `第${index + 2}层`,
          value: index + 2
        }
      })
      const floors = new Array(9).fill(-1).map((item, index) => {
        return {
          label: `第${index + 12}层`,
          value: index + 12
        }
      })
      this.floors = [...floor, ...floors]
    },
    buildingAndFoolr() {
      if (this.building === 1) {
        this.getFloor1()
      } else if (this.building === 2) {
        this.getFloor2()
      } else if (this.building === 3) {
        this.getFloor3()
      } else if (this.building === 4) {
        this.getFloor4()
      }
    },
    selectFloor(val) {
      this.floor = val
      this.buildingAndFoolr()
      this.queue = []
      this.xTime = []
      this._getAllVAVlist()
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    selectBuilding(val) {
      this.building = val
      // this.building === 3 ? this.getFloor3() : this.getFloor4()
      this.buildingAndFoolr()
      this.floor = 3
      this.queue = []
      this.xTime = []
      this._getAllVAVlist()
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    init(ref, title, subtitle, yName, unit, legend, series) {
      const chart = echarts.init(ref)
      const { setOption } = this
      chart.setOption(setOption(title, subtitle, yName, unit, legend, series))
      const triggerAction = (action, selected) => {
        const legend = []

        for (const name in selected) {
          if (selected.hasOwnProperty(name)) {
            legend.push({ name: name })
          }
        }

        chart.dispatchAction({
          type: action,
          batch: legend
        })
      }

      const isFirstUnSelect = selected => Object.keys(selected).filter(name => !selected[name]).length === 1

      const isAllUnSelected = selected => Object.keys(selected).filter(name => selected[name]).length === 0

      chart.on('legendselectchanged', ({ selected }) => {
        // console.warn(selected);
        if (selected) {
          if (isFirstUnSelect(selected)) {
            triggerAction('legendToggleSelect', selected)
          } else if (isAllUnSelected(selected)) {
            triggerAction('legendSelect', selected)
          }
        }
      })
    },
    stopOptimize() {
      this.stopOptimizeNum = (Math.random() * 2 + 25.3).toFixed(1)
    },
    startOptimize() {
      this.startOptimizeNum = (Math.random() * 2 + 24.3).toFixed(1)
    },
    imgLoaded() {
      this.loaded = true
    },
    setOption(title, subtitle = '', yName, unit, data, series) {
      return {
        title: {
          text: title,
          subtext: subtitle,
          subtextStyle: {
            color: '#1e98d3',
            fontSize: '16'
          },
          textStyle: {
            color: '#1e98d3'
          },
          itemGap: 15,
          left: 'center',
          top: '3px'
        },
        legend: {
          data,
          left: 10,
          top: 70,
          textStyle: {
            color: '#1e98d3'
          }
        },
        grid: {
          top: 190
        },
        tooltip: {
          showDelay: 0,
          formatter: params => `${params.seriesName} :<br/> ${params.value[1]} ${unit}`,
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
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
          // name: yName,
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          },
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          },
          boundaryGap: ['20%', '20%'],
          min: value => (Math.floor(value.min) - (unit === '°C' ? 1 : 0.3)),
          max: value => (Math.ceil(value.max) + (unit === '°C' ? 1 : 0.3))

        },
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
        // ],
        series
      }
    }
  }
}
</script>

<style scoped lang="less">
.optimize {
    position: relative;
    left: 75%;
    top: 80px;
    width: 23.75rem;
    height: 5.8rem;
    // border: .0825rem solid #000000;
    border-radius: 2%;
    z-index: 1;
    .inarea {
      display: inline-block;
      width: 3.75rem;
      height: 1.25rem;
      text-align: center;
      margin-left: 4px;
      border: .1025rem solid #3333FF;
      border-radius: 10%;
      background-color: #00FFCC;
    }
  }
  .content {
    position: absolute;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    .content-item{
      transform: translate(45%,20%);
          .circle {
        width: 1.45rem;
        height: 1.45rem;
        border: .0625rem solid #000000;
        border-radius: 50%;
        transform: translate(-210%, -40%);
        color: #000000;
      }
      .square {
        width: 3.75rem;
        height: 1.25rem;
        // border: .0825rem solid red;
        border-radius: 10%;
        font-weight: bolder;
        color: #CC0033;
        transform: translate(-30%, -160%);
      }
      .tarea {
        font-size: .75rem;
        color: red;
        transform: translate(-30%, -80%);
      }
    }
  }
</style>
