<template>
  <div class="dashboard-editor-container">
    <el-button @click="handleDialog()">监控设备1001</el-button>
    <el-button @click="handleDialog1()">监控设备1002</el-button>
    <iframe id="mainFrame" name="mainFrame" class="mainFrame" src="http://47.102.218.90:8070/archibus/schema/per-site/Forge/ForgeViewerA.html?FLURN=../Forge/Models/BS/1F/3d.svf" frameborder="0" allowtransparency="true" />
    <el-dialog v-el-drag-dialog :visible.sync="dialogPlayVisible" :title="dialogTitle" :modal="false" :center="true" width="30%">
      <div id="myPlayer" />
    </el-dialog>
    <el-dialog v-el-drag-dialog :visible.sync="dialogChartVisible" :title="dialogTitle" :modal="false" :center="true" width="30%">
      <line-chart :chart-data="lineChartData" />
    </el-dialog>
  </div>
</template>
<script>
import elDragDialog from '@/directive/el-drag-dialog'
import LineChart from '../admin/components/LineChart'
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}
export default {
  name: 'DashboardEditor',
  directives: { elDragDialog },
  components: { LineChart },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      dialogPlayVisible: false,
      dialogChartVisible: false,
      dialogTitle: '监控设备1001',
      tempId: '1FCCTV_04'
    }
  },
  created() {
    window['handleBim'] = () => {
      this.onSelectedCallback()
    }
  },
  methods: {
    onSelectedCallback(id) {
      console.log(id)
    },
    handleDialog() {
      this.dialogPlayVisible = true
    },
    handleDialog1() {
      this.dialogChartVisible = true
    },
    clickMethod() {
      const exec_obj = document.createElement('iframe')
      exec_obj.name = 'tmp_frame'
      exec_obj.src = 'http://47.102.218.90:8070/archibus/schema/per-site/Forge/index.html?id=' + this.tempId + '&type=eq_id'
      exec_obj.style.display = 'none'
      document.body.appendChild(exec_obj)
    }
  }
}
</script>

<style lang="scss" scoped>
  .mainFrame{
    width: 100%;
    height:100%;
    min-height: 80vh;
  }
  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 25px;
  }
</style>
