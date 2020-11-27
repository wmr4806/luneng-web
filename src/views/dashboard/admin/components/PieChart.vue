<template>
  <div
    ref="echarts"
    :class="className"
    :style="{ height: height, width: width }"
  />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

// const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      const myChart = echarts.init(this.$refs.echarts)
      function randomData() {
        now = new Date(+now + oneDay)
        value = [
          2500.318915,
          2350.233174,
          2213.15285,
          2120.228654,
          2110.444567,
          2001.15748,
          1980.525464,
          1849.547551,
          1830.5648,
          1804.5487,
          1789.4564
        ]
        return {
          name: now.toString(),
          value: [
            [now.getHours(), now.getMinutes(), now.getSeconds()].join(':'),
            value[Math.floor(Math.random() * value.length)]
          ]
        }
      }

      var data = []
      var now = new Date()
      var oneDay = 1000
      var value = Math.random() * 1000
      for (var i = 0; i < 6; i++) {
        data.push(randomData())
      }

      const option = {
        // title: {
        //   text: "数据动态"
        // },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            params = params[0]
            // var date = new Date(params.name)
            // return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'category',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#1e98d3',
              width: 1// 这里是为了突出显示加上的
            }
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#1e98d3',
              width: 1// 这里是为了突出显示加上的
            }
          }
        },
        series: [
          {
            name: '模拟数据',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
          }
        ]
      }

      setInterval(function() {
        if (data.length > 1000) {
          data.shift()
        }

        // data.shift(); //情况data
        data.push(randomData())// 加数据
        myChart.setOption(option)// 导入chart
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped></style>
