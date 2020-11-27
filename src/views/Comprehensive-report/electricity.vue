<template>
  <div style="background: #18111f;width:100%;height:104vh">
    <el-row>
      <el-col
        :span="5"
        style="background: #18111f;color: #fff;height:104vh;"
      >
        <div style="margin:40px">
          <dv-decoration-11
            style="width:150px;height:60px;"
          >配电结构</dv-decoration-11>
          <!-- <el-button @click="show = false">重点设备</el-button> -->
        </div>

        <!-- <dv-border-box-8 style="height:83vh;z-index:99"> -->
        <div style="margin-top:40px;">
          <el-scrollbar style="height:83vh">
            <el-tree
              :data="data"
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </el-scrollbar>
        </div>
        <!-- </dv-border-box-8> -->
      </el-col>
      <el-col :span="19">
        <el-row style="margin:40px 0 0 20px">
          <el-col :span="3.5" style="margin-left:20px" />
          <el-col :span="10" style="margin-left:20px">
            <el-date-picker
              v-model="value1"
              style="background: #195c97;color: #fff;"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              @change="vmsdata"
            />
          </el-col>
        </el-row>
        <el-row style="margin-top:40px">
          <p style="text-align:center;color:#fff">
            <dv-decoration-7
              style="width:240px;height:60px;margin: auto;"
            >{{ treelabel }}{{ value1 }}</dv-decoration-7>
          </p>
          <div style="margin:40px">
            <span
              :class="pressure == 'high' ? 'gdyc' : 'gdycclass'"
              @mouseover="hiecy"
            >高压侧</span>
            <span
              :class="pressure == 'low' ? 'gdyc' : 'gdycclass'"
              @mouseover="dicey"
            >低压侧</span>
            <el-row style="margin-top:20px">
              <div class="znumd" style="margin:20px;height:300px">
                <div class="middle-content">
                  <div class="znumd-img">
                    <p class="circle-top">
                      {{ quantitylist.totalElectricQuantity }}
                    </p>
                    <p>总电量 kWh</p>
                  </div>
                  <div class="same-box">
                    <p class="same-top">
                      {{ quantitylist.electricApparentEarly }}<span>kWh</span>
                    </p>
                    <p>起始示值</p>
                  </div>
                  <div class="same-box">
                    <p class="same-top">
                      {{ quantitylist.electricApparentLate }} <span>kWh</span>
                    </p>
                    <p>结束示值</p>
                  </div>
                </div>
              </div>
            </el-row>
            <el-button
              icon="el-icon-download"
              style="position: absolute;right:7%;"
              @click="downloads"
            >导出</el-button>
            <el-row style="margin-top:40px">
              <div ref="dlcx" style="width:100%;height:300px;padding:20px" />
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import {
  getuserABCD,
  getdeviceTree,
  getelectricity
  // getdownloaduseele
} from '@/api/quantity'
function aa() {
  const date = new Date()
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
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
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      defaultPropss: {
        children: 'children',
        label: 'label'
      },
      value1: aa(),
      pressure: 'high',
      datelist: [],
      dlcxlist: [],
      treelabel: 'A座1#主变',
      quantitylist: '',
      hearders: {},
      hearders1: {},
      thists: '',
      thisdown: [],
      csdate: ''
    }
  },
  mounted() {
    this.initcharts()
  },
  created() {
    const wh = `AB`
    const wh1 = `CD`
    this.getquantity(wh, wh1)
    this.csdate = aa()
    // this.getsss();
  },
  methods: {
    // getsss() {
    //   getdownloaduseele().then(res => {
    //     console.log(res);
    //   });
    // },
    // 获取电量
    async getquantity(le, le1) {
      // console.log(le,le1)
      await getuserABCD(le).then(res => {
        // console.log(res);
        this.hearders = res
      })
      await getuserABCD(le1).then(res => {
        // console.log(res);
        this.hearders1 = res
      })
      this.getbuildtree()
      const data = {
        day: this.value1,
        deviceId: 1724,
        electricEnum: 'ELECTRIC_QUANTITY',
        highLow: this.pressure,
        month: null,
        typeId: 1001,
        year: null,
        token: this.hearders.authorization
      }
      this.thisdown = data
      this.getelect(data)
      // console.log(this.data[0])
    },
    // 获取高配室列表
    async getbuildtree() {
      this.data = []
      const data = {
        id: this.hearders.column01,
        token: this.hearders.authorization
      }
      const data1 = {
        id: this.hearders1.column01,
        token: this.hearders1.authorization
      }
      await getdeviceTree(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          // res.data.map((item, k) => {
          //   let arr = {
          //     label: item.label,
          //     id: item.id,
          //     typeId: item.typeId
          //   };
          //   this.data.push(arr);
          //   this.data[k].children = res.data[k].children;
          // })
          this.data = res.data
        }
      })
      await getdeviceTree(data1).then(res => {
        // console.log(res);
        if (res.code === 200) {
          res.data.map(item => {
            //   let arr = {
            //     label: item.label,
            //     id: item.id,
            //     typeId: item.typeId
            //   };
            //   this.data.push(arr);
            //   this.data[k + 2].children = res.data[k].children;
            this.data.push(item)
          })
        }
      })
    },
    // 点击高侧压
    hiecy() {
      this.datelist = []
      this.dlcxlist = []
      this.pressure = 'high'
      if (this.thists === '') {
        this.datelist = []
        this.dlcxlist = []
        const data = {
          day: this.value1,
          deviceId: 1724,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: this.pressure,
          month: null,
          typeId: 1001,
          year: null,
          token: this.hearders.authorization
        }
        this.thisdown = data
        this.getelect(data)
      } else {
        if (this.thists.id > this.data[1].id) {
          this.datelist = []
          this.dlcxlist = []
          const data1 = {
            day: this.value1,
            deviceId: this.thists.id,
            electricEnum: 'ELECTRIC_QUANTITY',
            highLow: this.pressure,
            month: null,
            typeId: this.thists.typeId,
            year: null,
            token: this.hearders.authorization
          }
          this.thisdown = data1
          this.getelect(data1)
        } else if (
          this.thists.id > this.data[3].id &&
          this.thists.id < this.data[0].id
        ) {
          this.datelist = []
          this.dlcxlist = []
          const data1 = {
            day: this.value1,
            deviceId: this.thists.id,
            electricEnum: 'ELECTRIC_QUANTITY',
            highLow: this.pressure,
            month: null,
            typeId: this.thists.typeId,
            year: null,
            token: this.hearders1.authorization
          }
          this.thisdown = data1
          this.getelect(data1)
        }
      }
    },
    // 点击低侧压
    dicey() {
      this.datelist = []
      this.dlcxlist = []
      this.pressure = 'low'
      console.log(this.thists)
      if (this.thists === '') {
        this.datelist = []
        this.dlcxlist = []
        const data = {
          day: this.value1,
          deviceId: 1724,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: this.pressure,
          month: null,
          typeId: 1001,
          year: null,
          token: this.hearders.authorization
        }
        this.thisdown = data
        this.getelect(data)
      } else {
        if (this.thists.id > this.data[1].id) {
          this.datelist = []
          this.dlcxlist = []
          const data1 = {
            day: this.value1,
            deviceId: this.thists.id,
            electricEnum: 'ELECTRIC_QUANTITY',
            highLow: this.pressure,
            month: null,
            typeId: this.thists.typeId,
            year: null,
            token: this.hearders.authorization
          }
          this.thisdown = data1
          this.getelect(data1)
        } else if (
          this.thists.id > this.data[3].id &&
          this.thists.id < this.data[0].id
        ) {
          this.datelist = []
          this.dlcxlist = []
          const data1 = {
            day: this.value1,
            deviceId: this.thists.id,
            electricEnum: 'ELECTRIC_QUANTITY',
            highLow: this.pressure,
            month: null,
            typeId: this.thists.typeId,
            year: null,
            token: this.hearders1.authorization
          }
          this.thisdown = data1
          this.getelect(data1)
        }
      }
      // const wh = `AB`;
      // this.getquantity(le, wh);
    },
    initcharts() {
      this.chart = echarts.init(this.$refs.dlcx)
      this.setopen()
    },
    setopen() {
      this.chart.setOption({
        title: {
          text: `${this.treelabel}`,
          textStyle: {
            color: '#ffffff'
          }
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          padding: [30, 20, 20, 20],
          textStyle: {
            color: '#fff'
          },
          data: ['电量']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.datelist,
            axisTick: {
              alignWithLabel: true
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
            name: '用电量(kWh)',
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#ffffff'
              }
            }
          }
        ],
        series: [
          {
            name: '电量',
            type: 'bar',
            // barWidth: "60%",
            color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
              //   { offset: 0, color: "#00FF00" },
              { offset: 0.5, color: '#3A8EE6' },
              { offset: 0.8, color: '#FAB6B6' },
              { offset: 1, color: '#ddd' }
            ]),
            data: this.dlcxlist
          }
        ]
      })
    },
    async getelect(data) {
      this.thisdown = data
      this.quantitylist = []
      console.log(data)
      this.datelist = []
      this.dlcxlist = []
      await getelectricity(data).then(res => {
        console.log(res.data)
        if (res.code === 200) {
          this.quantitylist = res.data
          res.data.dataMap.ELECTRIC_QUANTITY.map(item => {
            // console.log(item.date.substr(11, 8));
            const date = item.date.substr(11, 8)
            const value = item.value
            this.datelist.push(date)
            this.dlcxlist.push(value)
          })
          this.initcharts()
        }
      })
    },
    handleNodeClick(e) {
      // console.log(this.data[2].id, e);
      if (e.id > this.data[1].id) {
        this.thists = e
        this.treelabel = e.label
        const data = {
          day: this.value1,
          deviceId: e.id,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: this.pressure,
          month: null,
          typeId: e.typeId,
          year: null,
          token: this.hearders.authorization
        }
        // console.log(data);
        this.thisdown = data
        this.getelect(data)
      } else if (e.id > this.data[3].id && e.id < this.data[0].id) {
        this.thists = e
        this.treelabel = e.label
        const data1 = {
          day: this.value1,
          deviceId: e.id,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: this.pressure,
          month: null,
          typeId: e.typeId,
          year: null,
          token: this.hearders1.authorization
        }
        this.thisdown = data1
        // console.log(data1);
        this.getelect(data1)
      }
    },
    // 点击导出
    downloads() {
      console.log(11111, this.thisdown)
      // if(this.thisdown.deviceId === this.data)
      if (this.thisdown.deviceId > this.data[1].id) {
        this.thisdown.userinfo = 'AB'
        this.exportMethod(this.thisdown)
      } else if (
        this.thisdown.deviceId > this.data[3].id &&
        this.thisdown.deviceId < this.data[0].id
      ) {
        this.thisdown.userinfo = 'CD'
        this.exportMethod(this.thisdown)
      }
      // getdownloaduseele(this.thisdown).then(res => {
      //   console.log(res);
      // });
    },
    // 导出
    exportMethod(data) {
      axios({
        method: 'get',
        url: 'http://101.132.169.245:8071/public-gateway/opc/downloaduseele',
        params: {
          userinfo: data.userinfo,
          day: data.day,
          deviceid: data.deviceId,
          highlow: data.highLow,
          typeid: data.typeId
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
          link.download = this.treelabel // 下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.dir(error)
        })
    },
    // 点击时间选择器
    vmsdata(e) {
      console.log(e)
      const wh = `AB`
      const wh1 = `CD`
      this.getquantity(wh, wh1)
      this.initcharts()
    }
  }
}
</script>
<style scoped>
.el-button + .el-button {
  margin-left: -5px;
}
.znumd {
  border: 1px solid #6387c2;
  overflow: hidden;
  /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAPUlEQVRIiWOUtQr6z8DAwPDz5zcGWgImmpqOBFhgPvn54ytNLaKbj0YtGrVo1KJRi0YtGrVo1KJRi0amRQC/7wqUWVhjqAAAAABJRU5ErkJggg===); */
}
.znumd-img {
  background: url("./img/Chart2ydsj.png");
  width: 200px;
  height: 200px;
  border-radius: 200px;
  padding: 25px 0;
  text-align: center;
  font-size: 14px;
  color: #fedd82;
  background-size: 100% 100%;
}
.circle-top {
  height: 42px;
  line-height: 42px;
  font-size: 30px;
  font-weight: 600;
  color: #fedd82;
}
.middle-content {
  width: 800px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.same-box {
  height: 125px;
  text-align: left;
  font-size: 14px;
  color: #ff8a43;
  border-bottom: 1px dashed #6387c2;
  overflow: hidden;
}
.same-top {
  height: 45px;
  line-height: 45px;
  font-size: 30px;
  font-weight: 600;
  color: #1bf2ff;
}
.el-tree {
  background: #466581;
  color: #000;
}
.el-button {
  background: #195c97;
  color: #fff;
}
.gdyc {
  background:#63707f;
  width: 80px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  /* background: #2c5781; */
  border: 1px solid #3a8ee6;
  border-radius: 10%;
  text-align: center;
  color: white;
}
.gdycclass {
  width: 80px;
  height: 30px;
  display: inline-block;
  line-height: 30px;
  background: #2c5781;
  border: 1px solid #3b8fe6;
  border-radius: 10%;
  text-align: center;
  color: white;
}
/* .el-select /deep/ .el-input__inner {
  background-color: #195c97;
  color: #fff;
}
.el-select-dropdown /deep/ .el-scrollbar__view {
  background-color: #195c97;
}
.el-input /deep/ .el-input__inner {
  background-color: #195c97;
  color: #fff;
} */
</style>
