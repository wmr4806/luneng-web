<template>
  <div class="fix">
    <!-- <el-row> -->
    <!-- <el-col :span="11" style="margin: 40px 0 20px 50px"> -->
    <!-- </el-col> -->
    <!-- </el-row> -->
    <!-- <el-row> -->
    <!-- <el-col :span="24"> -->
    <div>
      <div>
        <el-date-picker
          v-model="value1"
          style="margin:20px 0 0 20px"
          type="date"
          placeholder="请选择日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
          @change="vmsdata"
        />
        <el-select
          v-model="value"
          style="margin-left:20px"
          placeholder="请选择楼"
          @change="getselchang"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div
        ref="colech"
        style="width: 90%; height: 40vh;padding-top:50px;margin:0px auto"
      />
      <el-button
        style="position: absolute;right: 15%;"
        type="primary"
        icon="el-icon-download"
        @click="analydown"
      >导出</el-button>
      <div ref="analy" style="width: 90%; height: 40vh;margin:50px auto" />
    </div>
    <!-- </el-col> -->
    <!-- </el-row> -->
    <!-- <el-row> -->
    <!-- <el-col :span="24"> -->
    <!-- </el-col> -->
    <!-- </el-row> -->
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import { gethistogram, getsangji, getuserABCD } from '@/api/quantity'
import { getToken } from '@/utils/auth'
function aa() {
  const date = new Date()
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  // console.log(`${year}-${mon}-${day}`);
  return `${year}-${mon}-${day}`
}
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));//禁用今天和今天之前的日期
          return time && time.valueOf() >= new Date() // 禁用今天之后的日期不包含今天
        }
      },
      options: [
        {
          value: '1',
          label: 'AB号楼'
        },
        {
          value: '2',
          label: 'CD号楼'
        }
      ],
      value1: aa(),
      value: '1',
      tit: '',
      datalist: [],
      data1: [
        // 50, 53, 68, 46, 50, 53, 68, 46, 50, 53, 68, 46
      ],
      data2: [
        // 40, 45, 58, 53, 50, 53, 68, 46, 50, 53, 68, 46
      ],
      data3: [
        // 60, 62, 54, 45, 50, 53, 68, 46, 50, 53, 68, 46
      ],
      data4: [
        // 70, 68, 95, 87, 50, 53, 68, 46, 50, 53, 68, 46
      ],
      dataname: [],
      datasource: [['score', 'amount', 'product']],
      hearders: {},
      hearders1: {},
      titlename: 'AB号楼'
    }
  },
  mounted() {
    this.initCharts()
  },
  created() {
    this.tit = aa()
    this.add()
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.analy)
      this.chartest = echarts.init(this.$refs.colech)
      this.setOptions()
    },
    setOptions() {
      this.chart.setOption({
        title: {
          text: this.tit + this.titlename + '各项用电', // 主标题文本，'\n'指定换行
          left: 'center',
          textStyle: {
            color: '#fff'
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          padding: [30, 20, 20, 20],
          data: this.dataname,
          textStyle: {
            color: '#fff'
          }
        },
        grid: {
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.datalist,
            name: this.hours,
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        yAxis: [
          {
            interval: this.ykwh, // 值之间的间隔
            name: '电量(kWh)',
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            name: this.dataname[0],
            type: 'bar',
            stack: true,
            barWidth: 30,
            barCateGoryGap: 20,
            itemStyle: {
              normal: {
                color: '#1ce7fb'
              }
            },
            data: this.data1
          },
          {
            name: this.dataname[1],
            type: 'bar',
            stack: true,
            barWidth: 30,
            barCateGoryGap: 20,
            itemStyle: {
              normal: {
                color: '#edd98c'
              }
            },
            data: this.data2
          },
          {
            name: this.dataname[2],
            type: 'bar',
            stack: true,
            barWidth: 30,
            barCateGoryGap: 20,
            itemStyle: {
              normal: {
                color: '#e98750'
              }
            },
            data: this.data3
          },
          {
            name: this.dataname[3],
            type: 'bar',
            barWidth: 30,
            stack: true,
            barCateGoryGap: 20,
            itemStyle: {
              normal: {
                color: '#b4ee8d'
              },
              textStyle: {
                color: '#fff'
              }
            },
            data: this.data4
          }
        ]
      })
      this.chartest.setOption({
        title: {
          text: this.tit + this.titlename + '各项用电率', // 主标题文本，'\n'指定换行
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: this.datasource
        },
        grid: { containLabel: true },
        xAxis: {
          name: '%',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#ffffff'
            }
          }
        },
        visualMap: {
          orient: 'horizontal',
          left: 'center',
          min: 10,
          max: 50,
          text: ['High Score', 'Low Score'],
          // Map the score column to color
          dimension: 0,
          textStyle: {
            color: '#fff'
          },
          inRange: {
            color: ['#D7DA8B', '#E15457']
          }
        },
        series: [
          {
            type: 'bar',
            encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              color: '#D7DA8B',
              // Map the "product" column to Y axis
              y: 'product'
            }
          }
        ]
      })
    },
    async add() {
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
      const data = {
        id: this.headers.column01,
        time: this.value1,
        type: 0,
        token: this.headers.authorization
      }
      this.gethis(data)
      this.getsan(data)
    },
    async gethis(data) {
      this.datalist = []
      this.data1 = []
      this.data2 = []
      this.data3 = []
      this.data4 = []
      this.dataname = []
      await gethistogram(data).then(res => {
        // console.log(res, this.hearders);
        if (res.code === 200) {
          this.datalist = res.data.chartAllTime
          this.data1 = res.data.energyVOList[0].value
          this.data2 = res.data.energyVOList[1].value
          this.data3 = res.data.energyVOList[2].value
          this.data4 = res.data.energyVOList[3].value
          res.data.energyVOList.map(item => {
            this.dataname.push(item.energyName)
          })
        }
      })
      this.initCharts()
    },
    async getsan(data) {
      console.log(data)
      this.datasource = [['score', 'amount', 'product']]
      await getsangji(data).then(res => {
        console.log(res)
        // this.datasource = res.data.linksLevelOne;
        res.data.linksLevelOne.map(item => {
          // console.log((item.value*100).toFixed(2)+'%')
          this.datasource.push([
            (item.value * 100).toFixed(2),
            (item.value * 100).toFixed(2),
            item.target.substr(0, 4)
          ])
        })
        this.initCharts()
        // console.log(this.datasource)
      })
    },
    vmsdata(e) {
      console.log(e)
      if (this.value === '1') {
        const data = {
          id: this.headers.column01,
          time: this.value1,
          type: 0,
          token: this.headers.authorization
        }
        this.gethis(data)
        this.getsan(data)
      } else {
        const data = {
          id: this.headers1.column01,
          time: this.value1,
          type: 0,
          token: this.headers1.authorization
        }
        this.gethis(data)
        this.getsan(data)
      }
    },
    getselchang(e) {
      console.log(e)
      if (e === '1') {
        this.titlename = 'AB号楼'
        const data = {
          id: this.headers.column01,
          time: this.value1,
          type: 0,
          token: this.headers.authorization
        }
        this.gethis(data)
        this.getsan(data)
      } else {
        this.titlename = 'CD号楼'
        const data = {
          id: this.headers1.column01,
          time: this.value1,
          type: 0,
          token: this.headers1.authorization
        }
        this.gethis(data)
        this.getsan(data)
      }
    },
    analydown() {
      if (this.value === '1') {
        const le = 'AB'
        const data = {
          url: 'http://101.132.169.245:8071/public-gateway/opc/downloadAnyUseele',
          userinfo: le,
          time: this.value1
        }
        this.exportMethodget(data)
      }
    },
    exportMethodget(data) {
      axios({
        method: 'get',
        url: data.url,
        params: {
          userinfo: data.userinfo,
          time: data.time,
          type: 0
        },
        headers: { token: getToken() },
        responseType: 'blob'
      })
        .then(res => {
          console.dir(res)
          const link = document.createElement('a')
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          console.dir(blob)
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers["Content-Disposition"]; //下载后文件名
          link.download = data.time + this.titlename // 下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.dir(error)
        })
    }
  }
}
</script>

<style scoped>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
.fix {
  width: 100%;
  /* height: 855px; */
  height: 100vh;
  background: #18111f;
}
.el-button {
  background: #195c97;
  color: #fff;
}
</style>
