<template>
  <div style="background:#18111f;height: 140vh;">
    <div class="container">
      <div id="conservation" ref="figure1" style="width:45%;height:30rem;background:#221e2b" />
      <div style="width:50%;height:30rem;margin:0 3%;">
        <div style="width:100%;height:4rem;margin:0 auto;display:flex">
          <div
            style="width:100%;text-align:center;line-height:40px;font-weight: 400;color:#1e98d3;font-size:18px"
          >
            园区耗能分项(KWH)
          </div>
          <!-- <div style="width:50%;text-align:center;line-height:40px">4号</div> -->
        </div>
        <div style="display:flex;">
          <div style="width:100%;height:26rem;">
            <!-- <div
              style="position:relative;left:90%;top:15%;transform:translate(-50%, -50%)"
            >
              <el-image
                :src="require(`@/assets/ai-energy/ammeter.jpg`)"
                style="width:20%"
                fit="fill"
              />
            </div> -->
            <div style="display:flex">
              <div
                style="display:flex;margin: 50px auto;;width:100%;flex-direction:column;"
              >
                <!-- <div style="text-align: center;font-size:18px">AB号楼</div> -->
                <div ref="abechart" style="width:100%;height:350px;background:#221e2b" />
                <!-- <div
                  v-for="(item, index) in tags"
                  :key="index + 'AB号楼'"
                  style="margin-top:5px"
                >
                  <TEXTMSG
                    :msg="item"
                    :all-data="
                      abcdElectrical &&
                        abcdElectrical[0] &&
                        abcdElectrical[0][index]
                    "
                  />
                </div> -->
              </div>
              <!-- <div style="display:flex;margin-top:30px;width:50%;flex-direction:column;">
                <div style="text-align: center;font-size:18px">2号楼</div>
                <div v-for="(item, indey) in tags" :key="indey + '2号楼'" style="margin-top:5px">
                  <TEXTMSG :msg="item" :all-data="abcdElectrical && abcdElectrical[1] &&abcdElectrical[1][indey]" />
                </div>
              </div> -->
            </div>
          </div>
          <div style="width:100%;height:26rem;">
            <!-- <div
              style="position:relative;left:90%;top:15%;transform:translate(-50%, -50%)"
            >
              <el-image
                :src="require(`@/assets/ai-energy/ammeter.jpg`)"
                style="width:20%"
                fit="fill"
              />
            </div> -->
            <div style="display:flex">
              <div
                style="display:flex;margin: 50px auto;width:100%;flex-direction:column;"
              >
                <!-- <div style="text-align: center;font-size:18px">CD号楼</div> -->
                <div ref="cdechart" style="width:100%;height:350px;background:#221e2b" />
                <!-- <div
                  v-for="(item, indez) in tags"
                  :key="indez + 'CD号楼'"
                  style="margin-top:5px"
                >
                  <TEXTMSG
                    :msg="item"
                    :all-data="
                      abcdElectrical &&
                        abcdElectrical[1] &&
                        abcdElectrical[1][indez]
                    "
                  />
                </div> -->
              </div>
              <!-- <div style="display:flex;margin-top:30px;width:50%;flex-direction:column;">
                <div style="text-align: center;font-size:18px">4号楼</div>
                <div v-for="(item, indexyz) in tags" :key="indexyz + '4号楼'" style="margin-top:5px">
                  <TEXTMSG :msg="item" :all-data="abcdElectrical && abcdElectrical[3] &&abcdElectrical[3][indexyz]" />
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div id="consumption" ref="figure2" style="width: 45%;height:30rem;background:#221e2b" />
    </div>
    <!-- <div>
      <el-button
        v-for="(item, index) in deviceItems"
        :key="index"
        class="btn"
        :class="{ active: index === currentIndex }"
        @click="deviceBtn(index)"
      >{{ item }}</el-button>
    </div>
    <ToExcel
      v-loading="loading"
      :table-data="tableData"
      :props-build="propsBuild"
    /> -->
    <hr>
    <div ref="analy" style="width:100%;height:900px" />
  </div>
</template>

