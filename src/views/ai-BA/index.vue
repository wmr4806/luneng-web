<template>
  <div>
    <el-card class="card-bgc" style="background: #18111f;color: #fff;border:none">
      <div class="container">
        <el-row style="padding: 1rem 0">
          <span style="margin-right: 1rem">请选择所在楼号:</span>
          <el-select v-model="building" placeholder="请选择" @change="selectBuilding">
            <el-option
              v-for="({ label,value }) in buildings"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
          <span style="margin-right: 1rem">请选择所在楼层:</span>
          <el-select v-model="floor" placeholder="请选择" popper-class="select-test" @change="selectFloor">
            <el-option
              v-for="({ label,value }) in floors"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
          <el-tooltip placement="top">
            <div slot="content">
              系统默认4月1号到11月1号为夏季模式,可以选择手动调换模式
            </div>
            <span style="margin:0 1rem">
              请选择工作模式：
            </span>
          </el-tooltip>
          <el-select v-model="mode" placeholder="请选择" @change="changeSelectMode">
            <el-option
              v-for="({ label,value }) in modes"
              :key="value"
              :label="label"
              :value="value"
            />
          </el-select>
          <el-divider />
        </el-row>
      </div>
      <div v-loading="loading" class="content">
        <div class="content-item">
          <div style="position:relative;width:25%;margin-top:7%;margin-left:30%">
            <el-tooltip v-if="building===2 && floor === 2" placement="right-start">
              <div slot="content" style="font-size:18px">
                该楼层只有AHU1
              </div>
              <el-image
                :src="require(`@/assets/ba/pic_jq_2.png`)"
                style="position:absolute;z-index:1;width:60%;margin-top:-2%"
                fit="fill"
              />
            </el-tooltip>
            <el-tooltip v-else placement="right-start">
              <div slot="content" style="font-size:18px">
                电机启动：{{ warmAHUList[`AHU${building}-${floor}-2-C_CV`] && warmAHUList[`AHU${building}-${floor}-2-C_CV`].value === 'true' ? '已启动' : '未启动' || '' }} <br>
                电机运行：{{ warmAHUList[`AHU${building}-${floor}-2-SF_CV`] && warmAHUList[`AHU${building}-${floor}-2-SF_CV`].value >=20 ? '正在运行' : '未运行' || '' }}<br>
                电机故障：{{ warmAHUList[`AHU${building}-${floor}-2-ALM_CV`] && warmAHUList[`AHU${building}-${floor}-2-ALM_CV`].value === 'false' ? '无故障' : '有故障' || '' }}<br>
                频率反馈：{{ warmAHUList[`AHU${building}-${floor}-2-SF_CV`] && warmAHUList[`AHU${building}-${floor}-2-SF_CV`].value >= 20 ? warmAHUList[`AHU${building}-${floor}-2-SF_CV`].value : 0 }}
              </div>
              <el-image
                :src="require(`@/assets/ba/${fanSpeed2}`)"
                style="position:absolute;z-index:1;width:60%;margin-top:-2%"
                fit="fill"
              />
            </el-tooltip>
            <span style="position:absolute;left:40%;top:-30px;font-size:16px;font-weight:800">AHU2</span>
            <el-image
              style="position:absolute;z-index:1;width:12%;left:-10%;margin-top:12%;"
              :src="require(`@/assets/ba/gif_icon_arrow.gif`)"
              fit="fill"
            />
            <el-image
              style="position:absolute;z-index:1;width:12%;left:-3%;margin-top:-2%;transform:rotate(80deg)"
              :src="require(`@/assets/ba/gif_icon_arrow.gif`)"
              fit="fill"
            />
            <el-image
              class="blue"
              style="position:absolute;z-index:1;width:12%;left:62%;margin-top:4%;transform:rotate(-10deg)"
              :src="require(`@/assets/ba/gif_icon_arrow.gif`)"
              fit="fill"
            />
            <div style="position:absolute;left:-50%;margin-top:-16%;font-size:14px;font-weight:400">
              <div v-for="(item, index) in tags.returnWind" :key="index + 'returnWind2'">
                <div>
                  {{ item.label }}：
                  <span style="font-weight: 600;font-size:18px">{{ wind.returnWind2[index] || '' }}{{ item.unit }}</span>
                </div>
              </div>
            </div>
            <div style="position:absolute;left:-70%;margin-top:7%;font-size:14px;font-weight:400">
              <div v-for="(item, index) in tags.newWind" :key="index + 'newWind2'">
                <div>
                  {{ item.label }}：
                  <span style="font-weight: 600;font-size:18px">{{ wind.newWind2[index] || '' }}{{ wind.newWind2[index] ==='N/a' ? '' : item.unit }}</span>
                </div>
              </div>
            </div>
            <div style="position:absolute;width:100%;left:80%;margin-top:-7%;font-size:14px;font-weight:400">
              <div v-for="(item, index) in tags.diliverWind" :key="index + 'diliverWind2'">
                <div>
                  {{ item.label }}：
                  <span style="font-weight: 600;font-size:18px">{{ wind.diliverWind2[index] || '' }}{{ item.unit }}</span>
                </div>
              </div>
            </div>
          </div>
          <div style="position:relative;width:25%;margin-top:15%;margin-left:30%">
            <el-tooltip v-if="building ===4 && floor === 1" placement="right-start">
              <div slot="content" style="font-size:18px">
                该楼层只有AHU2
              </div>
              <el-image
                :src="require(`@/assets/ba/pic_jq_2.png`)"
                style="position:absolute;z-index:1;width:60%;"
                fit="fill"
              />
            </el-tooltip>
            <el-tooltip v-else placement="right-start">
              <div slot="content" style="font-size:18px">
                电机启动：{{ warmAHUList[`AHU${building}-${floor}-1-C_CV`] && warmAHUList[`AHU${building}-${floor}-1-C_CV`].value === 'true' ? '已启动' : '未启动' || '' }} <br>
                电机运行：{{ warmAHUList[`AHU${building}-${floor}-1-SF_CV`] && warmAHUList[`AHU${building}-${floor}-1-SF_CV`].value >=20 ? '正在运行' : '未运行' || '' }}<br>
                电机故障：{{ warmAHUList[`AHU${building}-${floor}-1-ALM_CV`] && warmAHUList[`AHU${building}-${floor}-1-ALM_CV`].value === 'false' ? '无故障' : '有故障' || '' }}<br>
                频率反馈：{{ warmAHUList[`AHU${building}-${floor}-1-SF_CV`] && warmAHUList[`AHU${building}-${floor}-1-SF_CV`].value >= 20 ? warmAHUList[`AHU4-${floor}-1-SF_CV`].value : 0 }}
              </div>
              <el-image
                :src="require(`@/assets/ba/${fanSpeed1}`)"
                style="position:absolute;z-index:1;width:60%;"
                fit="fill"
              />
            </el-tooltip>
            <span style="position:absolute;left:40%;top:-20px;font-size:16px;font-weight:800">AHU1</span>
            <el-image
              style="position:absolute;z-index:1;width:12%;left:-10%;margin-top:12%;"
              :src="require(`@/assets/ba/gif_icon_arrow.gif`)"
              fit="fill"
            />
            <el-image
              style="position:absolute;z-index:1;width:12%;left:-3%;margin-top:-2%;transform:rotate(80deg)"
              :src="require(`@/assets/ba/gif_icon_arrow.gif`)"
              fit="fill"
            />
            <el-image
              class="blue"
              style="position:absolute;z-index:1;width:12%;left:62%;margin-top:4%;transform:rotate(-10deg)"
              :src="require(`@/assets/ba/gif_icon_arrow.gif`)"
              fit="fill"
            />
            <div style="position:absolute;left:-50%;margin-top:-14%;font-size:14px;font-weight:400">
              <div v-for="(item, index) in tags.returnWind" :key="index + 'returnWind1'">
                <div>
                  {{ item.label }}：
                  <span style="font-weight: 600;font-size:18px">{{ wind.returnWind1[index] || '' }}{{ item.unit }}</span>
                </div>
              </div>
            </div>
            <div style="position:absolute;left:-70%;margin-top:7%;font-size:14px;font-weight:400">
              <div v-for="(item, index) in tags.newWind" :key="index + 'newWind1'">
                <div>
                  {{ item.label }}：
                  <span style="font-weight: 600;font-size:18px">{{ wind.newWind1[index] || '' }}{{ wind.newWind1[index] ==='N/a' ? '' : item.unit }}</span>
                </div>
              </div>
            </div>
            <div style="position:absolute;width:100%;left:80%;margin-top:-7%;font-size:14px;font-weight:400">
              <div v-for="(item, index) in tags.diliverWind" :key="index + 'diliverWind1'">
                <div>
                  {{ item.label }}：
                  <span style="font-weight: 600;font-size:18px">{{ wind.diliverWind1[index] || '' }}{{ item.unit }}</span>
                </div>
              </div>
            </div>
            <div style="position:absolute;width:45%;left:-81%;margin-top:42%;font-size:14px;font-weight:400">
              <el-tooltip placement="right-start">
                <div slot="content" style="font-size:18px">板翘热换热器</div>
                <el-image
                  :src="require(`@/assets/ba/heat.png`)"
                  style="position:absolute;z-index:2;"
                  fit="fill"
                  @load="imgLoaded"
                />
              </el-tooltip>
              <span style="position:absolute;left:25%;top:90px;font-size:18px;font-weight:800">板翘热换热器</span>
            </div>
            <div style="position:absolute;width:45%;left:-78%;margin-top:99%;font-size:14px;font-weight:400">
              <el-tooltip placement="right-start">
                <div slot="content" style="font-size:18px">板翘热换热器</div>
                <el-image
                  :src="require(`@/assets/ba/heat.png`)"
                  style="position:absolute;z-index:10;"
                  fit="fill"
                />
              </el-tooltip>
              <span style="position:absolute;left:25%;top:90px;font-size:18px;font-weight:800">板翘热换热器</span>
            </div>
          </div>
          <div style="position:relative;width:100%;margin-top:-21%;margin-left:20%;">
            <el-image
              :src="require(`@/assets/ba/${showImg2}_pipe_1.${ tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:80%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${ tempAHUState1 || tempAHUState2 ? 'd' : 's'}_k_pipe_3.${ tempAHUState1 || tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:4%;margin-left:80%"
              fit="fill"
            />
            <!-- <el-image
              :src="require(`@/assets/ba/${selectMode}_d_k_pipe_3_1.png`)"
              style="position:absolute;z-index:1;width:30%;margin-left:67%;margin-top:0%"
              fit="fill"
            /> -->
            <el-image
              :src="require(`@/assets/ba/${showImg1}_pipe_5.${ rPump1.open || rPump2.open || rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:28%;;margin-top:11%;margin-left:45%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${rPump1.open || rPump2.open || rPump3.open ? 'd' : 's'}_p_pipe_6.${ rPump1.open || rPump2.open || rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:4%;;margin-top:12.8%;margin-left:72.8%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg2}_pipe_2_1.${ tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:1%;margin-left:3%;margin-top:0.8%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg2}_pipe_2_1.${ tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:1%;margin-left:16%;margin-top:0.8%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg2}_pipe_2_1.${ tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:1%;margin-left:45%;margin-top:0.8%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg3}_pipe_4.${ tempAHUState1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:84%;margin-top:16%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg3}_pipe_2.${ tempAHUState1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:-1;width:1%;margin-left:3%;margin-top:16.8%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg3}_pipe_2.${ tempAHUState1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:-1;width:1%;margin-left:16%;margin-top:16.8%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg3}_pipe_2.${ tempAHUState1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:-1;width:1%;margin-left:45%;margin-top:16.8%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showImg1}_pipe_7.${ rPump1.open || rPump2.open || rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:31%;;margin-top:26.5%;margin-left:45%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showrPump1}_pipe_13.${ rPump1.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:10%;;margin-top:36%;margin-left:66%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${rPump1.open ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:0;width:3%;;margin-top:34%;margin-left:70%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showrPump1}_pipe_11_1.${ rPump1.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:7%;;margin-top:32%;margin-left:57%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showrPump2}_pipe_13_1.${ rPump2.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:10%;;margin-top:43%;margin-left:66%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${rPump2.open ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:0;width:3%;;margin-top:41%;margin-left:70%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showrPump2}_pipe_11.${ rPump2.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:7%;;margin-top:39.2%;margin-left:57%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showrPump3}_pipe_15.${ rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:4.8%;;margin-top:43.5%;margin-left:71.956%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${rPump2.open || rPump3.open ? 'd' : 's'}_p_pipe_6_2.${ rPump2.open || rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:2;width:0.95%;;margin-top:36.6%;margin-left:75.85%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${showrPump3}_pipe_14.${ rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:5%;;margin-top:50.2%;margin-left:66%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${rPump3.open ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:2;width:3%;;margin-top:48.2%;margin-left:70%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${rPump2.open || rPump3.open ? 'd' : 's'}_p_pipe_10.${ rPump2.open || rPump3.open ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:-1;width:8%;;margin-top:32%;margin-left:56.1%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${ tempAHUState1 || tempAHUState2 ? 'd' : 's'}_k_pipe_16.${ tempAHUState1 || tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:35%;;margin-top:50.2%;margin-left:49%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${ tempAHUState1 || tempAHUState2 ? 'd' : 's'}_k_pipe_17_2.${ tempAHUState1 || tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:4%;;margin-top:38.2%;margin-left:45.2%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${ tempAHUState1 || tempAHUState2 ? 'd' : 's'}_k_pipe_17_1.${ tempAHUState1 || tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:13%;;margin-top:34.1%;margin-left:33.13%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${midHand1 || midHand2 ? 'd' : 's'}_p_pipe_12_1.${ midHand1 || midHand2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:12%;;margin-top:32%;margin-left:45%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${midHand1 ? 'd' : 's'}_p_pipe_12_3.${ midHand1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:6%;;margin-top:32%;margin-left:42.2%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${midHand1 ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:1;width:3%;;margin-top:30%;margin-left:40%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${midHand1 ? 'd' : 's'}_p_pipe_12_2.${ midHand1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:8%;;margin-top:32%;margin-left:33%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${midHand2 ? 'd' : 's'}_p_pipe_8_2.${ midHand2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:1;width:7.6%;;margin-top:46.3%;margin-left:33%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${midHand2 ? 'd' : 's'}_p_pipe_8_1.${ midHand2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:-1;width:7%;;margin-top:32%;margin-left:42%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${midHand2 ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:1;width:3%;;margin-top:44.5%;margin-left:40%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${ tempAHUState1 || tempAHUState2 ? 'd' : 's'}_k_pipe_18.${ tempAHUState1 || tempAHUState2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:11.5%;;margin-top:48.5%;margin-left:34%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_d_k_pipe_21.gif`)"
              style="position:absolute;z-index:1;width:23%;;margin-top:32%;margin-left:0%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_d_k_pipe_9.gif`)"
              style="position:absolute;z-index:0;width:17%;;margin-top:32.5%;margin-left:6.5%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${leftHand1 ? 'd' : 's'}_p_pipe_20_2.${ leftHand1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:5%;;margin-top:34%;margin-left:18%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${leftHand1 ? 'd' : 's'}_p_pipe_19.${ leftHand1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:6.5%;;margin-top:34%;margin-left:9%"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${leftHand1 ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:0;width:3%;;margin-top:33.5%;margin-left:15%;transform:rotate(180deg)"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${leftHand2 ? 'd' : 's'}_p_pipe_20_2.${ leftHand2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:0;width:5%;;margin-top:48.3%;margin-left:18.9%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${leftHand2 ? 'd' : 's'}_p_pipe_20_3.${ leftHand2 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:9;width:7.1%;;margin-top:48.33%;margin-left:9.5%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/${selectMode}_${leftHand2 || leftHand1 ? 'd' : 's'}_p_pipe_20_1.${ leftHand2 || leftHand1 ? 'gif' : 'png' }`)"
              style="position:absolute;z-index:8;width:15%;;margin-top:48.3%;margin-left:2%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/icon_handle_${leftHand2 ? 'green' : 'red'}.png`)"
              style="position:absolute;z-index:9;width:3%;;margin-top:48%;margin-left:16%;transform:rotate(180deg)"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/pressure.png`)"
              style="position:absolute;z-index:1;width:2%;;margin-top:3%;margin-left:-12%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/flow.png`)"
              style="position:absolute;z-index:1;width:2%;;margin-top:7%;margin-left:-12%;"
              fit="fill"
            />
            <el-image
              :src="require(`@/assets/ba/temputer.png`)"
              style="position:absolute;z-index:1;width:2%;;margin-top:11%;margin-left:-12%;"
              fit="fill"
            />
            <el-tooltip v-for="(item, index) in showPumpData" :key="index + 'showPumpData'" class="show-pump" :style="item.style" placement="right-start">
              <div slot="content" style="font-size:18px">运行频率：{{ item && item.data[`CP4#-${index +1 }-SF_CV`] && item.data[`CP4#-${index +1}-SF_CV`].value }}
                <br>故障状况：{{ item && item.data[`CP4#-${index + 1}-ALM_CV`] && item.data[`CP4#-${index +1}-ALM_CV`].value === 'false' ? '正常' : '有故障' }}
                <br>运行状况：{{ item && item.data[`CP4#-${index + 1}-S_CV`] && item.data[`CP4#-${index +1}-S_CV`].value === 'true' ? '正在运行' : '未运行' }}</div>
              <el-image
                :src="require(`@/assets/ba/pump_${item.data[`CP4#-${index + 1}-S_CV`].value === 'true' ? 'mid' : 'stop'}.${ item.data[`CP4#-${index + 1}-S_CV`].value === 'true' ? 'gif' : 'png' }`)"
                style="position:absolute;z-index:1;width:4%;;margin-top:34%;margin-left:62%"
                fit="fill"
              />
            </el-tooltip>
            <el-image
              v-for="(item, index) in img"
              :key="index + 'img'"
              class="show-img"
              :style="item.style"
              :src="require(`@/assets/ba/${item.value}.png`)"
              fit="fill"
            />
            <span v-for="(item, index) in legend" :key="index + 'legend'" class="legend" :style="item.style"> {{ item.value }}</span>
            <span v-for="(item, index) in showMData1" :key="index +'showMData'" class="show-data" :style="item.style"> {{ item.value | toFixedNum }}m/s</span>
            <span v-for="(item, index) in showPData1" :key="index +'showPData'" class="show-data" :style="item.style"> {{ item.value | toFixedNum }}Pa</span>
            <span v-for="(item, index) in showTData1" :key="index +'showTData'" class="show-data" :style="item.style"> {{ item.value | toFixedNum }}℃</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { getWarmAHUList, getHeatSourceList, getColdSourceList } from '@/api/data'
