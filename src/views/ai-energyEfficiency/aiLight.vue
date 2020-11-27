<template>
  <div style="background:#EFE7CF">
    <div class="container">
      <div class="content">
        <div class="topimage">
          <el-image
            :src="require(`@/assets/ai-energy/top.jpg`)"
            style="width:20%;position:relative;right:-10%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/top.jpg`)"
            style="width:20%;position:relative;right:-11%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/top.jpg`)"
            style="width:20%;position:relative;right:-10%"
            fit="fill"
          />
          <el-image
            :src="require(`@/assets/ai-energy/top.jpg`)"
            style="width:20%;;position:relative;right:-9%"
            fit="fill"
          />
        </div>
        <div class="leftstandline">
          <div class="standline" />
          <div class="lefttopfan">
            <div>
              <el-tooltip placement="left-start">
                <div slot="content"><LightToolTip :msg="PFData['PY-B2/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PY-B2/1-1'] && PFData['PY-B2/1-1'][2] && PFData['PY-B2/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:40%"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <el-tooltip placement="left-start">
              <div slot="content"><LightToolTip :msg="PFData['SY-B2/1-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${PFData['PY-B2/1-1'] && PFData['SY-B2/1-1'][3] && PFData['SY-B2/1-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:40%;margin-top:20px"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div class="leftmidpfan">
            <el-tooltip placement="left-start">
              <div slot="content"><LightToolTip :msg="PFData['SY-B3/1-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${PFData['SY-B3/1-1'] && PFData['SY-B3/1-1'][2] && PFData['SY-B3/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:50%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div class="leftbottompfan">
            <el-tooltip placement="left-start">
              <div slot="content"><LightToolTip :msg="PFData['SY-B4/1-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${PFData['SY-B4/1-1'] && PFData['SY-B4/1-1'][2] && PFData['SY-B4/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:50%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <span style="position:absolute;top:-2%;left:-40px;font-weight:600;font-size:24px">1F</span>
          <span style="position:absolute;top:24%;left:-40px;font-weight:600;font-size:24px">B1</span>
          <span style="position:absolute;top:49%;left:-40px;font-weight:600;font-size:24px">B2</span>
          <span style="position:absolute;top:74%;left:-40px;font-weight:600;font-size:24px">B3</span>
          <span style="position:absolute;top:98%;left:-40px;font-weight:600;font-size:24px">B4</span>
        </div>
        <div class="midstandline">
          <div class="topsquire">
            <div class="topsquiretriangle1" />
            <div class="topsquiretriangle2" />
            <div class="topsquiretriangle3" />
            <div class="topsquiretriangle4" />
            <div>
              <el-tooltip placement="left-start">
                <div slot="content"><LightToolTip :msg="PFData['SYF-B2/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['SYF-B2/1-1'] && PFData['SYF-B2/1-1'][2] && PFData['SYF-B2/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:30%;left:30%;margin-top:15px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
          </div>
          <div class="midsquire">
            <div class="midsquiretriangle1" />
            <div class="midsquiretriangle2" />
            <div class="midsquiretriangle3" />
            <div class="midsquiretriangle4" />
            <div>
              <el-tooltip placement="left-start">
                <div slot="content"><LightToolTip :msg="PFData['SYF-B3/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['SYF-B3/1-1'] && PFData['SYF-B3/1-1'][2] && PFData['SYF-B3/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:30%;left:30%;margin-top:15px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
          </div>
          <div class="bottomsquire">
            <div class="bottomsquiretriangle1" />
            <div class="bottomsquiretriangle2" />
            <div class="bottomsquiretriangle3" />
            <div class="bottomsquiretriangle4" />
            <div>
              <el-tooltip placement="left-start">
                <div slot="content"><LightToolTip :msg="PFData['SYF-B4/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['SYF-B4/1-1'] && PFData['SYF-B4/1-1'][2] && PFData['SYF-B4/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:30%;left:30%;margin-top:15px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="rightstandline">
          <div class="rightstand" />
          <div class="righttopfan">
            <div>
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip :msg="PFData['PYF-B2/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PYF-B2/1-1'] && PFData['PYF-B2/1-1'][3] && PFData['PYF-B2/1-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:20%;margin-bottom:10px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <div>
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip :msg="PFData['PYF-B2/1-2']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PYF-B2/1-2'] && PFData['PYF-B2/1-2'][3] && PFData['PYF-B2/1-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:20%;margin-bottom:10px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="PFData['PY-B2/1-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${PFData['PY-B2/1-1'] && PFData['PY-B2/1-1'][2] && PFData['PY-B2/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:20%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div class="rightmidfan">
            <div>
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip :msg="PFData['PYF-B3/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PYF-B3/1-1'] && PFData['PYF-B3/1-1'][3] && PFData['PYF-B3/1-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:20%;margin-bottom:10px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <div>
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip :msg="PFData['PYF-B3/1-2']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PYF-B3/1-2'] && PFData['PYF-B3/1-2'][3] && PFData['PYF-B3/1-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:20%;margin-bottom:10px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="PFData['PY-B3/1-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${PFData['PY-B3/1-1'] && PFData['PY-B3/1-1'][2] && PFData['PY-B3/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:20%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div class="rightbottompfan">
            <div>
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip :msg="PFData['PYF-B4/1-1']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PYF-B4/1-1'] && PFData['PYF-B4/1-1'][3] && PFData['PYF-B4/1-1'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:20%;margin-bottom:10px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <div>
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip :msg="PFData['PYF-B4/1-2']" /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/${PFData['PYF-B4/1-2'] && PFData['PYF-B4/1-2'][3] && PFData['PYF-B4/1-2'][3].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                  style="width:20%;margin-bottom:10px"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <el-tooltip placement="right-start">
              <div slot="content"><LightToolTip :msg="PFData['PY-B4/1-1']" /></div>
              <el-image
                :src="require(`@/assets/ai-energy/${PFData['PY-B4/1-1'] && PFData['PY-B4/1-1'][2] && PFData['PY-B4/1-1'][2].value === 'false' ? 'icon_fan.png' : 'gif_fan_1.1.gif'}`)"
                style="width:20%"
                fit="fill"
              />
            </el-tooltip>
          </div>
          <div class="righttopfanline1">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%;left:2%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%;left:12%"
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
              style="width:3%;left:26%"
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
          <div class="righttopfanline2">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:4%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:30%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:35%"
              fit="fill"
            />
          </div>
          <div class="righttopfanline3">
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
          <div class="rightmidfanline1">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%;left:2%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%;left:12%"
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
              style="width:3%;left:26%"
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
              style="width:5%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:4%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:30%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:35%"
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
          <div class="rightbottomfanline1">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%;left:2%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:3%;left:12%"
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
              style="width:3%;left:26%"
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
          <div class="rightbottomfanline2">
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:4%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:30%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ai-energy/arrow.png`)"
              style="width:5%;left:35%"
              fit="fill"
            />
          </div>
          <div class="rightbottomfanline3">
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
        </div>
        <div class="transparentline" />
        <div class="levelline1" />
        <div class="levelline2" />
        <div class="levelline3" />
        <div class="levelline4">
          <div style="position:absolute;top:30px;left:30%;font-weight:600;font-size:24px;text-align:center;">模块一：地下二、三、四层防火分区一</div>
        </div>
      </div>
    </div>
    <LightChild :pf-data="PFData" />
    <LightChildOne :pf-data="PFData" />
    <LightChildTwo />
  </div>
</template>

<script>
import LightChild from './AIlightChild'
import LightChildOne from './AIlightChildOne'
import LightChildTwo from './AIlightChildTwo'
import LightToolTip from './LightToolTip'
import { getPFMap } from '@/api/data'
import arrId from './AiLightArr'

export default {
  name: 'AiLight',
  components: { LightChild, LightChildOne, LightChildTwo, LightToolTip },
  data() {
    return {
      PFData: {}
    }
  },
  mounted() {
    getPFMap(arrId).then(res => {
      this.PFData = res.data
      console.log('pf', res)
    })
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
    .topimage{
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
      top: -11.2%;
      &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 0%;
        border-top: #33ff33 dotted 8px;
        top: -2%;
        left: 0%;
      }
      .standline{
        width: 3%;
        height: 74%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: 600%;
        top: 26%;
      }
      .lefttopfan{
        position: absolute;
        width: 400%;
        // height: 12%;
        // background-color: red;
        text-align: center;
        left: 150%;
        top: 28%;
        // filter: hue-rotate(74deg);
        // -webkit-filter: hue-rotate(74deg);
      }
      .leftmidpfan{
        position: absolute;
        width: 400%;
        // background-color: #EFE7CF;
        text-align: center;
        left: 150%;
        top: 60%;
      }
      .leftbottompfan{
        position: absolute;
        width: 400%;
        // background-color: #EFE7CF;
        text-align: center;
        left: 150%;
        top: 85%;
      }
    }
    .midstandline{
      width: 3%;
      height: 90%;
      background: #EFE7CF;
      border-top: 2px solid #000000;
      border-right: 2px solid #000000;
      border-left: 2px solid #000000;
      position: relative;
      left: 30%;
      top: -101.2%;
      &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 0%;
        border-top: #33ff33 dotted 8px;
        top: -2%;
        left: 0%;
      }
      .topsquire{
        position: absolute;
        width: 600%;
        height: 14%;
        border-top: 2px solid #000000;
        border-right: 2px solid #000000;
        // background-color: red;
        // text-align: center;
        left: 105%;
        top: 37%;
        &:before {
        content: "";
        width: 2px;
        height:100%;
        position: absolute;
        top: 0;
        left: 85%;
        background: #000000;
        }
        .topsquiretriangle1{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 20%;
        }
        .topsquiretriangle2{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 35%;
        }
        .topsquiretriangle3{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 50%;
        }
        .topsquiretriangle4{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 65%;
        }
        // &::after{
        //   content: "";
        //   width: 0;
        //   height: 0;
        //   border-top: 10px solid transparent;
        //   border-left: 10px solid #33ff33;
        //   border-right: 10px solid transparent;
        //   border-bottom: 10px solid transparent;
        //   position: absolute;
        //   left: 100%;
        //   top: 2%;
        // }
      }
      .midsquire{
        position: absolute;
        width: 600%;
        height: 14%;
        border-top: 2px solid #000000;
        border-right: 2px solid #000000;
        left: 105%;
        top: 62%;
        &:before {
        content: "";
        width: 2px;
        height:100%;
        position: absolute;
        top: 0;
        left: 85%;
        background: #000000;
        }
        .midsquiretriangle1{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 20%;
        }
        .midsquiretriangle2{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 35%;
        }
        .midsquiretriangle3{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 50%;
        }
        .midsquiretriangle4{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 65%;
        }
      }
      .bottomsquire{
        position: absolute;
        width: 600%;
        height: 14%;
        border-top: 2px solid #000000;
        border-right: 2px solid #000000;
        left: 105%;
        top: 86%;
        &:before {
        content: "";
        width: 2px;
        height:100%;
        position: absolute;
        top: 0;
        left: 85%;
        background: #000000;
        }
        .bottomsquiretriangle1{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 20%;
        }
        .bottomsquiretriangle2{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 35%;
        }
        .bottomsquiretriangle3{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 50%;
        }
        .bottomsquiretriangle4{
          width: 0px;
          height: 0px;
          border-top: 10px solid transparent;
          border-left: 10px solid #33ff33;
          border-right: 10px solid transparent;
          border-bottom: 10px solid transparent;
          position: absolute;
          left: 100%;
          top: 65%;
        }
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
      left: 90%;
      top: -191.2%;
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
        height: 74%;
        background: #EFE7CF;
        border-right: 2px solid #000000;
        position: absolute;
        left: -600%;
        top: 26%;
      }
      .righttopfan{
        position: absolute;
        width: 550%;
        // background-color: #EFE7CF;
        text-align: center;
        left: -550%;
        top: 27%;
      }
      .rightmidfan{
        position: absolute;
        width: 550%;
        // background-color: #EFE7CF;
        text-align: center;
        left: -550%;
        top: 52%;
      }
      .rightbottompfan{
        position: absolute;
        width: 550%;
        // background-color: #EFE7CF;
        text-align: center;
        left: -550%;
        top: 76%;
      }
      .righttopfanline1{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1794%;
        top: 30%;
      }
      .righttopfanline2{
        position: absolute;
        width: 600%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1200%;
        top: 38%;
      }
      .righttopfanline3{
        position: absolute;
        width: 600%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1200%;
        top: 45%;
      }
      .rightmidfanline1{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1794%;
        top: 55%;
      }
      .rightmidfanline2{
        position: absolute;
        width: 600%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1200%;
        top: 63%;
      }
      .rightmidfanline3{
        position: absolute;
        width: 600%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1200%;
        top: 71%;
      }
      .rightbottomfanline1{
        position: absolute;
        width: 1200%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1794%;
        top: 79%;
      }
      .rightbottomfanline2{
        position: absolute;
        width: 600%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1200%;
        top: 87%;
      }
      .rightbottomfanline3{
        position: absolute;
        width: 600%;
        height: 0;
        background: #000;
        border-top: solid #000000 3px;
        left: -1200%;
        top: 95%;
      }
    }
    .transparentline{
      width: 88%;
      height: 3%;
      background: #EFE7CF;
      border: 1px solid #EFE7CF;
      position: relative;
      left: 6%;
      top: -268%;
    }
    .levelline1{
        width: 80%;
        border-top: solid #000000 2px;
        position: relative;
        left: 10%;
        top: -260.6%;
      }
      .levelline2{
        width: 80%;
        border-top: solid #000000 2px;
        position: relative;
        left: 10%;
        top: -238.6%;
      }
      .levelline3{
        width: 80%;
        border-top: solid #000000 2px;
        position: relative;
        left: 10%;
        top: -216.6%;
      }
      .levelline4{
        width: 86%;
        border-top: solid #000000 3px;
        position: relative;
        left: 7%;
        top: -195.2%;
      }
    }
  }
  .vline{
    width: 20px;
    height: 50%;
    border-top: solid red 10px;
  }
  .aline{
    width: 50px;
    height: 50px;
    border-right: solid #096 4px;
  }
</style>
