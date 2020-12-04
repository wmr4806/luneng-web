<template>
  <div class="container">
    <div>
      <el-tabs type="border-card" style="top: 55px">
        <el-tab-pane label="BIM菜单">
          <el-scrollbar style="height: 460px">
            <!-- 四号一层 -->
            <el-tree
              v-show="treebim1"
              :data="data1"
              class="tree-bim"
              :props="data1props1"
              accordion
              @current-change="handleChange1"
            >
            </el-tree>
            <!-- 四号二层 -->
            <el-tree
              v-show="treebim2"
              :data="data2"
              class="tree-bim"
              :props="data1props2"
              accordion
              @current-change="handleChange2"
            >
            </el-tree>
            <!-- 四号三层 -->
            <el-tree
              v-show="treebim3"
              :data="data3"
              class="tree-bim"
              :props="data1props3"
              accordion
              @current-change="handleChange3"
            >
            </el-tree>
            <!-- 四号四层 八层-->
            <el-tree
              v-show="treebim4"
              :data="data4"
              class="tree-bim"
              :props="data1props4"
              accordion
              @current-change="handleChange4"
            >
            </el-tree>
            <!-- 四号五层 六层 七层 -->
            <el-tree
              v-show="treebim5"
              :data="data5"
              class="tree-bim"
              :props="data1props5"
              accordion
              @current-change="handleChange5"
            >
            </el-tree>
            <!-- 四号负一楼 -->
            <el-tree
              v-show="treebim6"
              :data="data6"
              class="tree-bim"
              :props="data1props6"
              accordion
              @current-change="handleChange6"
            >
            </el-tree>
            <!-- 四号负二楼 -->
            <el-tree
              v-show="treebim7"
              :data="data7"
              class="tree-bim"
              :props="data1props7"
              accordion
              @current-change="handleChange7"
            >
            </el-tree>
            <!-- 四号负三楼 -->
            <el-tree
              v-show="treebim8"
              :data="data8"
              class="tree-bim"
              :props="data1props8"
              accordion
              @current-change="handleChange8"
            >
            </el-tree>
            <!-- 四号负四楼 -->
            <el-tree
              v-show="treebim9"
              :data="data9"
              class="tree-bim"
              :props="data1props9"
              accordion
              @current-change="handleChange9"
            >
            </el-tree>
            <!-- 四号楼整栋 -->
            <el-tree
              v-show="treebim10"
              :data="data10"
              class="tree-bim"
              :props="data1props10"
              accordion
              @current-change="handleChange10"
            >
            </el-tree>
            <!-- 三号一层 -->
            <el-tree
              v-show="treebim11"
              :data="data11"
              class="tree-bim"
              :props="data1props11"
              accordion
              @current-change="handleChange11"
            >
            </el-tree>
            <!-- 三号二层至十一层 -->
            <el-tree
              v-show="treebim12"
              :data="data12"
              class="tree-bim"
              :props="data1props12"
              accordion
              @current-change="handleChange12"
            >
            </el-tree>
            <!-- 三号十二层至十九层 -->
            <el-tree
              v-show="treebim13"
              :data="data13"
              class="tree-bim"
              :props="data1props13"
              accordion
              @current-change="handleChange13"
            >
            </el-tree>
            <!-- 三号二十层 -->
            <el-tree
              v-show="treebim14"
              :data="data14"
              class="tree-bim"
              :props="data1props14"
              accordion
              @current-change="handleChange14"
            >
            </el-tree>
            <!-- 三号二十一层 -->
            <el-tree
              v-show="treebim15"
              :data="data15"
              class="tree-bim"
              :props="data1props15"
              accordion
              @current-change="handleChange15"
            >
            </el-tree>
            <!-- 三号二十二层 -->
            <el-tree
              v-show="treebim16"
              :data="data16"
              class="tree-bim"
              :props="data1props16"
              accordion
              @current-change="handleChange16"
            >
            </el-tree>
            <!-- 三号整栋 -->
            <el-tree
              v-show="treebim17"
              :data="data17"
              class="tree-bim"
              :props="data1props17"
              accordion
              @current-change="handleChange17"
            >
            </el-tree>
            <!-- 四楼顶层 -->
            <el-tree
              v-show="treebim18"
              :data="data18"
              class="tree-bim"
              :props="data1props18"
              accordion
              @current-change="handleChange18"
            >
            </el-tree>
            <!-- 三楼顶层 -->
            <el-tree
              v-show="treebim19"
              :data="data19"
              class="tree-bim"
              :props="data1props19"
              accordion
              @current-change="handleChange19"
            >
            </el-tree>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <el-tabs class="sbdcl" type="border-card">
        <el-tab-pane label="设备达成率">
          <div v-drag v-show="cradevent1">
            <el-divider></el-divider>
            <span>AHU的总数为{{ this.AHUAlltotal }}个</span>
            <el-divider></el-divider>
          </div>
          <div v-drag v-show="cradevent2">
            <el-divider></el-divider>
            <span>枪式摄像头的总数为{{ this.CDDAlltotal }}个</span>
            <el-divider></el-divider>
            <el-popover placement="right" width="30%" trigger="hover">
              <div v-for="(item, index) in cameraList" :key="index">
                <p style="color: #606266; font-weight: 700">
                  发生故障的摄像头在<span
                    style="color:#1890ff;font-weight: 800"
                    >{{ item.id }}</span
                  >
                </p>
              </div>
              <span slot="reference"
              style="color:red;cursor:pointer;"
                >枪式摄像头的故障数量为{{ this.CDDErrtotal }}个</span
              >

              <!-- <el-button >hover 激活</el-button> -->
            </el-popover>
            <!-- <span>枪式摄像头的故障数量为{{ this.CDDErrtotal }}个</span> -->
            <el-divider></el-divider>
          </div>
          <div v-drag v-show="cradevent3">
            <el-divider></el-divider>
            <span>VAV的总数为{{ this.VAVAlltotal }}个</span>
            <el-divider></el-divider>
            <span 
              style="color:red;cursor:pointer;"
            >VAV的故障数量为{{ this.VAVErrtotal }}个</span>
            <el-divider></el-divider>
          </div>
          <!-- <div v-drag v-show="cradevent5">
            <el-divider><i class="el-icon-video-camera-solid" /></el-divider>
            <span> 实际温度：{{ vavData.value | toFixedNum }}℃</span>
            <el-divider><i class="el-icon-success" /></el-divider>
            <span> 热舒适度：{{ vavData.pmv | toFixedNum(3) }}</span>
          </div> -->
        </el-tab-pane>
      </el-tabs>
    </div>

    <div @mouseleave="mouseLeave" v-if="selectIsShow" class="selectbtn">
      <!-- <a href="http://datav.aliyuncs.com/share/279199f96c3e159c9e706c042d837706" class="ahref">回到大屏</a> -->
      <!-- <a class="ahref ahref1" @click="$router.push('/')">返 回</a> -->
      <el-select
        ref="isSelectBuild"
        v-model="building"
        placeholder="请选择"
        popper-class="select-option"
        :popper-append-to-body="false"
        @change="selectBuilding"
      >
        <el-option
          v-for="{ label, value } in buildings"
          :key="value"
          :label="label"
          :value="value"
        />
      </el-select>
      <el-select
        ref="isSelectFloor"
        v-model="floor"
        placeholder="请选择"
        popper-class="select-option"
        :popper-append-to-body="false"
        @change="selectFloor"
      >
        <el-option
          v-for="{ label, value } in floors"
          :key="value"
          :label="label"
          :value="value"
        />
      </el-select>
      <!-- <div class="ahref ahref2">总览</div>
      <div class="ahref ahref3">摄像头</div>
      <div class="ahref ahref4">空调</div>
      <div class="ahref ahref5">消防</div> -->
    </div>
    <div v-drag class="xinxitishi">
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 3px;
          cursor: pointer;
          padding-bottom: 5px;
        "
      >
        关闭
      </div>
    </div>
    <div v-drag class="xinxitishi xinxitishi2">
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 3px;
          cursor: pointer;
          padding-bottom: 5px;
        "
      >
        关闭
      </div>
    </div>
    <div
      v-show="fireTotalNumShow"
      v-drag
      class="total-num"
      style="width: 200px; height: 200px; font-size: 24px"
    >
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
          padding-bottom: 5px;
        "
        @click="closeTotalNum"
      >
        关闭
      </div>
      <div style="color: #ffffff">
        <div style="margin-top: 20px">
          火警设备：{{ totalData && totalData.total }}个
        </div>
        <div style="margin: 20px 0">
          正常：{{ totalData && totalData.normal }}个
        </div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="airTotalNumShow" v-drag class="total-num">
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
          padding-bottom: 5px;
        "
        @click="closeTotalNum"
      >
        关闭
      </div>
      <div style="color: #ffffff">
        <div>空调机组：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">
          正常：{{ totalData && totalData.normal }}个
        </div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="cctvTotalNumShow" v-drag class="total-num">
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
          padding-bottom: 5px;
        "
        @click="closeTotalNum"
      >
        关闭
      </div>
      <div style="color: #ffffff">
        <div>摄像机：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">
          正常：{{ totalData && totalData.normal }}个
        </div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="havcTotalNumShow" v-drag class="total-num">
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
          padding-bottom: 5px;
        "
        @click="closeTotalNum"
      >
        关闭
      </div>
      <div style="color: #ffffff">
        <div>变风量空调机组：{{ totalData && totalData.total }}个</div>
        <div style="margin: 8px 0">
          正常：{{ totalData && totalData.normal }}个
        </div>
        <div>故障：{{ totalData && totalData.breakdown }}个</div>
      </div>
    </div>
    <div v-show="vavIsShow" v-drag class="deviceInfo devvav">
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
        "
        @click="closeInfo"
      >
        关闭
      </div>
      <div style="color: #ffffff">
        实际温度：{{ vavData.value | toFixedNum }}℃
      </div>
      <div style="color: #ffffff">
        阀门开度：{{ vavData.dpr | toFixedNum }}%
      </div>
      <div style="color: #ffffff">
        送风压力：{{ vavData.da | toFixedNum }}Pa
      </div>
      <div style="color: #ffffff">送风风量：{{ vavData.sa | toFixedNum }}</div>
      <div style="color: #ffffff">
        热舒适度：{{ vavData.pmv | toFixedNum(3) }}
      </div>
    </div>
    <div
      v-show="coldAndHeatIsShow"
      v-drag
      class="deviceInfo"
      style="width: 150px; height: 130px; font-size: 24px"
    >
      <div
        style="
          color: #ffffff;
          position: absolute;
          right: 10px;
          top: 1px;
          cursor: pointer;
        "
        @click="closeInfo"
      >
        关闭
      </div>
      <div
        v-for="item in coldAndHeatData"
        :key="item.id"
        style="color: #ffffff; margin-top: 28px"
      >
        {{ item.name }}：{{ item.value }}{{ item.unit }}
      </div>
    </div>
    <div v-if="ahu1Data || ahu2Data">
      <div v-show="ahu1IsShow" v-drag class="deviceInfo devahu">
        <div
          style="
            color: #ffffff;
            position: absolute;
            right: 10px;
            top: 1px;
            cursor: pointer;
          "
          @click="closeInfo"
        >
          关闭
        </div>
        <div style="color: #ffffff">
          CO2浓度：{{
            ahu1Data[`AHU${building}-${floor}-1-CO2_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-CO2_CV`].value
          }}ppm
        </div>
        <div style="color: #ffffff">
          回风温度：{{
            ahu1Data[`AHU${building}-${floor}-1-RT_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-RT_CV`].value
          }}℃
        </div>
        <div style="color: #ffffff">
          回风湿度：{{
            ahu1Data[`AHU${building}-${floor}-1-RH_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-RH_CV`].value
          }}%
        </div>
        <div style="color: #ffffff">
          送风温度：{{
            ahu1Data[`AHU${building}-${floor}-1-ST_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-ST_CV`].value
          }}℃
        </div>
        <div style="color: #ffffff">
          送风湿度：{{
            ahu1Data[`AHU${building}-${floor}-1-SH_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-SH_CV`].value
          }}%
        </div>
        <div style="color: #ffffff">
          送风压力：{{
            ahu1Data[`AHU${building}-${floor}-1-SP1_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-SP1_CV`].value
          }}Pa
        </div>
        <div style="color: #ffffff">
          频率反馈：{{
            ahu1Data[`AHU${building}-${floor}-1-SF_CV`] &&
              ahu1Data[`AHU${building}-${floor}-1-SF_CV`].value
          }}Hz
        </div>
        <div style="color: #ffffff">
          故障状况：{{
            ahu1Data[`AHU${building}-${floor}-1-ALM_CV`] &&
            ahu1Data[`AHU${building}-${floor}-1-ALM_CV`].value === "false"
              ? "设备正常"
              : "设备故障"
          }}
        </div>
      </div>
      <div v-show="ahu2IsShow" v-drag class="deviceInfo devahu">
        <div
          style="
            color: #ffffff;
            position: absolute;
            right: 10px;
            top: 1px;
            cursor: pointer;
          "
          @click="closeInfo"
        >
          关闭
        </div>
        <div style="color: #ffffff">
          CO2浓度：{{
            ahu2Data[`AHU${building}-${floor}-2-CO2_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-CO2_CV`].value
          }}ppm
        </div>
        <div style="color: #ffffff">
          回风温度：{{
            ahu2Data[`AHU${building}-${floor}-2-RT_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-RT_CV`].value
          }}℃
        </div>
        <div style="color: #ffffff">
          回风湿度：{{
            ahu2Data[`AHU${building}-${floor}-2-RH_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-RH_CV`].value
          }}%
        </div>
        <div style="color: #ffffff">
          送风温度：{{
            ahu2Data[`AHU${building}-${floor}-2-ST_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-ST_CV`].value
          }}℃
        </div>
        <div style="color: #ffffff">
          送风湿度：{{
            ahu2Data[`AHU${building}-${floor}-2-SH_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-SH_CV`].value
          }}%
        </div>
        <div style="color: #ffffff">
          送风压力：{{
            ahu2Data[`AHU${building}-${floor}-2-SP1_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-SP1_CV`].value
          }}Pa
        </div>
        <div style="color: #ffffff">
          频率反馈：{{
            ahu2Data[`AHU${building}-${floor}-2-SF_CV`] &&
              ahu2Data[`AHU${building}-${floor}-2-SF_CV`].value
          }}Hz
        </div>
        <div style="color: #ffffff">
          故障状况：{{
            ahu2Data[`AHU${building}-${floor}-2-ALM_CV`] &&
            ahu2Data[`AHU${building}-${floor}-2-ALM_CV`].value === "false"
              ? "设备正常"
              : "设备故障"
          }}
        </div>
      </div>
    </div>
    <div v-if="videoIsShow" v-drag class="video-js">
      <div
        style="
          color: #ffffff;
          position: relative;
          left: 560px;
          top: 30px;
          cursor: pointer;
          z-index: 999;
        "
        @click="closeVideo"
      >
        关闭
      </div>
      <MyVideo
        ref="myVideo"
        video-id="myVideo"
        :url="url"
        :width="width"
        :height="(width / 16) * 9"
      />
    </div>
    <iframe
      id="mainFrame"
      ref="mainFrame"
      name="mainFrame"
      class="mainFrame"
      :src="bimSrc"
      frameborder="0"
      allowtransparency="true"
      @load="loadBim"
    />
  </div>
