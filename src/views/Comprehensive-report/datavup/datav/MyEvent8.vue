<template>
  <div class="event8div" style="background-color:#221e2b">
    <div class="eventtop">
      <p class="eventp1">设备任务</p>
      <p class="eventp2">Equipment PM</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">08</p>
    </div>
    <div ref="echarts8" class="eventecharts">
      <dv-active-ring-chart :config="config" style="width:100%;height:200px" />
    </div>
    <div class="eventbottom">
      <div class="eventbottomp">
        <p class="eventbottomp1">今日完成率</p>
        <p class="eventbottomp2">
          <i id="event8bottompi" class="eventbottomi1">{{ daywancheng }}%</i>
        </p>
      </div>
      <div class="eventbottom2p">
        <p class="eventbottom2p1">今日签到率</p>
        <p class="eventbottom2p2">
          <i id="event8bottom2pi" class="eventbottomi2">{{ dayqiandao }}%</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getPatrolSummaryDimensionByDay } from '@/api/data'
export default {
  data() {
    return {
      config: {
        data: [
          {
            name: '已完成',
            value: 1
          },
          {
            name: '未完成',
            value: 0
          }
        ],
        digitalFlopStyle: {
          fontSize: 16,
          fill: '#fff'
        }
        // showOriginValue: true
      },
      daywancheng: '0',
      dayqiandao: '0'
    }
  },
  created() {
    this.renwu()
    setInterval(() => {
      this.renwu()
    }, 1000 * 60 * 5)
  },
  methods: {
    async renwu() {
      const { data } = await getPatrolSummaryDimensionByDay()
      console.log(111, data)
      this.daywancheng = parseInt(data.data.finishRate.replace(/%/g, ''))
      this.dayqiandao = parseInt(data.data.signInRate.replace(/%/g, ''))
      this.config.data[0].value = parseInt(data.data.finishNum)
      this.config.data[1].value = parseInt(data.data.unFinishNum)
      this.config = {
        ...this.config
      }
      // console.log(this.config.data[0].value)
    }
  }
}
</script>

<style lang="less" scoped>
.event8div {
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
.bottom-charts {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .bc-chart-item {
    width: 25%;
    height: 100%;
    padding-top: 20px;
    box-sizing: border-box;
  }
  .bcci-header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 20px;
  }
  .dv-active-ring-chart {
    height: calc(~"100% - 80px");
  }
  .label-tag {
    height: 30px;
  }
  .active-ring-name {
    font-size: 18px !important;
  }
  .decoration-1,
  .decoration-2,
  .decoration-3 {
    display: absolute;
    left: 0%;
  }
}
.eventbottomp {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
.eventbottom2p {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
