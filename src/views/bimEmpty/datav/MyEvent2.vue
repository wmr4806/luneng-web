<template>
  <div class="event2div">
    <div class="eventtop">
      <p class="eventp1">人流态势</p>
      <p class="eventp2">Headcount statistics</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">02</p>
    </div>
    <div ref="echarts2" class="eventecharts" />
    <div class="eventbottom">
      <div class="eventbottomp">
        <p class="eventbottomp1">今日总人数</p>
        <p class="eventbottomp2">
          <i id="event2bottompi" class="eventbottomi1">{{ zongrenshu }}</i>个
        </p>
      </div>
      <div class="eventbottom2p">
        <p class="eventbottom2p1">当前人数</p>
        <p class="eventbottom2p2">
          <i id="event2bottom2pi" class="eventbottomi2">{{ xianrenshu }}</i>个
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getAccessLog, getOnlinePeopleCount } from '@/api/data'
export default {
  data() {
    return {
      zongrenshu: '',
      xianrenshu: '',
      timer: null
    }
  },
  created() {
    this.$nextTick(() => {
      this.renliu()
    })
    this.renshu()
    this.timer = setInterval(() => {
      this.renliu()
      this.renshu()
    }, 1000 * 60 * 5)
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async renliu() {
      const { data } = await getAccessLog()
      // console.log(res)
      // console.log(res.data)
      const mydata = JSON.parse(JSON.stringify(data))
      const mylist = mydata.map((item) => {
        return item['count']
      })
      this.list = mylist.slice(-7)
      const myriqi = data.map((item) => {
        return item['date']
      })
      this.riqi = myriqi.slice(-7)
      // console.log(this.list)
      const myChart = echarts.init(this.$refs.echarts2)
      const option = ({
        color: ['#1186e4'],
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}<br /> {c0} 人',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
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
            data: myriqi.slice(-7),
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: 'white',
                width: 1 // 坐标轴颜色粗细设置
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: 'white',
                width: 1 // 坐标轴颜色粗细设置
              }
            }
          }
        ],
        series: [
          {
            name: '人数',
            type: 'bar',
            data: mylist.slice(-7),
            // 添加圆角
            barWidth: 8,
            itemStyle: {
              emphasis: {
                barBorderRadius: 10
              },
              normal: {
                barBorderRadius: 10
              }
            }
          }
        ]
      })
      myChart.setOption(option)
    },
    async renshu() {
      const { data } = await getOnlinePeopleCount()
      // console.log(res.data)
      this.zongrenshu = data.enterPeopleCount
      const n = (parseInt(data.enterPeopleCount) - parseInt(data.goOutPeopleCount))
      // this.xianrenshu = n > 0 ? n : (Math.random() * 30 + 10).toFixed(0)
      this.xianrenshu = n > 0 ? n : 15
    }
  }
}
</script>

<style lang="less">
.event2div {
  width: 100%;
  height: 100%;
}
.eventtop {
  width: 100%;
  height: 80px;
}
.eventp1 {
  position: absolute;
  width: 45%;
  left: 10%;
  top: 8px;
  color: white;
}
.eventp2 {
  position: absolute;
  width: 45%;
  left: 10%;
  top: 40px;
  font-size: 12px;
  color: #2edbff;
}
.eventimg1 {
  position: absolute;
  width: 7%;
  height: 30px;
  top: 30px;
  left: 73%;
}
.eventp3 {
  position: absolute;
  width: 15%;
  left: 81%;
  top: -7px;
  font-size: 32px;
  color: #2edbff;
}
</style>