</template>

<script>
import {
  getTurnRtspToRtmp,
  getVAVList,
  getWarmAHUList,
  getAlmEvents,
  getColdSourceList,
  getHeatSourceList
} from "@/api/data";
import { getbim, getfloors, getfloor1, getfloor2 } from "@/api/floorbim";
import {
  fireObj,
  ahuAndVavArr,
  airTotalNum,
  havcTotalNum,
  cameraId
} from "./constant";
import MyVideo from "@/views/ai-security/MyVideo";
import id from "@/views/bimEmpty/bimId/index";
import { mapId } from "@/views/ai-BA/mapId";
import { date } from "jszip/lib/defaults";
import { string } from "jszip/lib/support";
const {
  alarm: { Alarm },
  cctvNum: { cctvNum },
  havcNum: { havcNum },
  airNum: { airNum },
  fireNum: { fireNum },
  // "idB4F-4": { fireB4F14 },
  // "idB4F-3": { fireB4F13 },
  // "idB4F-2": { fireB4F12 },
  "idB4F-1": { fireB4F11, coldAndHeatMap },
  coldAndHeat: { coldAndHeat1, coldAndHeat2 },
  idB4F1: { ahuIdB4F1, fireB4F1 },
  idB4F2: { ahuIdB4F2, vavIdB4F2, fireB4F2 },
  idB4F3: { cctvId, vavIdB4F3, ahuIdB4F3, fireB4F3 }
  // idB4F4: { ahuIdB4F4, vavIdB4F4, fireB4F4 },
  // idB4F5: { ahuIdB4F5, vavIdB4F5, fireB4F5 },
  // idB4F6: { ahuIdB4F6, vavIdB4F6, fireB4F6 },
  // idB4F7: { ahuIdB4F7, vavIdB4F7, fireB4F7 },
  // idB4F8: { ahuIdB4F8, vavIdB4F8, fireB4F8 },
  // idB3F2: { fireB3F2, ahuIdB3F2, vavIdB3F2 }
} = id;
export default {
  name: "FireControlBIM",
  filters: {
    toFixedNum(val, num = 1) {
      return Number(val).toFixed(num);
    }
  },
  directives: {
    drag: function(el) {
      const dragBox = el;
      dragBox.onmousedown = e => {
        const disX = e.clientX - dragBox.offsetLeft;
        const disY = e.clientY - dragBox.offsetTop;
        document.onmousemove = e => {
          const left = e.clientX - disX;
          const top = e.clientY - disY;
          dragBox.style.left = left + "px";
          dragBox.style.top = top + "px";
        };
        document.onmouseup = e => {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    }
  },
  components: {
    MyVideo
  },
  data() {
    return {
      //一层
      data1: [],
      data1props1: {
        label: "name",
        children: "children"
      },
      //二层
      data2: [],
      data1props2: {
        label: "name",
        children: "children"
      },
      //三层
      data3: [],
      data1props3: {
        label: "name",
        children: "children"
      },
      //四层 八层
      data4: [],
      data1props4: {
        label: "name",
        children: "children"
      },
      //五层 六层 七层
      data5: [],
      data1props5: {
        label: "name",
        children: "children"
      },
      // 负一层
      data6: [],
      data1props6: {
        label: "name",
        children: "children"
      },
      // 负二层
      data7: [],
      data1props7: {
        label: "name",
        children: "children"
      },
      // 负三层
      data8: [],
      data1props8: {
        label: "name",
        children: "children"
      },
      // 负四层
      data9: [],
      data1props9: {
        label: "name",
        children: "children"
      },
      //四号楼整栋
      data10: [],
      data1props10: {
        label: "name",
        children: "children"
      },
      // 一层
      data11: [],
      data1props11: {
        label: "name",
        children: "children"
      },
      // 二层至十一层
      data12: [],
      data1props12: {
        label: "name",
        children: "children"
      },
      // 十二层至十九层
      data13: [],
      data1props13: {
        label: "name",
        children: "children"
      },
      // 二十层
      data14: [],
      data1props14: {
        label: "name",
        children: "children"
      },
      // 二十一层
      data15: [],
      data1props15: {
        label: "name",
        children: "children"
      },
      // 二十二层
      data16: [],
      data1props16: {
        label: "name",
        children: "children"
      },
      // 三号楼整栋
      data17: [],
      data1props17: {
        label: "name",
        children: "children"
      },
      // 四楼顶层
      data18: [],
      data1props18: {
        label: "name",
        children: "children"
      },
      // 三楼顶层
      data19: [],
      data1props19: {
        label: "name",
        children: "children"
      },
      cameraList:[],
      treebim1: false,
      treebim2: false,
      treebim3: true,
      treebim4: false,
      treebim5: false,
      treebim6: false,
      treebim7: false,
      treebim8: false,
      treebim9: false,
      treebim10: false,
      treebim11: false,
      treebim12: false,
      treebim13: false,
      treebim14: false,
      treebim15: false,
      treebim16: false,
      treebim17: false,
      treebim18: false,
      treebim19: false,
      AHUAlltotal: "",
      CDDAlltotal: "",
      CDDErrtotal: "",
      VAVAlltotal: "",
      VAVErrtotal: "",
      fatherid: "",
      floor: 3,
      coldAndHeatIsShow: false,
      cradevent: false,
      cradevent1: false,
      cradevent2: false,
      cradevent3: false,
      cradevent4: false,
      cradevent5: false,
      coldAndHeatData: [],
      floors: [],
      building: 4,
      buildings: [
        {
          label: `3号楼`,
          value: 3
        },
        {
          label: `4号楼`,
          value: 4
        }
      ],
      vavIsShow: false,
      Id: "",
      url: "",
      none: 0,
      alarmId: [],
      width: "600px",
      videoIsShow: false,
      ahu1IsShow: false,
      ahu2IsShow: false,
      fireTotalNumShow: false,
      airTotalNumShow: false,
      cctvTotalNumShow: false,
      havcTotalNumShow: false,
      selectIsShow: true,
      vavData: {},
      ahu1Data: {},
      ahu2Data: {},
      totalData: {},
      alarmArrData: [],
      dbid: "2816",
      verfloor4: []
    };
  },
  computed: {
    bimSrc() {
      let url_bim = "";
      if (process.env.NODE_ENV === "development") {
        if (this.building == 3 && this.floor == 0) {
          url_bim =
            "http://101.132.169.245/bim/ForgeViewerA.html?FLURN=https://my-bim.oss-cn-shanghai.aliyuncs.com/bim/B3F0/3d.svf";
        } else if (this.building == 4 && this.floor == 0) {
          url_bim =
            "http://101.132.169.245/bim/ForgeViewerA.html?FLURN=https://my-bim.oss-cn-shanghai.aliyuncs.com/bim/B4F0/3d.svf";
        } else {
          url_bim = `http://101.132.169.245/bim/ForgeViewerA.html?FLURN=B${this.building}F${this.floor}/3d.svf`;
        }
      } else {
        if (this.building == 3 && this.floor == 0) {
          url_bim =
            "http://101.132.169.245/bim/ForgeViewerA.html?FLURN=https://my-bim.oss-cn-shanghai.aliyuncs.com/bim/B3F0/3d.svf";
        } else if (this.building == 4 && this.floor == 0) {
          url_bim =
            "http://101.132.169.245/bim/ForgeViewerA.html?FLURN=https://my-bim.oss-cn-shanghai.aliyuncs.com/bim/B4F0/3d.svf";
        } else {
          url_bim = `http://101.132.169.245/bim/ForgeViewerA.html?FLURN=B${this.building}F${this.floor}/3d.svf`;
        }
      }
      return url_bim;
    }
  },
  watch: {
    url: function(val, old) {
      this.$nextTick(() => {
        this.$refs.myVideo.play();
      });
    }
  },
  created() {
    window["handleBim"] = (id, child) => {
      this.callbackBim(id, child);
      console.log(12345, id, child);
    };
    this.getvideo();
    this.getbimfloor();
    this.showCCTVTotalNum(1, 2805);
    console.log(
      document.body.clientHeight,
      document.body.scrollHeight,
      window.screen.height,
      window.screen.availHeight,
      window.screenTop
    );
  },
  mounted() {
    this.test();
    this.building === 4 ? this.getFloor3() : this.getFloor4();
    const url = document.location.href.toString();
    const a =
      url &&
      url.split("?") &&
      url.split("?")[1] &&
      url.split("?")[1].split("&");
    if (a && a.length === 4) {
      const bigNone = Number(a[0].split("=")[1]);
      const bigBuilding = a[1].split("=")[1];
      const bigFloor = a[2].split("=")[1];
      const bigId = a[3].split("=")[1];
      this.selectIsShow = false;
      this.building = bigBuilding;
      this.floor = bigFloor;
      const key = `B${bigBuilding}F${bigFloor}`;
      const obj = fireObj();
      const arr = [Alarm, obj[key]];
      arr.forEach(i => {
        i.forEach((v, k) => {
          if (bigId === k) {
            setTimeout(() => {
              this.clickMethod([bigNone, v]);
            }, 1300);
          }
        });
      });
    }
    const callbackId = JSON.parse(localStorage.getItem("eventParams"));
    if (callbackId !== "null" && callbackId) {
      const { building, floor, id, none } = callbackId;
      console.log(1234, callbackId);
      this.selectIsShow = false;
      this.building = building;
      this.floor = floor;
      const key = `B${building}F${floor}`;

      const obj = fireObj();

      const arr = [Alarm, obj[key]];
      arr.forEach(i => {
        i.forEach((v, k) => {
          if (id === k) {
            setTimeout(() => {
              this.clickMethod([none, v]);
            }, 1300);
          }
        });
      });
      this.selectIsShow = false;
    } else {
      getAlmEvents(this.building, this.floor)
        .then(res => {
          if (res.code === "200") {
            this.alarmArrData = res.data;
            const key = `B${this.building}F${this.floor}`;
            const obj = fireObj();
            const arr = [Alarm, obj[key]];

            arr.forEach(i => {
              i.forEach((v, k) => {
                res.data.forEach(id => {
                  if (id === k) {
                    this.alarmId.push(v);
                  }
                });
              });
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.clickMethod([this.none, ...this.alarmId]);
            // this.clickMethod([0, 3702]);
          }, 1200);
        });
    }
  },
  methods: {
    async getvideo() {
      await getfloor2().then(res => {
        this.AHUAlltotal = res.AHUMoudle.AHU.length;
        this.CDDAlltotal = res.CDDMoudle.all.length;
        this.CDDErrtotal = res.CDDMoudle.error.length;
        this.VAVAlltotal = res.VAVMoudle.goodAllVAV.length;
        this.VAVErrtotal = res.VAVMoudle.errorVAV.length;
          this.cameraList = res.CDDMoudle.error;
        console.log(123456, res);
        console.log(1, res.CDDMoudle.all.length, res.CDDMoudle.error.length);
        console.log(2, res.AHUMoudle.AHU.length);
        console.log(
          3,
          res.VAVMoudle.errorVAV.length,
          res.VAVMoudle.goodAllVAV.length
        );
      });
    },
    async getbimfloor() {
      this.data1 = [];
      // 四号楼
      await getfloors(465).then(res => {
        // 1
        let s = [];
        let s1 = [];
        //2
        let s2 = [];
        let s3 = [];
        let s4 = [];
        //3
        let s5 = [];
        let s6 = [];
        let s7 = [];
        //4 8
        let s8 = [];
        let s9 = [];
        let s10 = [];
        //5 6 7
        let s11 = [];
        let s12 = [];
        let s13 = [];
        //4-1
        let s14 = [];
        //4-2
        let s15 = [];
        //4-3
        let s16 = [];
        //4-4
        let s17 = [];
        //4-0
        let s18 = [];
        let s19 = [];
        let s20 = [];
        //4-rf
        let rf = [];
        res.data.map(i => {
          // 1
          if (i.floor === "B4F1" && i.type_name === "摄像头") {
            s.push(i);
          }
          if (i.floor === "B4F1" && i.type_name === "AHU") {
            s1.push(i);
          }
          //2
          if (i.floor === "B4F2" && i.type_name === "摄像头") {
            s2.push(i);
          }
          if (i.floor === "B4F2" && i.type_name === "AHU") {
            s3.push(i);
          }
          if (i.floor === "B4F2" && i.type_name === "VAV") {
            s4.push(i);
          }
          //3
          if (i.floor === "B4F3" && i.type_name === "摄像头") {
            s5.push(i);
          }
          if (i.floor === "B4F3" && i.type_name === "AHU") {
            s6.push(i);
          }
          if (i.floor === "B4F3" && i.type_name === "VAV") {
            s7.push(i);
          }
          //4 8
          if (i.floor === "B4F4" && i.type_name === "摄像头") {
            s8.push(i);
          }
          if (i.floor === "B4F4" && i.type_name === "AHU") {
            s9.push(i);
          }
          if (i.floor === "B4F4" && i.type_name === "VAV") {
            s10.push(i);
          }
          //5 6 7
          if (i.floor === "B4F5" && i.type_name === "摄像头") {
            s11.push(i);
          }
          if (i.floor === "B4F5" && i.type_name === "AHU") {
            s12.push(i);
          }
          if (i.floor === "B4F5" && i.type_name === "VAV") {
            s13.push(i);
          }
          // 4-1
          if (i.floor === "B4F-1" && i.type_name === "摄像头") {
            s14.push(i);
          }
          // 4-2
          if (i.floor === "B4F-2" && i.type_name === "摄像头") {
            s15.push(i);
          }
          // 4-3
          if (i.floor === "B4F-3" && i.type_name === "摄像头") {
            s16.push(i);
          }
          // 4-4
          if (i.floor === "B4F-4" && i.type_name === "摄像头") {
            s17.push(i);
          }
          // 4-0
          if (i.floor === "B4F0" && i.type_name === "摄像头") {
            s18.push(i);
          }
          if (i.floor === "B4F0" && i.type_name === "AHU") {
            s19.push(i);
          }
          if (i.floor === "B4F0" && i.type_name === "VAV") {
            s20.push(i);
          }
          //4-rf
          if (i.floor === "B4RF" && i.type_name === "摄像头") {
            rf.push(i);
          }
        });
        // console.log(12345, s15);
        // 一楼
        let a = { name: s[0].name, children: [] };
        s.forEach(ele => {
          a.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s[0].type
          });
        });
        let a1 = { name: s1[0].name, children: [] };
        s1.forEach(ele => {
          a1.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s1[0].type
          });
        });
        // 二楼
        let a2 = { name: s2[0].name, children: [] };
        s2.forEach(ele => {
          a2.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s2[0].type
          });
        });
        let a3 = { name: s3[0].name, children: [] };
        s3.forEach(ele => {
          a3.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s3[0].type
          });
        });
        let a4 = { name: s4[0].name, children: [] };
        s4.forEach(ele => {
          a4.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s4[0].type
          });
        });
        // 三楼
        let a5 = { name: s5[0].name, children: [] };
        s5.forEach(ele => {
          a5.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s5[0].type
          });
        });
        let a6 = { name: s6[0].name, children: [] };
        s6.forEach(ele => {
          a6.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s6[0].type
          });
        });
        let a7 = { name: s7[0].name, children: [] };
        s7.forEach(ele => {
          a7.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s7[0].type
          });
        });
        // 四楼 八楼
        let a8 = { name: s8[0].name, children: [] };
        s8.forEach(ele => {
          a8.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s8[0].type
          });
        });
        let a9 = { name: s9[0].name, children: [] };
        s9.forEach(ele => {
          a9.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s9[0].type
          });
        });
        let a10 = { name: s10[0].name, children: [] };
        s10.forEach(ele => {
          a10.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s10[0].type
          });
        });
        // 五楼 六楼 七楼
        let a11 = { name: s11[0].name, children: [] };
        s11.forEach(ele => {
          a11.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s11[0].type
          });
        });
        let a12 = { name: s12[0].name, children: [] };
        s12.forEach(ele => {
          a12.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s12[0].type
          });
        });
        let a13 = { name: s13[0].name, children: [] };
        s13.forEach(ele => {
          a13.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s13[0].type
          });
        });
        // 负一楼
        let a14 = { name: s14[0].name, children: [] };
        s14.forEach(ele => {
          a14.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s14[0].type
          });
        });
        // 负二楼
        let a15 = { name: s15[0].name, children: [] };
        s15.forEach(ele => {
          a15.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s15[0].type
          });
        });
        // 负三楼
        let a16 = { name: s16[0].name, children: [] };
        s16.forEach(ele => {
          a16.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s16[0].type
          });
        });
        // 负四楼
        let a17 = { name: s17[0].name, children: [] };
        s17.forEach(ele => {
          a17.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s17[0].type
          });
        });
        //四号楼整栋
        let a18 = { name: s18[0].name, children: [] };
        s18.forEach(ele => {
          a18.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s18[0].type
          });
        });
        let a19 = { name: s19[0].name, children: [] };
        s19.forEach(ele => {
          a19.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s19[0].type
          });
        });
        let a20 = { name: s20[0].name, children: [] };
        s20.forEach(ele => {
          a20.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s20[0].type
          });
        });
        // 四号楼RF
        let a21 = { name: rf[0].name, children: [] };
        rf.forEach(ele => {
          a21.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: rf[0].type
          });
        });
        this.data1.push(a, a1);
        this.data2.push(a2, a3, a4);
        this.data3.push(a5, a6, a7);
        this.data4.push(a8, a9, a10);
        this.data5.push(a11, a12, a13);
        this.data6.push(a14);
        this.data7.push(a15);
        this.data8.push(a16);
        this.data9.push(a17);
        this.data10.push(a18, a19, a20);
        this.data18.push(a21);
      });
      // 三号楼
      await getfloors(571).then(res => {
        // 1
        let s = [];
        let s1 = [];
        //2-11
        let s2 = [];
        let s3 = [];
        let s4 = [];
        //12-19
        let s5 = [];
        let s6 = [];
        let s7 = [];
        //4
        let s8 = [];
        let s9 = [];
        let s10 = [];
        //5
        let s11 = [];
        let s12 = [];
        let s13 = [];
        //4-1
        let s14 = [];
        //4-2
        let s15 = [];
        //4-3
        let s16 = [];
        //4-4
        let s17 = [];
        //4-0
        let s18 = [];
        //rf
        let s19 = [];
        res.data.map(i => {
          // 1
          if (i.floor === "B3F1" && i.type_name === "摄像头") {
            s.push(i);
          }
          if (i.floor === "B3F1" && i.type_name === "AHU") {
            s1.push(i);
          }
          //2-11
          if (i.floor === "B3F2" && i.type_name === "摄像头") {
            s2.push(i);
          }
          if (i.floor === "B3F2" && i.type_name === "AHU") {
            s3.push(i);
          }
          if (i.floor === "B3F2" && i.type_name === "VAV") {
            s4.push(i);
          }
          //12-19
          if (i.floor === "B3F12" && i.type_name === "摄像头") {
            s5.push(i);
          }
          if (i.floor === "B3F12" && i.type_name === "AHU") {
            s6.push(i);
          }
          if (i.floor === "B3F12" && i.type_name === "VAV") {
            s7.push(i);
          }
          //20
          if (i.floor === "B3F20" && i.type_name === "摄像头") {
            s8.push(i);
          }
          if (i.floor === "B3F20" && i.type_name === "AHU") {
            s9.push(i);
          }
          if (i.floor === "B3F20" && i.type_name === "VAV") {
            s10.push(i);
          }
          //21
          if (i.floor === "B3F21" && i.type_name === "摄像头") {
            s11.push(i);
          }
          if (i.floor === "B3F21" && i.type_name === "AHU") {
            s12.push(i);
          }
          if (i.floor === "B3F21" && i.type_name === "VAV") {
            s13.push(i);
          }
          //22
          if (i.floor === "B3F22" && i.type_name === "摄像头") {
            s14.push(i);
          }
          if (i.floor === "B3F22" && i.type_name === "AHU") {
            s15.push(i);
          }
          //3 0
          if (i.floor === "B3F0" && i.type_name === "摄像头") {
            s16.push(i);
          }
          if (i.floor === "B3F0" && i.type_name === "AHU") {
            s17.push(i);
          }
          if (i.floor === "B3F0" && i.type_name === "VAV") {
            s18.push(i);
          }
          if (i.floor === "B3RF" && i.type_name === "摄像头") {
            s19.push(i);
          }
        });
        // 一楼
        let a = { name: s[0].name, children: [] };
        s.forEach(ele => {
          a.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s[0].type
          });
        });
        let a1 = { name: s1[0].name, children: [] };
        s1.forEach(ele => {
          a1.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s1[0].type
          });
        });
        // 二楼至十一楼
        let a2 = { name: s2[0].name, children: [] };
        s2.forEach(ele => {
          a2.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s2[0].type
          });
        });
        let a3 = { name: s3[0].name, children: [] };
        s3.forEach(ele => {
          a3.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s3[0].type
          });
        });
        let a4 = { name: s4[0].name, children: [] };
        s4.forEach(ele => {
          a4.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s4[0].type
          });
        });
        // 十二层至十九层
        let a5 = { name: s5[0].name, children: [] };
        s5.forEach(ele => {
          a5.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s5[0].type
          });
        });
        let a6 = { name: s6[0].name, children: [] };
        s6.forEach(ele => {
          a6.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s6[0].type
          });
        });
        let a7 = { name: s7[0].name, children: [] };
        s7.forEach(ele => {
          a7.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s7[0].type
          });
        });
        // 二十层
        let a8 = { name: s8[0].name, children: [] };
        s8.forEach(ele => {
          a8.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s8[0].type
          });
        });
        let a9 = { name: s9[0].name, children: [] };
        s9.forEach(ele => {
          a9.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s9[0].type
          });
        });
        let a10 = { name: s10[0].name, children: [] };
        s10.forEach(ele => {
          a10.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s10[0].type
          });
        });
        // 二十一层
        let a11 = { name: s11[0].name, children: [] };
        s11.forEach(ele => {
          a11.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s11[0].type
          });
        });
        let a12 = { name: s12[0].name, children: [] };
        s12.forEach(ele => {
          a12.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s12[0].type
          });
        });
        let a13 = { name: s13[0].name, children: [] };
        s13.forEach(ele => {
          a13.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s13[0].type
          });
        });
        // 二十二层
        let a14 = { name: s14[0].name, children: [] };
        s14.forEach(ele => {
          a14.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s14[0].type
          });
        });
        let a15 = { name: s15[0].name, children: [] };
        s15.forEach(ele => {
          a15.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s15[0].type
          });
        });
        // 整栋
        let a16 = { name: s16[0].name, children: [] };
        s16.forEach(ele => {
          a16.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s16[0].type
          });
        });
        let a17 = { name: s17[0].name, children: [] };
        s17.forEach(ele => {
          a17.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s17[0].type
          });
        });
        let a18 = { name: s18[0].name, children: [] };
        s18.forEach(ele => {
          a18.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s18[0].type
          });
        });
        // rf
        let a19 = { name: s19[0].name, children: [] };
        s19.forEach(ele => {
          a19.children.push({
            name: ele.dbname,
            dbid: ele.dbid,
            type: s19[0].type
          });
        });
        this.data11.push(a, a1);
        this.data12.push(a2, a3, a4);
        this.data13.push(a5, a6, a7);
        this.data14.push(a8, a9, a10);
        this.data15.push(a11, a12, a13);
        this.data16.push(a14, a15);
        this.data17.push(a16, a17, a18);
        this.data19.push(a19);
      });
    },
    // 切换楼层时
    getDifferentBim() {
      getAlmEvents(this.building, this.floor)
        .then(res => {
          if (res.code === "200") {
            const key = `B${this.building}F${this.floor}`;
            const obj = fireObj();
            const arr = [Alarm, obj[key]];
            console.log(12345, key, obj, arr);
            //4 1
            if (key == "B4F1") {
              this.treebim1 = true;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4 2
            if (key == "B4F2") {
              this.treebim1 = false;
              this.treebim2 = true;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4 3
            if (key == "B4F3") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = true;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4 4&8
            if (key == "B4F4" || key == "B4F8") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = true;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4 5&6&7
            if (key == "B4F5" || key == "B4F6" || key == "B4F7") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = true;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4-1
            if (key == "B4F-1") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = true;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4-2
            if (key == "B4F-2") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = true;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4-3
            if (key == "B4F-3") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = true;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4-4
            if (key == "B4F-4") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = true;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4 0
            if (key == "B4F0") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = true;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 1
            if (key == "B3F1") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = true;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 2
            if (
              key == "B3F2" ||
              key == "B3F3" ||
              key == "B3F4" ||
              key == "B3F5" ||
              key == "B3F6" ||
              key == "B3F7" ||
              key == "B3F8" ||
              key == "B3F9" ||
              key == "B3F10" ||
              key == "B3F11"
            ) {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = true;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 12
            if (
              key == "B3F12" ||
              key == "B3F13" ||
              key == "B3F14" ||
              key == "B3F15" ||
              key == "B3F16" ||
              key == "B3F17" ||
              key == "B3F18" ||
              key == "B3F19"
            ) {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = true;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 20
            if (key == "B3F20") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = true;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 21
            if (key == "B3F21") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = true;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 22
            if (key == "B3F22") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = true;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 0
            if (key == "B3F0") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = true;
              this.treebim18 = false;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //4 rf
            if (key == "B4F9") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = true;
              this.treebim19 = false;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            //3 rf
            if (key == "B3F23") {
              this.treebim1 = false;
              this.treebim2 = false;
              this.treebim3 = false;
              this.treebim4 = false;
              this.treebim5 = false;
              this.treebim6 = false;
              this.treebim7 = false;
              this.treebim8 = false;
              this.treebim9 = false;
              this.treebim10 = false;
              this.treebim11 = false;
              this.treebim12 = false;
              this.treebim13 = false;
              this.treebim14 = false;
              this.treebim15 = false;
              this.treebim16 = false;
              this.treebim17 = false;
              this.treebim18 = false;
              this.treebim19 = true;
              this.cradevent1 = false;
              this.cradevent2 = false;
              this.cradevent3 = false;
            }
            arr.forEach(i => {
              i.forEach((v, k) => {
                res.data.forEach(id => {
                  if (id === k) {
                    this.alarmId.push(v);
                  }
                });
              });
            });
          }
        })
        .finally(() => {
          setTimeout(() => {
            this.clickMethod([this.none, ...this.alarmId]);
          }, 1200);
        });
    },
    //4 一层
    handleChange1: function(e) {
      console.log(e);
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this.ahu2IsShow = false;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
    },
    //4 二层
    handleChange2: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          if (res.data) {
            this.ahu2IsShow = true;
            this.videoIsShow = false;
            this.vavIsShow = false;
            this.ahu2Data = res.data;
          }
        });
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.vavIsShow = true;
                this.videoIsShow = false;
                this.ahu2IsShow = false;
              }
            });
          }
        });
      }
    },
    //4 三层
    handleChange3: function(e) {
      console.log(e);
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this.ahu1IsShow = false;
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        if (Number(e.dbid) == 3702) {
          this.ahu2IsShow = false;
          this.ahu1IsShow = true;
          this.vavIsShow = false;
          this.videoIsShow = false;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu1Data = res.data;
            }
          });
        }
        if (Number(e.dbid) == 3704) {
          this.ahu1IsShow = false;
          this.ahu2IsShow = true;
          this.vavIsShow = false;
          this.videoIsShow = false;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu2Data = res.data;
            }
          });
        }
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.ahu1IsShow = false;
                this.ahu2IsShow = false;
                this.videoIsShow = false;
                this.vavIsShow = true;
              }
            });
          }
        });
      }
    },
    //4 四层 八层
    handleChange4: function(e) {
      console.log(e);
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu1IsShow = false;
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        if (Number(e.dbid) == 3252) {
          this.videoIsShow = false;
          this.vavIsShow = false;
          this.ahu2IsShow = false;
          this.ahu1IsShow = true;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu1Data = res.data;
            }
          });
        }
        if (Number(e.dbid) == 3254) {
          this.videoIsShow = false;
          this.vavIsShow = false;
          this.ahu1IsShow = false;
          this.ahu2IsShow = true;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu2Data = res.data;
            }
          });
        }
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.videoIsShow = false;
                this.ahu1IsShow = false;
                this.ahu2IsShow = false;
                this.vavIsShow = true;
              }
            });
          }
        });
      }
    },
    //4 五层 六层 七层
    handleChange5: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu1IsShow = false;
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        if (Number(e.dbid) == 3250) {
          this.videoIsShow = false;
          this.vavIsShow = false;
          this.ahu2IsShow = false;
          this.ahu1IsShow = true;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu1Data = res.data;
            }
          });
        }
        if (Number(e.dbid) == 3252) {
          this.ahu1IsShow = false;
          this.ahu2IsShow = true;
          this.videoIsShow = false;
          this.vavIsShow = false;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu2Data = res.data;
            }
          });
        }
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.videoIsShow = false;
                this.ahu1IsShow = false;
                this.ahu2IsShow = false;
                this.vavIsShow = true;
              }
            });
          }
        });
      }
    },
    //4 负一层
    handleChange6: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
    },
    //4 负二层
    handleChange7: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
    },
    //4 负三层
    handleChange8: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
    },
    //4 负四层
    handleChange9: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
    },
    //4 整栋
    handleChange10: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.videoIsShow = false;
        this.clickMethod([0, Number(e.dbid)]);
        // getWarmAHUList(this.building, this.floor).then((res) => {
        //   console.log(12345, this.building, this.floor, res);
        //   if (res.data) {
        //     this.videoIsShow = false;
        //     this.vavIsShow = false
        //     this.ahu1IsShow = true;
        //     this.ahu1Data = res.data;
        //   }
        // });
      }
      if (e.type === "3") {
        this.videoIsShow = false;
        this.clickMethod([0, Number(e.dbid)]);
        // this.showDifferentFloorData(Number(e.dbid));
      }
    },
    //3 1
    handleChange11: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
    },
    //3 2
    handleChange12: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.videoIsShow = true;
        this.vavIsShow = false;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        if (Number(e.dbid) == 5643 || Number(e.dbid) == 5641) {
          this.ahu2IsShow = true;
          this.vavIsShow = false;
          this.videoIsShow = false;
          getWarmAHUList(this.building, this.floor).then(res => {
            if (res.data) {
              this.ahu2Data = res.data;
            }
          });
        }
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.videoIsShow = false;
                this.ahu2IsShow = false;
                this.vavIsShow = true;
              }
            });
          }
        });
      }
    },
    //3 12
    handleChange13: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.vavIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.videoIsShow = false;
                this.ahu2IsShow = false;
                this.vavIsShow = true;
              }
            });
          }
        });
      }
    },
    //3 20
    handleChange14: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.vavIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.videoIsShow = false;
                this.ahu2IsShow = false;
                this.vavIsShow = true;
              }
            });
          }
        });
      }
    },
    //3 21
    handleChange15: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.vavIsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.vavIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
      if (e.type === "3") {
        this.clickMethod([0, Number(e.dbid)]);
        const arr = ahuAndVavArr();
        const key = `B${this.building}F${this.floor}`;
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (Number(e.dbid) === v) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.vavIsShow = true;
                this.videoIsShow = false;
                this.ahu2IsShow = false;
              }
            });
          }
        });
      }
    },
    //3 22
    handleChange16: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
    },
    //3 0
    handleChange17: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.ahu2IsShow = false;
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
      if (e.type === "2") {
        this.clickMethod([0, Number(e.dbid)]);
        getWarmAHUList(this.building, this.floor).then(res => {
          console.log(12345, this.building, this.floor, res);
          if (res.data) {
            this.videoIsShow = false;
            this.ahu2IsShow = true;
            this.ahu2Data = res.data;
          }
        });
      }
      if (e.type === "3") {
        this.videoIsShow = false;
        this.ahu2IsShow = false;
        this.clickMethod([0, Number(e.dbid)]);
        // const arr = ahuAndVavArr();
        // const key = `B${this.building}F${this.floor}`;
        // const dataMap = arr[key];
        // dataMap[0].forEach((v, k) => {
        //   if (Number(e.dbid) === v) {
        //     getVAVList(this.building, this.floor).then((res) => {
        //       this.vavData = res.data[k];
        //       if (res.data[k]) {
        //         this.vavIsShow = true;
        //         this.videoIsShow = false;
        //         this.ahu2IsShow = false;
        //       }
        //     });
        //   }
        // });
      }
    },
    //4 rf
    handleChange18: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
    },
    //3 rf
    handleChange19: function(e) {
      if (e.name === "枪式摄像机") {
        this.cradevent1 = false;
        this.cradevent2 = true;
        this.cradevent3 = false;
      }
      if (e.name === "AHU") {
        this.cradevent1 = true;
        this.cradevent2 = false;
        this.cradevent3 = false;
      }
      if (e.name === "VAV") {
        this.cradevent1 = false;
        this.cradevent2 = false;
        this.cradevent3 = true;
      }
      console.log(e);
      if (e.type === "1") {
        this.clickMethod([0, Number(e.dbid)]);
        this.videoIsShow = true;
        this._getTurnRtspToRtmp(Number(e.dbid));
      }
    },
    _getTurnRtspToRtmp(id) {
      getTurnRtspToRtmp(id).then(res => {
        let data = res && res.data && res.data.split("/TV")[1];
        data =
          "http://101.132.169.245:90/live?port=1935&app=myTV&stream=TV" + data;
        this.url = data;
      });
    },
    clickMethod(arr) {
      console.log(12345789620, arr[1]);
      const obj = document.createElement("iframe");
      obj.name = "tmp_frame";
      obj.src =
        process.env.NODE_ENV === "development"
          ? "http://localhost/index.html?id=" +
            JSON.stringify([`B${this.building}F${this.floor}`, ...arr]) +
            "&type=eq_id"
          : "http://101.132.169.245/bim/index.html?id=" +
            JSON.stringify([`B${this.building}F${this.floor}`, ...arr]) +
            "&type=eq_id";
      obj.style.display = "none";
      document.body.appendChild(obj);
    },
    // 点击模型时
    callbackBim(id, child) {
      console.log(120, id, child);
      this.Id = id;
      console.log("fireControlBIM", id, typeof id);
      child.length >= 1 ? this.showCCTVTotalNum(id, child) : "";
      this.showHavcTotalNum(id);
      this.showAirTotalNum(id);
      this.showFireTotalNum(id);
      const camera = cameraId();
      const key = `B${this.building}F${this.floor}`;
      camera[key].forEach((val, key) => {
        if (id === String(val) && key) {
          this.videoIsShow = true;
          this._getTurnRtspToRtmp(key);
        }
      });
      if (this.building === 4 && this.floor === 1) {
        ahuIdB4F1.forEach((v, k) => {
          if (id !== String(v)) {
            this.ahu2IsShow = false;
          }
          if (id === String(v)) {
            getWarmAHUList(this.building, this.floor).then(res => {
              if (res.data && v === 5670) {
                this.ahu2IsShow = true;
                this.ahu2Data = res.data;
              }
            });
          }
        });
      } else {
        this.showDifferentFloorData(id);
      }
    },
    showFireTotalNum(id) {
      const obj = fireObj();
      const key = `B${this.building}F${this.floor}`;
      if (id !== String(fireNum[`fire${key}`])) {
        this.fireTotalNumShow = false;
      }
      if (id === String(fireNum[`fire${key}`])) {
        this.totalData.total = obj[key].size;
        this.totalData.breakdown = 0;
        this.totalData.normal = obj[key].size;
        if (obj[key].size > 0) {
          this.fireTotalNumShow = true;
        }
      }
    },
    showAirTotalNum(id) {
      const obj = airTotalNum();
      const key = `B${this.building}F${this.floor}`;
      if (id !== String(airNum[`air${key}`])) {
        this.airTotalNumShow = false;
      }
      if (id === String(airNum[`air${key}`])) {
        this.totalData.total = obj[key].size;
        this.totalData.breakdown = 0;
        this.totalData.normal = obj[key].size;
        if (obj[key].size > 0) {
          this.airTotalNumShow = true;
        }
      }
    },
    showHavcTotalNum(id) {
      const obj = havcTotalNum();
      const key = `B${this.building}F${this.floor}`;
      if (id !== String(havcNum[`havc${key}`])) {
        this.havcTotalNumShow = false;
      }
      if (id === String(havcNum[`havc${key}`])) {
        this.totalData.total = obj[key].size;
        this.totalData.breakdown = 0;
        this.totalData.normal = obj[key].size;
        if (obj[key].size > 0) {
          this.havcTotalNumShow = true;
        }
      }
    },
    showCCTVTotalNum(id, child) {
      const key = `B${this.building}F${this.floor}`;
      if (id !== String(cctvNum[`cctv${key}`])) {
        this.cctvTotalNumShow = false;
      }
      if (id === String(cctvNum[`cctv${key}`])) {
        const num = Math.random().toFixed() * 4 + 3;
        console.log(123, num);
        // const a = child.slice(3, 5).map((item) => item.displayValue);
        const a = child[num];
        const b = child[num - 2];
        const c = [b];
        this.clickMethod([this.none, ...c]);
        this.totalData.total = child.length;
        this.totalData.breakdown = c.length;
        this.totalData.normal = child.length - c.length;
        if (child.length > 0) {
          this.cctvTotalNumShow = true;
        }
      }
    },
    showDifferentFloorData(id) {
      const arr = ahuAndVavArr();
      const key = `B${this.building}F${this.floor}`;
      if (key === "B4F-1") {
        arr["B4F-1"].forEach((v, k) => {
          if (id !== String(v)) {
            this.coldAndHeatIsShow = false;
          }
          if (id === String(v) && (k === "che1" || k === "che2")) {
            const arr = [coldAndHeat1, coldAndHeat2];
            getColdSourceList("cd").then(res => {
              this.coldAndHeatData = [];
              arr.forEach(key => {
                key.forEach(item => {
                  item["value"] = res.data[item.id].value;
                });
              });
              if (k === "che1") {
                this.coldAndHeatData = [...coldAndHeat1];
                this.coldAndHeatIsShow = true;
              } else {
                this.coldAndHeatData = [...coldAndHeat2];
                this.coldAndHeatIsShow = true;
              }
            });
          } else if (id === String(v) && (k === "hhe1" || k === "hhe2")) {
            const arr = [coldAndHeat1, coldAndHeat2];
            getHeatSourceList("cd").then(res => {
              this.coldAndHeatData = [];
              const mapData = {};
              mapId.forEach((val, key) => {
                mapData[key] = {
                  value: res.data[val].value
                };
              });
              arr.forEach(key => {
                key.forEach(item => {
                  item["value"] = mapData[item.id].value;
                });
              });
              if (k === "hhe1") {
                this.coldAndHeatData = [...coldAndHeat1];
                this.coldAndHeatIsShow = true;
              } else {
                this.coldAndHeatData = [...coldAndHeat2];
                this.coldAndHeatIsShow = true;
              }
            });
          }
        });
      } else if (key === "B4F-2" || key === "B4F-3" || key === "B4F-4") {
        return;
      } else {
        const dataMap = arr[key];
        dataMap[0].forEach((v, k) => {
          if (id !== String(v)) {
            this.vavIsShow = false;
          }
          if (id === String(v)) {
            getVAVList(this.building, this.floor).then(res => {
              this.vavData = res.data[k];
              if (res.data[k]) {
                this.vavIsShow = true;
              }
            });
          }
        });
        dataMap[1].forEach((v, k) => {
          if (id !== String(v)) {
            this.ahu1IsShow = false;
            this.ahu2IsShow = false;
          }
          if (id === String(v)) {
            getWarmAHUList(this.building, this.floor).then(res => {
              // 处理id 不规则问题
              let handleData = {};
              const obj1 = {};
              const obj2 = {};
              if (this.building === 3 && this.floor < 10) {
                for (const item in res.data) {
                  if (item.indexOf(`UEC73${this.floor}61`) !== -1) {
                    const key = item.replace(
                      `UEC73${this.floor}61:`,
                      `AHU3-${this.floor}-1-`
                    );
                    const value = res.data[item];
                    obj2[key] = value;
                  } else {
                    obj1[item] = res.data[item];
                  }
                }
                handleData = { ...obj1, ...obj2 };
              } else if (
                this.building === 3 &&
                this.floor >= 10 &&
                this.floor < 20
              ) {
                for (const item in res.data) {
                  if (item.indexOf(`UEC72${this.floor - 10}61`) !== -1) {
                    const key = item.replace(
                      `UEC72${this.floor - 10}61:`,
                      `AHU3-${this.floor}-1-`
                    );
                    const value = res.data[item];
                    obj2[key] = value;
                  } else {
                    obj1[item] = res.data[item];
                  }
                }
                handleData = { ...obj1, ...obj2 };
              } else if (this.building === 3 && this.floor >= 20) {
                for (const item in res.data) {
                  if (item.indexOf(`UEC71${this.floor - 20}61`) !== -1) {
                    const key = item.replace(
                      `UEC71${this.floor - 20}61:`,
                      `AHU3-${this.floor}-1-`
                    );
                    const value = res.data[item];
                    obj2[key] = value;
                  } else {
                    obj1[item] = res.data[item];
                  }
                }
                handleData = { ...obj1, ...obj2 };
              } else {
                handleData = { ...res.data };
              }

              if (res.data && k === `B${this.building}F${this.floor}1`) {
                this.ahu1IsShow = true;
                this.ahu1Data = handleData;
              } else if (res.data && k === `B${this.building}F${this.floor}2`) {
                this.ahu2IsShow = true;
                this.ahu2Data = handleData;
              }
            });
          }
        });
      }
    },
    loadBim() {
      localStorage.removeItem("eventParams");
    },
    selectFloor(val) {
      this.floor = val;
      this.alarmId = [];
      this.videoIsShow = false;
      this.vavIsShow = false;
      this.ahu1IsShow = false;
      this.ahu2IsShow = false;
      this.airTotalNumShow = false;
      this.fireTotalNumShow = false;
      this.havcTotalNumShow = false;
      this.cctvTotalNumShow = false;
      this.coldAndHeatIsShow = false;
      this.totalData = {};
      setTimeout(() => {
        this.getDifferentBim();
      }, 0);
    },
    selectBuilding(val) {
      this.building === 4 ? this.getFloor3() : this.getFloor4();
      this.floor = 4;
      this.building = val;
      this.alarmId = [];
      this.videoIsShow = false;
      this.vavIsShow = false;
      this.ahu1IsShow = false;
      this.ahu2IsShow = false;
      this.airTotalNumShow = false;
      this.fireTotalNumShow = false;
      this.havcTotalNumShow = false;
      this.cctvTotalNumShow = false;
      this.coldAndHeatIsShow = false;
      this.totalData = {};
      setTimeout(() => {
        this.getDifferentBim();
      }, 0);
    },
    getFloor4() {
      const f = new Array(22).fill(-1).map((item, index) => ({
        label: `第${index + 1}层`,
        value: index + 1
      }));
      this.floors = [
        { label: "整栋", value: 0 },
        ...f,
        { label: "RF", value: 23 }
      ];
    },
    getFloor3() {
      const f = new Array(8).fill(-1).map((item, index) => ({
        label: `第${index + 1}层`,
        value: index + 1
      }));
      this.floors = [
        { label: "负四层", value: -4 },
        { label: "负三层", value: -3 },
        { label: "负二层", value: -2 },
        { label: "负一层", value: -1 },
        { label: "整栋", value: 0 },
        ...f,
        { label: "RF", value: 9 }
      ];
    },
    closeInfo() {
      this.vavIsShow = false;
      this.ahu1IsShow = false;
      this.ahu2IsShow = false;
      this.coldAndHeatIsShow = false;
    },
    closeVideo() {
      this.videoIsShow = false;
      this.url = "";
    },
    closeTotalNum() {
      this.airTotalNumShow = false;
      this.fireTotalNumShow = false;
      this.havcTotalNumShow = false;
      this.cctvTotalNumShow = false;
    },
    mouseLeave(e) {
      this.$refs.isSelectBuild.blur();
      this.$refs.isSelectFloor.blur();
    },
    test() {
      var a = document.getElementsByClassName("el-input__inner");
      [].slice.call(a).forEach(item => {
        item.style.background = "#fff";
        item.style.border = "1px solid #646464";
        item.style.borderRadius = "20px";
        item.style.color = "black";
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  background-color: #e3e3e3;
  height: calc(93vh);
}

.el-scrollbar {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-y: auto;
}
.el-tabs {
  position: absolute;
  height: 61%;
  width: 13%;
}
.el-tree /deep/ .el-tree-node__label {
  font-size: 14px;
}
.el-tree /deep/ .el-tree-node__content {
  height: 55px;
  line-height: 55px;
}
.el-tree /deep/ .el-tree-node__content:hover {
  background-color: #c4d1e4;
}
.mainFrame {
  position: absolute;
  right: 0;
  width: 87%;
  height: 100%;
  top: 0;
}
.selectbtn {
  display: flex;
  // position: fixed;
  // left: 13vw;
  // top: 1vh;
  width: 13%;
  height: 10%;
}
.el-select /deep/ .el-input {
  margin-top: 5px;
}
.sbdcl {
  position: absolute;
  bottom: 0;
  width: 13%;
  height: 39%;
  font-size: 14px;
  color: #606266;
}
.el-input--medium {
  font-weight: 900;
  font-size: 20px;
}
.el-tag {
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  margin-top: 15px;
}
.deviceInfo {
  position: absolute;
  left: 55vw;
  top: 5vh;
  padding: 10px;
  padding-top: 30px;
  background-color: #1f2123;
  cursor: move;
  z-index: 3000;
  div {
    margin-bottom: 5px;
  }
}
.devvav {
  width: 300px;
  height: 300px;
  div {
    margin-bottom: 25px;
    font-size: 25px;
  }
}
.devahu {
  width: 300px;
  height: 300px;
  font-size: 24px;
}
.firedev div {
  margin-top: 10px;
}
.total-num {
  position: absolute;
  left: 40vw;
  top: 5vh;
  padding: 10px;
  padding-top: 30px;
  // width: 10%;
  // height: 20%;
  background-color: #1f2123;
  cursor: move;
  z-index: 3000;
}
.video-js {
  position: absolute;
  right: 5vw;
  top: 5vh;
  width: 30%;
  height: 45%;
  cursor: move;
  z-index: 3000;
  // background-color: #303133;
}
.drag {
  width: 100%;
  height: 500px;
  background-color: #fff;
}
.drag_box {
  width: 150px;
  height: 90px;
  border: 1px solid #666;
  background-color: #ccc;
  /* 使用定位，脱离文档流 */
  position: relative;
  top: 100px;
  left: 100px;
  /* 鼠标移入变成拖拽手势 */
  cursor: move;
  z-index: 3000;
}

/deep/.select-option {
  background-color: #ffffff;
  border-radius: 0.08rem;
  border: solid 0.06rem #1c395d;
  font-family: PingFangSC-Regular;
  .el-select-dropdown__item.selected {
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: rgba(74, 141, 253, 1);
  }
  li {
    background: transparent;
    color: black;
    font-size: 0.28rem;
  }
  .el-select-dropdown__item:hover,
  .el-select-dropdown__item.hover {
    background-color: rgba(110, 147, 206, 0.2);
    margin-right: 1px;
  }
  .popper__arrow::after {
    border-bottom-color: #021323;
  }
  .popper__arrow {
    border-bottom-color: #021323;
  }
  .el-select-dropdown__empty {
    padding: 0.2rem;
    font-size: 0.28rem;
  }
}
.ahref {
  display: block;
  position: absolute;
  width: 76px;
  border-radius: 20px;
  border: 1px solid #646464;
  padding: 12px 12px;
  line-height: 1;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  top: 0;
  z-index: 9;
  left: -80px;
  text-decoration: none;
  color: #fff;
  background-color: #021323;
}
.ahref1 {
  left: -80px;
}
.ahref2 {
  left: 280px;
}
.ahref3 {
  left: 380px;
}
.ahref4 {
  left: 480px;
}
.ahref5 {
  left: 580px;
}
.ahref6 {
  left: 680px;
}
.xinxitishi {
  position: absolute;
  width: 400px;
  height: 150px;
  top: 20px;
  left: 950px;
  background: #021323;
  border-radius: 10px;
  border: 1px solid #646464;
  display: none;
}
.xinxitishi2 {
  display: none;
}
.el-input__inner {
  background-color: red !important;
}
.el-input {
  input {
    background-color: red !important;
  }
}
</style>
