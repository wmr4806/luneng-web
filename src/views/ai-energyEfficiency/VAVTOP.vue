<template>
  <div>
    <el-card style="background-color:#18111f;border:none;border-bottom:1px solid #fff">
      <div class="optimize">
        <el-tooltip class="item" style="font-size:20px" effect="dark" content="详细数据请点击红色温度" placement="top">
          <!-- <div style="font-weight:800;margin-bottom:30px;width:60px;color:#b5b5b6">请点我</div> -->
        </el-tooltip>
        <!-- <div style="margin:10px">
          内区温度优化设定
          <span class="inarea">{{ stopOptimizeNum }}</span>
          <el-button type="primary" size="small" style="margin-left:20px" @click="stopOptimize">停止优化</el-button>
        </div>
        <div style="margin:10px">
          外区温度优化设定
          <span class="inarea">{{ startOptimizeNum }}</span>
          <el-button type="success" size="small" style="margin-left:20px" @click="startOptimize">开始优化</el-button>
        </div> -->
      </div>
      <VAVF2 v-if="floor === 2 && building === 4" :vavlist="vavlist" />
      <div v-else style="position:relative; ">
        <el-image
          :src="require('@/assets/build/build.png')"
          style="width: 80%; height: 37.5rem;margin-left:10%;"
          fit="fill"
          lazy
          @load="imgLoaded"
        />
        <div v-if="loaded">
          <div v-for="( item, index ) in vavData" :key="index" class="content" :style="item.style">
            <div class="content-item">
              <el-tooltip placement="top">
                <div slot="content" style="font-size:20px">送风风量：{{ item.value && item.value.sa | toFixedNum }}<br>
                  送风压力：{{ item.value && item.value.da | toFixedNum }}<br> 阀门开度：{{ item.value && item.value.dpr | toFixedNum }}</div>
                <div>
                  <div class="circle">{{ item.value && item.value.item }}</div>
                  <div class="square">{{ item.value && item.value.value | toFixedNum }}℃</div>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import VAVF2 from './VAVF2'