import { mapId, mapIdHeat1, mapIdHeat2, mapIdCold1, mapIdCold2 } from './mapId'
export default {
  name: 'AirConditioner',
  components: {},
  filters: {
    toFixedNum(val) {
      return Number(val).toFixed(1)
    }
  },
  data() {
    return {
      wind: {
        newWind1: ['N/a', 'N/a', ''],
        newWind2: ['N/a', 'N/a', ''],
        returnWind1: [],
        returnWind2: [],
        diliverWind1: [],
        diliverWind2: []
      },
      loading: true,
      isShow: false,
      floor: 3,
      floors: [],
      building: 4,
      buildings: [{
        label: `1号楼`,
        value: 1
      }, {
        label: `2号楼`,
        value: 2
      }, {
        label: `3号楼`,
        value: 3
      }, {
        label: `4号楼`,
        value: 4
      }
      ],
      timeId: '',
      mode: 0,
      modes: [
        { value: 0, label: '夏季模式' },
        { value: 1, label: '冬季模式' }
        // { value: 2, label: '过渡模式' }
      ],
      fan1: {
        open: true,
        speed: 1
      },
      fan2: {
        open: true,
        speed: 1
      },
      rPump1: {
        open: false,
        speed: 2
      },
      rPump2: {
        open: false,
        speed: 1
      },
      rPump3: {
        open: false,
        speed: 2
      },
      midHand1: false,
      midHand2: false,
      leftHand1: true,
      leftHand2: true,
      warmAHUList: [],
      tempAHUState1: this.pumpState,
      tempAHUState2: this.pumpState,
      obj: {},
      showPData1: {},
      showTData1: {},
      showMData1: {}
    }
  },
  computed: {
    pumpState() {
      return this.rPump1.open || this.rPump2.open || this.rPump3.open
    },
    tags() {
      return {
        newWind: [{ label: '新风温度', unit: '°C' }, { label: '新风湿度', unit: '%' }, { label: '新风阀开度', unit: '%' }],
        returnWind: [{ label: '回风温度', unit: '°C' }, { label: '回风湿度', unit: '%' }, { label: 'CO2浓度', unit: 'ppm' }],
        diliverWind: [{ label: '送风温度', unit: '°C' }, { label: '送风湿度', unit: '%' }, { label: '送风压力', unit: 'Pa' }]
      }
    },
    img() {
      return [
        {
          value: 'pressure',
          style: {
            'margin-top': '30.5%', 'margin-left': '1%'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '30.2%', 'margin-left': '5%'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '30.5%', 'margin-left': '11%'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '30.2%', 'margin-left': '18%'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '30.5%', 'margin-left': '36%'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '30.2%', 'margin-left': '45%'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '30.2%', 'margin-left': '52%'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '32%', 'margin-left': '76.8%', 'transform': 'rotate(90deg)'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '34.8%', 'margin-left': '12%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '35%', 'margin-left': '20%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '35.1%', 'margin-left': '36%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '35%', 'margin-left': '41%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '39%', 'margin-left': '49%', 'transform': 'rotate(90deg)'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '44.8%', 'margin-left': '11%'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '44.5%', 'margin-left': '18%'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '44.8%', 'margin-left': '36%'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '46.8%', 'margin-left': '2%'
          }
        }, {
          value: 'flow',
          style: {
            'margin-top': '49.2%', 'margin-left': '3%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '49.2%', 'margin-left': '7%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '49.1%', 'margin-left': '12%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '49.2%', 'margin-left': '20.5%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '49.4%', 'margin-left': '36%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '49.3%', 'margin-left': '41%', 'transform': 'rotate(180deg)'
          }
        }, {
          value: 'pressure',
          style: {
            'margin-top': '51.8%', 'margin-left': '49%'
          }
        }, {
          value: 'flow',
          style: {
            'margin-top': '51.8%', 'margin-left': '54%'
          }
        }, {
          value: 'temputer',
          style: {
            'margin-top': '51.5%', 'margin-left': '59%'
          }
        }
      ]
    },
    legend() {
      return [
        {
          value: '压力表',
          style: {
            'margin-top': '3%'
          }
        }, {
          value: '流量计',
          style: {
            'margin-top': '7%'
          }
        }, {
          value: '温度计',
          style: {
            'margin-top': '11%'
          }
        }
      ]
    },
    showPData() {
      return [
        {
          value: '200',
          id: '4#C-FRW-P_CV',
          style: {
            'margin-top': '29%', 'margin-left': '0%'
          }
        }, {
          value: '120',
          id: 'CP4#-SP-2_CV',
          style: {
            'margin-top': '29%', 'margin-left': '11%'
          }
        }, {
          value: '0',
          id: 'CP4#-SP-4_CV',
          style: {
            'margin-top': '29%', 'margin-left': '36%'
          }
        }, {
          value: '32',
          id: '4#C-SOW-P_CV',
          style: {
            'margin-top': '32%', 'margin-left': '78.8%'
          }
        }, {
          value: '110',
          id: 'CP4#-SP-1_CV',
          style: {
            'margin-top': '37%', 'margin-left': '20%'
          }
        }, {
          value: '116',
          id: 'CP4#-SP-3_CV',
          style: {
            'margin-top': '37%', 'margin-left': '36%'
          }
        }, {
          value: '170',
          id: 'CP4#-SP-6_CV',
          style: {
            'margin-top': '43.5%', 'margin-left': '11%'
          }
        }, {
          value: '80',
          id: 'CP4#-SP-8_CV',
          style: {
            'margin-top': '43.5%', 'margin-left': '36%'
          }
        }, {
          value: '117',
          id: '4#C-FOW-P_CV',
          style: {
            'margin-top': '45.2%', 'margin-left': '2%'
          }
        }, {
          value: '0',
          id: 'CP4#-SP-5_CV',
          style: {
            'margin-top': '51.1%', 'margin-left': '20.5%'
          }
        }, {
          value: '15',
          id: 'CP4#-SP-7_CV',
          style: {
            'margin-top': '51.3%', 'margin-left': '36%'
          }
        }, {
          value: '47',
          id: '4#C-SRW-P_CV',
          style: {
            'margin-top': '50.5%', 'margin-left': '49%'
          }
        }
      ]
    },
    showTData() {
      return [
        {
          value: '21',
          id: '4#C-FRW-T_CV',
          style: {
            'margin-top': '29%', 'margin-left': '5%'
          }
        }, {
          value: '18.6',
          id: 'CP4#-SWT-2_CV',
          style: {
            'margin-top': '29%', 'margin-left': '18%'
          }
        }, {
          value: '0',
          id: 'CP4#-SWT-4_CV',
          style: {
            'margin-top': '30.5%', 'margin-left': '47%'
          }
        }, {
          value: '22',
          id: '4#C-SOW-T_CV',
          style: {
            'margin-top': '30.5%', 'margin-left': '54%'
          }
        }, {
          value: '11',
          id: 'CP4#-SWT-1_CV',
          style: {
            'margin-top': '37%', 'margin-left': '12%'
          }
        }, {
          value: '18',
          id: 'CP4#-SWT-3_CV',
          style: {
            'margin-top': '37.2%', 'margin-left': '41%'
          }
        }, {
          value: '21.6',
          id: 'CP4#-RWT-4_CV',
          style: {
            'margin-top': '39.4%', 'margin-left': '51%'
          }
        }, {
          value: '21',
          id: 'CP4#-RWT-2_CV',
          style: {
            'margin-top': '43%', 'margin-left': '18%'
          }
        }, {
          value: '13',
          id: '4#C-FOW-T_CV',
          style: {
            'margin-top': '51.3%', 'margin-left': '7%'
          }
        }, {
          value: '0',
          id: 'CP4#-RWT-1_CV',
          style: {
            'margin-top': '51.3%', 'margin-left': '12%'
          }
        }, {
          value: '17',
          id: 'CP4#-RWT-3_CV',
          style: {
            'margin-top': '51.3%', 'margin-left': '41%'
          }
        }, {
          value: '22',
          id: '4#C-SRW-T_CV',
          style: {
            'margin-top': '50.1%', 'margin-left': '58%'
          }
        }
      ]
    },
    showMData() {
      return [
        {
          value: '2',
          xxx: this.warmAHUList,
          id: 'CP4#-ZG-02-WF_CV',
          style: {
            'margin-top': '50.5%', 'margin-left': '53%'
          }
        }, {
          value: '1',
          id: 'CP4#-ZG-01-WF_CV',
          style: {
            'margin-top': '51%', 'margin-left': '1%'
          }
        }
      ]
    },
    showPumpData() {
      return [
        {
          data: { 'CP4#-1-S_CV': { value: '1' }, 'CP4#-1-ALM_CV': { value: '1' }, 'CP4#-1-SF_CV': { value: '1' }},
          id: 'CP4#-1-S_CV',
          src: 'temp',
          style: {
            'margin-top': '34%', 'margin-left': '62%'
          }
        },
        {
          data: { 'CP4#-2-S_CV': { value: '1' }, 'CP4#-2-ALM_CV': { value: '1' }, 'CP4#-2-SF_CV': { value: '1' }},
          id: 'CP4#-ZG-02-WF_CV',
          src: 'temp',
          style: {
            'margin-top': '41%', 'margin-left': '62%'
          }
        },
        {
          data: { 'CP4#-3-S_CV': { value: '1' }, 'CP4#-3-ALM_CV': { value: '1' }, 'CP4#-3-SF_CV': { value: '1' }},
          id: 'CP4#-ZG-02-WF_CV',
          src: 'temp',
          style: {
            'margin-top': '48%', 'margin-left': '62.1%'
          }
        }
      ]
    },
    selectMode() {
      return this.mode === 0 ? 's' : 'w'
    },
    shutAllPump() {
      const { rPump1, rPump2, rPump3 } = this
      return rPump1.open || rPump2.open || rPump3.open ? 'd' : 's'
    },
    showImg1() {
      return `${this.selectMode}_${this.shutAllPump}_p`
    },
    shutrPump1() {
      return this.rPump1.open ? 'd' : 's'
    },
    showrPump1() {
      return `${this.selectMode}_${this.shutrPump1}_p`
    },
    shutrPump2() {
      return this.rPump2.open ? 'd' : 's'
    },
    showrPump2() {
      return `${this.selectMode}_${this.shutrPump2}_p`
    },
    shutrPump3() {
      return this.rPump3.open ? 'd' : 's'
    },
    showrPump3() {
      return `${this.selectMode}_${this.shutrPump3}_p`
    },
    showImg2() {
      return `${this.selectMode}_${this.tempAHUState2 ? 'd' : 's'}_k`
    },
    showImg3() {
      return `${this.selectMode}_${this.tempAHUState1 ? 'd' : 's'}_k`
    },
    fanSpeed1() {
      const { fan1: { open, speed = 0 }, speedSwitch } = this
      return open ? `fan_${speedSwitch(speed)}.gif` : 'pic_jq_2.png'
    },
    fanSpeed2() {
      const { fan2: { open, speed = 0 }, speedSwitch } = this
      return open ? `fan_${speedSwitch(speed)}.gif` : 'pic_jq_2.png'
    }
  },
  beforeDestroy() {
    if (this.timeId) {
      clearInterval(this.timeId)
    }
  },
  mounted() {
    var a = document.getElementsByClassName('el-select-dropdown__list');
    [].slice.call(a).forEach((item) => {
      item.style.width = '200px'
    })
    this.changeSeason()
    // this.building === 3 ? this.getFloor3() : this.getFloor4()
    this.getBuildingAndFloor()
    this.$nextTick(() => {
      this._getWarmAHUList()
      this.mode === 0 ? this._getColdSourceList() : this._getHeatSourceList()
    })
    this.timeId = setInterval(() => {
      this._getWarmAHUList()
    }, 1000 * 60 * 2)
  },
  methods: {
    _getWarmAHUList() {
      const { wind: { newWind1, newWind2, returnWind1, returnWind2, diliverWind1, diliverWind2 }} = this
      getWarmAHUList(this.building, this.floor).then(res => {
        let handleData = {}
        const obj1 = {}
        const obj2 = {}
        if (this.building === 1 && this.floor === 2) {
          for (const item in res.data) {
            if (item.indexOf('UEC71263') !== -1) {
              const key = item.replace('UEC71263:', 'AHU1-2-2-')
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 1 && this.floor === 1) {
          for (const item in res.data) {
            if (item.indexOf(`UEC71161`) !== -1) {
              const key = item.replace(`UEC71161:`, `AHU1-1-2-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              const key = item.replace(`AHU1-2-3`, `AHU1-1-1`)
              const value = res.data[item]
              obj1[key] = value
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 1 && this.floor > 2) {
          for (const item in res.data) {
            if (item.indexOf(`UEC71${this.floor}61`) !== -1) {
              const key = item.replace(`UEC71${this.floor}61:`, `AHU1-${this.floor}-2-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 2 && this.floor === 2) {
          handleData = res.data
        } else if (this.building === 2 && this.floor < 10 && this.floor !== 2) {
          for (const item in res.data) {
            if (item.indexOf(`UEC72${this.floor}61`) !== -1) {
              const key = item.replace(`UEC72${this.floor}61:`, `AHU2-${this.floor}-2-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 2 && this.floor >= 10) {
          for (const item in res.data) {
            if (item.indexOf(`UEC73${this.floor - 10}61`) !== -1) {
              const key = item.replace(`UEC73${this.floor - 10}61:`, `AHU2-${this.floor}-2-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 3 && this.floor < 10) {
          for (const item in res.data) {
            if (item.indexOf(`UEC73${this.floor}61`) !== -1) {
              const key = item.replace(`UEC73${this.floor}61:`, `AHU3-${this.floor}-1-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 3 && this.floor >= 10 && this.floor < 20) {
          console.log('this.building === 3 && this.floor >= 10 && this.floor < 20')
          for (const item in res.data) {
            if (item.indexOf(`UEC72${this.floor - 10}61`) !== -1) {
              const key = item.replace(`UEC72${this.floor - 10}61:`, `AHU3-${this.floor}-1-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else if (this.building === 3 && this.floor >= 20) {
          for (const item in res.data) {
            if (item.indexOf(`UEC71${this.floor - 20}61`) !== -1) {
              const key = item.replace(`UEC71${this.floor - 20}61:`, `AHU3-${this.floor}-1-`)
              const value = res.data[item]
              obj2[key] = value
            } else {
              obj1[item] = res.data[item]
            }
          }
          handleData = { ...obj1, ...obj2 }
        } else {
          handleData = { ...res.data }
        }
        this.warmAHUList = handleData
        if (this.building === 4 && this.floor === 1) {
          this.fan2.open = handleData[`AHU${this.building}-${this.floor}-2-SF_CV`].value >= 20
          newWind2[2] = handleData[`AHU${this.building}-${this.floor}-2-OAD_CV`].value
          const returnKeys2 = [`AHU${this.building}-${this.floor}-2-RT_CV`, `AHU${this.building}-${this.floor}-2-RH_CV`, `AHU${this.building}-${this.floor}-2-CO2_CV`]
          const diliverKeys2 = [`AHU${this.building}-${this.floor}-2-ST_CV`, `AHU${this.building}-${this.floor}-2-SH_CV`, `AHU${this.building}-${this.floor}-2-SP1_CV`]
          const keys = [returnKeys2, diliverKeys2]
          const vals = [returnWind2, diliverWind2]
          keys.forEach((k, i) => k.forEach(item => vals[i].push(handleData[item].value)))
          this.returnWind1 = ['', '', '']
          this.diliverWind1 = ['', '', '']
          newWind1[2] = ''
        } else if (this.building === 2 && this.floor === 2) {
          this.fan1.open = handleData[`AHU${this.building}-${this.floor}-1-SF_CV`].value >= 20
          newWind1[2] = handleData[`AHU${this.building}-${this.floor}-1-OAD_CV`].value
          const returnKeys1 = [`AHU${this.building}-${this.floor}-1-RT_CV`, `AHU${this.building}-${this.floor}-1-RH_CV`, `AHU${this.building}-${this.floor}-1-CO2_CV`]
          const diliverKeys1 = [`AHU${this.building}-${this.floor}-1-ST_CV`, `AHU${this.building}-${this.floor}-1-SH_CV`, `AHU${this.building}-${this.floor}-1-SP1_CV`]
          const keys = [returnKeys1, diliverKeys1]
          const vals = [returnWind1, diliverWind1]
          keys.forEach((k, i) => k.forEach(item => vals[i].push(handleData[item].value)))
          this.returnWind2 = ['', '', '']
          this.diliverWind2 = ['', '', '']
          newWind2[2] = ''
        } else {
          this.fan1.open = handleData[`AHU${this.building}-${this.floor}-1-SF_CV`].value >= 20
          this.fan2.open = handleData[`AHU${this.building}-${this.floor}-2-SF_CV`].value >= 20
          newWind1[2] = handleData[`AHU${this.building}-${this.floor}-1-OAD_CV`].value
          newWind2[2] = handleData[`AHU${this.building}-${this.floor}-2-OAD_CV`].value
          const returnKeys1 = [`AHU${this.building}-${this.floor}-1-RT_CV`, `AHU${this.building}-${this.floor}-1-RH_CV`, `AHU${this.building}-${this.floor}-1-CO2_CV`]
          const returnKeys2 = [`AHU${this.building}-${this.floor}-2-RT_CV`, `AHU${this.building}-${this.floor}-2-RH_CV`, `AHU${this.building}-${this.floor}-2-CO2_CV`]
          const diliverKeys1 = [`AHU${this.building}-${this.floor}-1-ST_CV`, `AHU${this.building}-${this.floor}-1-SH_CV`, `AHU${this.building}-${this.floor}-1-SP1_CV`]
          const diliverKeys2 = [`AHU${this.building}-${this.floor}-2-ST_CV`, `AHU${this.building}-${this.floor}-2-SH_CV`, `AHU${this.building}-${this.floor}-2-SP1_CV`]
          const arrKey = [returnKeys1, returnKeys2, diliverKeys1, diliverKeys2]
          const arrVal = [returnWind1, returnWind2, diliverWind1, diliverWind2]
          arrKey.forEach((k, i) => k.forEach(item => arrVal[i].push(handleData[item].value)))
        }
      })
    },
    _getHeatSourceList() {
      const params = this.building === 1 || this.building === 2 ? 'ab' : 'cd'
      getHeatSourceList(params).then(res => {
        const mapData = {}
        if (this.building === 1) {
          mapIdHeat1.forEach((val, key) => {
            mapData[key] = {
              value: res.data[val].value
            }
          })
        } else if (this.building === 2) {
          mapIdHeat2.forEach((val, key) => {
            mapData[key] = {
              value: res.data[val].value
            }
          })
        } else {
          mapId.forEach((val, key) => {
            mapData[key] = {
              value: res.data[val].value
            }
          })
        }
        this.coldAndHeat(mapData)
      })
    },
    _getColdSourceList() {
      const params = this.building === 1 || this.building === 2 ? 'ab' : 'cd'
      getColdSourceList(params).then(res => {
        let mapData = {}
        if (this.building === 1) {
          mapIdCold1.forEach((val, key) => {
            mapData[key] = {
              value: res.data[val].value
            }
          })
        } else if (this.building === 2) {
          mapIdCold2.forEach((val, key) => {
            mapData[key] = {
              value: res.data[val].value
            }
          })
        } else {
          mapData = res.data
        }
        this.coldAndHeat(mapData)
      })
    },
    speedSwitch(s) {
      switch (s) {
        case 0:
          return 'low'
        case 1:
          return 'mid'
        case 2:
          return 'high'
        default:
          return 'low'
      }
    },
    getFloor1() {
      this.floors = new Array(9).fill(-1).map((item, index) => {
        return {
          label: `第${index + 1}层`,
          value: index + 1
        }
      })
    },
    getFloor2() {
      this.floors = new Array(15).fill(-1).map((item, index) => {
        return {
          label: `第${index + 1}层`,
          value: index + 1
        }
      })
    },
    getFloor4() {
      this.floors = new Array(8).fill(-1).map((item, index) => {
        return {
          label: `第${index + 1}层`,
          value: index + 1
        }
      })
    },
    getFloor3() {
      const floors = new Array(21).fill(-1).map((item, index) => {
        return {
          label: `第${index + 1}层`,
          value: index + 1
        }
      })
      this.floors = [...floors]
    },
    getBuildingAndFloor() {
      if (this.building === 1) {
        this.getFloor1()
      } else if (this.building === 2) {
        this.getFloor2()
      } else if (this.building === 3) {
        this.getFloor3()
      } else {
        this.getFloor4()
      }
    },
    selectFloor(val) {
      this.floor = val
      this.getBuildingAndFloor()
      this.windEmpty()
      this._getWarmAHUList()
      this.mode === 0 ? this._getColdSourceList() : this._getHeatSourceList()
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    selectBuilding(val) {
      this.building = val
      // this.building === 3 ? this.getFloor3() : this.getFloor4()
      this.getBuildingAndFloor()
      this.floor = 3
      this.windEmpty()
      this._getWarmAHUList()
      this.mode === 0 ? this._getColdSourceList() : this._getHeatSourceList()
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    changeSeason() {
      const now = new Date()
      const month = now.getMonth()
      if (month >= 4 && month <= 10) {
        this.mode = 0
      } else {
        this.mode = 1
      }
    },
    changeSelectMode(val) {
      this.mode = val
      this.loading = true
      this.windEmpty()
      this._getWarmAHUList()
      this.mode === 0 ? this._getColdSourceList() : this._getHeatSourceList()
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    coldAndHeat(mapData) {
      this.showPumpData.forEach(item => {
        Object.keys(item.data).forEach(id => {
          item.data[id].value = mapData[id].value
        })
      })
      const { showPData, showTData, showMData } = this
      // const arrPump = [rPump1, rPump2, rPump3]
      // arrPump.forEach((item, index) => (item.open = JSON.parse(res.data[`CP4#-${index + 1}-S_CV`].value)))

      this.rPump1.open = mapData['CP4#-1-S_CV'].value === 'true'
      this.rPump2.open = mapData['CP4#-2-S_CV'].value === 'true'
      this.rPump3.open = mapData['CP4#-3-S_CV'].value === 'true'

      // const arrMidHand = [midHand1, midHand2]

      this.midHand1 = mapData['CP4-KGF-01_CV'].value === 'true'
      this.midHand2 = mapData['CP4-KGF-02_CV'].value === 'true'

      // arrMidHand.forEach((item, index) => (item = JSON.parse(res.data[`CP4-KGF-0${index + 1}_CV`].value)))
      if (!this.midHand1 && !this.midHand2) {
        this.rPump1.open = false
        this.rPump2.open = false
        this.rPump3.open = false
      }
      const arr = [showPData, showTData, showMData]
      arr.forEach(k => {
        k.forEach(item => {
          item.value = mapData[item.id].value
        })
      })
      this.handleShowData()
    },
    imgLoaded() {
      this.loading = false
    },
    windEmpty() {
      this.wind.returnWind1 = []
      this.wind.returnWind2 = []
      this.wind.diliverWind1 = []
      this.wind.diliverWind2 = []
    },
    handleShowData() {
      this.showPData1 = this.showPData
      this.showMData1 = this.showMData
      this.showTData1 = this.showTData
    }
  }
}
</script>

<style scoped lang="less">
  // .card-bgc {
  //   background-color: #114378;
  // }
  .container {
    position: relative;
    display: flex;
    flex-direction: column;
  }
  .content {
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
      .content-item {
        display: flex;
        flex-direction: column;
        // justify-content: center;
        align-items: center;
        width: 80%;
        height: 90%;
        min-height: 900px;
        min-width: 1400px;
        transform: translatex(-4%);
        .legend {
          position: absolute;
          margin-left: -8%;
          font-size: 18px;
          font-weight: 800;
        }
        .show-data {
          position: absolute;
          margin-left: -8%;
          font-size: 18px;
          font-weight: 600;
        }
        .show-img {
          position: absolute;
          width: 1.5%;
          z-index: -2;
        }
        .show-pump {
          position: absolute;
          width: 4%;
          z-index: 1;
        }
      }
  }
  .orange {
    filter: hue-rotate(-166deg);
    -webkit-filter: hue-rotate(-166deg);
  }
  .pure {
    filter: hue-rotate(224deg);
    -webkit-filter: hue-rotate(224deg);
  }
  .blue {
    filter: hue-rotate(250deg);
    -webkit-filter: hue-rotate(250deg);
  }
  .select-test {
    .el-select-dropdown__item {
      width: 80px;
      float: left;
    }
  }
</style>
