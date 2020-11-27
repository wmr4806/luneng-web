<template>
  <div class="event6div">
    <div class="eventtop">
      <p class="eventp1">秩序巡更</p>
      <p class="eventp2">Patrol ratio</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">06</p>
    </div>
    <div ref="echarts6" class="eventecharts" />
    <div class="eventbottom">
      <div class="eventbottomp">
        <p class="eventbottomp1">近七日完成率</p>
        <p style="top:28px;" class="eventbottomp2">
          <i id="event6bottompi" class="eventbottomi1">{{ wanchenglv }}</i>%
        </p>
      </div>
      <div class="eventbottom2p">
        <p class="eventbottom2p1">近七日签到率</p>
        <p style="top:28px;" class="eventbottom2p2">
          <i id="event6bottom2pi" class="eventbottomi2">{{ qiandaolv }}</i>%
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getQueryPatrolTaskInfoLast7Days } from '@/api/data'
require('echarts/theme/macarons') // echarts theme
export default {
  data() {
    return {
      wanchenglv: '',
      qiandaolv: '',
      timer: null
    }
  },
  mounted() {
    this.xungeng()
    this.timer = setInterval(() => {
      this.xungeng()
    }, 1000 * 60 * 5)
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async xungeng() {
      const { data } = await getQueryPatrolTaskInfoLast7Days()
      // console.log(res.data)
      this.wanchenglv = parseInt(data.data.sumFinished.replace(/%/g, ''))
      this.qiandaolv = parseInt(data.data.sumSign.replace(/%/g, ''))
      const mylist = data.data.list.map((item) => {
        return item['time'].substring(5)
      })
      const mylist2 = data.data.list.map((item) => {
        return item['rate'].replace(/%/g, '')
      })
      // console.log(mylist2)
      const myChart = echarts.init(this.$refs.echarts6)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: '{b0}<br /> {c0} %'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: mylist,
          axisLine: {
            lineStyle: {
              color: 'white',
              width: 1 // 坐标轴颜色粗细设置
            }
          },
          smooth: true
        },
        // 距离生成div边的距离设置
        grid: {
          top: '10px',
          left: '40px',
          right: '15px',
          bottom: '30px'
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 120,
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: 'white',
              width: 1 // 坐标轴颜色粗细设置
            }
          }
        },
        series: [
          {
            smooth: true,
            data: mylist2,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#0b7eff', // 折点颜色
                lineStyle: {
                  color: '#0b7eff' // 折线颜色
                }
              }
            },
            areaStyle: { normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#0b7eff'
              }, {
                offset: 1,
                color: 'rgba(38,197,254,0.00)'
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

<style lang="less">
.event6div{
    width: 100%;
    height: 100%;
}
.eventtop{
    width: 100%;
    height: 80px;
}
.eventp1{
    position: absolute;
    width: 45%;
    left: 10%;
    top: 8px;
    color: white;
}
.eventp2{
    position: absolute;
    width: 45%;
    left: 10%;
    top: 40px;
    font-size: 12px;
    color: #2edbff;
}
.eventimg1{
    position: absolute;
    width: 7%;
    height: 30px;
    top: 30px;
    left: 73%;
}
.eventp3{
    position: absolute;
    width: 15%;
    left: 81%;
    top: -7px;
    font-size: 32px;
    color: #2edbff;
}
</style>
