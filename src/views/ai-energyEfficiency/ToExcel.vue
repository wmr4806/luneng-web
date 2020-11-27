<template>
  <div style="position:relative">
    <el-table
      :data="tableData"
      style="margin:2%;font-size:16px;font-weight:600"
    >
      <!-- <el-table-column
        prop="date"
        label="日期"
      /> -->
      <el-table-column
        prop="name"
        label="设备名称"
      />
      <el-table-column
        prop="remark"
        label="备注"
      />
      <el-table-column
        prop="i"
        label="电流(A)"
        align="center"
      />
      <el-table-column
        prop="v"
        label="电压(V)"
        align="center"
      />
      <el-table-column
        prop="cos"
        label="功率因数(Cos)"
        align="center"
      />
      <el-table-column
        prop="p"
        label="实时功率(KW)"
        align="center"
      />
      <el-table-column
        prop="morningEnergy"
        label="8:00-20:00能耗(KWh)"
        align="center"
      />
      <el-table-column
        prop="nightEnergy"
        label="20:00-8:00能耗(KWh)"
        align="center"
      />
      <el-table-column>
        <template slot="header" slot-scope="scope">
          <ToExcel
            class="export-excel-wrapper"
            :data="tableData"
            :fields="json_fields"
            :name="name"
          >
            <el-button type="primary" size="small">导出EXCEL</el-button>
          </ToExcel>
        </template>
      </el-table-column>
    </el-table>
    <!-- <ToExcel
      class="export-excel-wrapper"
      :data="json_data"
      :fields="json_fields"
      name="电表耗能数据.xls"
    >
      <el-button type="primary" size="small">导出EXCEL</el-button>
    </ToExcel> -->
  </div>
</template>

<script>
import ToExcel from 'vue-json-excel'
export default {
  name: 'Excel',
  components: {
    ToExcel
  },
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    propsBuild: {
      type: String,
      default: 'AB栋'
    }
  },
  data() {
    return {
      json_fields: {
        // '时间': 'date',
        '设备名称': 'name',
        '备注': 'remark',
        '电流(A)': 'i',
        '电压(V)': 'v',
        '功率因数(Cos)': 'cos',
        '实时功率(KW)': 'p',
        '8:00-20:00能耗(KWh)': 'morningEnergy',
        '20:00-8:00能耗(KWh)': 'nightEnergy'
      },
      json_data: [],
      json_meta: [
        [
          {
            ' key ': 'charset',
            'value ': 'utf- 8'
          }
        ]
      ]
    }
  },
  computed: {
    name() {
      return `${this.propsBuild}电表耗能数据${new Date().format('yyyy-MM-dd')}.xls`
    }
  }
  // watch: {
  //   tableData(newval, old) {
  //     this.json_data = newval
  //   }
  // }
}
</script>

<style>
/* .export-excel-wrapper {
  position: absolute;
  left: 93%;
  top: -53%;
} */
</style>
