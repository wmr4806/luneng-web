<template>
  <div class="container">
    <div class="content">
      <div class="leftcontent">
        <div class="lefttopcontent">
          <div class="topsquire">
            <div style="display:flex;position:absolute;top:10%;left:40%;width:60%;">
              <div style="position:relative;z-index:1">
                <el-tooltip placement="right-start">
                  <div slot="content"><LightToolTip /></div>
                  <el-image
                    :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                    style="width:180%;left:180%"
                    fit="fill"
                  />
                </el-tooltip>
              </div>
              <div style="margin-top:6%;">
                <el-image
                  :src="require(`@/assets/ai-energy/arrow.png`)"
                  style="width:10%;left:50%;transform:rotate(90deg);"
                  fit="fill"
                />
              </div>
            </div>
            <div style="display:flex;position:absolute;top:10%;left:18%;width:60%;">
              <div>
                <el-tooltip placement="left-start">
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
                  style="width:10%;left:-6%;transform:rotate(270deg);"
                  fit="fill"
                />
              </div>
            </div>
          </div>
          <div class="leftstandline">
            <div class="transparentline" />
          </div>
          <div class="rightstandline">
            <div class="transparentline" />
          </div>
          <div class="lefttopsquire1">
            <div style="position:absolute;left:0%;top:0%;width:10%;height:1300%;">
              <span style="position:absolute;top:-7%;left:-40px;font-weight:600;font-size:24px">11F</span>
              <span style="position:absolute;top:4%;left:-40px;font-weight:600;font-size:24px">1F</span>
              <span style="position:absolute;top:36%;left:-40px;font-weight:600;font-size:24px">B1</span>
              <span style="position:absolute;top:56%;left:-40px;font-weight:600;font-size:24px">B2</span>
              <span style="position:absolute;top:74%;left:-40px;font-weight:600;font-size:24px">B3</span>
              <span style="position:absolute;top:90%;left:-40px;font-weight:600;font-size:24px">B4</span>
            </div>
          </div>
          <div class="lefttopsquire2">
            <div>
              <el-tooltip placement="left-start">
                <div slot="content"><LightToolTip /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                  style="width:9%;left:40%;margin-top:8px;position:relative;z-index:1"
                  fit="fill"
                />
              </el-tooltip>
            </div>
            <div style="position:absolute;top:12%;left:6%;width:100%;">
              <el-tooltip placement="right-start">
                <div slot="content"><LightToolTip /></div>
                <el-image
                  :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                  style="width:9%;left:80%;"
                  fit="fill"
                />
              </el-tooltip>
            </div>
          </div>
          <div class="lefttopsquire3" />
          <div class="singlestandline1" />
          <div class="singlestandline2" />
          <div class="singlestandline3" />
        </div>
        <div class="leftbottomcontent">
          <div class="leftbottomsquire1" />
          <div class="leftbottomsquire11">
            <div style="display:flex;position:absolute;top:57%;left:110%;width:140%;">
              <div>
                <el-tooltip placement="left-start">
                  <div slot="content"><LightToolTip /></div>
                  <el-image
                    :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                    style="width:180%;left:180%"
                    fit="fill"
                  />
                </el-tooltip>
              </div>
              <div style="margin-top:2%">
                <el-image
                  :src="require(`@/assets/ai-energy/arrow.png`)"
                  style="width:10%;left:-6%;transform:rotate(270deg);"
                  fit="fill"
                />
              </div>
            </div>
          </div>
          <div class="leftbottomsquire2">
            <div class="leftbottomsquire22">
              <div style="position:absolute;left:0%;top:0%;width:10%;height:1300%;">
                <span style="position:absolute;top:-16%;left:-40px;font-weight:600;font-size:24px">1F</span>
                <span style="position:absolute;top:-2%;left:-40px;font-weight:600;font-size:24px">B1</span>
                <span style="position:absolute;top:6%;left:-40px;font-weight:600;font-size:24px">B2</span>
                <span style="position:absolute;top:15%;left:-40px;font-weight:600;font-size:24px">B3</span>
                <span style="position:absolute;top:23%;left:-40px;font-weight:600;font-size:24px">B4</span>
              </div>
            </div>
          </div>
          <div class="leftbottomsquire3">
            <div class="leftbottomsquire33" />
          </div>
          <div class="leftbottomstand1" />
          <div class="leftbottomstand2" />
        </div>
      </div>
      <div class="rightcontent">
        <div class="righttopcontent">
          <div style="width:80%;height:90%;border:#000000 solid 2px">
            <div style="position:absolute;left:10%;top:0%;width:10%;height:50%;">
              <span style="position:absolute;top:12%;left:-30px;font-weight:600;font-size:20px">11F</span>
              <span style="position:absolute;top:40%;left:-30px;font-weight:600;font-size:20px">1F</span>
              <span style="position:absolute;top:95%;left:-40px;font-weight:600;font-size:20px;z-index:1">B1</span>
              <span style="position:absolute;top:117%;left:-40px;font-weight:600;font-size:20px">B2</span>
              <span style="position:absolute;top:138%;left:-40px;font-weight:600;font-size:20px">B3</span>
              <span style="position:absolute;top:155%;left:-40px;font-weight:600;font-size:20px">B4</span>
            </div>
            <div style="position:absolute;width:24%;height:93%;left:25%;top:-1%;background:#EFE7CF" />
            <div style="position:absolute;width:83%;height:25%;left:-1%;top:30%;background:#EFE7CF" />
            <div class="righttopsquire1">
              <div style="display:flex;position:absolute;top:-90%;left:35%;width:100%;">
                <div>
                  <el-tooltip placement="left-start">
                    <div slot="content"><LightToolTip /></div>
                    <el-image
                      :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                      style="width:90%;left:10%"
                      fit="fill"
                    />
                  </el-tooltip>
                </div>
                <div style="margin-top:4%">
                  <el-image
                    :src="require(`@/assets/ai-energy/arrow.png`)"
                    style="width:5%;left:-25%;transform:rotate(270deg);"
                    fit="fill"
                  />
                </div>
              </div>
              <div style="display:flex;position:absolute;top:-90%;left:55%;width:100%;">
                <div>
                  <el-tooltip placement="right-start">
                    <div slot="content"><LightToolTip /></div>
                    <el-image
                      :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                      style="width:90%;left:10%"
                      fit="fill"
                    />
                  </el-tooltip>
                </div>
                <div style="margin-top:4%">
                  <el-image
                    :src="require(`@/assets/ai-energy/arrow.png`)"
                    style="width:5%;left:6%;transform:rotate(90deg);"
                    fit="fill"
                  />
                </div>
              </div>
              <div style="display:flex;position:absolute;top:10%;left:80%;width:100%;z-index:1">
                <div>
                  <el-tooltip placement="right-start">
                    <div slot="content"><LightToolTip /></div>
                    <el-image
                      :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                      style="width:90%;left:10%"
                      fit="fill"
                    />
                  </el-tooltip>
                </div>
                <div style="margin-top:4%">
                  <el-image
                    :src="require(`@/assets/ai-energy/arrow.png`)"
                    style="width:5%;left:5%;transform:rotate(90deg);"
                    fit="fill"
                  />
                </div>
              </div>
              <div style="display:flex;position:absolute;top:25%;left:42%;width:80%;">
                <div>
                  <el-tooltip placement="left-start">
                    <div slot="content"><LightToolTip /></div>
                    <el-image
                      :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                      style="width:90%;left:10%"
                      fit="fill"
                    />
                  </el-tooltip>
                </div>
                <div style="margin-top:4%">
                  <el-image
                    :src="require(`@/assets/ai-energy/arrow.png`)"
                    style="width:5%;left:-25%;transform:rotate(270deg);"
                    fit="fill"
                  />
                </div>
              </div>
            </div>
            <div class="righttopsquire2" />
            <div class="righttopsquire3" />
            <div class="rightsinglestandline1" />
            <div class="rightsinglestandline2" />
            <div class="rightsinglestandline3" />
            <div class="leftstandline1">
              <div class="transparentline" />
            </div>
            <div class="rightstandline1">
              <div class="transparentline" />
            </div>
          </div>
        </div>
        <div class="rightbottomcontent">
          <div style="width:80%;height:77%;border:#000000 solid 2px">
            <div style="position:absolute;width:24%;height:93%;left:25%;top:-1%;background:#EFE7CF" />
            <div style="position:absolute;width:83%;height:25%;left:-1%;top:30%;background:#EFE7CF" />
            <div class="rightbottomsquire1">
              <div style="position:absolute;left:42%;top:-190%;z-index:2">
                <el-image
                  :src="require(`@/assets/ai-energy/arrow.png`)"
                  style="width:12%;left:6%;transform:rotate(180deg);"
                  fit="fill"
                />
              </div>
            </div>
            <div class="rightbottomsquire2">
              <div style="position:absolute;left:11%;width:80%;top:-130%">
                <el-tooltip placement="left-start">
                  <div slot="content"><LightToolTip /></div>
                  <el-image
                    :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                    style="width:20%;left:20%"
                    fit="fill"
                  />
                </el-tooltip>
              </div>
              <div style="position:absolute;left:42%;width:80%;top:-130%">
                <el-tooltip placement="right-start">
                  <div slot="content"><LightToolTip /></div>
                  <el-image
                    :src="require(`@/assets/ai-energy/gif_fan_1.1.gif`)"
                    style="width:20%;left:20%"
                    fit="fill"
                  />
                </el-tooltip>
              </div>
              <div style="position:absolute;left:0%;top:0%;width:10%;height:1300%;">
                <span style="position:absolute;top:-18%;left:-40px;font-weight:600;font-size:24px">1F</span>
                <span style="position:absolute;top:-2%;left:-40px;font-weight:600;font-size:24px">B1</span>
                <span style="position:absolute;top:6%;left:-40px;font-weight:600;font-size:24px">B2</span>
                <span style="position:absolute;top:15%;left:-40px;font-weight:600;font-size:24px">B3</span>
                <span style="position:absolute;top:23%;left:-40px;font-weight:600;font-size:24px">B4</span>
              </div>
            </div>
            <div class="rightbottomsquire3" />
            <div class="rightbottomline" />
            <div class="rightbottomstand1" />
            <div class="rightbottomstand2" />
            <div style="position:absolute;top:81%;left:-30%;font-weight:600;font-size:24px;text-align:center;">模块四：3#和4#号楼防排烟正压送风系统</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LightToolTip from './LightToolTip'
