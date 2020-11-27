<template>
  <div :class="className" :style="{height:height,width:width}" />
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
      default: '500px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      var schema = [
        { name: 'AQIindex', index: 1, text: 'AHU优化值' },
        { name: 'PM25', index: 2, text: '送风温度' },
        { name: 'PM10', index: 3, text: '回风温度' },
        { name: 'CO', index: 4, text: '反馈频率' },
        { name: 'NO2', index: 5, text: ' CO₂' },
        { name: 'SO2', index: 6, text: '现场温度' }
      ]

      var rawData = [
        [11, 11, 12, 22, 11, 12, '良', 'AHU优化值'],
        [11, 11, 12, 22, 11, 12, '良', 'AHU优化值'],
        [21, 11, 21, 21, 32, 11, '优', 'AHU优化值'],
        [12, 11, 23, 32, 12, 11, '良', 'AHU优化值'],
        [33, 11, 21, 13, 12, 12, '优', 'AHU优化值'],
        [22, 22, 22, 12, 20, 12, '优', 'AHU优化值'],
        [12, 11, 10, 11, 21, 33, '良', 'AHU优化值'],
        [12, 21, 11, 22, 21, 21, '良', 'AHU优化值'],
        [11, 11, 10, 21, 11, 21, '良', 'AHU优化值'],
        [21, 32, 32, 11, 32, 32, '重度', 'AHU优化值'],
        [21, 12, 21, 12, 32, 21, '中度', 'AHU优化值'],
        [31, 11, 31, 11, 31, 11, '优', 'AHU优化值'],
        [21, 11, 20, 23, 21, 11, '优', 'AHU优化值'],
        [22, 31, 12, 12, 22, 22, '良', 'AHU优化值'],
        [32, 11, 22, 11, 11, 21, '轻度', 'AHU优化值'],
        [32, 23, 11, 21, 22, 22, '轻度', 'AHU优化值'],
        [33, 12, 21, 32, 13, 11, '优', 'AHU优化值'],
        [12, 22, 11, 11, 22, 31, '良', 'AHU优化值'],
        [32, 31, 22, 11, 12, 22, '中度', 'AHU优化值'],
        [22, 31, 22, 12, 32, 12, '良', 'AHU优化值'],
        [22, 11, 11, 21, 23, 10, '优', 'AHU优化值'],
        [31, 11, 32, 21, 21, 13, '优', 'AHU优化值'],
        [12, 21, 22, 21, 13, 31, '良', 'AHU优化值'],
        [22, 13, 12, 23, 12, 21, '良', 'AHU优化值'],
        [31, 12, 30, 21, 32, 12, '优', 'AHU优化值'],
        [22, 21, 23, 12, 13, 22, '优', 'AHU优化值'],
        [12, 22, 32, 11, 22, 31, '中度', 'AHU优化值'],
        [32, 12, 22, 11, 31, 21, '重度', 'AHU优化值'],
        [22, 31, 21, 11, 21, 10, '中度', 'AHU优化值'],
        [32, 22, 21, 12, 13, 21, '轻度', 'AHU优化值'],
        [12, 22, 20, 13, 10, 21, '良', 'AHU优化值'],
        [22, 11, 21, 21, 10, 21, '优', 'AHU优化值'],

        [22, 31, 21, 32, 21, 13, '优', '送风温度'],
        [32, 22, 11, 32, 32, 11, '良', '送风温度'],
        [11, 31, 12, 32, 31, 11, '良', '送风温度'],
        [21, 21, 32, 12, 20, 11, '优', '送风温度'],
        [12, 22, 22, 22, 22, 13, '优', '送风温度'],
        [12, 12, 21, 11, 12, 12, '良', '送风温度'],
        [22, 30, 21, 12, 11, 12, '良', '送风温度'],
        [11, 21, 12, 11, 11, 22, '良', '送风温度'],
        [12, 11, 11, 11, 32, 21, '良', '送风温度'],
        [11, 11, 10, 32, 12, 20, '良', '送风温度'],
        [12, 31, 20, 22, 21, 11, '良', '送风温度'],
        [23, 31, 32, 22, 11, 23, '良', '送风温度'],
        [13, 31, 32, 11, 21, 32, '良', '送风温度'],
        [11, 10, 11, 22, 31, 12, '良', '送风温度'],
        [10, 21, 11, 12, 12, 21, '轻度', '送风温度'],
        [13, 21, 11, 11, 11, 32, '良', '送风温度'],
        [12, 21, 21, 12, 13, 12, '良', '送风温度'],
        [21, 32, 11, 11, 21, 11, '良', '送风温度'],
        [32, 31, 32, 12, 23, 11, '良', '送风温度'],
        [32, 10, 12, 11, 22, 11, '良', '送风温度'],
        [32, 10, 12, 11, 31, 20, '良', '送风温度'],
        [12, 12, 12, 31, 21, 11, '良', '送风温度'],
        [13, 11, 32, 31, 13, 11, '良', '送风温度'],
        [12, 32, 12, 13, 11, 11, '良', '送风温度'],
        [32, 12, 13, 12, 32, 11, '轻度', '送风温度'],
        [12, 10, 32, 11, 12, 11, '轻度', '送风温度'],
        [11, 32, 12, 11, 22, 31, '良', '送风温度'],
        [12, 21, 32, 21, 31, 1, '良', '送风温度'],
        [12, 22, 32, 31, 20, 13, '良', '送风温度'],
        [32, 11, 12, 32, 32, 12, '轻度', '送风温度'],
        [12, 10, 20, 11, 12, 11, '轻度', '送风温度'],

        [21, 21, 21, 12, 32, 23, '良', '回风温度'],
        [21, 21, 11, 12, 21, 21, '良', '回风温度'],
        [21, 21, 21, 11, 13, 21, '良', '回风温度'],
        [21, 11, 21, 21, 21, 11, '轻度', '回风温度'],
        [32, 32, 12, 11, 11, 11, '轻度', '回风温度'],
        [21, 21, 32, 21, 32, 12, '轻度', '回风温度'],
        [21, 32, 32, 11, 32, 11, '轻度', '回风温度'],
        [11, 21, 11, 12, 11, 22, '良', '回风温度'],
        [13, 33, 21, 22, 10, 11, '良', '回风温度'],
        [10, 21, 10, 11, 11, 22, '良', '回风温度'],
        [21, 32, 21, 13, 21, 22, '轻度', '回风温度'],
        [21, 12, 21, 11, 22, 22, '良', '回风温度'],
        [23, 21, 21, 21, 32, 21, '良', '回风温度'],
        [21, 32, 21, 21, 32, 20, '轻度', '回风温度'],
        [21, 32, 21, 31, 11, 31, '轻度', '回风温度'],
        [21, 21, 21, 12, 32, 21, '轻度', '回风温度'],
        [21, 12, 31, 11, 21, 35, '良', '回风温度'],
        [36, 24, 32, 12, 12, 25, '良', '回风温度'],
        [26, 24, 32, 11, 21, 35, '良', '回风温度'],
        [26, 14, 32, 11, 21, 35, '良', '回风温度'],
        [16, 24, 32, 11, 12, 25, '良', '回风温度'],
        [16, 14, 21, 11, 12, 25, '轻度', '回风温度'],
        [26, 24, 12, 13, 12, 25, '良', '回风温度'],
        [26, 24, 21, 11, 11, 15, '中度', '回风温度'],
        [26, 24, 11, 12, 31, 15, '良', '回风温度'],
        [16, 24, 21, 21, 21, 15, '优', '回风温度'],
        [26, 24, 21, 11, 12, 15, '优', '回风温度'],
        [16, 34, 23, 21, 12, 25, '良', '回风温度'],
        [26, 34, 12, 22, 32, 25, '中度', '回风温度'],
        [36, 34, 12, 11, 32, 15, '中度', '回风温度'],
        [26, 34, 32, 31, 12, 15, '中度', '回风温度']
      ]

      var CATEGORY_DIM_COUNT = 6
      var GAP = 1
      var BASE_LEFT = 5
      var BASE_TOP = 10
      // var GRID_WIDTH = 220;
      // var GRID_HEIGHT = 220;
      var GRID_WIDTH = (100 - BASE_LEFT - GAP) / CATEGORY_DIM_COUNT - GAP
      var GRID_HEIGHT = (100 - BASE_TOP - GAP) / CATEGORY_DIM_COUNT - GAP
      var CATEGORY_DIM = 7
      var SYMBOL_SIZE = 3

      function retrieveScatterData(data, dimX, dimY) {
        var result = []
        for (var i = 0; i < data.length; i++) {
          var item = [data[i][dimX], data[i][dimY]]
          item[CATEGORY_DIM] = data[i][CATEGORY_DIM]
          result.push(item)
        }
        return result
      }

      function generateGrids(option) {
        var index = 0

        for (var i = 0; i < CATEGORY_DIM_COUNT; i++) {
          for (var j = 0; j < CATEGORY_DIM_COUNT; j++) {
            if (CATEGORY_DIM_COUNT - i + j >= CATEGORY_DIM_COUNT) {
              continue
            }

            option.grid.push({
              left: BASE_LEFT + i * (GRID_WIDTH + GAP) + '%',
              top: BASE_TOP + j * (GRID_HEIGHT + GAP) + '%',
              width: GRID_WIDTH + '%',
              height: GRID_HEIGHT + '%'
            })

            option.brush.xAxisIndex && option.brush.xAxisIndex.push(index)
            option.brush.yAxisIndex && option.brush.yAxisIndex.push(index)

            option.xAxis.push({
              splitNumber: 3,
              position: 'top',
              axisLine: {
                show: j === 0,
                onZero: false
              },
              axisTick: {
                show: j === 0,
                inside: true
              },
              axisLabel: {
                show: j === 0
              },
              type: 'value',
              gridIndex: index,
              scale: true
            })

            option.yAxis.push({
              splitNumber: 3,
              position: 'right',
              axisLine: {
                show: i === CATEGORY_DIM_COUNT - 1,
                onZero: false
              },
              axisTick: {
                show: i === CATEGORY_DIM_COUNT - 1,
                inside: true
              },
              axisLabel: {
                show: i === CATEGORY_DIM_COUNT - 1
              },
              type: 'value',
              gridIndex: index,
              scale: true
            })

            option.series.push({
              type: 'scatter',
              symbolSize: SYMBOL_SIZE,
              xAxisIndex: index,
              yAxisIndex: index,
              data: retrieveScatterData(rawData, i, j)
            })

            option.visualMap.seriesIndex.push(option.series.length - 1)

            index++
          }
        }
      }

      var option = {
        animation: false,
        brush: {
          brushLink: 'all',
          xAxisIndex: [],
          yAxisIndex: [],
          inBrush: {
            opacity: 1
          }
        },
        visualMap: {
          type: 'piecewise',
          categories: ['AHU优化值', '送风温度', '回风温度'],
          dimension: CATEGORY_DIM,
          orient: 'horizontal',
          top: 0,
          left: 'center',
          inRange: {
            color: ['#c23531', '#2f4554', '#61a0a8']
          },
          textStyle: {
            color: '#1e98d3'
          },
          outOfRange: {
            color: '#ddd'
          },
          seriesIndex: [0]
        },
        tooltip: {
          trigger: 'item'
        },

        parallelAxis: [
          { dim: 0, name: schema[0].text },
          { dim: 1, name: schema[1].text },
          { dim: 2, name: schema[2].text },
          { dim: 3, name: schema[3].text },
          { dim: 4, name: schema[4].text },
          { dim: 5, name: schema[5].text }
        // {dim: 6, name: schema[6].text,
        //     type: 'category', data: ['优', '良', '轻度', '中度', '重度', '严重']
        // }
        ],
        parallel: {
          bottom: '5%',
          left: '5%',
          height: '31%',
          width: '55%',
          parallelAxisDefault: {
            type: 'value',
            name: 'AQI指数',
            nameLocation: 'end',
            nameGap: 20,
            splitNumber: 3,
            nameTextStyle: {
              fontSize: 14
            },
            axisLine: {
              lineStyle: {
                color: '#1e98d3'
              }
            },
            axisTick: {
              lineStyle: {
                color: '#1e98d3'
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              color: '#1e98d3'
            }
          }
        },
        grid: [],
        xAxis: [],
        yAxis: [],
        series: [
          {
            name: 'parallel',
            type: 'parallel',
            smooth: true,
            lineStyle: {
              width: 1,
              opacity: 0.3
            },
            data: rawData
          }
        ]
      }
      generateGrids(option)
      this.chart.setOption(option)
    }
  }
}
</script>
