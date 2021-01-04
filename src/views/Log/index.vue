<template>
  <div class="container">
    <el-container class="main">
      <el-header>
        <span class="left">日志管理</span>
        <div>
          <span>类型：</span>
          <el-select v-model="searchData.type" placeholder="请选择类型" clearable @change="searchLog" @clear="searchLog">
            <el-option v-for="item in typeOptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
          <span>模块：</span>
          <el-select v-model="searchData.event" placeholder="请选择模块" clearable @change="searchLog" @clear="searchLog">
            <el-option v-for="item in eventOptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
          <span>结果：</span>
          <el-select v-model="searchData.result" placeholder="请选择结果" clearable @change="searchLog" @clear="searchLog">
            <el-option v-for="item in resultOptions" :key="item.id" :label="item.name" :value="item.name" />
          </el-select>
          <span>名称：</span>
          <el-input v-model="searchData.userName" placeholder="请输名称" clearable style="width: 150px" @clear="searchLog" />
          <el-button type="primary" @click="searchLog">查询</el-button>
        </div>
      </el-header>
      <el-main style="margin-bottom: 60px;">
        <el-table
          height="100%"
          :data="tableData"
          stripe
          border
          highlight-current-row
          :cell-style="{'text-align':'center'}"
          :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
          :default-sort="{prop:'time', order:'descending'}"
        >
          <el-table-column type="index" label="序号" :resizable="false" />
          <el-table-column prop="type" label="类型" :resizable="false" />
          <el-table-column prop="event" label="模块" :resizable="false" />
          <el-table-column prop="detail" label="详情" :resizable="false" />
          <el-table-column prop="result" label="结果" :resizable="false" />
          <el-table-column prop="userId" label="操作人员" :resizable="false" />
          <el-table-column prop="time" label="操作时间" :resizable="false" />
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
  </div>
</template>

<script>
export default {
  name: 'Log',
  data() {
    return {
      page: {
        // 当前页
        currentPage: 1,
        // 当前每页显示条数
        pageSize: 10,
        // 总条目数
        total: 0
      },
      searchData: {
        type: '',
        event: '',
        result: '',
        userName: ''
      },
      tableData: [],
      typeOptions: [
        {
          id: 1,
          name: '添加'
        },
        {
          id: 2,
          name: '删除'
        },
        {
          id: 3,
          name: '修改'
        },
        {
          id: 4,
          name: '批量删除'
        },
        {
          id: 5,
          name: '批量添加'
        },
        {
          id: 6,
          name: '批量修改'
        }
      ],
      eventOptions: [
        {
          id: 1,
          name: '人员模块'
        },
        {
          id: 2,
          name: '角色模块'
        },
        {
          id: 3,
          name: '菜单模块'
        },
        {
          id: 4,
          name: '字典模块'
        },
        {
          id: 5,
          name: '部门模块'
        },
        {
          id: 6,
          name: '工单模块'
        },
        {
          id: 7,
          name: '事件模块'
        }
      ],
      resultOptions: [
        {
          id: 1,
          name: '成功'
        },
        {
          id: 2,
          name: '失败'
        }
      ]
    }
  },
  created() {
    this.$nextTick(async() => {
      this.searchLog()
    })
  },
  methods: {
    // 每页条数事件
    handleSizeChange(val) {
      this.page.pageSize = val
      this.searchLog()
    },
    // 翻页事件
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.searchLog()
    },
    // 查
    async searchLog() {
      const params = {
        url: '/manage/getLogByPageByWhere',
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          searchData: this.searchData
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      this.page.total = res.data.total
      this.tableData = res.data.dataList
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .left{
    float: left;
    padding-left: 3px;
  }
  .container{
    background-color: #18111f;
    /*min-height: 90vh;*/
    height: calc(100vh - 84px);
    padding: 25px;
  }
  .main{
    /*min-height: 80vh;*/
    height: 100%;
    font-size: 15px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    &:hover {
      box-shadow: 2px 2px 10px #888888;
    }
  }
</style>
