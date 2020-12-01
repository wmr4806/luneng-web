<template>
  <div class="record">
    <el-card class="card3">
      <div slot="header" class="clearfix">
        <span>访客记录</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="dialogVisible = true"
        >记录导出</el-button>
      </div>
      <el-table
        class="table-card"
        :data="tableData"
        border
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="visitorName" align="center" label="姓名" />
        <!-- <el-table-column
          prop="unitContactPerson"
          label="联系人"
          align="center"
        /> -->
        <el-table-column prop="reasons" align="center" label="事由" />
        <el-table-column prop="personNumber" align="center" label="人数" />
        <el-table-column prop="entryTime" label="进入时间" align="center">
          <template slot-scope="scope">
            {{ new Date(scope.row.entryTime).format("yyyy-MM-dd HH:mm") }}
          </template>
        </el-table-column>
        <el-table-column prop="outTime" label="离开时间" align="center">
          <template slot-scope="scope">
            {{ new Date(scope.row.outTime).format("yyyy-MM-dd HH:mm") }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="createTime" label="创建时间" align="center">
          <template slot-scope="scope">
            {{ new Date(scope.row.createTime).format("yyyy-MM-dd HH:mm") }}
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
        class="pagestyle"
        background
        :current-page="page.currentPage"
        :page-sizes="[5, 10, 15]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <el-dialog title="选择导出日期" :visible.sync="dialogVisible" width="35%">
      <span>起始时间:</span>
      <el-date-picker
        v-model="value1"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
      />
      <br>
      <br>
      <span>结束时间:</span>
      <el-date-picker
        v-model="value2"
        value-format="yyyy-MM-dd"
        type="date"
        placeholder="选择日期"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="recorddown">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getrecord } from '@/api/quantity'
export default {
  data() {
    return {
      value1: '',
      value2: '',
      tableData: [],
      page: {
        // 当前页
        currentPage: 1,
        // 当前每页显示条数
        pageSize: 10
      },
      // 总条目数
      total: 0,
      dialogVisible: false
    }
  },
  watch: {},
  mounted() {
    this.getrecords()
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      // return false
    },
    async getrecords() {
      await getrecord(this.page).then(res => {
        console.log(res.data.dataList)
        if (res.code === '200') {
          this.tableData = res.data.dataList
          this.total = res.data.total
        }
      })
    },
    recorddown() {
      this.dialogVisible = true
      const data = {
        method: 'post',
        data: {
          startTime: this.value1,
          endTime: this.value2
        },
        url:
          'http://101.132.169.245:8071/public-gateway/manage/exportVisitorRegist',
        token: getToken(),
        fileName: '出入记录.xlsx'
      }
      this.exportMethod(data)
    },
    exportMethod(data) {
      axios({
        method: data.method,
        url: data.url,
        data: data.data,
        headers: { token: data.token },
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
          link.download = data.fileName // 下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          this.dialogVisible = false
          this.$message.success('导出成功')
        })
        .catch(error => {
          this.$message.error('导出失败')
          console.dir(error)
        })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.page.pageSize = val
      this.getrecords()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page.currentPage = val
      this.getrecords()
    }
  }
}
</script>
<style lang="scss" scoped>
.record {
  width: 100%;
  height: 100%;
  background: #ccc;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body {
  padding: 10px;
}
.record {
  height: 100rem;
  height: 150vh;
  background: #18111f;
}
.box-card {
  background: #18111f;
  width: 25rem;
  height: 30rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.card3 {
  color: rgb(30, 152, 211);
  background: #18111f;
  position: absolute;
  width: 100%;
  height: 100%;
  // margin: 20px;
}
.el-pagination /deep/ .el-pagination__total {
  color: rgb(30, 152, 211);
}
.el-pagination /deep/ .el-pagination__jump {
  color: rgb(30, 152, 211);
}
.el-table /deep/ .warning-row {
  color: white;
  background: #154363;
}
.el-table /deep/ .success-row {
  color: white;
  background: #272c36;
}
.el-table /deep/ .warning-row:hover {
  color: #000;
  // background: #154363;
}
.el-table /deep/ .success-row:hover {
  color: #000;
  // background: #272c36;
}
</style>
