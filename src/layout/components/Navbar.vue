<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <screen-full id="screenfull" class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="imageUrl" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="changeRole">切换角色</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="editPW">修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog v-if="dialog.visible" title="修改密码" :visible.sync="dialog.visible" append-to-body width="40%" destroy-on-close @close="closeDialog">
      <el-form ref="userInfo" status-icon label-position="left" label-width="80px" :model="dialog.userInfo" :rules="dialogRules">
        <el-tooltip v-model="dialog.capsTooltip1" content="大写锁定！" placement="top" manual>
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              :key="dialog.passwordType1"
              ref="oldPassword"
              v-model="dialog.userInfo.oldPassword"
              :type="dialog.passwordType1"
              placeholder="请输入旧密码"
              name="oldPassword"
              style="width: 60%;"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapsLock1"
              @blur="dialog.capsTooltip1 = false"
            >
              <svg-icon slot="suffix" :icon-class="dialog.passwordType1 === 'password' ? 'eye' : 'eye-open'" @click="showPwd1" />
            </el-input>
          </el-form-item>
        </el-tooltip>

        <el-tooltip v-model="dialog.capsTooltip2" content="大写锁定！" placement="top" manual>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              :key="dialog.passwordType2"
              ref="newPassword"
              v-model="dialog.userInfo.newPassword"
              :type="dialog.passwordType2"
              placeholder="请输入新密码"
              name="newPassword"
              style="width: 60%;"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapsLock2"
              @blur="dialog.capsTooltip2 = false"
            >
              <svg-icon slot="suffix" :icon-class="dialog.passwordType2 === 'password' ? 'eye' : 'eye-open'" @click="showPwd2" />
            </el-input>
            <el-progress :percentage="percentage" :status="status" :stroke-width="20" :show-text="false" style="width: 20%;display: inline-block;vertical-align: text-bottom;" />
            <span>{{ format }}</span>
          </el-form-item>
        </el-tooltip>

        <el-tooltip v-model="dialog.capsTooltip3" content="大写锁定！" placement="top" manual>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              :key="dialog.passwordType3"
              ref="confirmPassword"
              v-model="dialog.userInfo.confirmPassword"
              :type="dialog.passwordType3"
              placeholder="请再次输入新密码"
              name="confirmPassword"
              style="width: 60%;"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapsLock3"
              @blur="dialog.capsTooltip3 = false"
            >
              <svg-icon slot="suffix" :icon-class="dialog.passwordType3 === 'password' ? 'eye' : 'eye-open'" @click="showPwd3" />
            </el-input>
          </el-form-item>
        </el-tooltip>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button :loading="dialog.loading" type="primary" @click="saveButton">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog v-if="roleDialog.visible" title="切换角色" :visible.sync="roleDialog.visible" append-to-body width="30%" destroy-on-close @close="closeRoleDialog">
      <el-select v-model="roleDialog.roleId" placeholder="请选择角色">
        <el-option v-for="item in roleOptions" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="roleDialog.loading" @click="closeRoleDialog">取 消</el-button>
        <el-button :loading="roleDialog.loading" type="primary" @click="saveRoleButton">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from './components/Breadcrumb'
