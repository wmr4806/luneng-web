<template>
  <div class="dashboard-editor-container" style="background-color: #18111f;height:120vh">

    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <heatmap-cartesian />
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="32">

      <el-col :xs="24" :sm="10" :lg="10">
        <div class="chart-wrapper">
          <transaction-table />
          <pie-chart />
        </div>

      </el-col>

      <el-col :xs="24" :sm="14" :lg="14">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
    </el-row>
    <!--<el-row :gutter="8">-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
    <!--<transaction-table />-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--<todo-list />-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">-->
    <!--<box-card />-->
    <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import HeatmapCartesian from './components/HeatmapCartesian'
import TransactionTable from './components/TransactionTable'

import { getSelectElectricalHistoryHour } from '@/api/data'
// import TransactionTable from './components/TransactionTable'
// import TodoList from './components/TodoList'
// import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    expectedData: []
    // actualData: [120, 82, 91, 154, 162, 140, 145]
  }
  // messages: {
  //   expectedData: [200, 192, 120, 144, 160, 130, 140],
  //   actualData: [180, 160, 151, 106, 145, 150, 130]
  // },
  // purchases: {
  //   expectedData: [80, 100, 121, 104, 105, 90, 100],
  //   actualData: [120, 90, 100, 138, 142, 130, 130]
  // },
  // shoppings: {
  //   expectedData: [130, 140, 141, 142, 145, 150, 160],
  //   actualData: [120, 82, 91, 154, 162, 140, 130]
  // }
}

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    RaddarChart,
    PieChart,
    BarChart,
    HeatmapCartesian,
    TransactionTable
    // TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      lineData: []
    }
  },
  async mounted() {
    const { data } = await getSelectElectricalHistoryHour()
    this.lineData = data.map(item => item.value)
    this.lineChartData = { expectedData: this.lineData }
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type]
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  // background-color: #304156;
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #221e2b;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
