<template>
  <div class="fhfx">
    <!-- <dv-border-box-7> -->
    <dv-decoration-5 style="width:300px;height:40px;" />
    <!-- <el-row> -->
    <!-- <el-col :span="3.5" style="margin-left:40px"> -->
    <div style="margin-left:20px;">
      <el-date-picker
        v-model="value1"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        type="date"
        placeholder="选择日期"
      />
      <el-date-picker
        v-model="value2"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        :picker-options="pickerOptions"
        type="date"
        placeholder="选择日期"
      />
      <el-button type="primary" @click="branch">查询</el-button>
    </div>

    <!-- </el-col> -->
    <!-- <el-col :span="3.9"> -->

    <!-- </el-col> -->
    <!-- <el-col :span="2"> -->

    <!-- </el-col> -->
    <!-- </el-row> -->
    <!-- <el-row style="margin:50px 20px 20px 20px"> -->
    <!-- <el-col :span="12"> -->
    <div
      style="display:flex;flex-wrap:nowrap;justify-content:space-evenly;margin-top:20px;"
    >
      <div class="echart1">
        <dv-border-box-1>
          <dv-decoration-6 style="width:300px;height:30px;margin:0 auto" />
          <div id="echarts1" style="width: 100%;height:300px;padding:20px" />
        </dv-border-box-1>
      </div>
      <div class="echart1">
        <dv-border-box-1>
          <dv-decoration-1 style="width:300px;height:30px;margin:0 auto" />
          <div id="echarts2" style="width: 100%;height:300px;padding:20px" />
        </dv-border-box-1>
      </div>
    </div>

    <!-- </el-col> -->
    <!-- <el-col :span="12"> -->

    <!-- </el-col> -->
    <!-- </el-row> -->
    <!-- <el-row style="margin:0px 20px 20px 20px"> -->
    <!-- <el-col> -->
    <div class="echart1" style="margin-top:50px">
      <dv-border-box-1>
        <dv-decoration-3 style="width:300px;height:30px;margin:0 auto;" />
        <el-select
          v-model="value"
          style="margin-left:20px"
          placeholder="请选择主变"
          @change="getselchang"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.deviceName"
            :value="item.id"
          />
        </el-select>
        <div
          id="echarts3"
          style="width: 95%;height:280px;padding:20px;margin: 0 auto;"
        />
      </dv-border-box-1>
    </div>
    <!-- </el-col> -->
    <!-- </el-row> -->
    <!-- </dv-border-box-7> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import {
  getdevice,
  getuserABCD,
  getspecialLineRate,
  getqualifiedRate,
  getmaxRate
} from '@/api/quantity'
function date() {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + 1 + '').padStart(2, '0')
  const day = (date.getDate() + '').padStart(2, '0')
  return `${year}-${month}-${day}`
}
function date1() {
  const date = new Date()
  const year = date.getFullYear()
  const month = (date.getMonth() + '').padStart(2, '0')
  const day = (date.getDate() + 1 + '').padStart(2, '0')
  return `${year}-${month}-${day}`
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
      value1: '',
      value2: '',
      transformer: [],
      deviation: [],
      featuresmin: [],
      featuresmax: [],
      datelist: [],
      quantity: {},
      options: [],
      value: '',
      // toke
      hearders: {},
      hearders1: {},
      datazhu: []
    }
  },
  watch: {},
  mounted() {
    this.initChart()
  },
  created() {
    this.value1 = date1()
    this.value2 = date()
    this.getquantity()
  },
  methods: {
    vmsdata(e) {},
    // 请求接口
    async getquantity() {
      const le = 'AB'
      // 获取token
      await getuserABCD(le).then(res => {
        // console.log(res);
        if (res) {
          this.hearders = res
          // this.token = res.authorization
          this.hearders.typeIds1 = 1001
          this.hearders.typeIds2 = 1002
        }
      })
      const le1 = 'CD'
      await getuserABCD(le1).then(res => {
        // console.log(res);
        if (res) {
          this.hearders1 = res
          // this.token1 = res.authorization
          this.hearders1.typeIds1 = 1001
          this.hearders1.typeIds2 = 1002
        }
      })
      await getdevice(this.hearders).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.options = res.data
          console.log(this.options)
        }
      })
      await getdevice(this.hearders1).then(res => {
        console.log(res)
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.options.push(res.data[i])
            // console.log(this.options);
          }
        }
      })
      this.selchang(1724)
      this.getzhu()
      this.getxxt()
      this.value = 1724
    },
    // 点击选择主变
    getselchang(e) {
      this.selchang(e)
      console.log(this.value)
    },
    // 获取下拉主变
    async selchang(e) {
      this.featuresmax = []
      this.featuresmin = []
      this.datelist = []
      console.log(e)
      const data = {
        id: e,
        startTime: this.value1,
        endTime: this.value2,
        token: this.hearders.authorization
      }
      const data1 = {
        id: e,
        startTime: this.value1,
        endTime: this.value2,
        token: this.hearders1.authorization
      }
      if (e >= 1724) {
        // console.log(this.token, data);
        await getspecialLineRate(data).then(res => {
          console.log(res, res.data.MAX)
          for (let i = 0; i < res.data.MAX.length; i++) {
            // console.log(i,res.data.MAX[i].date.substr(5,5),res.data.MAX[i].value*100)
            this.featuresmax.push(res.data.MAX[i].value * 100)
            const date = res.data.MAX[i].date.substr(5, 5)
            this.featuresmin.push(res.data.MIN[i].value * 100)
            this.datelist.push(date)
            this.initChart()
          }
        })
      } else {
        console.log(data1)
        await getspecialLineRate(data1).then(res => {
          // console.log(res, res.data.MAX);
          for (let i = 0; i < res.data.MAX.length; i++) {
            // console.log(i,res.data.MAX[i].date.substr(5,5),res.data.MAX[i].value*100)
            this.featuresmax.push(res.data.MAX[i].value * 100)
            const date = res.data.MAX[i].date.substr(5, 5)
            this.featuresmin.push(res.data.MIN[i].value * 100)
            this.datelist.push(date)
            this.initChart()
          }
        })
      }
    },
    // 获取柱状数据
    async getzhu() {
      // console.log(this.hearders);
      // let arr = [];
      this.datazhu = []
      this.transformer = []
      for (let i = 0; i < this.options.length; i++) {
        this.datazhu.push(this.options[i].deviceName)
        // console.log(this.datazhu);
      }
      const data = {
        id: this.hearders.column01,
        token: this.hearders.authorization,
        startTime: this.value1,
        endTime: this.value2
      }
      await getqualifiedRate(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.transformer.push(res.data[i].value * 100)
          }
          this.initChart()
        }
      })
      const data1 = {
        id: this.hearders1.column01,
        token: this.hearders1.authorization,
        startTime: this.value1,
        endTime: this.value2
      }
      await getqualifiedRate(data1).then(res => {
        // console.log(res);
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.transformer.push(res.data[i].value * 100)
          }
          this.initChart()
        }
      })
    },
    async getxxt() {
      const data = {
        id: this.hearders.column01,
        token: this.hearders.authorization,
        startTime: this.value1,
        endTime: this.value2
      }
      const data1 = {
        id: this.hearders1.column01,
        token: this.hearders1.authorization,
        startTime: this.value1,
        endTime: this.value2
      }
      this.deviation = []
      await getmaxRate(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.deviation.push(res.data[i].value * 100)
            // console.log(this.deviation);
          }
          this.initChart()
        }
      })
      await getmaxRate(data1).then(res => {
        // console.log(res);
        if (res.code === 200) {
          for (let i = 0; i < res.data.length; i++) {
            this.deviation.push(res.data[i].value * 100)
            // console.log(this.deviation);
          }
          this.initChart()
        }
      })
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('echarts1'))
      this.chart1 = echarts.init(document.getElementById('echarts2'))
      this.chart2 = echarts.init(document.getElementById('echarts3'))
      this.setOpen()
    },
    setOpen() {
      this.chart.setOption({
        // backgroundColor: '#221e2b',
        title: {
          left: 'left',
          text: '变压器电压合格率统计',
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['合格率'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.datazhu,
            axisPointer: {
              type: 'shadow'
            },
            alignWithLabel: {
              default: false
            },
            axisLabel: {
              interval: 0 // 代表显示所有x轴标签显示
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '合格率 %',
            min: 0,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} %'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            name: '合格率',
            type: 'bar',
            barWidth: 30,
            color: ['#3398DB'],
            data: this.transformer
          }
        ]
      })
      this.chart1.setOption({
        // backgroundColor: '#304156',
        title: {
          left: 'left',
          text: '变压器最大偏差率统计（%）',
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['正偏差'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.datazhu,
            axisPointer: {
              type: 'shadow'
            },
            alignWithLabel: {
              default: false
            },
            axisLabel: {
              interval: 0 // 代表显示所有x轴标签显示
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '电压偏差值 %',
            min: 0,
            max: 8,
            interval: 2,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            name: '正偏差',
            type: 'pictorialBar',
            barCategoryGap: '0%',
            symbol:
              'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
            itemStyle: {
              // 每根柱子的透明度为 0.7
              normal: {
                opacity: 0.8
              },
              // 鼠标移入柱子上 透明度变为 1
              emphasis: {
                opacity: 1
              }
            },
            z: 10,
            // label: {
            //   normal: {
            //     // 设置每根柱子上字的位置和颜色
            //     show: true,
            //     position: "top",
            //     color: "#fff"
            //   }
            // },
            color: ['#c5e90f'],
            data: this.deviation
          }
        ]
      })
      this.chart2.setOption({
        // backgroundColor: '#304156',
        title: {
          // left: "left",
          text: '电压偏差率特征值曲线',
          textStyle: {
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            // magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        legend: {
          data: ['最小电压偏差率', '最大电压偏差率'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.datelist,
            axisPointer: {
              type: 'shadow'
            },
            alignWithLabel: {
              default: false
            },
            axisLabel: {
              interval: 0 // 代表显示所有x轴标签显示
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '电压偏差率 %',
            // interval: 1,
            axisLabel: {
              formatter: '{value}'
            },
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            name: '最小电压偏差率',
            type: 'line',
            barWidth: 30,
            color: ['#e9854e'],
            data: this.featuresmin
          },
          {
            name: '最大电压偏差率',
            type: 'line',
            barWidth: 30,
            color: ['#b9e50f'],
            data: this.featuresmax
          }
        ]
      })
    },
    branch() {
      if (this.value1 === null || this.value2 === null) {
        alert('无数据')
        this.transformer = []
        this.deviation = []
        this.featuresmin = []
        this.featuresmax = []
        this.datelist = []
        this.quantity = {}
        this.options = []
        this.value = ''
        this.datazhu = []
        this.initChart()
      } else {
        // console.log(this.value1, this.value2);
        this.getquantity()
        // this.getxxt();
        // this.initChart();
      }
    }
  }
}
</script>
<style scoped>
.fhfx {
  width: 100%;
  background: #18111f;
  height: 100vh;
}
.dv-decoration-5 {
  margin: 0 auto;
}
.echart1 {
  width: 100%;
  height: 40%;
  color: white;
}
.el-button + .el-button {
  margin-left: -5px;
}
.el-input--medium /deep/ .el-input__inner {
  background: #304156;
}
</style>
