<template>
  <div class="container">
    <el-row class="panel-group" :gutter="20">
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel animated pulse">
          <depart-tree />
        </div>
      </el-col>
      <el-col :span="16" class="card-panel-col">
        <div class="card-panel animated pulse">
          <user-info @handleUserAddBtn="addUserBtn" @handleUserEditBtn="editUserBtn" />
        </div>
      </el-col>
    </el-row>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="title" width="75%" destroy-on-close @close="closeBigDialog">
      <el-main v-loading="loading.form">
        <el-form ref="userInfo" :model="userInfo" :rules="rules" label-position="left" label-width="80px">
          <div style="display: inline-block;float: left;width: 20%">
            <el-form-item prop="picUrl" label-width="0px">
              <el-upload
                ref="upload"
                action="#"
                class="avatar-uploader"
                :on-success="handleAvatarSuccess"
                :show-file-list="false"
                :on-remove="onRemove"
                list-type="picture-card"
                :limit="1"
                :http-request="myUpload"
                :before-upload="beforeUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" width="100%">
                <i v-else class="el-icon-plus avatar-uploader-icon">上传头像</i>
              </el-upload>
            </el-form-item>
          </div>

          <div style="display: inline-block;width: 80%">

            <el-row class="panel-group" :gutter="24">

              <el-col :span="8">
                <el-form-item label="姓名" prop="userName">
                  <el-input v-model="userInfo.userName" class="fullWidth" maxlength="8" placeholder="请输入姓名.." />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="电话号码" prop="mobile">
                  <el-input
                    v-model="userInfo.mobile"
                    class="fullWidth"
                    maxlength="11"
                    placeholder="请输入手机号码.."
                    minlength="11"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="角色" prop="roles">
                  <el-select v-model="userInfo.roles" multiple placeholder="请选择" class="fullWidth" collapse-tags>
                    <el-option v-for="item in rolesOption" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>

            <el-row class="panel-group" :gutter="24">

              <el-col :span="8">
                <el-form-item label="登录名" prop="loginName">
                  <el-input v-model="userInfo.loginName" class="fullWidth" maxlength="10" placeholder="请输入登录名.." />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="职务" prop="job">
                  <el-input v-model="userInfo.job" class="fullWidth" maxlength="10" placeholder="请输入职务.." />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="性别" prop="sex">
                  <el-select v-model="userInfo.sex" placeholder="请选择" class="fullWidth">
                    <el-option label="男" value="男" />
                    <el-option label="女" value="女" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="userInfo.email" class="fullWidth" maxlength="50" placeholder="请输入邮箱.." />
                </el-form-item>
              </el-col>

            </el-row>

            <el-row class="panel-group" :gutter="24">

              <el-col :span="8">
                <el-form-item label="所在部门" prop="departmentId">
                  <el-button type="primary" icon="el-icon-plus" plain @click="dialogVisibleDepart" />
                </el-form-item>
              </el-col>

            </el-row>

          </div>
        </el-form>

        <div>
          <el-row>
            <el-col>
              <el-tabs type="border-card">
                <el-tab-pane label="部门经历">
                  <el-table :data="userInfo.experienceList" border highlight-current-row class="fullWidth">

                    <el-table-column align="center" label="部门" prop="departmentName" />

                    <el-table-column align="center" label="时间" prop="entryTime" />

                    <el-table-column align="center" label="类型" prop="type" />
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
        </div>
      </el-main>

      <div slot="footer" class="dialog-footer">
        <el-button type="info" icon="el-icon-back" plain @click="closeBigDialog">返回</el-button>
        <el-button :loading="loading.btn" type="success" icon="el-icon-check" plain @click="saveUserInfo">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog v-if="showDepart" title="部门" :visible.sync="showDepart" append-to-body width="40%" destroy-on-close @close="cancelDialogVisibleDepart">
      <el-form label-position="left" label-width="80px" :model="DepartInfo">
        <el-form-item label="选择部门" required>
          <tree-select
            v-model="userInfo.departmentId"
            style="width: 50%"
            :options="selectTreeData"
            placeholder="上级机构"
            :searchable="false"
            clearable
            :normalizer="normalizer"
            @select="select"
          />
        </el-form-item>

        <el-form-item label="时间" required>
          <el-date-picker v-model="DepartInfo.entryTime" :picker-options="entry_Time" style="width: 50%" type="date" value-format="yyyy-MM-dd" format="yyyy 年 MM 月 dd 日" placeholder="选择日期" />
        </el-form-item>

        <el-form-item label="类型" required>
          <el-select v-model="DepartInfo.type" placeholder="请选择" style="width: 50%">
            <el-option label="入职" value="入职" />
            <el-option label="转部门" value="转部门" />
            <el-option label="转正" value="转正" />
            <el-option label="离职" value="离职" />
            <el-option label="退休" value="退休" />
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisibleDepart">取 消</el-button>
        <el-button type="primary" @click="departButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UserInfo from './components/UserInfo'
