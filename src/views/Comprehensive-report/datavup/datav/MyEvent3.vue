<template>
  <div class="event3div">
    <div class="eventtop">
      <p class="eventp1">车辆态势</p>
      <p class="eventp2">Carparking slot</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">03</p>
    </div>
    <div ref="echarts3" class="eventecharts" />
    <div class="eventbottom">
      <div class="eventbottomp">
        <p class="eventbottomp1">当前车辆数</p>
        <p class="eventbottomp2">
          <i id="event3bottompi" class="eventbottomi1">{{ cheliangshu }}</i>辆
        </p>
      </div>
      <div class="eventbottom2p">
        <p class="eventbottom2p1">剩余车位</p>
        <p class="eventbottom2p2">
          <i id="event3bottom2pi" class="eventbottomi2">{{ kongyu }}</i>个
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getParkingLotInfo } from '@/api/data'
export default {
  data() {
    return {
      cheliangshu: '',
      kongyu: '',
      timer: null
    }
  },
  created() {
    this.cheliang()
    this.timer = setInterval(() => {
      this.cheliang()
    }, 1000 * 60 * 5)
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async cheliang() {
      const { data } = await getParkingLotInfo()
      // console.log(res.data)
      this.cheliangshu =
        parseInt(data.north.totalStopNum) + parseInt(data.south.totalStopNum)
      this.kongyu =
        parseInt(data.north.totalRemainNum) +
        parseInt(data.south.totalRemainNum)
      const kongyuchewei = []
      const yiyongchewei = []
      kongyuchewei.push(data.north.totalRemainNum, data.south.totalRemainNum)
      yiyongchewei.push(data.north.totalStopNum, data.south.totalStopNum)
      // console.log(kongyuchewei)
      const myChart = echarts.init(this.$refs.echarts3)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}<br /> {c0} 个',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['空余车位', '已用车位'],
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          // 去除分割线
          splitLine: {
            show: false
          },
          minInterval: 100,
          // 去除刻度
          axisTick: {
            show: false
          },
          // 去除坐标线修改颜色
          axisLine: {
            show: false,
            lineStyle: {
              color: 'white'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['北区', '南区'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'white'
            }
          }
        },
        series: [
          {
            name: '空余车位',
            type: 'bar',
            stack: '总量',
            color: '#0a73ff',
            // 添加圆角
            barWidth: 14,
            itemStyle: {
              emphasis: {
                barBorderRadius: 5
              },
              normal: {
                barBorderRadius: 5
              }
            },
            label: {
              show: true,
              position: 'inside'
            },
            data: kongyuchewei
          },
          {
            name: '已用车位',
            type: 'bar',
            stack: '总量',
            color: '#8c0020',
            // 添加圆角
            barWidth: 14,
            itemStyle: {
              emphasis: {
                barBorderRadius: 5
              },
              normal: {
                barBorderRadius: 5
              }
            },
            label: {
              show: true,
              position: 'inside'
            },
            data: yiyongchewei
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.event3div {
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
.eventbottomp {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.eventbottom2p {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
