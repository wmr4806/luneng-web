<template>
  <div class="event4div" style="background-color:#221e2b">
    <div class="eventtop">
      <p class="eventp1">园区能耗</p>
      <p class="eventp2">Energy consumption</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">04</p>
    </div>
    <div ref="echarts4" class="eventecharts" />
    <div class="eventbottom">
      <div class="eventbottomp">
        <p class="eventbottomp1">今日电费</p>
        <p class="eventbottomp2">
          <i id="event4bottompi" class="eventbottomi1">{{ daydianfei }}</i>元
        </p>
      </div>
      <div class="eventbottom2p">
        <p class="eventbottom2p1">今日电量</p>
        <p style="top:28px;" class="eventbottom2p2">
          <i id="event4bottom2pi" class="eventbottomi2">{{ daydianliang }}</i>Kwh
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { getSelectElectricalOptions, getSelectCurrentTotalElectrical } from '@/api/data'
export default {
  data() {
    return {
      daydianfei: '',
      daydianliang: '',
      timer: null
    }
  },
  created() {
    this.yongdian()
    this.dianfei()
    setInterval(() => {
      this.yongdian()
      this.dianfei()
    }, 1000 * 60 * 5)
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async yongdian() {
      const { data } = await getSelectElectricalOptions()
      // console.log(res.data)
      const myChart = echarts.init(this.$refs.echarts4)
      const option = {
        color: ['#b3ed8d', '#e6834b', '#bf0c9f', '#19e1f5'],
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '55%'],
            label: {
              formatter: '{b|{b}：}\n  {per|{d}%}  ',
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: {
                a: {
                  color: '#999',
                  lineHeight: 22,
                  align: 'center'
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0]
                // },
                b: {
                  fontSize: 10,
                  lineHeight: 33
                },
                pre: {
                  fontSize: 8
                }
              }
            },
            data: [
              { value: data.air, name: '空调用电' },
              { value: data.light, name: '照明用电' },
              { value: data.power, name: '动力用电' },
              { value: data.other, name: '特殊用电' }
            ]
          }
        ]
      }
      myChart.setOption(option)
    },
    async dianfei() {
      const { data } = await getSelectCurrentTotalElectrical()
      // console.log(res.data)
      this.daydianfei = Math.round(data.fee)
      this.daydianliang = Math.round(data.electrical)
    }
  }
}
</script>

<style lang="less" scoped>
.event4div {
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
