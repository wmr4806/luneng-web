<template>
  <div>
    <img class="timeimg" src="./img/time.png">
    <p class="timep" v-text="date" />
  </div>
</template>

<script>
export default {
  name: 'MyTime',
  data() {
    return {
      date: ''
    }
  },
  created() {
    this.gettime()
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    gettime() {
      const _this = this
      this.timer = setInterval(() => {
        const yy = new Date().getFullYear()
        const mm = new Date().getMonth() + 1
        const dd = new Date().getDate()
        const hh = new Date().getHours()
        const mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
        const ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
        _this.gettime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
        _this.date = _this.gettime // 修改数据date
      }, 1000)
    }
  }
}
</script>

<style lang="less">
.timeimg{
      width: 30px;
      position: absolute;
      left: 0;
    }
    .timep{
      position: absolute;
      top: -17px;
      left: 40px;
      font-size: 20px;
      color: #5090f1;
    }
</style>
