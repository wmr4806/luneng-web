<template>
  <div class="container">
    <el-container class="main">
      <el-header>
        <span class="left">设备管理</span>
        <div>
          <span>请选择查询字段：</span>
          <el-select v-model="value" clearable placeholder="请选择" @change="changeInputSerachField">
            <el-option
              v-for="item in cOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span>查询内容：</span>
          <el-input v-model="searchVal" placeholder="请输内容" clearable style="width: 150px" @change="changeInputSearchVal" />
          <el-button type="primary" :disabled="!searchVal || !value" @click="dimSearch">查询</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="incrementBtn">增加</el-button>
        </div>
      </el-header>
      <el-main style="margin-bottom: 60px;">
        <el-table
          :data="tableData"
          height="100%"
          :cell-style="{'text-align':'center','font-weight': '500','font-size': '16px'}"
          :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center','font-size': '16px'}"
          stripe
          border
          highlight-current-row
        >
          <el-table-column
            type="index"
            fixed
            label="序号"
            width="40"
            :resizable="false"
          />
          <el-table-column
            prop="userName"
            label="名称"
          />
          <el-table-column
            prop="password"
            label="密码"
          />
          <el-table-column
            prop="ip"
            label="ip"
          />
          <el-table-column
            prop="port"
            label="端口"
          />
          <el-table-column
            prop="stream"
            label="码流"
          />
          <el-table-column
            prop="address"
            label="地址"
          />
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                size="large"
                @click.native.prevent="deleteRow(scope, tableData)"
              >
                移除
              </el-button>
              <el-button
                type="text"
                size="large"
                @click.native.prevent="editRow(scope.row)"
              >
                修改
              </el-button>
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
    <el-dialog title="修改参数" :visible.sync="edit.visible" :before-close="handleClose">
      <el-form ref="editFormName" :label-position="labelPosition" :rules="rules" label-width="80px" :model="edit.editData">
        <el-form-item label="名称" prop="userName">
          <el-input v-model="edit.editData.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="edit.editData.password" />
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="edit.editData.ip" />
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model.number="edit.editData.port" />
        </el-form-item>
        <el-form-item label="码流" prop="stream">
          <el-input v-model="edit.editData.stream" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="edit.editData.address" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCancelDialogVisible">取 消</el-button>
        <el-button type="primary" @click="editConfirmDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="increment.visible" :before-close="handleIncrementClose">
      <el-form ref="incrementFormName" :label-position="labelPosition" :rules="rules" label-width="80px" :model="increment.incrementData">
        <el-form-item label="摄像机ID" prop="id">
          <el-input v-model="increment.incrementData.id" />
        </el-form-item>
        <el-form-item label="名称" prop="userName">
          <el-input v-model="increment.incrementData.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="increment.incrementData.password" />
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="increment.incrementData.ip" />
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model.number="increment.incrementData.port" />
        </el-form-item>
        <el-form-item label="码流" prop="stream">
          <el-input v-model="increment.incrementData.stream" />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="increment.incrementData.address" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleIncrementClose">取消</el-button>
        <el-button type="primary" @click="incrementConfirmDialogVisible">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getInsretVideo, getDeleteVideo, getEditVideo, getVideoByPageByWhere } from '@/api/videoData'
export default {
  name: 'VideoManager',
  data() {
    return {
      searchVal: '',
      serachField: '',
      value: '',
      labelPosition: 'right',
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      tableData: [],
      increment: {
        visible: false,
        incrementData: {
          ip: '',
          userName: '',
          password: '',
          port: '',
          stream: '',
          address: '',
          id: ''
        }
      },
      serach: {
        ip: '',
        userName: '',
        password: '',
        port: '',
        stream: '',
        address: ''
      },
      edit: {
        visible: false,
        editData: {
          id: '',
          ip: '',
          userName: '',
          password: '',
          port: '',
          stream: '',
          address: ''
        }
      },
      rules: {
        port: [
          { required: true, message: '字段不能为空' },
          { type: 'number', message: '必须为数字值' }
        ]
      }
    }
  },
  computed: {
    cOptions() {
      return [{
        value: 'ip',
        label: 'IP地址'
      }, {
        value: 'userName',
        label: '名称'
      }, {
        value: 'port',
        label: '端口号'
      }, {
        value: 'stream',
        label: '码流'
      }, {
        value: 'address',
        label: '地址'
      }]
    }
  },
  mounted() {
    this.searchData()
  },
  methods: {
    changeInputSearchVal(val) {
      this.searchVal = val
    },
    changeInputSerachField(val) {
      this.serachField = val
    },
    dimSearch() {
      const obj = { ...this.serach }
      obj[this.serachField] = this.searchVal
      getVideoByPageByWhere({ currentPage: this.page.currentPage, pageSize: this.page.pageSize, searchData: obj }).then(res => {
        this.tableData = res.data.dataList
        this.page.total = res.data.total
      })
    },
    searchData() {
      getVideoByPageByWhere({ currentPage: this.page.currentPage, pageSize: this.page.pageSize, searchData: this.serach }).then(res => {
        this.tableData = res.data.dataList
        this.page.total = res.data.total
        console.log(res)
      })
    },
    incrementBtn() {
      this.increment.visible = true
    },
    handleIncrementClose() {
      this.increment.visible = false
      this.$refs.incrementFormName.resetFields()
    },
    incrementConfirmDialogVisible() {
      const { incrementData: { ip, userName, password, id, stream, address }} = this.increment
      if (ip.trim().length === 0 || userName.trim().length === 0 || password.trim().length === 0 || id.trim().length === 0 || stream.trim().length === 0 || address.trim().length === 0) {
        this.$message({
          message: '字段内容不能为空',
          type: 'error'
        })
      } else {
        // const params = new FormVideoData(this.increment.incrementData)
        getInsretVideo(this.increment.incrementData).then(() => {
          this.searchData()
          this.$refs.incrementFormName.resetFields()
          this.increment.visible = false
          this.$message({
            message: '增加成功',
            type: 'success'
          })
        })
      }
    },
    deleteRow(scope, rows) {
      getDeleteVideo(scope.row.id).then((res) => {
        if (res.code === '200') {
          rows.splice(scope.$index, 1)
          this.searchData()
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    },
    editRow(row) {
      this.edit.editData = { ...row }
      this.edit.visible = true
    },
    editCancelDialogVisible() {
      this.edit.visible = false
      this.$refs.editFormName.resetFields()
    },
    editConfirmDialogVisible() {
      // const params = new FormVideoData(this.edit.editData)
      const { editData: { ip, userName, password, stream, address }} = this.edit
      if (ip.trim().length === 0 || userName.trim().length === 0 || password.trim().length === 0 || stream.trim().length === 0 || address.trim().length === 0) {
        this.$message({
          message: '字段内容不能为空',
          type: 'error'
        })
      } else {
        getEditVideo(this.edit.editData).then(() => {
          this.searchData()
          this.edit.visible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then(() => {
        done()
        this.$refs.editFormName.resetFields()
      }).catch(() => {})
    },
    handleSizeChange(val) {
      this.page.pageSize = val
      this.searchData()
    },
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.searchData()
    }
  }

}
</script>

<style scoped lang="less">
  .container{
    background-color: #18111f;
    height: calc(100vh - 84px);
    padding: 10px;
  }
  .main{
    font-size: 15px;
    background: #fff;
    height: 100%;
    position: relative;
    border-radius: 5px;
    &:hover {
      box-shadow: 1px 1px 10px #888888;
    }
  }
  .left{
    float: left;
    padding-left: 3px;
  }
</style>
