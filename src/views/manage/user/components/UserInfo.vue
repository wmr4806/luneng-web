<template>
  <el-container style="height: 100%;">

    <el-header>
      <span style="float: left">只显示本部门管辖人员：
        <el-switch
          v-model="ifOnlySelf"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="load"
        />
        {{ ifOnlySelf?"是":"否" }}
      </span>
      <el-input v-model="searchData.userName" maxlength="50" style="width:230px" clearable placeholder="名字" @clear="load" />
      <el-button type="primary" icon="el-icon-search" @click="search" />
      <el-button type="primary" icon="el-icon-plus" @click="handleUserAddBtn" />
    </el-header>

    <el-main style="margin-bottom: 60px;">
      <el-table
        height="100%"
        :data="tableData"
        border
        stripe
        highlight-current-row
        :cell-style="{'text-align':'center'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
      >
        <el-table-column prop="userName" label="名字" />
        <el-table-column prop="departmentName" label="部门" />
        <el-table-column prop="mobile" label="联系电话" />
        <el-table-column prop="job" label="职务" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small" type="info" @click="handleUserEditBtn(scope.row.userId)">修改</el-button>
            <el-button size="small" type="danger" @click="deleteUser(scope.row.userId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer class="elFooter">
      <el-pagination
        background
        :current-page="page.currentPage"
        :page-sizes="[10,20,30,50]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-footer>

  </el-container>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      ifOnlySelf: true,
      tableData: [],
      page: {
        // 当前页
        currentPage: 1,
        // 当前每页显示条数
        pageSize: 10,
        // 总条目数
        total: 0
        // orderKind: '',
        // orderName: ''
      },
      searchData: {
        userName: null,
        departmentId: null
      }
    }
  },
  created() {
    this.$bus.$on('deptNodeSelect', this.handleNodeClick)
  },
  beforeDestroy() {
    this.$bus.$off('deptNodeSelect', this.handleNodeClick)
  },
  methods: {
    // 搜索
    search() {
      if (this.searchData.userName === '' || this.searchData.userName == null) {
        this.$message({
          showClose: true,
          message: '请输入名字',
          type: 'warning'
        })
      } else {
        Object.assign(this.page, this.$options.data().page)
        this.load()
      }
    },
    // 每页条数事件
    handleSizeChange(val) {
      this.page.pageSize = val
      this.load()
    },
    // 翻页事件
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.load()
    },
    // 删除
    async deleteUser(val) {
      const params = {
        url: '/manage/deleteUserById',
        params: val
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({ showClose: true, message: '删除成功', type: 'success' })
        this.load()
      } else {
        this.$message({ showClose: true, message: '删除失败', type: 'error' })
      }
    },
    // 加载
    async load() {
      const params = {
        url: '/manage/getUsersByPageByWhere',
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          searchData: {
            userName: this.searchData.userName,
            departmentId: this.ifOnlySelf ? this.searchData.departmentId : null
          }
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.page.total = res.data.total
        this.tableData = res.data.dataList
      } else {
        this.tableData = []
        this.$message({
          showClose: true,
          message: '暂无数据',
          type: 'warning'
        })
      }
    },
    // 新增
    handleUserAddBtn() {
      this.$emit('handleUserAddBtn')
    },
    // 修改
    handleUserEditBtn(data) {
      this.$emit('handleUserEditBtn', data)
    },
    // 点击左侧部门树事件
    handleNodeClick(data) {
      this.$nextTick(async() => {
        this.searchData.departmentId = data.departmentId
        this.load()
      })
    }
    // 排序
    // sort(val) {
    //   if (val.order === 'descending') {
    //     this.page.orderKind = 'desc'
    //   } else if (val.order === 'ascending') {
    //     this.page.orderKind = 'asc'
    //   }
    //   this.page.orderName = val.prop
    //   this.load()
    // },
  }
}
</script>

<style scoped>
</style>