<script>
import echarts from 'echarts'
// import TEXTMSG from './TextMsg'
// import ToExcel from './ToExcel'
import { getuserABCD, getdeviceTree, getelectricity } from '@/api/quantity'
import {
  // getSelectElectrical,
  getSelectElectricalHistory,
  getSelectElectricalOptionsByBuild
} from '@/api/data'
function aa() {
  const date = new Date()
  const year = date.getFullYear()
  const mon = date.getMonth() + 1
  const day = date.getDate()
  return `${year}-${mon}-${day}`
}
export default {
  name: 'AIEnergyEfficiency',
  // components: { TEXTMSG },
  data() {
    return {
      abcdElectrical: [],
      data: {
        name: '鲁能',
        children: [
          {
            name: '鲁能AB',
            children: []
          },
          {
            name: '鲁能CD',
            children: []
          }
        ]
      },
      hearders: '',
      hearders1: '',
      arr: {},
      abarr: [],
      cdarr: [],
      absource: [],
      cdsource: []
    }
  },
  computed: {
    tags() {
      return ['空调', '照明', '动力', '特殊']
    }
  },
  watch: {},
  mounted() {
    this._getSelectElectricalOptionsByBuild()
    this.initCharts()
  },
  created() {
    this.getsource()
    const wh = `AB`
    const wh1 = `CD`
    this.getdata(wh, wh1)
  },
  methods: {
    initCharts() {
      this.chart = echarts.init(this.$refs.analy)
      this.chart1 = echarts.init(this.$refs.abechart)
      this.chart2 = echarts.init(this.$refs.cdechart)
      this.chart3 = echarts.init(this.$refs.figure1)
      this.chart4 = echarts.init(this.$refs.figure2)
      this.setOptions()
      // 点击节点显示子节点，隐藏其他节点的子节点
      this.chart.on('mousedown', e => {
        // console.log(e);
        const name = e.data.name
        const curNode = this.chart._chartsViews[0]._data.tree._nodes.find(
          item => {
            return item.name === name
          }
        )
        const depth = curNode.depth
        const curIsExpand = curNode.isExpand
        this.chart._chartsViews[0]._data.tree._nodes.forEach((item, index) => {
          if (item.depth === depth && item.name !== name && !curIsExpand) {
            item.isExpand = false
          }
        })
      })
      // this.resize();
    },
    formatterHover(params) {
      // console.log(params);
      if (params.data.id === undefined) {
        return (
          '<span style="position: relative;top: 0px;padding: 0 5px;">' +
          params.data.name +
          '</span>'
        )
      } else if (params.data.id >= 1720) {
        // this.arr = {};
        const data = {
          day: aa(),
          deviceId: params.data.id,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: 'high',
          month: null,
          typeId: params.data.typeId,
          year: null,
          token: this.hearders.authorization
        }
        getelectricity(data).then(res => {
          // console.log(res.data);
          if (res.code === 200) {
            this.arr.hightotalElectricQuantity = res.data.totalElectricQuantity
            this.arr.highelectricApparentEarly = res.data.electricApparentEarly
            this.arr.highelectricApparentLate = res.data.electricApparentLate
          }
        })
        const data1 = {
          day: aa(),
          deviceId: params.data.id,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: 'low',
          month: null,
          typeId: params.data.typeId,
          year: null,
          token: this.hearders.authorization
        }
        getelectricity(data1).then(res => {
          // console.log(res.data);
          if (res.code === 200) {
            this.arr.lowtotalElectricQuantity = res.data.totalElectricQuantity
            this.arr.lowelectricApparentEarly = res.data.electricApparentEarly
            this.arr.lowelectricApparentLate = res.data.electricApparentLate
          }
        })
        return (
          '<span style="position: relative;top: 0px;padding: 0 5px;">高电压：' +
          '</span>' +
          '<br>' +
          '<span style="position: relative;top: 0px;padding: 0 5px;">总电量：' +
          this.arr.hightotalElectricQuantity +
          'kWh</span>' +
          '<br>' +
          '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">起始电量：' +
          this.arr.highelectricApparentEarly +
          'kWh</span>' +
          '<br>' +
          '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">结束电量：' +
          this.arr.highelectricApparentLate +
          'kWh</span>' +
          '<br>' +
          '<span style="position: relative;top: 0px;padding: 0 5px;">低电压：' +
          '</span>' +
          '<br>' +
          '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">总电量：' +
          this.arr.lowtotalElectricQuantity +
          'kWh</span>' +
          '<br>' +
          '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">起始电量：' +
          this.arr.lowelectricApparentEarly +
          'kWh</span>' +
          '<br>' +
          '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">结束电量：' +
          this.arr.lowelectricApparentLate +
          'kWh</span>'
        )
      } else {
        // this.arr = {};
        const data = {
          day: aa(),
          deviceId: params.data.id,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: 'high',
          month: null,
          typeId: params.data.typeId,
          year: null,
          token: this.hearders1.authorization
        }
        getelectricity(data).then(res => {
          // console.log(res.data);
          if (res.code === 200) {
            this.arr.hightotalElectricQuantity = res.data.totalElectricQuantity
            this.arr.highelectricApparentEarly = res.data.electricApparentEarly
            this.arr.highelectricApparentLate = res.data.electricApparentLate
          }
        })
        const data1 = {
          day: aa(),
          deviceId: params.data.id,
          electricEnum: 'ELECTRIC_QUANTITY',
          highLow: 'low',
          month: null,
          typeId: params.data.typeId,
          year: null,
          token: this.hearders1.authorization
        }
        getelectricity(data1).then(res => {
          // console.log(res.data);
          if (res.code === 200) {
            this.arr.lowtotalElectricQuantity = res.data.totalElectricQuantity
            this.arr.lowelectricApparentEarly = res.data.electricApparentEarly
            this.arr.lowelectricApparentLate = res.data.electricApparentLate
          }
        })
      }
      return (
        '<span style="position: relative;top: 0px;padding: 0 5px;">高电压：' +
        '</span>' +
        '<br>' +
        '<span style="position: relative;top: 0px;padding: 0 5px;">总电量：' +
        this.arr.hightotalElectricQuantity +
        'kWh</span>' +
        '<br>' +
        '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">起始电量：' +
        this.arr.highelectricApparentEarly +
        'kWh</span>' +
        '<br>' +
        '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">结束电量：' +
        this.arr.highelectricApparentLate +
        'kWh</span>' +
        '<br>' +
        '<span style="position: relative;top: 0px;padding: 0 5px;">低电压：' +
        '</span>' +
        '<br>' +
        '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">总电量：' +
        this.arr.lowtotalElectricQuantity +
        'kWh</span>' +
        '<br>' +
        '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">起始电量：' +
        this.arr.lowelectricApparentEarly +
        'kWh</span>' +
        '<br>' +
        '<span style="padding-left:5px;height:30px;line-height:30px;display: inline-block;">结束电量：' +
        this.arr.lowelectricApparentLate +
        'kWh</span>'
      )
    },
    setOptions() {
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          enterable: true, // 鼠标是否可进入提示框浮层中
          formatter: this.formatterHover // 修改鼠标悬停显示的内容
        },
        series: [
          {
            type: 'tree',
            // id: 0,
            name: 'tree1',
            data: [this.data],
            left: '2%',
            right: '2%',
            top: '8%',
            bottom: '20%',
            symbol: 'rect', // 节点类型为四方体
            symbolSize: [160, 30], // 节点大小
            orient: 'vertical',
            edgeShape: 'polyline', // 连线类型
            edgeForkPosition: '50%',
            initialTreeDepth: 2,
            itemStyle: {
              normal: {
                color: '#bfcbd9', // 节点颜色
                borderColor: '#169fe6', // 节点边框颜色
                lineStyle: {
                  color: '#ccc', // 折线颜色
                  width: 2
                }
              }
            },
            label: {
              verticalAlign: 'middle',
              align: 'center'
            },
            animationDuration: 1
          }
        ]
      })
      this.chart1.setOption({
        title: {
          text: 'AB号楼',
          left: 'center',
          textStyle: {
            color: '#1e98d3',
            fontWeight: '400'
            // fontSize:'18px'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          textStyle: {
            color: '#1e98d3'
          },
          // right: 10,
          left: 10,
          top: 10,
          // bottom: 20,
          data: this.tags
        },
        series: [
          {
            name: '电量',
            type: 'pie',
            radius: [50, 90],
            roseType: 'area',
            center: ['50%', '60%'],
            data: this.abarr
          }
        ]
      })
      this.chart2.setOption({
        title: {
          text: 'CD号楼',
          left: 'center',
          textStyle: {
            color: '#1e98d3',
            fontWeight: '400'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          textStyle: {
            color: '#1e98d3'
          },
          right: 10,
          top: 10,
          // bottom: 20,
          data: this.tags
        },
        series: [
          {
            name: '电量',
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            data: this.cdarr
          }
        ]
      })
      this.chart3.setOption({
        title: {
          text: 'AB号楼',
          textStyle: {
            color: '#1e98d3',
            fontWeight: '400'
          }
          // left: "center"
        },
        legend: {
          textStyle: {
            color: '#1e98d3'
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        dataset: {
          dimensions: ['product', '白天', '晚上'],
          source: this.absource
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar', large: true },
          { type: 'bar', large: true }
        ]
      })
      this.chart4.setOption({
        // color: ["#5793f3", "#675bba"],
        title: {
          text: 'CD号楼',
          textStyle: {
            fontWeight: '400',
            color: '#1e98d3'
          }
          // left: "center"
        },
        legend: {
          textStyle: {
            color: '#1e98d3'
          }
        },
        toolbox: {
          feature: {
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        dataset: {
          dimensions: ['product', '白天', '晚上'],
          source: this.cdsource
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#1e98d3'
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          { type: 'bar', large: true },
          { type: 'bar', large: true }
        ]
      })
    },
    async getdata(le, le1) {
      await getuserABCD(le).then(res => {
        // console.log(res);
        this.hearders = res
        // console.log(this.hearders);
      })
      await getuserABCD(le1).then(res => {
        // console.log(res);
        this.hearders1 = res
      })
      this.gettree()
    },
    async gettree() {
      // console.log(this.hearder);
      const data = {
        id: this.hearders.column01,
        token: this.hearders.authorization
      }
      const data1 = {
        id: this.hearders1.column01,
        token: this.hearders1.authorization
      }
      await getdeviceTree(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.diguis(res.data)
          this.initCharts()
        }
      })
      await getdeviceTree(data1).then(res => {
        // console.log(res);
        if (res.code === 200) {
          this.digui(res.data)
          this.initCharts()
        }
      })
    },
    diguis(item) {
      const arr = item
      arr.forEach(ele => {
        // console.log(ele);
        ele.name = ele.label
        if (ele.children.length > 0) {
          return this.diguis(ele.children)
        }
      })
      this.data.children[0].children = arr
      // console.log(this.data.children[0].children);
      this.initCharts()
    },
    digui(item) {
      const arr = item
      arr.forEach(ele => {
        ele.name = ele.label
        if (ele.children.length > 0) {
          return this.digui(ele.children)
        }
      })
      this.data.children[1].children = arr
      // console.log(this.data.children[1].children);
      this.initCharts()
    },
    async _getSelectElectricalOptionsByBuild() {
      const {
        data: { ab, cd }
      } = await getSelectElectricalOptionsByBuild()
      // console.log(ab, cd);
      // this.abarr = ab
      // this.cdarr = cd
      const arr = []
      const arr1 = []
      const arrKey = [ab, cd]
      arr.push(
        { value: arrKey[0].air.toFixed(0), name: '空调' },
        { value: arrKey[0].light.toFixed(0), name: '照明' },
        { value: arrKey[0].power.toFixed(0), name: '动力' },
        { value: arrKey[0].other.toFixed(0), name: '特殊' }
      )
      arr1.push(
        { value: arrKey[1].air.toFixed(0), name: '空调' },
        { value: arrKey[1].light.toFixed(0), name: '照明' },
        { value: arrKey[1].power.toFixed(0), name: '动力' },
        { value: arrKey[1].other.toFixed(0), name: '特殊' }
      )
      // console.log(arr);
      this.abarr = arr
      this.cdarr = arr1
    },
    async getsource() {
      await getSelectElectricalHistory().then(res => {
        console.log(res.data.AB)
        if (res.code === '200') {
          const arr = []
          res.data.AB.mornigData.map((item, i) => {
            arr.push({
              白天: item.value,
              product: item.date,
              晚上: res.data.AB.nightData[i].value
            })
          })
          console.log(arr)
          this.absource = arr
          const arr1 = []
          res.data.CD.mornigData.map((item, i) => {
            arr1.push({
              白天: item.value,
              product: item.date,
              晚上: res.data.CD.nightData[i].value
            })
          })
          console.log(arr1)
          this.cdsource = arr1
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  // background-color: #18111f;
  // min-height: 100vh;
  padding: 25px;
}
.active {
  background: #59ebe8;
  color: aliceblue;
}
.btn {
  position: relative;
  top: 30px;
  left: 1%;
  margin-left: 20px;
  width: 60px;
  text-align: center;
}
</style>