import DepartTree from '@/views/manage/department/components/DepartTree'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'User',
  components: {
    UserInfo,
    DepartTree,
    TreeSelect
  },
  data() {
    return {
      // 时间限制
      entry_Time: {
        disabledDate: time => {
          if (this.startTime) {
            return time.getTime() - 8.64e7 < new Date(this.startTime).getTime()
          }
        }
      },
      title: '',
      dialogVisible: false,
      saveMethodName: '',
      imageUrl: '',
      showDepart: false,
      selectTreeData: [],
      rolesOption: [],
      userInfo: {
        userId: null,
        userName: null,
        loginName: null,
        departmentId: null,
        mobile: null,
        email: null,
        sex: null,
        job: null,
        picUrl: '',
        roles: [],
        experienceList: []
      },
      DepartInfo: {
        departmentId: '',
        departmentName: '',
        entryTime: '',
        type: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        loginName: [
          { required: true, validator: this.checkLoginName, trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: this.checkPhone, trigger: 'blur' }
        ],
        departmentId: [
          { required: true, message: '请选择部门', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '请输入职务', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请选择至少一个角色', trigger: 'blur' }
        ]
      },
      loading: {
        form: false,
        btn: false
      },
      normalizer(node) { // 自定义下拉树节点模板
        return {
          id: node.departmentId,
          label: node.departmentName,
          children: JSON.stringify(node.children) === '[]' ? '' : node.children
        }
      }
    }
  },
  beforeDestroy() {
    this.$off('handleUserAddBtn', this.addUserBtn)
    this.$off('handleUserEditBtn', this.editUserBtn)
  },
  methods: {
    async checkLoginName(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入登录名'))
      } else {
        // 提交后台验证员工登录名是否存在
        const params = {
          url: '/manage/checkLoginName',
          params: {
            userId: this.userInfo.userId ? this.userInfo.userId : '',
            loginName: this.userInfo.loginName
          }
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          return callback()
        } else {
          return callback(new Error('登录名重复'))
        }
      }
    },
    async checkPhone(rule, value, callback) {
      if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'))
      }
    },
    addUserBtn() {
      this.loadBasicInfo()
      this.title = '新增人员信息'
      this.dialogVisible = true
      this.saveMethodName = '/manage/addUser'
    },
    editUserBtn(val) {
      this.loadBasicInfo()
      this.title = '修改人员信息'
      this.dialogVisible = true
      this.loading.form = true
      this.initEditUserMethod(val)
      this.saveMethodName = '/manage/editUser'
      this.loading.form = false
    },
    // 部门弹出框取消按钮
    cancelDialogVisibleDepart() {
      this.showDepart = false
      Object.assign(this.DepartInfo, this.$options.data().DepartInfo)
      // this.$refs.userInfo.resetFields()
    },
    // 部门下拉框选中
    select(data) {
      this.DepartInfo.departmentId = data.departmentId
      this.DepartInfo.departmentName = data.departmentName
    },
    // 部门弹出框确定按钮
    departButton() {
      const flag = this.DepartInfo.departmentName !== '' && this.DepartInfo.departmentId !== '' && this.DepartInfo.entryTime !== '' && this.DepartInfo.type !== ''
      if (flag) {
        const massage = {}
        massage.departmentName = this.DepartInfo.departmentName
        massage.departmentId = this.DepartInfo.departmentId
        massage.entryTime = this.DepartInfo.entryTime
        massage.type = this.DepartInfo.type
        this.userInfo.experienceList.push(massage)
        this.userInfo.departmentId = this.DepartInfo.departmentId
        this.cancelDialogVisibleDepart()
      }
    },
    // 部门按钮
    dialogVisibleDepart() {
      this.showDepart = true
    },
    // 取消按钮
    closeBigDialog() {
      Object.assign(this.$data, this.$options.data())
      this.$refs.userInfo.resetFields()
      this.cancelDialogVisibleDepart()
    },
    // 确定按钮
    saveUserInfo() {
      this.$refs.userInfo.validate(async valid => {
        if (valid) {
          this.loading.btn = true
          const params = {
            url: this.saveMethodName,
            params: this.userInfo
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ showClose: true, message: '保存成功', type: 'success' })
            this.loading.btn = false
            setTimeout(() => {
              this.turnBack()
            }, 500)
          } else {
            this.$message({
              showClose: true,
              message: '保存失败',
              type: 'error'
            })
            this.loading.btn = false
          }
        } else {
          return false
        }
      })
    },
    turnBack() {
      this.closeBigDialog()
    },
    // 删除上传头像
    onRemove() {
      this.userInfo.picUrl = ''
      this.imageUrl = ''
    },
    // 覆盖默认的上传行为
    async myUpload(content) {
      const fd = new FormData()
      fd.append('file', content.file)
      const params = {
        url: '/manage/fileUpload',
        params: fd
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code) {
        this.userInfo.picUrl = res.data
        this.$message({
          message: '上传成功'
        })
      } else {
        this.$refs.upload.clearFiles()
        this.$message({
          message: '上传失败'
        })
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    beforeUpload(file) {
      const extension = file.name.split('.')[file.name.split('.').length - 1] === 'jpg'
      const extension2 = file.name.split('.')[file.name.split('.').length - 1] === 'png'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!extension && !extension2) {
        this.$message.error('上传模板只能是 jpg、png格式')
        this.$refs.upload.clearFiles()
      }
      if (!isLt2M) {
        this.$message.error('上传模板大小不能超过 10MB')
        this.$refs.upload.clearFiles()
      }
      return extension || extension2 && isLt2M
    },
    // 修改时初始化加载信息
    async initEditUserMethod(val) {
      let params = {
        url: '/manage/getUserInfoById',
        params: val
      }
      const res = await this.$store.dispatch('http/post', params)
      this.userInfo = res.data
      if (this.userInfo.picUrl !== null && this.userInfo.picUrl !== '') {
        params = {
          url: '/manage/fileDownload',
          params: this.userInfo.picUrl
        }
        const res = await this.$store.dispatch('http/post', params)
        this.imageUrl = 'data:image/png;base64,' + res.data
      }
      this.userInfo.picUrl = null
    },
    // 初始化加载信息
    async loadBasicInfo() {
      // 获取角色下拉菜单
      let params = {
        url: '/manage/getRoleSelectList',
        params: ''
      }
      let res = await this.$store.dispatch('http/get', params)
      this.rolesOption = res.data
      // 获取机构下拉菜单
      params = {
        url: '/manage/getDepartmentTreeById',
        params: {
          id: this.$store.state.user.userInfo.departmentId
        }
      }
      res = await this.$store.dispatch('http/post', params)
      this.selectTreeData = res.data
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container{
    background-color: #18111f;
    height: calc(100vh - 84px);
    padding: 25px;
  }
  .fullWidth{
    width: 100%;
  }
  .card-panel-col{
    height: 100%;
  }
  .panel-group {
    height: 100%;
    .card-panel {
      height: 100%;
      font-size: 15px;
      background: #fff;
      position: relative;
      border-radius: 5px;
      &:hover {
        box-shadow: 2px 2px 10px #888888;
      }
    }
  }
</style>
