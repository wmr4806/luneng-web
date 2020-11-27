<template>
  <div class="container">
    <div class="content">
      <div class="childimage">
        <el-image
          :src="require(`@/assets/ai-energy/child.jpg`)"
          style="width:20%;position:relative;right:-10%"
          fit="fill"
        />
        <el-image
          :src="require(`@/assets/ai-energy/child.jpg`)"
          style="width:20%;position:relative;right:-9%"
          fit="fill"
        />
        <el-image
          :src="require(`@/assets/ai-energy/child.jpg`)"
          style="width:20%;position:relative;right:-8%"
          fit="fill"
        />
        <el-image
          :src="require(`@/assets/ai-energy/child.jpg`)"
          style="width:20%;;position:relative;right:-7%"
          fit="fill"
        />
      </div>
      <div class="leftstandline">
        <span style="position:absolute;top:-2%;left:-40px;font-weight:600;font-size:24px">1F</span>
        <span style="position:absolute;top:24%;left:-40px;font-weight:600;font-size:24px">B1</span>
        <span style="position:absolute;top:49%;left:-40px;font-weight:600;font-size:24px">B2</span>
        <span style="position:absolute;top:74%;left:-40px;font-weight:600;font-size:24px">B3</span>
        <span style="position:absolute;top:98%;left:-40px;font-weight:600;font-size:24px">B4</span>
        <div style="position:absolute;left:130%;top:30%;width:400%;height:10%;text-align:center">
          <div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['SY-B2/2-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['SY-B2/2-1'] && pfData['SY-B2/2-1'][2] && pfData['SY-B2/2-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:50%;"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div style="position:relative;top:140%;left:0%">
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['SYF-B3/2-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['SYF-B3/2-1'] && pfData['SYF-B3/2-1'][2] && pfData['SYF-B3/2-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:50%;"
                fit="fill"
              />
            </el-tooltip>
          </div>
        </div>
      </div>
      <div class="midstandline">
        <div class="midstandtriangle1" />
        <div class="midstandtriangle2" />
        <div class="midstandtriangle3" />
        <div class="midstandtriangle4" />
        <div class="midstandtriangle5" />
        <div class="midstandtriangle6" />
        <div class="midstandtriangle7" />
        <div class="midstandtriangle8" />
        <div class="midstandtriangle9" />
        <div class="midstandtriangle10" />
        <div class="midstandtriangle11" />
        <div class="midstandtriangle12" />
      </div>
      <div class="rightstandline">
        <div class="rightstand" />
        <div style="position:absolute;left:-450%;top:30%;width:250%;height:10%;text-align:center">
          <div style="position:relative;top:-45%;left:20%">
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['PYF-B2/2-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['PYF-B2/2-1'] && pfData['PYF-B2/2-1'][3] && pfData['PYF-B2/2-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:50%;"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div style="position:relative;top:-30%;left:20%">
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['PYF-B2/2-2']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['PYF-B2/2-2'] && pfData['PYF-B2/2-2'][3] && pfData['PYF-B2/2-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:50%;"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <!-- <div style="position:relative;top:100%;left:20%">
            <el-image
              :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
              style="width:50%;"
              fit="fill"
            />
          </div>
          <div style="position:relative;top:120%;left:20%">
            <el-image
              :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
              style="width:50%;"
              fit="fill"
            />
          </div> -->
        </div>
        <div class="righttopfanline1">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%"
            fit="fill"
          />
          <!-- <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:2%"
            fit="fill"
          /> -->
          <!-- <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:12%"
            fit="fill"
          /> -->
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:14%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:24%"
            fit="fill"
          />
          <!-- <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:26%"
            fit="fill"
          /> -->
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:35%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:50%"
            fit="fill"
          />
        </div>
        <div class="righttopfanline2">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:14%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:34%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:55%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:70%"
            fit="fill"
          />
        </div>
        <div class="rightmidfanline1">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:14%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:24%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:35%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:50%"
            fit="fill"
          />
        </div>
        <div class="rightmidfanline2">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:30%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:65%"
            fit="fill"
          />
        </div>
        <div class="rightmidfanline3">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:5%;left:5%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:5%;left:25%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:5%;left:45%"
            fit="fill"
          />
        </div>
        <div style="position:relative;top:45%;left:-340%">
          <el-tooltip placement="right-start">
            <div slot="content"><LightToolTip :msg="pfData['PYF-B3/2-1']" /></div>
            <el-image
              :src="require(`@/assets/ai-energy/${pfData['PYF-B3/2-1'] && pfData['PYF-B3/2-1'][3] && pfData['PYF-B3/2-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
              style="width:140%;"
              fit="fill"
            />
          </el-tooltip>
        </div>
        <div style="position:relative;top:48%;left:-340%">
          <el-tooltip placement="right-start">
            <div slot="content"><LightToolTip :msg="pfData['PY-B3/2-1']" /></div>
            <el-image
              :src="require(`@/assets/ai-energy/${pfData['PY-B3/2-1'] && pfData['PY-B3/2-1'][2] && pfData['PY-B3/2-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
              style="width:140%;"
              fit="fill"
            />
          </el-tooltip>
        </div>
        <div style="position:relative;top:53%;left:-340%">
          <el-tooltip placement="right-start">
            <div slot="content"><LightToolTip :msg="pfData['PYF-B3/2-2']" /></div>
            <el-image
              :src="require(`@/assets/ai-energy/${pfData['PYF-B3/2-2'] && pfData['PYF-B3/2-2'][3] && pfData['PYF-B3/2-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
              style="width:140%;"
              fit="fill"
            />
          </el-tooltip>
        </div>
        <div class="rightbottomfanline1">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:14%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:24%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:35%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:50%"
            fit="fill"
          />
          <div style="position:relative;margin-top:-10%;left:120%">
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['PYF-B4/2-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['PYF-B4/2-1'] && pfData['PYF-B4/2-1'][3] && pfData['PYF-B4/2-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:12%;"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div style="position:relative;margin-top:3%;left:120%;z-index: 1">
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="pfData['PYF-B4/2-2']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${pfData['PYF-B4/2-2'] && pfData['PYF-B4/2-2'][3] && pfData['PYF-B4/2-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:12%;"
                fit="fill"
              />
            </el-tooltip>
          </div>
        </div>
        <div class="rightbottomfanline2">
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:14%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:34%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:55%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/arrow.png`)"
            style="width:3%;left:70%"
            fit="fill"
          />
        </div>
      </div>
      <div class="transparentline" />
      <div class="levelline1" />
      <div class="levelline2" />
      <div class="levelline3" />
      <div class="levelline4">
        <div style="position:relative;margin-top:-10%;left:8%">
          <el-tooltip placement="right-start">
            <div slot="content"><LightToolTip :msg="pfData['SYF-B4/2-1']" /></div>
            <el-image
              :src="require(`@/assets/ai-energy/${pfData['SYF-B4/2-1'] && pfData['SYF-B4/2-1'][2] && pfData['SYF-B4/2-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
              style="width:6%;"
              fit="fill"
            />
          </el-tooltip>
        </div>
        <div style="position:absolute;top:30px;left:30%;font-weight:600;font-size:24px;text-align:center;">模块二：地下二、三、四层防火分区二</div>
      </div>
    </div>
  </div>
</template>

<script>
import LightToolTip from './LightToolTip'
export default {
  name: 'AiLightChild',
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
    // display: flex;
    // justify-content: center;
    width: 80%;
    height: 90%;
    background: #EFE7CF;
    transform: translatex(-6%);
    .childimage{
      margin-top: 100px;
    }
    .leftstandline{
      width: 3%;
      height: 90%;
      background: #EFE7CF;
      border-top: 2px solid #000000;
      border-right: 2px solid #000000;
      border-left: 2px solid #000000;
      position: relative;
      left: 7%;
      top: -9.2%;
      &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 0%;
        border-top: #33ff33 dotted 8px;
        top: -2%;
        left: 0%;
      }
    }
    .midstandline{
      width: 3%;
      height: 68%;
      background: #EFE7CF;
      border-top: 2px solid #000000;
      border-right: 2px solid #000000;
      border-left: 2px solid #000000;
      position: relative;
      left: 23%;
      top: -77.2%;
      .midstandtriangle1{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 5%;
        }
      .midstandtriangle2{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 8%;
        }
      .midstandtriangle3{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 11%;
        }
      .midstandtriangle4{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 14%;
        }
      .midstandtriangle5{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 42%;
        }
      .midstandtriangle6{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 45%;
        }
      .midstandtriangle7{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 48%;
        }
      .midstandtriangle8{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 51%;
        }
      .midstandtriangle9{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 80%;
        }
      .midstandtriangle10{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 83%;
        }
      .midstandtriangle11{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 86%;
        }
      .midstandtriangle12{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 89%;
        }
    }
    .rightstandline{
      width: 3%;
      height: 90%;
      background: #EFE7CF;
      border-top: 2px solid #000000;
      border-right: 2px solid #000000;
      border-left: 2px solid #000000;
      position: relative;
      left: 88%;
      top: -167.2%;
      &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 0%;
        border-top: #33ff33 dotted 8px;
        top: -2%;
        left: 0%;
      }
      .rightstand{
        width: 3%;
        height: 75.7%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: -570%;
        top: 24.4%;
      }
      .righttopfanline1{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1770%;
        top: 28%;
      }
      .righttopfanline2{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1770%;
        top: 36%;
      }
       .rightmidfanline1{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1770%;
        top: 48%;
      }
      .rightmidfanline2{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1770%;
        top: 58%;
      }
      .rightmidfanline3{
        position: absolute;
        width: 800%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1370%;
        top: 71%;
      }
       .rightbottomfanline1{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1770%;
        top: 83%;
      }
      .rightbottomfanline2{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1770%;
        top: 93%;
      }
    }
    .transparentline{
      width: 88%;
      height: 3%;
      background: #EFE7CF;
      border: 1px solid #EFE7CF;
      position: relative;
      left: 6%;
      top: -246%;
    }
    .levelline1{
        width: 78%;
        border-top: solid #000000 2px;
        position: relative;
        left: 10%;
        top: -238.2%;
      }
      .levelline2{
        width: 78%;
        border-top: solid #000000 2px;
        position: relative;
        left: 10%;
        top: -221.6%;
      }
      .levelline3{
        width: 78%;
        border-top: solid #000000 2px;
        position: relative;
        left: 10%;
        top: -189.6%;
      }
      .levelline4{
        width: 84%;
        border-top: solid #000000 3px;
        position: relative;
        left: 7%;
        top: -171.3%;
      }
  }
}
</style>
