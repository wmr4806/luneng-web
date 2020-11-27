<template>
  <div class="event10div">
    <div class="event10div1" />
    <div class="event10div2" />
    <div class="event10div3" />
    <div class="event10pdiv1">
      <p class="event10pdiv1p1">人工智能达成度</p>
      <p class="event10pdiv1p2">室内热舒适度</p>
      <p class="event10pdiv1p3">89%</p>
      <p class="event10pdiv1p4">良好</p>
    </div>
    <div class="event10pdiv2">
      <p class="event10pdiv1p1">空调负荷预测</p>
      <p class="event10pdiv1p2">AI算法调用次数</p>
      <p class="event10pdiv1p3">{{airPayload}}kw</p>
      <p class="event10pdiv1p4">{{ calls }}次</p>
    </div>
    <div class="event10pdiv3">
      <p class="event10pdiv1p1">空调输送能效</p>
      <p class="event10pdiv1p2">AI累计标准煤</p>
      <p class="event10pdiv1p3">5.12kW冷/kW电</p>
      <p class="event10pdiv1p4">0.25吨</p>
    </div>
  </div>
</template>

<script>
import { getAiInfos } from '@/api/data'
export default {
  data() {
    return {
      calls: '',
      airPayload: Math.floor(Math.random() * 100 + 3000)
    }
  },
  created() {
    this.testAxios()
    setInterval(() => {
      this.airPayload = Math.floor(Math.random() * 300 + 3000)
      this.testAxios()
    }, 1000 * 60)
  },
  methods: {
    async testAxios() {
      const { data } = await getAiInfos()
      console.log(data)
      this.calls = data.calls
    }
  }
}
</script>

<style lang="less">
.event10div{
    position: absolute;
    width: 100%;
    height: 90px;
    top: 60px;
}
.event10div1{
    position: absolute;
    left: 0;
    width: 2px;
    height: 80px;
    pointer-events: auto;
    border: none;
    border-radius: 0px;
    background: rgba(0, 123, 255, 0.4);
    filter: blur(2px);
    backdrop-filter: blur(5px);
}
.event10div2{
    position: absolute;
    left: 33%;
    width: 2px;
    height: 80px;
    pointer-events: auto;
    border: none;
    border-radius: 0px;
    background: rgba(0, 123, 255, 0.4);
    filter: blur(2px);
    backdrop-filter: blur(5px);
}
.event10div3{
    position: absolute;
    left: 66%;
    width: 2px;
    height: 80px;
    pointer-events: auto;
    border: none;
    border-radius: 0px;
    background: rgba(0, 123, 255, 0.4);
    filter: blur(2px);
    backdrop-filter: blur(5px);
}
.event10pdiv1{
    position: absolute;
    left: 0;
    width: 33%;
    height: 80px;
}
.event10pdiv2{
    position: absolute;
    left: 33%;
    width: 33%;
    height: 80px;
}
.event10pdiv3{
    position: absolute;
    left: 66%;
    width: 33%;
    height: 80px;
}
.event10pdiv1p1{
  position: absolute;
  top: -7px;
  left:14px;
  color: #1186e4;
}
.event10pdiv1p2{
  position: absolute;
  top: 35px;
  left:14px;
  color: #1186e4;
}
.event10pdiv1p3{
  position: absolute;
  top: -3px;
  right: 10px;
}
.event10pdiv1p4{
  position: absolute;
  top: 35px;
  right: 10px;
}
</style>
