<template>
  <div>
    <img class="shineimg" :src="img">
    <p class="shinep1">温度：{{ wendu }}  空气质量：{{ kongqi }}</p>
    <p class="shinep2">PM2.5:{{ pm }}  风向：{{ feng }}</p>
  </div>
</template>

<script>
import { getWeather } from '@/api/data'
export default {
  name: 'MyTime',
  data() {
    return {
      wendu: '',
      kongqi: '',
      pm: '',
      feng: '',
      img: ''
    }
  },
  created() {
    this.testAxios()
    setInterval(() => {
      this.testAxios()
    }, 1000 * 60 * 5)
  },
  methods: {
    async testAxios() {
      const { data, imgUrl } = await getWeather()
      // console.log(res)
      // console.log(res.data[0])
      this.wendu = data[0].tem
      // console.log(this.wendu)
      this.kongqi = data[0].airLevel
      this.pm = data[0].air
      this.feng = data[0].win[0]
      this.img = imgUrl
    }
  }
}
</script>

<style lang="less">
.shineimg {
  width: 60px;
  position: absolute;
  left: 0;
}
.shinep1 {
  position: absolute;
  top: -17px;
  left: 100px;
  width: 100%;
  font-size: 20px;
  color: white;
}
.shinep2 {
  position: absolute;
  top: 17px;
  left: 100px;
  width: 100%;
  font-size: 20px;
  color: white;
}
</style>
