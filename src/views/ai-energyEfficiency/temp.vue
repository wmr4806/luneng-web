<template>
  <div id="policy_engine" style="height:100vh;background-color:#18111f">
    <el-table
      :data="tableData"
      border
      style="width: 100%;"
      :header-cell-style="{
        background: '#221e2b',
        color: '#1890FF',
        'text-align': 'center'
      }"
    >
      <template v-for="({ fixed = false,prop = '',label = '',width },index) in columns">
        <el-table-column
          :key="index"
          :fixed="fixed"
          :prop="prop"
          :label="label"
          :width="width"
          align="center"
        >
          <template slot-scope="scope">
            <el-row v-if="index === columns.length - 1">
              <el-button type="primary" size="small" @click="handleClick(scope)">查看</el-button>
              <!--                            <el-button type="warning" size="small" @click="handleClick(scope)">编辑</el-button>-->
              <!--                            <el-button type="danger" size="small" @click="handleClick(scope)">删除</el-button>-->
            </el-row>
            <span v-else-if="prop === 'freq'">
              {{ scope.row[prop] || '' }}分钟
            </span>
            <el-tag v-else-if="prop === 'state'" :type="scope.row[prop] === 1 ? 'success' : 'danger'">
              {{ scope.row[prop] === 1 ? '启用' : '未启用' }}
            </el-tag>
            <span v-else>
              {{ scope.row[prop] || '' }}
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!--        <el-pagination-->
    <!--            :current-page="pagination.current"-->
    <!--            :page-sizes="[100, 200, 300, 400]"-->
    <!--            :page-size="100"-->
    <!--            layout="total, sizes, prev, pager, next, jumper"-->
    <!--            :total="400"-->
    <!--            @size-change="handleSizeChange"-->
    <!--            @current-change="handleCurrentChange"-->
    <!--        >-->
    <!--        </el-pagination>-->

    <div @click.capture.stop="() => {}">
      <el-image
        :src="require('@/assets/show.gif')"
        style="width: 60%"
        fit="scale-down"
        lazy
      />
      <el-card class="box-card myCard" style="background-color:#221e2b;color:#1890FF">
        <div slot="header" class="clearfix">
          <span>分析引擎介绍</span>
        </div>
        <div v-for="i in cardData" :key="i.id" class="text item">
          {{ i.id }}<br>{{ i.text }}
          <el-divider />
        </div>
      </el-card>
    </div>

    <el-dialog title="查看策略" width="80%" :close-on-click-modal="false" :visible.sync="dialog.visible">
      <el-button type="primary" size="small" @click="clickOptimize">{{ dialog.btnText }}优化</el-button>
      <el-table
        v-if="!selectedRows[0]"
        :data="dialog.data"
        :header-cell-style="{
          background: '#221e2b',
          color: '#1890FF',
          'text-align': 'center'
        }"
      >
        <template v-for="({ fixed = false,prop = '',label = '',width },index) in dialog.columns">
          <el-table-column
            :key="index"
            :fixed="fixed"
            :prop="prop"
            :label="label"
            :width="width"
            align="center"
          />
        </template>
      </el-table>
      <div v-else id="figure" ref="figure1" style="width: 100%;height:25rem;margin-top:1rem;" />
    </el-dialog>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'Temp',
  components: { },
  data() {
    return {
      charts: {},
      pagination: {
        current: 0
      },
      columns: [
        {
          prop: 'name',
          label: '策略名称'
        },
        {
          prop: 'freq',
          label: '运行频率'
        },
        {
          prop: 'date',
          label: '创建时间'
        },
        {
          prop: 'state',
          label: '策略状态'
        },
        {
          prop: '',
          label: '操作',
          width: 300
        }
      ],
      cardData: [
        {
          id: '引擎A',
          text: '智能预测控制引擎，用于控制变风量系统风机频率。输入参数是：房间室内空气设定温度（固定），风机送风温度前两个时刻实测值（不断更新），风机频率前两个时刻实测值（不断更新），房间温度前两个时刻实测值（不断更新）。输出参数为风机频率（不断更新），并反馈至风机频率控制器，从而实现变风量系统的风机转速实时优化控制。'
        },
        {
          id: '引擎B',
          text: '主要用于参数预测，包括室外温度、送风温度、室内温度及系统能耗实时预测。用户根据需要选择相关参数（每次只能选择一个参数），然后点击“实时优化”按钮，就能实时获得下一时刻该参数预测值。注意：开始阶段需要等待一定时间，如果由于网络中断导致数据采集失效，将会影响预测数据的有效性。'
        }
      ],
      tableData: [
        {
          date: new Date().format('yyyy-MM-dd HH:mm:ss'),
          name: '引擎A',
          freq: 1,
          state: 0
        },
        {
          date: new Date().format('yyyy-MM-dd HH:mm:ss'),
          name: '引擎B',
          freq: 2,
          state: 0
        }
      ],
      selectedRows: [],
      dialog: {
        visible: false,
        btnText: '立即',
        columns: [
          {
            prop: 'name',
            label: '设备名称'
          },
          {
            prop: 'sub',
            label: '分机名称'
          },
          {
            prop: 'variable',
            label: '变量名'
          },
          {
            prop: 'val',
            label: '变量值'
          },
          {
            prop: 'param',
            label: '优化参数'
          },
          {
            prop: 'value',
            label: '优化值'
          }
        ],
        data: new Array(5).fill('').map((item, index) => {
          return {
            name: '办公室控制',
            sub: 'IO模块',
            variable: `AHU${index + 1}送风温度`,
            val: '',
            param: '',
            value: ''
          }
        }),
        time: [],
        chart: [
          {
            name: '预测值',
            data: []
          },
          {
            name: '实际值',
            data: []
          }
        ]
      }
    }
  },
  computed: {
    series() {
      const { dialog: { chart }} = this
      return chart.map(({ name, data }) => {
        return {
          name,
          type: 'line',
          data
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  methods: {
    handleClick({ $index: index }) {
      this.dialog.visible = true
      this.selectedRows = [index]
      if (index === 1) {
        this.$nextTick(() => {
          const { $refs: { figure1 }, init } = this
          init(figure1)
        })
      }
    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    },
    clickOptimize() {
      const { selectedRows } = this
      const index = selectedRows[0]
      const row = this.tableData[index]
      if (index === undefined || !row) {
        return
      }

      this.tableData[index].state = 1 - row.state
      this.dialog.btnText = this.tableData[index].state === 1 ? '暂停' : '立即'

      const timer = () => {
        setTimeout(() => {
          if (!this.tableData[index].state) {
            return
          }

          if (index === 0) {
            this.dialog.data = this.dialog.data.map(item => {
              return {
                ...item,
                val: Math.ceil(Math.random() * 110 + 130),
                param: '',
                value: (15 + Math.random() - Math.random() * 2).toFixed(3)
              }
            })
          } else {
            const { dialog: { chart, time }} = this

            if (chart[0].data.length === 0) {
              chart[0].data.push(Math.random() * 1100 + 600)
            } else {
              this.dialog.chart = chart.map((item, index) => {
                if (index === 0) {
                  item.data.push(Math.random() * 1100 + 600)
                } else {
                  item.data.push(chart[0].data[chart[0].data.length - 1] - Math.random() * 100 + 50)
                }

                return item
              })
            }

            time.push(new Date().format('yyyy-MM-dd HH:mm'))
            this.dialog.time = time

            const { series, charts } = this
            charts['figure'] && charts['figure'].setOption({
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: time
              },
              series
            })
          }
          handle()
        }, 45 * 1000)
      }

      const handle = () => {
        if (this.tableData[index].state) {
          timer()
        } else {
          if (index === 0) {
            this.dialog.data = this.dialog.data.map(item => {
              return {
                ...item,
                val: '',
                param: '',
                value: ''
              }
            })
          } else {
            this.dialog.time = []
            this.dialog.chart = [
              {
                name: '预测值',
                data: []
              },
              {
                name: '实际值',
                data: []
              }
            ]
            const { series, charts } = this
            charts['figure'] && charts['figure'].setOption({
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: []
              },
              series
            })
          }
        }
      }
      handle()
    },
    init(ref) {
      if (ref && ref.id) {
        const chart = echarts.init(ref)
        const { setOption, series, dialog: { time }} = this
        chart.setOption(setOption('', time, series))

        this.charts[ref.id] = chart
      }
    },
    setOption(title, data, series) {
      return {
        title: {
          text: title,
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['实际值', '预测值'],
          left: 10
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data
        },
        yAxis: {
          name: '空调负荷(KW)',
          type: 'value',
          axisLabel: {
            formatter: '{value} KW'
          },
          boundaryGap: ['20%', '20%']
          // min: value => (Math.floor(value.min) - 10),
          // max: value => (Math.ceil(value.max) + 10)
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 80
          }, {
            start: 0,
            end: 80,
            handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '80%',
            handleStyle: {
              color: '#fff',
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.6)',
              shadowOffsetX: 2,
              shadowOffsetY: 2
            }
          }
        ],
        series
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table /deep/ tr{
  color: #1890FF;
  background-color: #221e2b;
}
.el-table /deep/ tbody tr:hover>td {
    background-color: #18111f!important;
}
  .container{
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 25px;
  }
  #policy_engine{
    padding: 1rem;
  }
  .btn{
    margin-left: 1.5rem;
  }
  .myCard{
    width: 40%;
    float: right;
    margin-top: 1.5rem;
  }
</style>
