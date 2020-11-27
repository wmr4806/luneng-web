<template>
  <div class="fhfx">
    <!-- <dv-border-box-7> -->
    <dv-decoration-5 style="width:300px;height:40px;" />
    <el-row>
      <el-col :span="4">
        <div>
          <h3 style="color:#fff">变压器经济运行分析</h3>
          <div
            v-for="(item, index) in quantitylist"
            :key="index"
            :class="
              isactive === item.deviceId
                ? 'left-one-part1'
                : 'left-one-part active-transformer'
            "
            @click="onquantity(item.deviceId)"
          >
            <h4
              :class="
                isactive === item.deviceId ? 'persent-title1' : 'persent-title'
              "
            >
              {{ item.deviceName }}
            </h4>
            <!-- <div class="part-bgimg"> -->
            <div class="Bar">
              <div :style="{ width: item.loadRatio.toFixed(2) + '%' }">
                <span>{{ item.loadRatio.toFixed(2) }}%</span>
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
      </el-col>
      <el-col
        :span="19"
        style="border-left:1px solid #155766;min-height:1000px;padding-left:20px"
      >
        <el-row style="margin:20px">
          <!-- <el-col :span="3.5">
              <el-button @click="cldate">日</el-button>
              <el-button @click="clmounth">月</el-button>
              <el-button @click="clyear">年</el-button>
            </el-col> -->
          <el-col :span="10">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="请选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              @change="vmsdata"
            />
          </el-col>
        </el-row>
        <el-row style="margin:auto">
          <div class="echart1">
            <dv-border-box-1>
              <dv-decoration-6 style="width:300px;height:30px;margin:0 auto" />
              <div
                id="echarts1"
                style="width: 100%;height:300px;padding:20px"
              />
            </dv-border-box-1>
          </div>
        </el-row>
        <el-row style="margin-top:80px">
          <div class="echart1">
            <dv-border-box-1>
              <dv-decoration-1 style="width:300px;height:30px;margin:0 auto" />
              <h4 style="color:#fff;margin-left:5%">
                {{ qudeviceName }}负载率特征值统计
              </h4>
              <el-table :data="tableData" :row-class-name="tableRowClassName">
                <el-table-column prop="address" label="特征值类型" />
                <el-table-column prop="nam" label="值" />
                <el-table-column prop="date" label="发生时间" />
              </el-table>
            </dv-border-box-1>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <!-- </dv-border-box-7> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import {
  getuserABCD,
  getCurve,
  getSorted,
  getEigenvalue
} from '@/api/quantity'
// function randomInteger(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min
// }
function aa() {
  const date = new Date()
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  // console.log(`${year}-${mon}-${day}`);
  return `${year}-${mon}-${day}`
}
function formatDate(now) {
  const date = new Date(now)
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var minute = date.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = date.getSeconds()
  second = second < 10 ? '0' + second : second
  return h + ':' + minute + ':' + second
}
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));//禁用今天和今天之前的日期
          return time && time.valueOf() >= new Date()// 禁用今天之后的日期不包含今天
        }
      },
      tableData: [
        {
          date: aa(),
          nam: '',
          address: '最大负载率'
        },
        {
          date: aa(),
          nam: '',
          address: '最小负载率'
        },
        {
          date: aa(),
          nam: '',
          address: '平均负载率'
        }
      ],
      datelist: [],
      tztzt: [],
      value1: '',
      headers: {},
      headers1: {},
      quantitylist: [],
      isactive: -1,
      qudeviceName: ''
    }
  },
  watch: {
    value1: function(e) {
      // console.log(e);
      if (e === null) {
        this.value1 = aa()
      }
    }
    // quantitylist: function(e) {
    //   console.log(e[0])
    // }
  },
  mounted() {
    this.initChart()
  },
  created() {
    this.value1 = aa()
    this.getuser()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else if (rowIndex % 2 === 1) {
        return 'success-row'
      }
      return ''
    },
    vmsdata(e) {
      // console.log(e);
      this.getuser()
      this.initChart()
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('echarts1'))
      // this.chart1 = echarts.init(document.getElementById("echarts2"));
      this.setOpen()
    },
    setOpen() {
      this.chart.setOption({
        // backgroundColor: '#304156',
        title: {
          left: 'center',
          text: `${this.qudeviceName}变压器负载`,
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          padding: [30, 20, 20, 20],
          textStyle: {
            color: '#fff'
          },
          data: ['负载率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          name: this.xshi,
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          },
          data: this.datelist
        },
        yAxis: {
          name: '负载(%)',
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        series: [
          // {
          //   name: this.hhs,
          //   type: "line",
          //   stack: "总量",
          //   data: this.tztnt
          // },
          {
            name: '负载率',
            type: 'line',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#e6834b' // 0% 处的颜色
                  },
                  // {
                  //   offset: 0.5,
                  //   color: "rgba(179,127,235,0.3)" // 100% 处的颜色
                  // },
                  {
                    offset: 1,
                    color: 'rgba(179,127,235,0.1)' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            color: '#e6834b',
            // stack: "总量",
            data: this.tztzt
          }
        ]
      })
      // this.chart1.setOption({

      // });
    },
    // 获取token
    async getuser() {
      const le = 'AB'
      await getuserABCD(le).then(res => {
        // console.log(res);
        this.headers = res
      })
      const le1 = 'CD'
      await getuserABCD(le1).then(res => {
        // console.log(res)
        this.headers1 = res
      })
      this.getSort()
      this.getquant(1724)
      this.getEigenval(1724)
    },
    // 获取列表
    getSort() {
      this.quantitylist = []
      const data = {
        buildingId: this.headers.column01,
        date: this.value1,
        dateType: 0,
        deviceId: 0,
        token: this.headers.authorization
      }
      // console.log(data);
      getSorted(data).then(res => {
        // console.log(res);
        res.data.map(item => {
          this.quantitylist.push(item)
        })
      })
      const data1 = {
        buildingId: this.headers1.column01,
        date: this.value1,
        dateType: 0,
        deviceId: 0,
        token: this.headers1.authorization
      }
      getSorted(data1).then(res => {
        // console.log(res)
        for (let i = 0; i < res.data.length; i++) {
          this.quantitylist.push(res.data[i])
        }
      })
      // console.log(this.quantitylist);
    },
    // 曲线
    async getquant(id) {
      this.isactive = id
      // console.log(id);
      const data = {
        buildingId: this.headers.column01,
        date: this.value1,
        dateType: 0,
        deviceId: id,
        token: this.headers.authorization
      }
      this.datelist = []
      this.tztzt = []
      await getCurve(data).then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.xaxisDatas.length; i++) {
            const d = new Date(res.data.xaxisDatas[i])
            const a = formatDate(d)
            // console.log(a);
            this.datelist.push(a)
            const b = res.data.meanLine[i] * 10
            this.tztzt.push(b)
            // console.log(this.datelist, this.tztzt);
          }
          this.initChart()
        }
      })
    },
    // table
    getEigenval(id) {
      // if(id==this.quantitylist)
      // this.qudeviceName = "";
      // console.log(id, this.quantitylist);
      const data = {
        buildingId: this.headers.column01,
        date: this.value1,
        dateType: 0,
        deviceId: id,
        token: this.headers.authorization
      }
      getEigenvalue(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.quantitylist.map(item => {
            // console.log(item);
            if (id === item.deviceId) {
              console.log(item.deviceName)
              this.qudeviceName = item.deviceName
              this.initChart()
            }
          })
          this.tableData[0].nam =
            Number(res.data.eigenvalueData.maxLoadRatio).toFixed(2) + '%'
          this.tableData[0].date = this.value1
          this.tableData[1].nam =
            Number(res.data.eigenvalueData.minLoadRatio).toFixed(2) + '%'
          this.tableData[1].date = this.value1
          this.tableData[2].nam =
            Number(res.data.eigenvalueData.avgLoadRatio).toFixed(2) + '%'
          this.tableData[2].date = this.value1
        }
      })
    },
    // 获取曲线
    onquantity(id) {
      // console.log(id);
      this.getquant(id)
      this.getEigenval(id)
    }
  }
}
</script>
<style scoped>
.fhfx {
  min-height: 1000px;
  /* max-height: 105vh; */
  width: 100%;
  /* height: 102vh; */
  background: #18111f;
  /* margin: 20px; */
}
/* .dv-border-box-7 {
  width: 100%;
  min-height: 1010px;
} */
.dv-decoration-5 {
  margin: 0 auto;
}
.echart1 {
  width: 100%;
  height: 350px;
}
.el-button + .el-button {
  margin-left: -5px;
}
.left-one-part {
  position: relative;
  padding-top: 20px;
  width: 80%;
  height: 86px;
  /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAABWCAYAAAGC4vvKAAAABGdBTUEAALGPC/xhBQAAAmNJREFUeAHt3E2OwiAYAFBoZjs1HsN4x6nOnNF4DGMPUEZMdKMbExuEvm7aEIWP91n6IyGGy9afDvu8txEgQKAtgf58HEr0KLcbDa0l6LVJgEClAqXG61JcS+tvKWftEiBAgAABAi8IxOsdyjR1L3yn6o+mEH48uVedQsETIECAAAECBAgQIECAAAECBAgsQWB5L/H8mdz27zrndzHv4dtOpd4RIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgsVMAcr7YTn/O7vJmLbef0oXfjejtYePOBpa2CvPqf2Zpt5fRpbyT5KYtCAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFBTISwAVbF7TMwtY4mlm4E+pPn6fDimG8PspAYnj/QIxr72YpmkXu273/urVSIDAnAIppSGm9PeVG8mj9bjauP+aU1zdBGYQuFyIQ0ips7LmDLiqJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEMg9ufjEKapG9fboY6QRUmAwE3gdv52twJ7AgTqFXAi15s7kRO4C8R8dL0834scECBQk8C42uz/ASznUypmUzObAAAAAElFTkSuQmCC); */
  background-size: 100% 100%;
  margin: 30px auto;
}
.left-one-part1 {
  position: relative;
  padding-top: 20px;
  width: 80%;
  height: 86px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAABWCAYAAAGC4vvKAAAABGdBTUEAALGPC/xhBQAAAmNJREFUeAHt3E2OwiAYAFBoZjs1HsN4x6nOnNF4DGMPUEZMdKMbExuEvm7aEIWP91n6IyGGy9afDvu8txEgQKAtgf58HEr0KLcbDa0l6LVJgEClAqXG61JcS+tvKWftEiBAgAABAi8IxOsdyjR1L3yn6o+mEH48uVedQsETIECAAAECBAgQIECAAAECBAgsQWB5L/H8mdz27zrndzHv4dtOpd4RIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgsVMAcr7YTn/O7vJmLbef0oXfjejtYePOBpa2CvPqf2Zpt5fRpbyT5KYtCAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIFBTISwAVbF7TMwtY4mlm4E+pPn6fDimG8PspAYnj/QIxr72YpmkXu273/urVSIDAnAIppSGm9PeVG8mj9bjauP+aU1zdBGYQuFyIQ0ips7LmDLiqJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQqEMg9ufjEKapG9fboY6QRUmAwE3gdv52twJ7AgTqFXAi15s7kRO4C8R8dL0834scECBQk8C42uz/ASznUypmUzObAAAAAElFTkSuQmCC);
  background-size: 100% 100%;
  margin: 30px auto;
  /* color: #1f9996; */
}
.persent-title1 {
  height: 17px;
  font-size: 12px;
  font-weight: 600;
  color: #0cd7c6;
  margin-bottom: 10px;
  display: inline-block;
  position: absolute;
  top: -20px;
  left: 10px;
  padding: 0 5px;
  background-color: #304156;
}
.persent-title {
  height: 17px;
  font-size: 12px;
  font-weight: 600;
  color: #1f9996;
  margin-bottom: 10px;
  display: inline-block;
  position: absolute;
  top: -20px;
  left: 10px;
  padding: 0 5px;
  background-color: #304156;
}
.Bar {
  position: relative;
  width: 100%;
  height: 50px;
  /* 宽度 */
  /* border: 1px solid #b1d632; */
  /* padding: 1px; */
  overflow: hidden;
  background-image: linear-gradient(270deg, rgba(15, 25, 43, 0), #0f192a),
    linear-gradient(180deg, #188796, #188796);
}
.Bar div {
  display: block;
  position: relative;
  background: #11a0a6;
  /* 进度条背景颜色 */
  color: white;
  font-size: 20px;
  height: 50px; /* 高度 */
  line-height: 50px;
  box-sizing: border-box;
  /* 必须和高度一致，文本才能垂直居中 */
}
.Bar div span {
  position: absolute;
  width: 200px;
  /* 宽度 */
  text-align: center;
  font-weight: bold;
}
.ont-left-top {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-size: 12px;
  cursor: pointer;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 65px;
  height: 65px;
  /* background: url(../img/jjyx_bg_circle.436b2972.png) no-repeat; */
  background-size: 115%;
  background-position: -5px -5px;
  overflow: hidden;
}
.part-bgimg {
  width: 70px;
  height: 30px;
  background-size: auto;
  background: url(data:image/png;base64,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)
    no-repeat;
}
h3 {
  color: white;
}
.el-table {
  width: 90% !important;
  /* background: #1a578d; */
  height: 50%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.el-table /deep/ thead {
  background: #154363;
}
.el-table /deep/ .warning-row {
  background: #154363;
}
.el-table /deep/ .success-row {
  background: #272c36;
}
</style>