export default {
  name: 'AIlightChildTwo',
  components: { LightToolTip }
}
</script>

<style lang="less" scoped>
  .container{
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 1000px;
  .content{
    display: flex;
    justify-content: center;
    width: 80%;
    height: 98%;
    transform: translatex(-6%);
    margin-top: 30px;
    .leftcontent{
      width: 45%;
      height: 50%;
    .lefttopcontent{
      width: 100%;
      height: 100%;
      .topsquire{
        width: 40%;
        height: 20%;
        position: relative;
        left: 25%;
        top: 4%;
        border: #000000 dashed 2px;
      }
      .leftstandline{
      width: 4%;
      height: 70%;
      background: #EFE7CF;
      border: 2px solid #000000;
      position: relative;
      left: 27%;
      top: -10%;
      z-index: 1;
      .transparentline{
      width: 150%;
      height: 3%;
      background: #EFE7CF;
      border: 1px solid #EFE7CF;
      position: relative;
      left: -21%;
      top: 10%;
        }
      }
      .rightstandline{
      width: 4%;
      height: 70%;
      background: #EFE7CF;
      border: 2px solid #000000;
      position: relative;
      left: 58%;
      top: -80%;
      z-index: 1;
      .transparentline{
      width: 150%;
      height: 3%;
      background: #EFE7CF;
      border: 1px solid #EFE7CF;
      position: relative;
      left: -21%;
      top: 10%;
        }
      }
      .lefttopsquire1{
        width: 65%;
        height: 6%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: -144%;
        left: 13%;
      }
      .lefttopsquire2{
        width: 65%;
        height: 13%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: -123%;
        left: 13%;
      }
      .lefttopsquire3{
        width: 65%;
        height: 11%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: -110%;
        left: 13%;
      }
      .singlestandline1{
        width: 0%;
        height: 29%;
        border-right: 2px solid #000000;
        position: absolute;
        left: 20.4%;
        top: 11%;
      }
      .singlestandline2{
        width: 0%;
        height: 29%;
        border-right: 2px solid #000000;
        position: absolute;
        left: 34%;
        top: 11%;
      }
      .singlestandline3{
        width: 0%;
        height: 32%;
        border-right: 2px solid #000000;
        position: absolute;
        left: 27%;
        top: 8%;
      }
    }
    .leftbottomcontent{
      width: 100%;
      height: 100%;
      .leftbottomsquire1{
        width: 65%;
        height: 1%;
        border-top: #000000 solid 2px;
        // border-bottom: #000000 solid 2px;
        position: relative;
        top: 0%;
        left: 13%;
      }
      .leftbottomsquire11{
        width: 20%;
        height: 10%;
        // border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 0%;
        left: 13%;
      }
      .leftbottomsquire2{
        width: 53%;
        height: 16%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 15%;
        left: 26%;
        .leftbottomsquire22{
          width: 14%;
          height: 104%;
          border-top: #000000 solid 2px;
          border-bottom: #000000 solid 2px;
          position: relative;
          top: -1%;
          left: -25%;
        }
      }
      .leftbottomsquire3{
        width: 53%;
        height: 16%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 30%;
        left: 26%;
        .leftbottomsquire33{
          width: 14%;
          height: 104%;
          border-top: #000000 solid 2px;
          border-bottom: #000000 solid 2px;
          position: relative;
          top: -1%;
          left: -25%;
        }
      }
      .leftbottomstand1{
        width: 0%;
        height: 73%;
        border-right: 2px solid #000000;
        position: relative;
        left: 20%;
        top: -43%;
      }
      .leftbottomstand2{
        width: 0%;
        height: 62%;
        border-right: 2px solid #000000;
        position: relative;
        left: 26%;
        top: -105%;
      }
    }
    }
    .rightcontent{
      width: 45%;
      height: 50%;
      .righttopcontent{
      width: 100%;
      height: 100%;
      position: relative;
      .righttopsquire1{
        width: 65%;
        height: 16%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 9.4%;
        left: 13%;
      }
      .righttopsquire2{
        width: 65%;
        height: 13%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 40%;
        left: 13%;
      }
      .righttopsquire3{
        width: 65%;
        height: 11%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 50%;
        left: 13%;
      }
      .leftstandline1{
      width: 4%;
      height: 80%;
      background: #EFE7CF;
      border-right: 2px solid #000000;
      border-left: 2px solid #000000;
      position: relative;
      left: 30%;
      top: -30.6%;
      z-index: 1;
      }
      .rightstandline1{
      width: 4%;
      height: 80%;
      background: #EFE7CF;
      border-right: 2px solid #000000;
      border-left: 2px solid #000000;
      position: relative;
      left: 58%;
      top: -110.6%;
      z-index: 1;
      }
      .rightsinglestandline1{
        width: 0%;
        height: 57.6%;
        border-right: 2px solid #000000;
        position: absolute;
        left: 30%;
        top: 23%;
      }
      .rightsinglestandline2{
        width: 0%;
        height: 57.6%;
        border-right: 2px solid #000000;
        position: absolute;
        left: 52%;
        top: 23%;
      }
      .rightsinglestandline3{
        width: 0%;
        height: 65%;
        border-right: 2px solid #000000;
        position: absolute;
        left: 40%;
        top: 15.6%;
      }
    }
    .rightbottomcontent{
      width: 100%;
      height: 100%;
      position: relative;
      .rightbottomsquire1{
        width: 65%;
        height: 8%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 8%;
        left: 13%;
      }
      .rightbottomsquire2{
        width: 65%;
        height: 16%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 30%;
        left: 13%;
      }
      .rightbottomsquire3{
        width: 65%;
        height: 16%;
        border-top: #000000 solid 2px;
        border-bottom: #000000 solid 2px;
        position: relative;
        top: 45%;
        left: 13%;
      }
      .rightbottomline{
      width: 4%;
      height: 77%;
      background: #EFE7CF;
      border: 2px solid #000000;
      position: relative;
      left: 43%;
      top: -32%;
      z-index: 1;
      }
      .rightbottomstand1{
        width: 0%;
        height: 69%;
        border-right: 2px solid #000000;
        position: relative;
        left: 24%;
        top: -101%;
      }
      .rightbottomstand2{
        width: 0%;
        height: 69%;
        border-right: 2px solid #000000;
        position: relative;
        left: 65%;
        top: -170%;
      }
    }
    }
  }
}
</style>