import Hamburger from './components/Hamburger'
import ScreenFull from './components/ScreenFull'
import Search from './components/HeaderSearch'
import { Encrypt } from '@/utils/encrypt'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ScreenFull,
    Search
  },
  data() {
    return {
      imageUrl: null,
      status: null,
      format: null,
      percentage: 0,
      dialog: {
        visible: false,
        loading: false,
        capsTooltip1: false,
        capsTooltip2: false,
        capsTooltip3: false,
        passwordType1: 'password',
        passwordType2: 'password',
        passwordType3: 'password',
        userInfo: {
          oldPassword: null,
          newPassword: null,
          confirmPassword: null
        }
      },
      roleOptions: [],
      roleDialog: {
        visible: false,
        loading: false,
        roleId: this.$store.state.user.roles[0]
      },
      dialogRules: {
        oldPassword: [{ required: true, trigger: 'blur', validator: this.validateOldPassword }],
        newPassword: [{ required: true, trigger: 'change', validator: this.validateNewPassword }],
        confirmPassword: [{ required: true, trigger: 'change', validator: this.validateConfirmPassword }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },
  mounted() {
    this.getPicUrl()
  },
  methods: {
    async getPicUrl() {
      const pic = this.$store.state.user.userInfo.picUrl
      if (pic !== null && pic !== '') {
        const params = {
          url: '/manage/fileDownload',
          params: pic
        }
        const res = await this.$store.dispatch('http/post', params)
        this.imageUrl = 'data:image/png;base64,' + res.data
      }
    },
    async validateOldPassword(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入旧密码'))
      } else {
        const params = {
          loginName: this.$store.state.user.userInfo.loginName,
          password: value
        }
        const res = await this.$store.dispatch('user/validateOldPassword', Encrypt(params))
        if (res.code === '200') {
          return callback()
        } else {
          return callback(new Error('密码错误'))
        }
      }
    },
    async validateNewPassword(rule, value, callback) {
      const reg = /^[\S\n\s]{8,16}$/ // 判断密码格式是否正确
      const regChar = /[a-zA-Z]/ // 字母
      const regNum = /\d/ // 数字
      const regAllow = /[`~@^&*()_+<>?:"{},.\/;'[\]]/ // 允许特殊字符
      const regNotAllow = /[!#$%]/ // 不允许特殊字符
      if (!value) {
        this.status = null
        this.format = null
        this.percentage = 0
        callback(new Error('请输入新密码'))
      } else if (!(reg.test(value))) {
        this.status = null
        this.format = null
        this.percentage = 0
        callback(new Error('密码必须是8-16位'))
      } else if ((regNotAllow.test(value))) {
        this.status = null
        this.format = null
        this.percentage = 0
        callback(new Error('包含非法字符（!#$%）'))
      } else {
        if (regChar.test(value) && regNum.test(value) && regAllow.test(value)) {
          // 高级密码
          this.status = 'success'
          this.format = '强'
          this.percentage = 100
          callback()
        } else if (regChar.test(value) && regNum.test(value)) {
          // 中级密码
          this.status = 'warning'
          this.format = '低'
          this.percentage = 66
          callback(new Error('密码过于简单，必须包含数字,字母，符号'))
        } else if (regChar.test(value) || regNum.test(value)) {
          // 低级密码
          this.status = 'exception'
          this.format = '弱'
          this.percentage = 33
          callback(new Error('密码过于简单，必须包含数字,字母，符号'))
        }
      }
    },
    async validateConfirmPassword(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.dialog.userInfo.confirmPassword) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    editPW() {
      this.dialog.visible = true
    },
    async changeRole() {
      const params = {
        url: '/manage/getRoleListById',
        params: this.$store.state.user.userInfo.userId
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.roleOptions = res.data
        this.roleDialog.visible = true
      }
    },
    saveRoleButton() {
      this.$confirm('确认切换角色', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        this.roleDialog.loading = true
        const params = {
          url: '/manage/changeRoleById',
          params: this.roleDialog.roleId
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.$message({ message: '切换成功', type: 'success' })
          const accessRoutes = await this.$store.dispatch('permission/generateRoutes', res.data)
          this.$router.addRoutes(accessRoutes)
          this.$store.state.user.roles[0] = this.roleDialog.roleId
          this.closeRoleDialog()
        } else {
          this.$message({ message: res.msg, type: 'warning' })
        }
      }).catch((e) => {
        this.$message({ message: e, type: 'info' })
      })
    },
    saveButton() {
      this.$refs.userInfo.validate(async valid => {
        if (valid) {
          this.dialog.loading = true
          const params = {
            url: '/manage/editPassword',
            params: Encrypt({
              loginName: this.$store.state.user.userInfo.loginName,
              password: this.dialog.userInfo.newPassword
            })
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ showClose: true, message: '修改成功, 即将回到登录界面', type: 'success' })
            setTimeout(() => {
              this.logout()
            }, 500)
          } else {
            this.$message({
              showClose: true,
              message: '修改失败',
              type: 'error'
            })
            this.dialog.loading = false
          }
        } else {
          return false
        }
      })
    },
    closeDialog() {
      Object.assign(this.dialog, this.$options.data().dialog)
    },
    closeRoleDialog() {
      this.roleDialog.visible = false
      this.roleDialog.loading = false
    },
    checkCapsLock1({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.dialog.capsTooltip1 = true
        } else {
          this.dialog.capsTooltip1 = false
        }
      }
      if (key === 'CapsLock' && this.dialog.capsTooltip1 === true) {
        this.dialog.capsTooltip1 = false
      }
    },
    checkCapsLock2({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.dialog.capsTooltip2 = true
        } else {
          this.dialog.capsTooltip2 = false
        }
      }
      if (key === 'CapsLock' && this.dialog.capsTooltip2 === true) {
        this.dialog.capsTooltip2 = false
      }
    },
    checkCapsLock3({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.dialog.capsTooltip3 = true
        } else {
          this.dialog.capsTooltip3 = false
        }
      }
      if (key === 'CapsLock' && this.dialog.capsTooltip3 === true) {
        this.dialog.capsTooltip3 = false
      }
    },
    showPwd1() {
      if (this.dialog.passwordType1 === 'password') {
        this.dialog.passwordType1 = ''
      } else {
        this.dialog.passwordType1 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.oldPassword.focus()
      })
    },
    showPwd2() {
      if (this.dialog.passwordType2 === 'password') {
        this.dialog.passwordType2 = ''
      } else {
        this.dialog.passwordType2 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.newPassword.focus()
      })
    },
    showPwd3() {
      if (this.dialog.passwordType3 === 'password') {
        this.dialog.passwordType3 = ''
      } else {
        this.dialog.passwordType3 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.confirmPassword.focus()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  // background: #114378; // 修改 #fff
  background: #221e2b; // 修改 #fff
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  border-bottom: 1px solid #07ccf9;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    // -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
