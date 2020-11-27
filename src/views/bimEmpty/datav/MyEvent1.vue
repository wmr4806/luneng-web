<template>
  <div class="event1div">
    <!-- 标题 -->
    <div class="eventtop">
      <p class="eventp1">事件态势</p>
      <p class="eventp2">Task status</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">01</p>
    </div>
    <div class="eventmain1">
      <!-- 消防 -->
      <div class="firep">
        <p class="firep1">今日消防</p>
        <p class="firep2"><i id="firep2i">{{ fire }}</i>个</p>
      </div>
      <!-- 安防 -->
      <div class="security">
        <p class="firep1">今日安防</p>
        <p class="firep2"><i id="securityp2i">{{ onvif }}</i>个</p>
      </div>
    </div>
    <div class="eventmain2">
      <!-- 消防 -->
      <div class="firep">
        <p class="firep1">今日自控</p>
        <p class="firep2"><i id="firep2i">{{ ba }}</i>个</p>
      </div>
      <!-- 安防 -->
      <div class="security">
        <p class="firep1">其他事件</p>
        <p class="firep2"><i id="securityp2i">{{ other }}</i>个</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getEventsCount } from '@/api/data'
export default {
  name: 'MyTime',
  data() {
    return {
      fire: '',
      onvif: '',
      ba: '',
      other: '',
      timer: null
    }
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  mounted() {
    this.shitai()
    this.timer = setInterval(() => {
      this.shitai()
    }, 1000 * 60 * 5)
  },
  methods: {
    async shitai() {
    //   const { data: res } = await this.$http.get('/auth/getEventsCount', this.login)
      const { data: { fire, onvif, ba, other }} = await getEventsCount()
      this.fire = fire
      this.onvif = onvif
      this.ba = ba
      this.other = other
    }
  }
}
</script>

<style lang="less">
.event1div{
    width: 100%;
    height: 100%;
}
.eventtop{
    width: 100%;
    height: 80px;
}
.eventp1{
    position: absolute;
    width: 45%;
    left: 10%;
    top: 8px;
    color: white;
}
.eventp2{
    position: absolute;
    width: 45%;
    left: 10%;
    top: 40px;
    font-size: 12px;
    color: #2edbff;
}
.eventimg1{
    position: absolute;
    width: 7%;
    height: 30px;
    top: 30px;
    left: 73%;
}
.eventp3{
    position: absolute;
    width: 15%;
    left: 81%;
    top: -7px;
    font-size: 32px;
    color: #2edbff;
}
.eventmain1{
    position: absolute;
    width: 80%;
    top: 70px;
    height: 85px;
    left: 10%;
    .firep{
        position: absolute;
        left: 0;
        width: 50%;
        height: 100%;
        color: #1186e4;
    }
    .security{
        position: absolute;
        left: 50%;
        width: 50%;
        height: 100%;
        color: #1186e4;
    }
    .firep2{
        position: absolute;
        top: 10px;
        font-size:30px;
    }
    #firep2i{
        color: white;
    }
    #securityp2i{
        color: white;
    }
}
.eventmain2{
    position: absolute;
    width: 80%;
    top: 150px;
    height: 85px;
    left: 10%;
    .firep{
        position: absolute;
        left: 0;
        width: 50%;
        height: 100%;
        color: #1186e4;
    }
    .security{
        position: absolute;
        left: 50%;
        width: 50%;
        height: 100%;
        color: #1186e4;
    }
    .firep2{
        position: absolute;
        top: 10px;
        font-size:30px;
    }
    #firep2i{
        color: white;
    }
    #securityp2i{
        color: white;
    }
}
</style>
