<template>
  <div id="data-view">
    <dv-full-screen-container>
      <div class="main-header">
        <div class="mh-middle">鲁能国际中心一体化智慧平台</div>
        <dv-decoration-5 style="width:20%;height:40px;position:absolute;top:50px;left:40%;" />
      </div>
      <div class="timediv">
        <My-Time />
      </div>
      <div class="weatherdiv">
        <Weather-Div />
      </div>
      <dv-border-box-1 class="main-container" />
      <div class="systemdiv">
        <SystemDiv />
      </div>
      <div class="event1">
        <dv-border-box-13>
          <MyEvent1 />
        </dv-border-box-13>
      </div>
      <div class="event5">
        <dv-border-box-13>
          <MyEvent5 />
        </dv-border-box-13>
      </div>
      <div class="videodiv">
        <iframe class="myifarm" src="https://www.thingjs.com/pp/44c3d94d8507acfd094c3dc4" />
        <div class="jinggaoevent">
          <JingGao />
        </div>
      </div>
      <div class="event2">
        <dv-border-box-13>
          <MyEvent2 />
        </dv-border-box-13>
      </div>
      <div class="event3">
        <dv-border-box-13>
          <MyEvent3 />
        </dv-border-box-13>
      </div>
      <div class="event4">
        <dv-border-box-13>
          <MyEvent4 />
        </dv-border-box-13>
      </div>
      <div class="event6">
        <dv-border-box-13>
          <MyEvent6 />
        </dv-border-box-13>
      </div>
      <div class="event7">
        <dv-border-box-13>
          <MyEvent7 />
        </dv-border-box-13>
      </div>
      <div class="event8">
        <dv-border-box-13>
          <MyEvent8 />
        </dv-border-box-13>
      </div>
      <div class="dayelectricity">
        <MyEvent9 />
      </div>
      <div class="event10">
        <MyEvent10 />
      </div>
    </dv-full-screen-container>
    <!-- <dv-loading>Loading...</dv-loading> -->
  </div>
</template>

<script>
import MyTime from './MyTime'
import WeatherDiv from './WeatherDiv'
import SystemDiv from './SystemDiv'
import MyEvent1 from './MyEvent1'
import MyEvent2 from './MyEvent2'
import MyEvent3 from './MyEvent3'
import MyEvent4 from './MyEvent4'
import MyEvent5 from './MyEvent5'
import MyEvent6 from './MyEvent6'
import MyEvent7 from './MyEvent7'
import MyEvent8 from './MyEvent8'
import MyEvent9 from './MyEvent9'
import MyEvent10 from './MyEvent10'
import JingGao from './JingGao'
export default {
  name: 'DataView',
  components: {
    MyTime,
    WeatherDiv,
    SystemDiv,
    MyEvent1,
    MyEvent2,
    MyEvent3,
    MyEvent4,
    MyEvent5,
    MyEvent6,
    MyEvent7,
    MyEvent8,
    MyEvent9,
    MyEvent10,
    JingGao
  }
}
</script>

<style lang="less" scoped>
#app .main-container{
  margin: 0px;
}
#data-view {
  visibility: visible;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    position: relative;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      position: absolute;
      top: 15px;
      width: 100%;
      text-align: center;
      font-size: 30px;
    }

    .mh-left, .mh-right {
      position: absolute;
      right: 0px;
      top: 40px;
      width: 450px;
    }
  }
  .timediv{
    position: absolute;
    top: 30px;
    left: 85%;
    width: 20%;
  }
  .weatherdiv{
    position: absolute;
    width: 20%;
    top: 10px;
    height: 80px;
    left: 5%;
  }
  .systemdiv{
    position: absolute;
    width:14% ;
    left: 3%;
    height: 70px;
    top: 100px;
  }
  .event1{
    position: absolute;
    width:14% ;
    left: 3%;
    height: 250px;
    top: 200px;
  }
  .event5{
    position: absolute;
    width:14% ;
    left: 3%;
    height: 350px;
    top: 480px;
  }
  .videodiv{
    position: absolute;
    width:34% ;
    left: 18%;
    height: 730px;
    top: 100px;
  }
  .myifarm{
    width: 100%;
    height: 100%;
    border: none;
  }
  .event2{
    position: absolute;
    width:14% ;
    left: 53%;
    height: 350px;
    top: 100px;
  }
  .event3{
    position: absolute;
    width:14% ;
    left: 68%;
    height: 350px;
    top: 100px;
  }
  .event4{
    position: absolute;
    width:14% ;
    left: 83%;
    height: 350px;
    top: 100px;
  }
  .event6{
    position: absolute;
    width:14% ;
    left: 53%;
    height: 350px;
    top: 480px;
  }
  .event7{
    position: absolute;
    width:14% ;
    left: 68%;
    height: 350px;
    top: 480px;
  }
  .event8{
    position: absolute;
    width:14% ;
    left: 83%;
    height: 350px;
    top: 480px;
  }
  .dayelectricity{
    position: absolute;
    width:49% ;
    left: 3%;
    height: 188px;
    top: 859px;
  }
  .event10{
    position: absolute;
    width:44% ;
    left: 53%;
    height: 188px;
    top: 859px;
  }
  .jinggaoevent{
    width: 100%;
    height: 100%;
  }
}
</style>
