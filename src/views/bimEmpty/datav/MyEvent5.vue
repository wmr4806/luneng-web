<template>
  <div class="event5div">
    <div class="eventtop">
      <p class="eventp1">事件统计</p>
      <p class="eventp2">Task statistics</p>
      <img class="eventimg1" src="./img/xie.png" alt="">
      <p class="eventp3">05</p>
    </div>
    <div class="event5bottom">
      <dv-scroll-board :config="config" style="margin-left:3%;width:94%;height:250px" />
    </div>
  </div>
</template>

<script>
import { getEvents } from '@/api/data'
export default {
  data() {
    return {
      config: {
        data: [
        ],
        index: true,
        columnWidth: [40],
        align: ['left'],
        carousel: 'single',
        waitTime: 3000,
        oddRowBGC: 'rgba(38,197,254,0.00)',
        evenRowBGC: '#071133'
      },
      timer: null
    }
  },
  mounted() {
    this.shijian()
    this.timer = setInterval(() => {
      this.shijian()
    }, 40000)
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer)
  },
  methods: {
    async shijian() {
      const { data } = await getEvents()
      // console.log(res.data)
      const mylist = data.map((item) => [item.event])
      this.config.data = mylist
      // console.log(mylist)
      this.config = {
        ...this.config
      }
      // console.log(this.config)
    }
  }
}
</script>

<style lang="less">
.event5div{
    width: 100%;
    height: 100%;
}
.eventtop{
    width: 100%;
    height: 80px;
}
.event5bottom{
    position: absolute;
    width: 100%;
    top: 80px;
    height:270px ;
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
.event5bottom .dv-scroll-board .rows .ceil{
  color:#F56C6C;
  font-size:12px;
  white-space: nowrap;
  //overflow: visible;
  //animation: 5s wordsLoop linear infinite normal;
}
.event5bottom .dv-scroll-board .rows .ceil span{
  color:white;
}
@keyframes wordsLoop {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
