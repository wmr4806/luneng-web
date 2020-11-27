
<template>
  <div>
    <div style="position:relative; ">
      <el-image
        :src="require('@/assets/build/build2f.jpg')"
        style="width: 80%; height: 35.5rem;margin-left:10%;"
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
  </div>
</template>

<script>
export default {
  name: 'VAVF2',
  filters: {
    toFixedNum(val) {
      return Number(val).toFixed(1)
    }
  },
  props: {
    vavlist: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loaded: false,
      floor: 2,
      vavData: {}
    }
  },
  computed: {
    temp() {
      return [
        {
          value: {},
          id: `VAV4L${this.floor}F4-T_CV`,
          style: {
            right: '14%', top: '50%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F5-T_CV`,
          style: {
            right: '34%', top: '17.3%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F6-T_CV`,
          style: {
            right: '42.5%', top: '16.1%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F7-T_CV`,
          style: {
            right: '51%', top: '15%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F8-T_CV`,
          style: {
            right: '62.5%', top: '12%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F9-T_CV`,
          style: {
            right: '72.5%', top: '9%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F10-T_CV`,
          style: {
            left: '20.6%', top: '25%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F11-T_CV`,
          style: {
            left: '20.5%', top: '40%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F12-T_CV`,
          style: {
            left: '18.5%', top: '71%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F13-T_CV`,
          style: {
            left: '18.5%', top: '84%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F14-T_CV`,
          style: {
            left: '24.5%', top: '81%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F15-T_CV`,
          style: {
            left: '30.5%', top: '81%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F16-T_CV`,
          style: {
            left: '77.5%', top: '41%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F17-T_CV`,
          style: {
            left: '71.2%', top: '35.2%' // 17
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F18-T_CV`,
          style: {
            left: '67.6%', top: '40.9%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F19-T_CV`,
          style: {
            left: '63.4%', top: '35.8%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F20-T_CV`,
          style: {
            left: '57.8%', top: '34.6%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F21-T_CV`,
          style: {
            right: '38.1%', top: '49.7%' // 21
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F22-T_CV`,
          style: {
            right: '43.3%', top: '26.8%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F23-T_CV`,
          style: {
            right: '47.8%', top: '36.2%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F24-T_CV`,
          style: {
            right: '50.8%', top: '30.3%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F25-T_CV`,
          style: {
            right: '53.2%', top: '24.6%' // 25
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F26-T_CV`,
          style: {
            right: '62.7%', top: '20.4%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F27-T_CV`,
          style: {
            left: '22.9%', top: '19.3%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F28-T_CV`,
          style: {
            left: '22.8%', top: '33.9%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F29-T_CV`,
          style: {
            left: '26.8%', top: '39.6%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F30-T_CV`,
          style: {
            left: '24.3%', top: '47.6%' // 30
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F31-T_CV`,
          style: {
            left: '30.7%', top: '47.6%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F32-T_CV`,
          style: {
            left: '41.1%', top: '47.6%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F33-T_CV`,
          style: {
            left: '24.3%', top: '55%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F34-T_CV`,
          style: {
            left: '30.7%', top: '55%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F35-T_CV`,
          style: {
            left: '24.3%', top: '64.9%' // 35
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F36-T_CV`,
          style: {
            left: '30.7%', top: '64.5%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F37-T_CV`,
          style: {
            left: '24.3%', top: '72.8%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F38-T_CV`,
          style: {
            left: '30.7%', top: '72%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F39-T_CV`,
          style: {
            left: '43.1%', top: '56%'
          }
        },
        // {
        //   value: {},
        //   id: `VAV4L${this.floor}F40-T_CV`,
        //   style: {
        //     left: '53.8%', top: '36%' // 40
        //   }
        // }, {
        //   value: {},
        //   id: `VAV4L${this.floor}F41-T_CV`,
        //   style: {
        //     left: '56.7%', top: '44.5%'
        //   }
        // },
        // {
        //   value: '20.128',
        //   id: `VAV4L${this.floor}F42-T_CV`,
        //   style: {
        //     left: '57.2%', top: '52.4%'
        //   }
        // }, {
        //   value: '20.129',
        //   id: `VAV4L${this.floor}F43-T_CV`,
        //   style: {
        //     left: '57.2%', top: '60.5%'
        //   }
        // },
        {
          value: {},
          id: `VAV4L${this.floor}F51-T_CV`,
          style: {
            right: '30.7%', top: '22.3%'
          }
        },
        {
          value: {},
          id: `VAV4L${this.floor}F52-T_CV`,
          style: {
            right: '27.3%', top: '29%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F53-T_CV`,
          style: {
            right: '19%', top: '24%'
          }
        }, {
          value: {},
          id: `VAV4L${this.floor}F54-T_CV`,
          style: {
            left: '19%', top: '60%'
          }
        }
      ]
    }
  },
  watch: {
    vavlist: {
      handler(newval, oldval) {
        console.log('newval', newval)
        this.temp.forEach(item => {
          item.value = { ...newval[item.id] }
        })
        this.vavData = this.temp
      },
      deep: true
    }
  },
  methods: {
    imgLoaded() {
      this.loaded = true
    }
  }
}
</script>

<style lang="less" scoped>
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
        border: .0625rem solid #000000;
        border-radius: 50%;
        transform: translate(-210%, -40%);
        color: #000000;
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
