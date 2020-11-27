
<template>
  <div>
    <div style="position:relative; ">
      <el-image
        :src="require('@/assets/build/b1f2.png')"
        style="width: 45%; height: 20%;left:25%;top:60px;margin-bottom: 50px;transform: rotate(0deg)"
        fit="fill"
        lazy
        @load="imgLoaded"
      />
      <div v-if="loaded">
        <div v-for="( item, index ) in vavData" :key="index" class="content" :style="item.style">
          <div class="content-item">
            <el-tooltip placement="top">
              <div slot="content" style="font-size:20px">
                送风风量：{{ item.value && item.value.sa | toFixedNum }}
                <br>
                送风压力：{{ item.value && item.value.da | toFixedNum }}
                <br>
                阀门开度：{{ item.value && item.value.dpr | toFixedNum }}
              </div>
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
  name: 'VAV1B2F',
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
    },
    floor: {
      type: Number,
      default() {
        return 3
      }
    }
  },
  data() {
    return {
      loaded: false,
      vavData: {}
    }
  },
  computed: {
    whichFloor() {
      if (this.floor === 2) {
        return this.temp
      } else if (this.floor === 9) {
        return this.temp2
      } else {
        return this.temp1
      }
    },
    temp2() {
      return [
        {
          value: {},
          id: `VAV1L${this.floor}F4-T_CV`,
          style: {
            right: '34%',
            top: '60%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F5-T_CV`,
          style: {
            right: '34%',
            top: '74%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F6-T_CV`,
          style: {
            right: '34%',
            top: '84%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F7-T_CV`,
          style: {
            right: '37%',
            top: '90%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F8-T_CV`,
          style: {
            right: '43%',
            top: '87%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F9-T_CV`,
          style: {
            right: '49%',
            top: '90%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F10-T_CV`,
          style: {
            right: '55%',
            top: '87%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F11-T_CV`,
          style: {
            right: '62%',
            top: '90%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F12-T_CV`,
          style: {
            right: '65%',
            top: '85%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F13-T_CV`,
          style: {
            right: '65%',
            top: '75%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F14-T_CV`,
          style: {
            right: '65%',
            top: '63%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F15-T_CV`,
          style: {
            right: '65%',
            top: '48%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F16-T_CV`,
          style: {
            right: '65%',
            top: '35%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F17-T_CV`,
          style: {
            right: '65%',
            top: '20%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F18-T_CV`,
          style: {
            right: '40%',
            top: '35%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F19-T_CV`,
          style: {
            right: '40%',
            top: '45%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F20-T_CV`,
          style: {
            right: '45%',
            top: '53%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F21-T_CV`,
          style: {
            right: '38%',
            top: '57%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F22-T_CV`,
          style: {
            right: '38%',
            top: '69%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F23-T_CV`,
          style: {
            right: '40%',
            top: '79%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F24-T_CV`,
          style: {
            right: '46%',
            top: '67%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F25-T_CV`,
          style: {
            right: '48%',
            top: '80%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F26-T_CV`,
          style: {
            right: '57%',
            top: '80%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F27-T_CV`,
          style: {
            right: '60%',
            top: '70%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F28-T_CV`,
          style: {
            right: '60%',
            top: '60%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F29-T_CV`,
          style: {
            right: '55%',
            top: '50%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F30-T_CV`,
          style: {
            right: '60%',
            top: '45%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F31-T_CV`,
          style: {
            right: '60%',
            top: '30%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F51-T_CV`,
          style: {
            right: '35%',
            top: '20%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F52-T_CV`,
          style: {
            right: '35%',
            top: '31%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F53-T_CV`,
          style: {
            right: '35%',
            top: '49%'
          }
        }
      ]
    },
    temp1() {
      return [
        {
          value: {},
          id: `VAV1L${this.floor}F4-T_CV`,
          style: {
            right: '50%',
            top: '14%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F5-T_CV`,
          style: {
            right: '60%',
            top: '14%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F6-T_CV`,
          style: {
            right: '65%',
            top: '20%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F7-T_CV`,
          style: {
            right: '65%',
            top: '30%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F8-T_CV`,
          style: {
            right: '65%',
            top: '45%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F9-T_CV`,
          style: {
            right: '65%',
            top: '60%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F10-T_CV`,
          style: {
            right: '65%',
            top: '73%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F11-T_CV`,
          style: {
            right: '65%',
            top: '85%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F12-T_CV`,
          style: {
            right: '58%',
            top: '90%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F13-T_CV`,
          style: {
            right: '50%',
            top: '90%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F14-T_CV`,
          style: {
            right: '42%',
            top: '90%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F15-T_CV`,
          style: {
            right: '35%',
            top: '85%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F16-T_CV`,
          style: {
            right: '35%',
            top: '75%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F17-T_CV`,
          style: {
            right: '35%',
            top: '55%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F18-T_CV`,
          style: {
            right: '35%',
            top: '43%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F19-T_CV`,
          style: {
            right: '38%',
            top: '32%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F20-T_CV`,
          style: {
            right: '43%',
            top: '22%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F21-T_CV`,
          style: {
            right: '50%',
            top: '28%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F22-T_CV`,
          style: {
            right: '57%',
            top: '31%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F23-T_CV`,
          style: {
            right: '60%',
            top: '37%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F24-T_CV`,
          style: {
            right: '60%',
            top: '47%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F25-T_CV`,
          style: {
            right: '55%',
            top: '43%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F26-T_CV`,
          style: {
            right: '60%',
            top: '57%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F27-T_CV`,
          style: {
            right: '60%',
            top: '67%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F28-T_CV`,
          style: {
            right: '58%',
            top: '78%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F29-T_CV`,
          style: {
            right: '50%',
            top: '78%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F30-T_CV`,
          style: {
            right: '44%',
            top: '72%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F31-T_CV`,
          style: {
            right: '42%',
            top: '78%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F32-T_CV`,
          style: {
            right: '38%',
            top: '70%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F33-T_CV`,
          style: {
            right: '38%',
            top: '60%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F34-T_CV`,
          style: {
            right: '45%',
            top: '55%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F35-T_CV`,
          style: {
            right: '38%',
            top: '47%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F51-T_CV`,
          style: {
            right: '35%',
            top: '28%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F52-T_CV`,
          style: {
            right: '35%',
            top: '20%'
          }
        }, {
          value: {},
          id: `VAV1L${this.floor}F53-T_CV`,
          style: {
            right: '42%',
            top: '15%'
          }
        }
      ]
    },
    temp() {
      return [
        // {
        //     value: {},
        //     id: `VAV1L2F1-T_CV`,
        //     style: {
        //     right: "34%",
        //     top: "54%"
        //     }
        // }, {
        //     value: {},
        //     id: `VAV1L2F2-T_CV`,
        //     style: {
        //     right: "37%",
        //     top: "43%"
        //     }
        // }, {
        //     value: {},
        //     id: `VAV1L2F3-T_CV`,
        //     style: {
        //     right: "34%",
        //     top: "35%"
        //     }
        // },
        {
          value: {},
          id: `VAV1L2F4-T_CV`,
          style: {
            right: '35%',
            top: '25%'
          }
        }, {
          value: {},
          id: `VAV1L2F5-T_CV`,
          style: {
            right: '45%',
            top: '25%'
          }
        }, {
          value: {},
          id: `VAV1L2F6-T_CV`,
          style: {
            right: '42%',
            top: '15%'
          }
        }, {
          value: {},
          id: `VAV1L2F7-T_CV`,
          style: {
            right: '55%',
            top: '15%'
          }
        }, {
          value: {},
          id: `VAV1L2F8-T_CV`,
          style: {
            right: '55%',
            top: '25%'
          }
        }, {
          value: {},
          id: `VAV1L2F9-T_CV`,
          style: {
            right: '65%',
            top: '25%'
          }
        }, {
          value: {},
          id: `VAV1L2F10-T_CV`,
          style: {
            right: '66%',
            top: '35%'
          }
        }, {
          value: {},
          id: `VAV1L2F11-T_CV`,
          style: {
            right: '60%',
            top: '32%'
          }
        }, {
          value: {},
          id: `VAV1L2F12-T_CV`,
          style: {
            right: '66%',
            top: '48%'
          }
        }, {
          value: {},
          id: `VAV1L2F13-T_CV`,
          style: {
            right: '62%',
            top: '43%'
          }
        }, {
          value: {},
          id: `VAV1L2F15-T_CV`,
          style: {
            right: '66%',
            top: '62%'
          }
        }, {
          value: {},
          id: `VAV1L2F16-T_CV`,
          style: {
            right: '62%',
            top: '58%'
          }
        }, {
          value: {},
          id: `VAV1L2F17-T_CV`,
          style: {
            right: '53%',
            top: '61%'
          }
        }, {
          value: {},
          id: `VAV1L2F18-T_CV`,
          style: {
            right: '48%',
            top: '38%'
          }
        }, {
          value: {},
          id: `VAV1L2F19-T_CV`,
          style: {
            right: '46%',
            top: '43%'
          }
        }

      ]
    }
  },
  watch: {
    vavlist: {
      handler(newval, oldval) {
        console.log('newval', newval)
        this.whichFloor.forEach(item => {
          item.value = { ...newval[item.id] }
        //     Object.keys(newval).forEach(i => {
        //         if(i === item.id) {
        //             item.value = {...newval[item.id]}
        //             console.log(item.value)
        //         }
        //     })
        // console.log(this.vavData)
        // // Object.assign(item.value, newval[item.id]);
        })
        this.vavData = this.whichFloor
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
.content-item {
    transform: translate(45%, 20%);
    .circle {
    width: 1.45rem;
    height: 1.45rem;
    border: 0.0625rem solid #000000;
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
    color: #cc0033;
    transform: translate(-30%, -160%);
    }
    .tarea {
    font-size: 0.75rem;
    color: red;
    transform: translate(-30%, -80%);
    }
}
}
</style>
