<template>
  <div class="datavup">
    <div class="event3">
      <dv-border-box-13>
        <MyEvents2 class="myevent3" />
        <el-button
          type="primary"
          icon="el-icon-download"
          :disabled="showevent2"
          style="margin:0 auto;position: absolute;right: 0px;left:0;bottom:-60px"
          @click="situation"
        >导出excel</el-button>
      </dv-border-box-13>
    </div>
    <div class="event3">
      <dv-border-box-13>
        <MyEvents4 class="myevent3" />
        <el-button
          type="primary"
          icon="el-icon-download"
          :disabled="showevent4"
          style="margin:0 auto;position: absolute;right: 0px;left:0;bottom:-60px"
          @click="parkcc"
        >导出excel</el-button>
      </dv-border-box-13>
    </div>
    <div class="event3">
      <dv-border-box-13>
        <MyEvents6 class="myevent3" />
        <el-button
          type="primary"
          icon="el-icon-download"
          :disabled="showevent6"
          style="margin:0 auto;position: absolute;right: 0px;left:0;bottom:-60px"
          @click="Orderpatrol"
        >导出excel</el-button>
      </dv-border-box-13>
    </div>
    <div class="event3">
      <dv-border-box-13>
        <MyEvents8 class="myevent3" />
        <el-button
          type="primary"
          icon="el-icon-download"
          :disabled="showevent8"
          style="margin:0 auto;position: absolute;right: 0px;left:0;bottom:-60px"
          @click="Equipmenttask"
        >导出excel</el-button>
      </dv-border-box-13>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import MyEvents2 from './datav/MyEvent2'
import MyEvents4 from './datav/MyEvent4'
import MyEvents6 from './datav/MyEvent6'
import MyEvents8 from './datav/MyEvent8'
export default {
  name: 'Datavup',
  components: {
    MyEvents2,
    MyEvents4,
    MyEvents6,
    MyEvents8
  },
  data() {
    return {
      showevent2: false,
      showevent4: false,
      showevent6: false,
      showevent8: false
    }
  },
  methods: {
    situation() {
      const data = {
        url: 'http://101.132.169.245:8071/public-gateway/opc/downloadpeople',
        dataname: '人流态势'
      }
      this.exportMethodget(data)
      this.showevent2 = true
      setTimeout(() => {
        this.showevent2 = false
      }, 1000 * 60)
    },
    parkcc() {
      const data = {
        url:
          'http://101.132.169.245:8071/public-gateway/opc/downloadSelectCurrentTotalElectrical',
        dataname: '园区能耗'
      }
      this.exportMethodget(data)
      this.showevent4 = true
      setTimeout(() => {
        this.showevent4 = false
      }, 1000 * 60)
    },
    Orderpatrol() {
      const data = {
        url:
          'http://101.132.169.245:8071/public-gateway/manage/downloadQueryPatrolTaskInfoLast7Days',
        dataname: '秩序巡更'
      }
      this.exportMethodget(data)
      this.showevent6 = true
      setTimeout(() => {
        this.showevent6 = false
      }, 1000 * 60)
    },
    Equipmenttask() {
      const data = {
        url:
          'http://101.132.169.245:8071/public-gateway/manage/downloadGetPatrolSummaryDimensionByDay',
        dataname: '设备任务'
      }
      this.exportMethodpost(data)
      this.showevent8 = true
      setTimeout(() => {
        this.showevent8 = false
      }, 1000 * 60)
    },
    // 导出
    exportMethodget(data) {
      axios({
        method: 'get',
        url: data.url,
        headers: { token: getToken() },
        responseType: 'blob'
      })
        .then(res => {
          console.dir(res)
          const link = document.createElement('a')
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          console.dir(blob)
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers["Content-Disposition"]; //下载后文件名
          link.download = data.dataname // 下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$message.warning(`${data.dataname}数据下载中，请一分钟后再次下载`)
        })
        .catch(error => {
          console.dir(error)
        })
    },
    exportMethodpost(data) {
      axios({
        method: 'post',
        url: data.url,
        headers: { token: getToken() },
        responseType: 'blob'
      })
        .then(res => {
          console.dir(res)
          const link = document.createElement('a')
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          console.dir(blob)
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers["Content-Disposition"]; //下载后文件名
          link.download = data.dataname // 下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.$message.warning(`${data.dataname}数据下载中，请一分钟后再次下载`)
        })
        .catch(error => {
          console.dir(error)
        })
    }
  }
}
</script>
<style scoped>
.datavup {
  width: 100%;
  background: #18111f;
  height: 104vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.event3 {
  margin-top: 20px;
  background: #909399;
  width: 45%;
  height: 350px;
  display: inline-block;
  cursor: pointer;
}
.myevent3 {
  width: 100%;
  height: 350px;
}
.myevent3 .eventecharts {
  height: 200px;
}
</style>
