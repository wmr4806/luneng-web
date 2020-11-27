<template>
  <div class="event7div">
    <div class="eventtop">
      <p class="eventp1">工单统计</p>
      <p class="eventp2">Work order statistics</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">07</p>
    </div>
    <div ref="echarts7" class="eventecharts" />
    <div class="eventbottom">
      <div class="eventbottomp">
        <p class="eventbottomp1">当月工单总数</p>
        <p class="eventbottomp2">
          <i id="event7bottompi" class="eventbottomi1">{{ mongongdan }}</i>个
        </p>
      </div>
      <div class="eventbottom2p">
        <p class="eventbottom2p1">今日工单总数</p>
        <p class="eventbottom2p2">
          <i id="event7bottom2pi" class="eventbottomi2">{{ daygongdan }}</i>个
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getQueryOrderStats } from '@/api/data'
export default {
  data() {
    return {
      daygongdan: '',
      mongongdan: ''
    }
  },
  mounted() {
    this.gongdan()
    setInterval(() => {
      this.gongdan()
    }, 1000 * 60 * 5)
  },
  methods: {
    async gongdan() {
      const { data } = await getQueryOrderStats()
      // console.log(res.data.data.data)
      this.daygongdan = data.data.data.orderByDay
      this.mongongdan = data.data.data.orderByMonth
      const mylist = data.data.data.orderList.map((item) => {
        return item['time'].substring(5)
      })
      const mylist2 = data.data.data.orderList.map((item) => {
        return item['finished']
      })
      const mylist3 = data.data.data.orderList.map((item) => {
        return item['total']
      })
      // console.log(mylist)
      const myChart = echarts.init(this.$refs.echarts7)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}<br /> {c0} 个'
        },
        legend: {
          data: ['已完成工单', '工单总数'],
          color: ['#b3ed8d', '#e6834b'],
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
        // 添加保存为图片
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: mylist,
          // 去除分割线
          splitLine: {
            show: false
          },
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
          type: 'value',
          // 去除分割线
          splitLine: {
            show: false
          },
          // 去除刻度
          axisTick: {
            show: false
          },
          // 去除坐标线修改颜色
          axisLine: {
            // show: false,
            lineStyle: {
              color: 'white'
            }
          }
        },
        series: [
          {
            smooth: true,
            name: '工单总数',
            type: 'line',
            // stack: '总量',
            data: mylist3,
            itemStyle: {
              normal: {
                color: '#0a73ff', // 折点颜色
                lineStyle: {
                  color: '#0a73ff' // 折线颜色
                }
              }
            },
            areaStyle: { normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#071133'
              }, {
                offset: 1,
                color: '#071133'
              }])
            }}
          },
          {
            smooth: true,
            name: '已完成工单',
            type: 'line',
            // stack: '总量',
            data: mylist2,
            itemStyle: {
              normal: {
                color: '#85efff', // 折点颜色
                lineStyle: {
                  color: '#85efff' // 折线颜色
                }
              }
            },
            areaStyle: { normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#407597'
              }, {
                offset: 1,
                color: '#407597'
              }])
            }}
          }

        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.event7div {
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
