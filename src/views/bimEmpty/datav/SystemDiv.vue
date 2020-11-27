<template>
  <div class="system1">
    <div class="systemdiv2">
      <div class="systemdiv21">
        <a :href="dashboard">
          <img src="https://img.alicdn.com/tfs/TB1aQPltMHqK1RjSZFgXXa7JXXa-800-800.png">
          <p>后台</p>
        </a>
      </div>
      <div class="systemdiv22">
        <a :href="bims">
          <img src="https://img.alicdn.com/tfs/TB1aQPltMHqK1RjSZFgXXa7JXXa-800-800.png">
          <p>BIM</p>
        </a>
      </div>
      <div class="systemdiv23">
        <a :href="ratio">
          <img src="https://img.alicdn.com/tfs/TB1aQPltMHqK1RjSZFgXXa7JXXa-800-800.png">
          <p>32/9</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTime',
  data() {
    return {
    }
  },
  computed: {
    dashboard() {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:9090/#/dashboard' : 'http://101.132.169.245/#/dashboard'
    },
    bims() {
      return process.env.NODE_ENV === 'development' ? 'http://localhost:9090/#/bimLinks' : 'http://101.132.169.245/#/bimLinks'
    },
    ratio() {
      return 'http://101.132.169.245:502'
    }
  }
}
</script>

<style lang="less">
.system1{
    width: 100%;
    height: 100%;
}
.systemdiv2{
    width: 100%;
    height: 100%;
}
.systemdiv21{
    position: absolute;
    width: 50%;
    height: 100%;
    left: -10%;
    img{
        position: absolute;
        width: 60%;
        left: 20%;
    }
    p{
        width: 100%;
        text-align: center;
        color: white;
        line-height: 50px;
    }
}
.systemdiv22{
    position: absolute;
    width: 50%;
    height: 100%;
    left: 25%;
    img{
        position: absolute;
        width: 60%;
        left: 20%;
    }
    p{
        width: 100%;
        height: 70px;
        color: white;
        line-height: 50px;
        text-align: center;
    }
}
.systemdiv23 {
  position: absolute;
    width: 50%;
    height: 100%;
    left: 60%;
    img{
        position: absolute;
        width: 60%;
        left: 20%;
    }
    p{
        width: 100%;
        height: 70px;
        color: white;
        line-height: 50px;
        text-align: center;
    }
}
</style>
