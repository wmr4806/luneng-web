<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 6000

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
      default: '300px'
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

      this.chart.setOption({
        title: {
          text: '空调回风温度分布'
        },
        grid: {
          left: '3%',
          right: '7%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
        // trigger: 'axis',
          showDelay: 0,
          formatter: function(params) {
            if (params.value.length > 1) {
              return params.seriesName + ' :<br/>' +
                params.value[0] + '℃ ' +
                params.value[1] + '℃ '
            } else {
              return params.seriesName + ' :<br/>' +
                params.name + ' : ' +
                params.value + '℃ '
            }
          },
          axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
              type: 'dashed',
              width: 1
            }
          }
        },
        toolbox: {
          feature: {
            dataZoom: {},
            brush: {
              type: ['rect', 'polygon', 'clear']
            }
          }
        },
        brush: {
        },
        legend: {
          data: ['优化', 'BA'],
          left: 'center'
        },
        xAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value} ℃'
            },
            splitLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            axisLabel: {
              formatter: '{value} ℃'
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '优化后的温度',
            type: 'scatter',
            data: [[22.5, 22.3], [21.5, 19.2], [21.5, 20.2], [18.9, 19.3], [22.5, 20.6],
              [22.3, 18.6], [22.3, 18.8], [23.5, 19.7], [21.6, 18.6], [18.2, 17.8],
              [22.3, 20.6], [21.3, 17.8], [24.5, 18.7], [17.6, 21.6], [17.2, 20.8],
              [22.3, 19.6], [25.3, 18.6], [23.5, 20.7], [22.6, 20.6], [15.2, 19.8]
            ],
            markArea: {
              silent: true,
              itemStyle: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              },
              data: [[{
                name: '优化分布区间',
                xAxis: 'min',
                yAxis: 'min'
              }, {
                xAxis: 'max',
                yAxis: 'max'
              }]]
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              lineStyle: {
                type: 'solid'
              },
              data: [
                { type: 'average', name: '平均值' },
                { xAxis: 21 }
              ]
            }
          },
          {
            name: '原始的温度',
            type: 'scatter',
            data: [[25.3, 18.6], [20.3, 18.8], [23.5, 20.7], [18.6, 15.6], [25.2, 18.8],
              [28.3, 16.6], [29.3, 13.8], [25.5, 17.7], [25.6, 29.6], [24.2, 26.8],
              [22.3, 20.6], [28.3, 15.8], [27.5, 18.7], [17.6, 22.6], [17.2, 14.8],
              [29.3, 15.6], [25.3, 19.8], [26.5, 14.7], [28.6, 18.6], [15.2, 25.8]
            ],
            markArea: {
              silent: true,
              itemStyle: {
                color: 'transparent',
                borderWidth: 1,
                borderType: 'dashed'
              },
              data: [[{
                name: 'BA原始分布区间',
                xAxis: 'min',
                yAxis: 'min'
              }, {
                xAxis: 'max',
                yAxis: 'max'
              }]]
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              lineStyle: {
                type: 'solid'
              },
              data: [
                { type: 'average', name: '平均值' },
                { xAxis: 22 }
              ]
            }
          }
        ]
      })
    }
  }
}
</script>