export default {
  name: 'AVATOP',
  filters: {
    toFixedNum(val) {
      return Number(val).toFixed(1)
    }
  },
  components: {
    VAVF2
  },
  props: {
    vavlist: {
      type: Object,
      default() {
        return {}
      }
    },
    floor: {
      type: Number,
      default() {
        return ''
      }
    },
    building: {
      type: Number,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      stopOptimizeNum: '25.3',
      startOptimizeNum: '25.0',
      loaded: false,
      vavData: {}
    }
  },
  computed: {
    temp() {
      return [
        {
          value: {},
          id: `VAV${this.building}L${this.floor}F4-T_CV`,
          style: {
            right: '5%', top: '50%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F5-T_CV`,
          style: {
            right: '5%', top: '63.3%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F6-T_CV`,
          style: {
            right: '7.5%', top: '80.1%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F7-T_CV`,
          style: {
            right: '19%', top: '86%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F8-T_CV`,
          style: {
            right: '31%', top: '86%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F9-T_CV`,
          style: {
            right: '41.5%', top: '86%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F10-T_CV`,
          style: {
            left: '40.6%', top: '86%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F11-T_CV`,
          style: {
            left: '30.5%', top: '86%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F12-T_CV`,
          style: {
            left: '19.2%', top: '86%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F13-T_CV`,
          style: {
            left: '6.5%', top: '78%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F14-T_CV`,
          style: {
            left: '6.5%', top: '64%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F15-T_CV`,
          style: {
            left: '6.5%', top: '45.9%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F16-T_CV`,
          style: {
            left: '6.5%', top: '27%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F17-T_CV`,
          style: {
            left: '14.2%', top: '8.2%' // 17
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F18-T_CV`,
          style: {
            left: '25.6%', top: '8.9%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F19-T_CV`,
          style: {
            left: '35.4%', top: '12.8%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F20-T_CV`,
          style: {
            left: '46.8%', top: '16.6%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F21-T_CV`,
          style: {
            right: '37.1%', top: '19.7%' // 21
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F22-T_CV`,
          style: {
            right: '27.3%', top: '40.8%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F23-T_CV`,
          style: {
            right: '24.8%', top: '49.2%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F24-T_CV`,
          style: {
            right: '24.8%', top: '58.3%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F25-T_CV`,
          style: {
            right: '19.2%', top: '68.6%' // 25
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F26-T_CV`,
          style: {
            right: '30.7%', top: '68.4%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F27-T_CV`,
          style: {
            left: '51.9%', top: '68.3%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F28-T_CV`,
          style: {
            left: '41.8%', top: '68.9%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F29-T_CV`,
          style: {
            left: '30.8%', top: '68.6%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F30-T_CV`,
          style: {
            left: '19.5%', top: '68.6%' // 30
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F31-T_CV`,
          style: {
            left: '41.1%', top: '57.8%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F32-T_CV`,
          style: {
            left: '41.1%', top: '47.6%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F33-T_CV`,
          style: {
            left: '25.1%', top: '58.3%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F34-T_CV`,
          style: {
            left: '25.1%', top: '51%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F35-T_CV`,
          style: {
            left: '25.1%', top: '43.9%' // 35
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F36-T_CV`,
          style: {
            left: '23.2%', top: '35.5%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F37-T_CV`,
          style: {
            left: '24.3%', top: '26.8%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F38-T_CV`,
          style: {
            left: '34.7%', top: '29%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F39-T_CV`,
          style: {
            left: '43.1%', top: '32%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F40-T_CV`,
          style: {
            left: '53.8%', top: '36%' // 40
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F41-T_CV`,
          style: {
            left: '56.7%', top: '44.5%'
          }
        },
        // {
        //   value: '20.128',
        //   id: 'VAV${this.building}L3F42-T_CV',
        //   style: {
        //     left: '57.2%', top: '52.4%'
        //   }
        // }, {
        //   value: '20.129',
        //   id: 'VAV${this.building}L3F43-T_CV',
        //   style: {
        //     left: '57.2%', top: '60.5%'
        //   }
        // },
        {
          value: {},
          id: `VAV${this.building}L${this.floor}F51-T_CV`,
          style: {
            right: '25.7%', top: '24.3%'
          }
        },
        {
          value: {},
          id: `VAV${this.building}L${this.floor}F52-T_CV`,
          style: {
            right: '14.3%', top: '28%'
          }
        }, {
          value: {},
          id: `VAV${this.building}L${this.floor}F53-T_CV`,
          style: {
            right: '5%', top: '40%'
          }
        }
      ]
    }
  },
  watch: {
    vavlist: {
      handler(newval, oldval) {
        if (this.building === 4) {
          this.temp.forEach(item => {
            Object.assign(item.value, newval[item.id])
          })
          this.vavData = this.temp
        } else {
          this.temp.splice(35, 3)
          this.temp.forEach(item => {
            Object.assign(item.value, newval[item.id])
          })
          this.vavData = this.temp
        }
      },
      deep: true
    }
  },
  methods: {
    stopOptimize() {
      this.stopOptimizeNum = (Math.random() * 2 + 25.3).toFixed(1)
    },
    startOptimize() {
      this.startOptimizeNum = (Math.random() * 2 + 24.3).toFixed(1)
    },
    imgLoaded() {
      this.loaded = true
    }
  }
}
</script>

<style scoped lang="less">
  .optimize {
    position: relative;
    left: 75%;
    top: 80px;
    width: 23.75rem;
    height: 5.8rem;
    // border: .0825rem solid #000000;
    border-radius: 2%;
    z-index: 1;
    .inarea {
      display: inline-block;
      width: 3.75rem;
      height: 1.25rem;
      text-align: center;
      margin-left: 4px;
      border: .1025rem solid #3333FF;
      border-radius: 10%;
      background-color: #00FFCC;
    }
  }
  .content {
    position: absolute;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    .content-item{
      transform: translate(45%,20%);
          .circle {
        width: 1.45rem;
        height: 1.45rem;
        border: .0625rem solid #1e98d3;
        border-radius: 50%;
        transform: translate(-210%, -40%);
        color: #1e98d3;
      }
      .square {
        width: 3.75rem;
        height: 1.25rem;
        // border: .0825rem solid red;
        border-radius: 10%;
        font-weight: bolder;
        color: #CC0033;
        transform: translate(-30%, -160%);
      }
      .tarea {
        font-size: .75rem;
        color: red;
        transform: translate(-30%, -80%);
      }
    }
  }
</style>
