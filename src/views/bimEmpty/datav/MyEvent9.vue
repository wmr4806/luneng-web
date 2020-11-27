<template>
  <div>
    <!-- <button @click="changeButton">{{state ? '日电量' : '两小时'}}</button> -->
    <div class="contanir">
      <button v-for="(title, index) in titles" :key="title" class="btn"  @click="changeButton(index)">{{title[index]}}</button>
    </div>
    <div ref="echarts9" class="event9div" />
    
  </div>
</template>

<script>
import echarts from 'echarts'
import { getSelectElectricalHistoryHour, getSelectElectricalHistoryMonth } from '@/api/data'
import { param } from '@/utils'
import { date } from 'jszip/lib/defaults'
require('echarts/theme/macarons') // echarts theme
export default {
  data() {
    return {
      state:false,
      mylist2: [],
      mylist1: [],
      myChart:null,
      text:1,
      timer1:null,
      timer2:null,
      timer: null,
      titles:['日电量', '小时']
    }
  },
  watch:{
    mylist2(newVal){
      if (this.myChart) {
        this.myChart.setOption({
          title: {
          text: ['每两小时电量Kwh','每日电量Kwh'][this.text],
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          data: this.mylist1
        },
        series:[{
          data:newVal,
          type: 'line',
        }]
        })
      }
    }
  },
  mounted() {
    this.houdianliang()
    this.timer = setInterval(() => {
      this.houdianliang()
    }, 1000 * 60)
  },
  created() {
    setInterval(() => {
    this.hourslist()
    this.daylist()
    }, 1000 * 60);
    
  },
  methods: {
    async changeButton(index) {
      console.log(index)
      this.state = !this.state
      if (index === 1) {
        this.timer2 && clearInterval(this.timer2)
        this.timer && clearInterval(this.timer)
        const { data } = await getSelectElectricalHistoryHour()
        this.mylist2 = data.map((item) => {
        return item['value'].toFixed(2)
      })
      this.mylist1 = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
       this.timer1 = setInterval(async () => {
        const { data } = await getSelectElectricalHistoryHour()
        this.mylist1 = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
        this.mylist2 = data.map((item) => {
        return item['value'].toFixed(2)
      })
      }, 1000 * 60);  

        this.text = 0
      }else {
        this.timer1 && clearInterval(this.timer1)
        this.timer && clearInterval(this.timer)
        this.text = 1
        const data  = await getSelectElectricalHistoryMonth()
        this.mylist2 = data.map((item) => {
        return item['sum_value'].toFixed(2)
      })
      this.mylist1 = data.map(item => {
        return item['date']
      })
      this.timer2 = setInterval(async () => {
        const  data  = await getSelectElectricalHistoryMonth()
        this.mylist2 = data.map((item) => {
        return item['sum_value'].toFixed(2)
      })
      this.mylist1 = data.map(item => {
        return item['date']
      })
      }, 1000 * 60);
      }
    },
    async hourslist() {
       const { data } = await getSelectElectricalHistoryHour()
       console.log(222,data)
        this.mylist1 = ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
        this.mylist2 = data.map((item) => {
        return item['value'].toFixed(2)
      })
        this.text = 0
    },
    async daylist(){
       const  data  = await getSelectElectricalHistoryMonth()
         this.mylist2 = data.map((item) => {
        return item['sum_value'].toFixed(2)
      })
      this.mylist1 = data.map(item => {
        return item['date']
      })
        this.text = 1
    },
    async houdianliang() {
      const  data  = await getSelectElectricalHistoryMonth()
      // console.log(res.data)
      // let mylist = res.data.map((item) => {
      //   return item['item']
      // })
  
      this.mylist2 = data.map((item) => {
        return item['sum_value'].toFixed(2)
      })
      this.mylist1 = data.map(item => {
        return item['date']
      })


      // const mylebgth = 12 - mylist2.length
      // if (mylist2.length < 12) {
      //   for (let i = 0; i < mylebgth; i++) {
      //     mylist2.push(0)
      //   }
      // }
      // console.log(mylist)
      // console.log(mylist2)
      this.myChart = echarts.init(this.$refs.echarts9)
      const option = {
        tooltip: {
          trigger: 'axis',
          formatter: `{b0}<br /> {c0}Kwh`,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        title: {
          text: '每两小时电量Kwh',
          textStyle: {
            color: 'white'
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          // data: ['0-2', '2-4', '4-6', '6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24'],
          data: this.mylist1,
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
          top: '50px',
          left: '70px',
          right: '15px',
          bottom: '30px'
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: false
          },
          axisLabel: {
            margin: 10
            // formatter: `{value} ${unit}`
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
            data: this.mylist2,
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
      this.myChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.event9div{
  position: absolute;
  top: 0;
  left: 0;
    width: 100%;
    height: 100%;
}
.btn{
  background-color:#0b6cd4;
  color: floralwhite;
  border-radius: 3px;
  // position: absolute;
  top: 0;
  left: 15%;
  z-index: 9;
  width: 40px;
}
.contanir {
  display: flex;
  left: 20%;
  position: absolute;
}
// button {
//   position: absolute;
//   top: 0;
//   right: 1%;
//   background-color:#0b6cd4;
//   color: floralwhite;
//   border-radius: 3px;
//   z-index: 9;
// }
</style>
