<template>
  <div class="container">
    <el-tabs v-model="tabName" type="border-card" @tab-click="handleClick">
      <el-tab-pane name="company" label="企业信息录入">
        <el-header>
          <div style="float: left">
            <el-button type="primary" @click="batchStart">批量启用</el-button>
            <el-button type="primary" @click="batchStop">批量禁用</el-button>
          </div>
          <el-input v-model="company.searchData.companyName" maxlength="50" style="width:230px" clearable placeholder="企业名称" @clear="searchCompany"/>
          <el-tooltip content="模糊查询" placement="top">
            <el-button type="primary" icon="el-icon-search" @click="searchCompany" />
          </el-tooltip>
          <el-tooltip content="新增企业备案" placement="top">
            <el-button type="primary" icon="el-icon-plus" @click="addCompany" />
          </el-tooltip>
        </el-header>

        <el-main>
          <el-table
            ref="multipleTable"
            :data="companyData"
            tooltip-effect="dark"
            height="50vh"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="companyName"
              label="企业名称"
              show-overflow-tooltip
            />
            <el-table-column label="复工状态">
              <template slot-scope="scope">
                {{ scope.row.isUsed===1?"已复工":"未复工" }}
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="info" @click="editCompany(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteCompany(scope.row)">删除</el-button>
                <el-button size="small" type="warning" @click="stopCompany(scope.row)">{{ scope.row.isUsed===1?"禁用复工":"启用复工" }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

        <el-footer>
          <el-pagination
            background
            :current-page="company.page.currentPage"
            :page-sizes="[10,20,30,50]"
            :page-size="company.page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="company.page.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-footer>
      </el-tab-pane>
      <el-tab-pane name="staff" label="员工信息录入">
        <el-header>
          <el-upload
            ref="upload"
            class="upload-demo"
            action="#"
            :limit="1"
            :auto-upload="true"
            :http-request="upload"
            :before-upload="beforeUpload"
            style="display: inline-block;"
          >
            <el-tooltip placement="top">
              <div slot="content">请先下载导入模板<br/>只能上传Excel文件，且只能上传一张表<br/>有错误信息无法上传，请重新选取文件</div>
              <el-button type="primary">导入企业员工信息数据</el-button>
            </el-tooltip>
          </el-upload>
          <div style="float: left">
            <el-button type="primary" @click="download">下载导入模板</el-button>
            <el-button type="danger" @click="batchDelete">批量删除</el-button>
          </div>
          <el-input v-model="staff.searchData.companyName" maxlength="50" style="width:180px" clearable placeholder="企业名称" @clear="searchStaff"/>
          <el-input v-model="staff.searchData.staffName" maxlength="50" style="width:180px" clearable placeholder="员工姓名" @clear="searchStaff"/>
          <el-input v-model="staff.searchData.phone" maxlength="50" style="width:180px" clearable placeholder="员工手机号" @clear="searchStaff"/>
          <el-tooltip content="查询" placement="top">
            <el-button type="primary" icon="el-icon-search" @click="searchStaff" />
          </el-tooltip>
          <el-tooltip content="新增企业员工" placement="top">
            <el-button type="primary" icon="el-icon-plus" @click="addStaff" />
          </el-tooltip>
        </el-header>

        <el-main>
          <el-table
            ref="multipleTable"
            :data="staffData"
            tooltip-effect="dark"
            height="50vh"
            style="width: 100%"
            @selection-change="handleSelectionChange1"
          >
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="companyName"
              label="所属企业"
              show-overflow-tooltip
            />
            <el-table-column
              prop="userName"
              label="员工姓名"
              show-overflow-tooltip
            />
            <el-table-column
              prop="phone"
              label="员工手机号"
              show-overflow-tooltip
            />
            <el-table-column label="是否是负责人" align="center">
              <template slot-scope="scope">
                {{ scope.row.isManage===1?"是":"否" }}
              </template>
            </el-table-column>
            <el-table-column label="通行白名单" align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.isUsed === 1" @change="changeWhiteList(scope.row)" />
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="info" @click="editStaff(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteStaff(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>

        <el-footer>
          <el-pagination
            background
            :current-page="staff.page.currentPage"
            :page-sizes="[10,20,30,50]"
            :page-size="staff.page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="staff.page.total"
            @size-change="handleSizeChange1"
            @current-change="handleCurrentChange1"
          />
        </el-footer>
      </el-tab-pane>
    </el-tabs>

    <el-dialog v-if="companyDialog.visible" :title="companyDialog.title" :visible.sync="companyDialog.visible" append-to-body width="25%" destroy-on-close @close="closeCompanyDialog">
      <el-form label-position="left" label-width="80px" :model="companyDialog.companyInfo" ref="companyInfo">
        <el-form-item label="企业名称" prop="companyName" :rules="[{ required: true, message: '请输入企业名称', trigger: 'blur' }]">
          <el-input v-model="companyDialog.companyInfo.companyName" placeholder="请输入企业名称" clearable class="fullWidth"/>
        </el-form-item>

        <el-form-item label="是否复工">
          <el-radio-group v-model="companyDialog.companyInfo.isUsed">
            <el-radio :label="1">已复工</el-radio>
            <el-radio :label="0">未复工</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeCompanyDialog">取 消</el-button>
        <el-button :loading="companyDialog.loading" type="primary" @click="companyButton">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog v-if="staffDialog.visible" :title="staffDialog.title" :visible.sync="staffDialog.visible" append-to-body width="30%" destroy-on-close @close="closeStaffDialog">
      <el-form label-position="left" label-width="120px" :model="staffDialog.staffInfo" ref="staffInfo" :rules="rules">
        <el-form-item label="所属企业" prop="companyId">
          <el-select v-model="staffDialog.staffInfo.companyId" placeholder="请选择企业">
            <el-option v-for="item in companyOptions" :key="item.companyId" :label="item.companyName" :value="item.companyId" />
          </el-select>
        </el-form-item>

        <el-form-item label="员工姓名" prop="userName">
          <el-input v-model="staffDialog.staffInfo.userName" placeholder="请输入员工姓名" clearable class="fullWidth"/>
        </el-form-item>

        <el-form-item label="员工手机号" prop="phone">
          <el-input v-model="staffDialog.staffInfo.phone" placeholder="请输入员工手机号" clearable maxlength="11" minlength="11" class="fullWidth"/>
        </el-form-item>

        <el-form-item label="是否是负责人">
          <el-radio-group v-model="staffDialog.staffInfo.isManage">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否加入白名单">
          <el-radio-group v-model="staffDialog.staffInfo.isUsed">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeStaffDialog">取 消</el-button>
        <el-button :loading="staffDialog.loading" type="primary" @click="staffButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import excelUtil from '@/utils/excelUtils.js'
export default {
  name: 'AIFireControl',
  components: { },
  data() {
    const checkPhone = async(rule, value, callback) => {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'))
      }
    }
    return {
      rules: {
        userName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ],
        companyId: [
          { required: true, message: '请选择所属企业', trigger: 'blur' }
        ]
      },
      tabName: 'company',
      companyOptions: [],
      company: {
        searchData: {
          companyName: null
        },
        multipleSelection: [],
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      },
      staff: {
        searchData: {
          companyName: null,
          staffName: null,
          phone: null
        },
        page: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        multipleSelection: []
      },
      companyData: [],
      staffData: [],
      companyDialog: {
        loading: false,
        visible: false,
        title: '',
        method: '',
        companyInfo: {
          companyId: null,
          companyName: null,
          isUsed: 0
        }
      },
      staffDialog: {
        loading: false,
        visible: false,
        title: '',
        method: '',
        staffInfo: {
          companyId: null,
          userName: null,
          phone: null,
          isManage: 0,
          isUsed: 0
        }
      }
    }
  },
  computed: {
  },
  mounted() {
    this.loadCompanyOptions()
    this.handleClick()
  },
  methods: {
    // 加载企业下拉框
    async loadCompanyOptions() {
      const params = {
        url: '/manage/company/getCompany',
        params: ''
      }
      const res = await this.$store.dispatch('http/get', params)
      this.companyOptions = res.data
    },
    // 关闭企业弹出框
    closeCompanyDialog() {
      Object.assign(this.companyDialog, this.$options.data().companyDialog)
      this.$refs.companyInfo.resetFields()
    },
    // 企业弹出框确定按钮
    companyButton() {
      this.$refs.companyInfo.validate(async valid => {
          if (valid) {
            this.companyDialog.loading = true
            const params = {
              url: this.companyDialog.method,
              params: this.companyDialog.companyInfo
            }
            const res = await this.$store.dispatch('http/post', params)
            if (res.code === '200') {
              this.$message({
                message: `${this.companyDialog.title}成功`,
                type: 'success'
              })
              this.closeCompanyDialog()
              this.loadCompany()
            } else {
              this.$message({
                message: `${this.companyDialog.title}失败，${res.message}`,
                type: 'error'
              })
              this.closeCompanyDialog()
              this.loadCompany()
            }
          } else {
            return false
          }
      })
    },
    // 关闭员工弹出框
    closeStaffDialog() {
      Object.assign(this.staffDialog, this.$options.data().staffDialog)
      this.$refs.staffInfo.resetFields()
    },
    // 员工弹出框确定按钮
    async staffButton() {
      this.$refs.staffInfo.validate(async valid => {
        if (valid) {
          this.staffDialog.loading = true
          const params = {
            url: this.staffDialog.method,
            params: this.staffDialog.staffInfo
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({
              message: `${this.staffDialog.title}成功`,
              type: 'success'
            })
            this.closeStaffDialog()
            this.loadStaff()
          } else {
            this.$message({
              message: `${this.staffDialog.title}失败`,
              type: 'error'
            })
            this.closeStaffDialog()
            this.loadStaff()
          }
        } else {
          return false
        }
      })
    },
    // 修改员工
    editStaff(val) {
      this.staffDialog.title = '修改员工信息'
      this.staffDialog.method = '/manage/staff/editStaff'
      Object.assign(this.staffDialog.staffInfo, val)
      this.staffDialog.visible = true
    },
    // 删除员工
    deleteStaff(val) {
      this.$confirm(`此操作将永久删除 ${val.userName} 员工, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const params = {
          url: '/manage/staff/deleteStaff',
          params: val.userId
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.$message({ message: '删除成功', type: 'success' })
          // 重新加载页面数据
          this.loadStaff()
        } else {
          this.$message({ message: res.msg, type: 'warning' })
        }
      }).catch(() => {
        this.$message({ message: '已取消删除', type: 'info' })
      })
    },
    // 切换tab
    handleClick(tab, event) {
      this.tabName === 'company' ? this.loadCompany() : this.loadStaff()
    },
    // 是否白名单
    async changeWhiteList(val) {
      const params = {
        url: '/manage/staff/changeWhiteList',
        params: val.userId
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({ message: `${val.isUsed === 1 ? '移除' : '添加'}白名单成功`, type: 'success' })
        // 重新加载页面数据
        this.loadStaff()
      } else {
        this.$message({ message: res.msg, type: 'warning' })
      }
    },
    // 查询员工
    searchStaff() {
      Object.assign(this.staff.page, this.$options.data().staff.page)
      this.loadStaff()
    },
    // 新增员工信息
    addStaff() {
      this.staffDialog.title = '新增员工信息'
      this.staffDialog.method = '/manage/staff/addStaff'
      this.staffDialog.visible = true
    },
    // 下载导入模板
    async download() {
      const params = {
        url: '/manage/file/getTemplatePath',
        params: ''
      }
      const res = await this.$store.dispatch('http/get', params)
      excelUtil(res.data, '企业员工信息导入模板.xlsx')
    },
    // 导入企业员工信息数据
    async upload(content) {
      const fd = new FormData()
      fd.append('file', content.file)
      let params = {
        url: '/manage/file/importStaff',
        params: fd
      }
      let res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({
          message: '上传导入成功',
          type: 'success'
        })
        // 重新加载页面数据
        this.loadStaff()
        this.$refs.upload.clearFiles()
      } else {
        this.$refs.upload.clearFiles()
        this.$message.error(res.message);
      }
    },
    // 上传文件之前 先判断文件后缀名和文件大小
    beforeUpload(file) {
      const fileType = file.name.split('.')[file.name.split('.').length - 1] === 'xlsx'
      const fileSize = file.size / 1024 / 1024 < 10
      if (!fileType) {
        this.$message({
          message: '上传的文件只能是 xlsx 格式',
          type: 'error',
          duration: 2500
        })
        this.$refs.upload.clearFiles()
      }
      if (!fileSize) {
        this.$message({
          message: '上传模板大小不能超过10MB',
          type: 'error',
          duration: 2500
        })
        this.$refs.upload.clearFiles()
      }
      return fileType && fileSize
    },
    // 批量删除
    batchDelete() {
      if (!this.staff.multipleSelection.length > 0){
        this.$message({ message: '请先选中员工', type: 'warning' })
      } else {
        this.$confirm('此操作将永久删除这些员工, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(async() => {
          const params = {
            url: '/manage/staff/batchDelete',
            params: this.staff.multipleSelection
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ message: '删除成功', type: 'success' })
            // 重新加载页面数据
            this.loadStaff()
          } else {
            this.$message({ message: res.msg, type: 'warning' })
          }
        }).catch(() => {
          this.$message({ message: '已取消删除', type: 'info' })
        })
      }
    },
    // 批量启用
    async batchStart() {
      if (this.company.multipleSelection.length > 0){
        const params = {
          url: '/manage/company/batchStartOrStop/1',
          params: this.company.multipleSelection
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.loadCompany()
        }
      } else {
        this.$message({ message: '请先选择企业', type: 'warning' })
      }
    },
    // 批量禁用
    async batchStop() {
      if (this.company.multipleSelection.length > 0){
        const params = {
          url: '/manage/company/batchStartOrStop/0',
          params: this.company.multipleSelection
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.loadCompany()
        }
      } else {
        this.$message({ message: '请先选择企业', type: 'warning' })
      }
    },
    // 添加
    addCompany() {
      this.companyDialog.title = '新增企业信息'
      this.companyDialog.method = '/manage/company/insertCompany'
      this.companyDialog.visible = true
    },
    // 查询
    searchCompany() {
      Object.assign(this.company.page, this.$options.data().company.page)
      this.loadCompany()
    },
    // 修改
    editCompany(val) {
      this.companyDialog.title = '修改企业信息'
      this.companyDialog.method = '/manage/company/editCompany'
      Object.assign(this.companyDialog.companyInfo, val)
      this.companyDialog.visible = true
    },
    // 删除
    deleteCompany(val) {
      this.$confirm(`此操作将永久删除 ${val.companyName} 企业, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const params = {
          url: '/manage/company/deleteCompany',
          params: val.companyId
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.$message({ message: '删除成功', type: 'success' })
          // 重新加载页面数据
          this.loadCompany()
        } else {
          this.$message({ message: res.msg, type: 'warning' })
        }
      }).catch(() => {
        this.$message({ message: '已取消删除', type: 'info' })
      })
    },
    // 禁用
    stopCompany(val) {
      this.$confirm(`此操作将${val.status === 1 ? '禁用' : '启用'}该企业, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const params = {
          url: '/manage/company/stopCompany',
          params: val.companyId
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.$message({ message: `${val.status === 1 ? '禁用' : '启用'}成功`, type: 'success' })
          // 重新加载页面数据
          this.loadCompany()
        } else {
          this.$message({ message: res.msg, type: 'warning' })
        }
      }).catch(() => {
        this.$message({ message: `已取消${val.status === 1 ? '禁用' : '启用'}`, type: 'info' })
      })
    },
    // 加载企业
    async loadCompany() {
      const params = {
        url: '/manage/company/getCompanyByPageByWhere',
        params: {
          currentPage: this.company.page.currentPage,
          pageSize: this.company.page.pageSize,
          searchData: this.company.searchData
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.company.page.total = res.data.total
        this.companyData = res.data.dataList
      } else {
        this.companyData = []
        this.$message({
          showClose: true,
          message: '暂无数据',
          type: 'warning'
        })
      }
    },
    // 加载员工
    async loadStaff() {
      const params = {
        url: '/manage/staff/getStaffByPageByWhere',
        params: {
          currentPage: this.staff.page.currentPage,
          pageSize: this.staff.page.pageSize,
          searchData: this.staff.searchData
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.staff.page.total = res.data.total
        this.staffData = res.data.dataList
      } else {
        this.staffData = []
        this.$message({
          showClose: true,
          message: '暂无数据',
          type: 'warning'
        })
      }
    },
    // 每页条数事件
    handleSizeChange(val) {
      this.company.page.pageSize = val
      this.loadCompany()
    },
    // 翻页事件
    handleCurrentChange(val) {
      this.company.page.currentPage = val
      this.loadCompany()
    },
    // 多选
    handleSelectionChange(val) {
      this.company.multipleSelection = val
    },
    // 员工每页条数事件
    handleSizeChange1(val) {
      this.staff.page.pageSize = val
      this.loadStaff()
    },
    // 员工翻页事件
    handleCurrentChange1(val) {
      this.staff.page.currentPage = val
      this.loadStaff()
    },
    // 员工多选
    handleSelectionChange1(val) {
      this.staff.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 25px;
  }
  .fullWidth{
    width: 100%;
  }
</style>
