<template>
  <div class="container">
    <div class="content">
      <div class="topsquire">
        <div style="display:flex;position:absolute;top:30%;left:15%;width:90%;">
          <div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip /></div>
              <el-image
                :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                style="width:180%;left:180%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div style="margin-top:6%">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:10%;left:60%;transform:rotate(90deg);"
              fit="fill"
            />
          </div>
        </div>
      </div>
      <div class="leftstandline">
        <div class="transparentline" />
        <span style="position:absolute;top:20%;left:-100px;font-weight:600;font-size:24px">11F</span>
        <span style="position:absolute;top:45%;left:-80px;font-weight:600;font-size:24px">1F</span>
        <span style="position:absolute;top:72%;left:-80px;font-weight:600;font-size:24px">B1</span>
        <span style="position:absolute;top:96%;left:-80px;font-weight:600;font-size:24px">B2</span>
      </div>
      <div class="lefttopbigsquire">
        <div class="lefttopstandline1" />
        <div class="lefttopstandline2" />
        <div class="lefttopstandline3" />
        <div class="lefttopstandline4" />
        <div class="lefttopstandline5" />
      </div>
      <div class="lefttopsmallsquire" />
      <div class="righttopbigsquire">
        <div style="position:absolute;top:20%;left:20%;width:200%">
          <el-tooltip placement="right-start">
            <div slot="content"><LightToolTip /></div>
            <el-image
              :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
              style="width:10%;left:10%"
              fit="fill"
            />
          </el-tooltip>
        </div>
        <span style="position:absolute;top:0%;left:-40px;font-weight:600;font-size:24px">1F</span>
        <span style="position:absolute;top:78%;left:-40px;font-weight:600;font-size:24px">B1</span>
        <div class="buttomsquireinner" />
        <div style="position:absolute;top:-60%;left:0%;width:200%">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:2%"
            fit="fill"
          />
        </div>
      </div>
      <div class="buttomsquire">
        <div style="display:flex;position:absolute;top:30%;left:15%;width:90%;">
          <div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip /></div>
              <el-image
                :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                style="width:180%;left:180%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div style="margin-top:6%">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:10%;left:60%;transform:rotate(90deg);"
              fit="fill"
            />
          </div>
        </div>
      </div>
      <div class="bottomstandline">
        <div class="bottomtransparentline" />
        <span style="position:absolute;top:35%;left:-100px;font-weight:600;font-size:24px">11F</span>
        <span style="position:absolute;top:55%;left:-60px;font-weight:600;font-size:24px">1F</span>
        <span style="position:absolute;top:92%;left:-60px;font-weight:600;font-size:24px">B1</span>
      </div>
      <div class="leftbottombigsquire">
        <div class="leftbottomstandline1" />
        <div class="leftbottomstandline2" />
        <div class="leftbottomstandline3" />
        <div class="leftbottomstandline4" />
        <div class="leftbottomstandline5" />
      </div>
      <div class="rightbottomsmallsquire">
        <div style="display:flex;position:absolute;top:30%;left:15%;width:90%;">
          <div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['PY-4-9-2']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['PY-4-9-2'] && pfData['PY-4-9-2'][3] && pfData['PY-4-9-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:180%;left:180%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div style="margin-top:6%">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:10%;left:60%;transform:rotate(90deg);"
              fit="fill"
            />
          </div>
        </div>
      </div>
      <div class="rightbottombigsquire">
        <div class="rightbottombigsquirestandline" />
        <span style="position:absolute;top:0%;left:-40px;font-weight:600;font-size:24px">1F</span>
        <span style="position:absolute;top:78%;left:-40px;font-weight:600;font-size:24px">B1</span>
      </div>
      <div style="position:absolute;top:105%;left:40%;font-weight:600;font-size:24px;text-align:center;">模块三：地下一层防火分区</div>
    </div>
  </div>
</template>

<script>
import LightToolTip from './LightToolTip'
export default {
  name: 'AiLightChildOne',
  components: { LightToolTip },
  props: {
    pfData: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped lang="less">
.container{
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 1000px;
  .content{
    width: 80%;
    height: 90%;
    background: #EFE7CF;
    transform: translatex(-6%);
    .topsquire{
      width: 20%;
      height: 20%;
      border: #000000 dashed 2px;
      position: relative;
      left: 2%;
      top: 0%;
      // background: red;
    }
    .leftstandline{
      width: 2%;
      height: 50%;
      background: #EFE7CF;
      border: 2px solid #000000;
      position: relative;
      left: 4%;
      top: -13.2%;
      z-index: 1;
      .transparentline{
      width: 150%;
      height: 3%;
      background: #EFE7CF;
      border: 1px solid #EFE7CF;
      position: relative;
      left: -21%;
      top: 30%;
    }
    }
    .lefttopbigsquire{
      width: 60%;
      height: 13%;
      // background-color: red;
      border-top: #000000 solid 2px;
      border-right: #000000 solid 2px;
      border-bottom: #000000 solid 2px;
      position: relative;
      top: -39%;
      left: 3%;
      .lefttopstandline1{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 10%;
        top: -0.6%;
      }
      .lefttopstandline2{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 23.1%;
        top: -0.6%;
      }
      .lefttopstandline3{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 40.2%;
        top: -0.6%;
      }
      .lefttopstandline4{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 59.2%;
        top: -0.6%;
      }
      .lefttopstandline5{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 79.2%;
        top: -0.6%;
      }
    }
    .lefttopsmallsquire{
      width: 14%;
      height: 13%;
      // background-color: red;
      border-right: #000000 solid 2px;
      border-bottom: #000000 solid 2px;
      position: relative;
      top: -39.2%;
      left: 3%;
    }
    .righttopbigsquire{
      width: 20%;
      height: 13%;
      border: #000000 solid 2px;
      position: relative;
      top: -65%;
      left: 72%;
      .buttomsquireinner{
        width: 15%;
        height: 100%;
        border-right: #000000 solid 2px;
        &::before{
        content: "";
        position: absolute;
        width: 13%;
        height: 0%;
        border-top: #33ff33 dotted 8px;
        top: -15%;
        left: 0%;
      }
      }
    }
    .buttomsquire{
      width: 20%;
      height: 20%;
      border: #000000 dashed 2px;
      position: relative;
      left: 1%;
      top: -44%;
      // background: red;
    }
    .bottomstandline{
      width: 2%;
      height: 32%;
      background: #EFE7CF;
      border: 2px solid #000000;
      position: relative;
      left: 4%;
      top: -58%;
      z-index: 1;
      .bottomtransparentline{
      width: 150%;
      height: 6%;
      background: #EFE7CF;
      border: 1px solid #EFE7CF;
      position: relative;
      left: -21%;
      top: 49%;
    }
    }
    .leftbottombigsquire{
      width: 60%;
      height: 13%;
      // background-color: red;
      border-top: #000000 solid 2px;
      border-right: #000000 solid 2px;
      border-bottom: #000000 solid 2px;
      position: relative;
      top: -71%;
      left: 3%;
      .leftbottomstandline1{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid transparent;
        position: absolute;
        left: 10%;
        top: -0.6%;
      }
      .leftbottomstandline2{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 23.1%;
        top: -0.6%;
      }
      .leftbottomstandline3{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 36.2%;
        top: -0.6%;
      }
      .leftbottomstandline4{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 50.2%;
        top: -0.6%;
      }
      .leftbottomstandline5{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 84.2%;
        top: -0.6%;
      }
    }
    .rightbottomsmallsquire{
      width: 15%;
      height: 13%;
      // background-color: red;
      border-top: #000000 dashed 2px;
      border-right: #000000 solid 2px;
      border-bottom: #000000 dashed 2px;
      border-left: #000000 solid 2px;
      position: relative;
      top: -105%;
      left: 78%;
    }
    .rightbottombigsquire{
      width: 20%;
      height: 13%;
      // background-color: red;
      border-top: #000000 solid 2px;
      border-right: #000000 solid 2px;
      border-bottom: #000000 solid 2px;
      position: relative;
      top: -97%;
      left: 70%;
    }
    .rightbottombigsquirestandline{
        width: 0%;
        height: 100.9%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 46.2%;
        top: -0.6%;
    }
  }
}
</style>
