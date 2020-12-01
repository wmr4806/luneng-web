<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">系统登录</h3>
      </div>

      <el-form-item prop="loginName">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginName"
          v-model.trim="loginForm.loginName"
          placeholder="账号"
          name="loginName"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="大写锁定！" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapsLock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-row :span="24">
        <el-col :span="16">
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="2">
          <div class="login-code" @click="refreshCode">
            <!--验证码组件-->
            <s-identify :identify-code="identifyCode" />
          </div>
        </el-col>
      </el-row>

      <div style="width:100%;">
        <el-button :loading="loading" type="primary" style="width:60%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
        <el-button style="float: right;margin-bottom:30px;" icon="el-icon-question" @click.native.prevent="forgetPassword">忘记密码</el-button>
      </div>
    </el-form>
    <!-- <img class="logo" :src="LuNeng"> -->

    <el-dialog v-if="dialog.visible" title="忘记密码" :visible.sync="dialog.visible" append-to-body width="40%" destroy-on-close @close="closeDialog">
      <el-form ref="userInfo" status-icon label-position="left" label-width="80px" :model="dialog.userInfo" :rules="dialogRules">
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="dialog.userInfo.loginName" style="width: 60%;" placeholder="请输入登录名" clearable />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dialog.userInfo.email" style="width: 60%;" placeholder="请输入邮箱地址" clearable />
          <el-button type="primary" :disabled="dialog.userInfo.button" @click="getIdentifyCode">{{ dialog.userInfo.text }}</el-button>
        </el-form-item>

        <el-form-item label="验证码" prop="identifyCode">
          <el-input v-model="dialog.userInfo.identifyCode" style="width: 40%;" placeholder="请输入验证码" clearable />
        </el-form-item>

        <el-tooltip v-model="dialog.capsTooltip1" content="大写锁定！" placement="top" manual>
          <el-form-item label="新密码" prop="password">
            <el-input
              :key="dialog.passwordType1"
              ref="dialogPassword"
              v-model="dialog.userInfo.password"
              :type="dialog.passwordType1"
              placeholder="请输入新密码"
              name="password1"
              style="width: 60%;"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapsLock1"
              @blur="dialog.capsTooltip1 = false"
            >
              <svg-icon slot="suffix" :icon-class="dialog.passwordType1 === 'password' ? 'eye' : 'eye-open'" @click="showPwd1" />
            </el-input>
            <el-progress :percentage="percentage" :status="status" :stroke-width="20" :show-text="false" style="width: 20%;display: inline-block;vertical-align: text-bottom;" />
            <span>{{ format }}</span>
          </el-form-item>
        </el-tooltip>

        <el-tooltip v-model="dialog.capsTooltip2" content="大写锁定！" placement="top" manual>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input
              :key="dialog.passwordType2"
              ref="confirmPassword"
              v-model="dialog.userInfo.confirmPassword"
              :type="dialog.passwordType2"
              placeholder="请再次输入新密码"
              name="password2"
              style="width: 60%;"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapsLock2"
              @blur="dialog.capsTooltip2 = false"
            >
              <svg-icon slot="suffix" :icon-class="dialog.passwordType2 === 'password' ? 'eye' : 'eye-open'" @click="showPwd2" />
            </el-input>
          </el-form-item>
        </el-tooltip>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button :loading="dialog.loading" type="primary" @click="saveButton">确 定</el-button>
      </div>
    </el-dialog>

    <a id="bigScreen" :href="bigScreenUrl" target="_self" />
  </div>
</template>

<script>
import { Encrypt } from '@/utils/encrypt'
import LuNeng from '@/assets/LuNeng.png'
import SIdentify from './validate'
export default {
  name: 'Login',
  components: { SIdentify },
  data() {
    const validateCode = (rule, value, callback) => {
      if (this.identifyCode !== value) {
        this.loginForm.code = ''
        this.refreshCode()
        callback(new Error('请输入正确的验证码'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱地址'))
      } else if (!(/^([\.a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(value))) {
        callback(new Error('请输入正确的邮箱格式'))
      } else {
        callback()
      }
    }
    const validateIdentifyCode = async(rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入验证码'))
      } else {
        const params = {
          url: '/manage/validateIdentifyCode',
          params: {
            mail: this.dialog.userInfo.email,
            code: value
          }
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          callback()
        } else {
          callback(new Error('验证码错误'))
        }
      }
    }
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      this.value = value
      if (value.length < 8) {
        this.loading = false
        callback(new Error('密码不得少于8位'))
      } else if (value.length >= 8) {
        this.loading = false
        callback()
      }
    }
    return {
      isDebugLogin: false,
      bigScreenUrl: 'https://datav.aliyuncs.com/share/279199f96c3e159c9e706c042d837706',
      value: '',
      timer: null,
      status: null,
      format: null,
      percentage: 0,
      dialog: {
        visible: false,
        loading: false,
        capsTooltip1: false,
        capsTooltip2: false,
        passwordType1: 'password',
        passwordType2: 'password',
        userInfo: {
          loginName: null,
          email: null,
          identifyCode: null,
          password: null,
          confirmPassword: null,
          text: '获取验证码',
          button: false
        }
      },
      LuNeng: LuNeng,
      loginForm: {
        loginName: process.env.NODE_ENV === 'production' ? '' : 'devtest',
        password: process.env.NODE_ENV === 'production' ? '' : 'Guojia.12345',
        code: ''
      },
      identifyCodes: '234567890',
      identifyCode: '',
      dialogRules: {
        loginName: [{ required: true, trigger: 'blur', validator: this.validateLoginName }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        identifyCode: [{ required: true, trigger: 'blur', validator: validateIdentifyCode }],
        password: [{ required: true, trigger: 'change', validator: this.validateNewPassword }],
        confirmPassword: [{ required: true, trigger: 'change', validator: this.validateConfirmPassword }]
      },
      loginRules: {
        loginName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { validator: validateCode, trigger: 'blur' }
        ]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    },
    isDebugLogin(v) {
      if (v) {
        this.loginForm.password = '123'
        this.refreshCode()
      }
    },
    identifyCode(v) {
      this.isDebugLogin && (this.loginForm.code = v)
    }
  },
  created() {
    this.refreshCode()
  },
  mounted() {
    if (this.loginForm.loginName === '') {
      this.$refs.loginName.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode() {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ]
      }
    },
    test() {
      const regChar = /[a-zA-Z]/ // 字母
      const regNum = /\d/ // 数字
      const regAllow = /[`~@^&*()_+<>?:"{},.\/;'[\]]/ // 允许特殊字符
      if (!regChar.test(this.value) || !regNum.test(this.value) || !regAllow.test(this.value)) {
        this.$message({
          message: '密码过于简单，请立即修改',
          type: 'warning',
          duration: 6000
        })
      } else {
        return true
      }
    },
    async validateLoginName(rule, value, callback) {
      if (!value) {
        callback(new Error('请输入登录名'))
      } else {
        const params = {
          url: '/manage/checkLoginName',
          params: {
            userId: '',
            loginName: value
          }
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          return callback(new Error('不存在此账号'))
        } else {
          return callback()
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
      } else {
        if (value === this.dialog.userInfo.password) {
          callback()
        } else {
          callback(new Error('两次密码输入不一致'))
        }
      }
    },
    async getIdentifyCode() {
      this.$refs.userInfo.validateField('email', async valid => {
        if (valid === '') {
          const params = {
            url: '/manage/getIdentifyCode',
            params: {
              loginName: this.dialog.userInfo.loginName,
              mail: this.dialog.userInfo.email
            }
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.dialog.userInfo.button = true
            let timeNum = 60
            const timeClock = setInterval(() => {
              this.dialog.userInfo.text = timeNum + '秒后重发'
              timeNum--
              if (timeNum === 0) {
                clearInterval(timeClock)
                this.dialog.userInfo.text = '重新发送'
                this.dialog.userInfo.button = false
              }
            }, 1000)
          } else {
            this.$message({
              message: '登录名和绑定的邮箱不一致',
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    },
    saveButton() {
      this.$refs.userInfo.validate(async valid => {
        if (valid) {
          this.dialog.loading = true
          const params = {
            url: '/manage/editPasswordByMail',
            params: Encrypt({
              loginName: this.dialog.userInfo.loginName,
              password: this.dialog.userInfo.password
            })
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ showClose: true, message: '修改成功', type: 'success' })
            this.closeDialog()
            this.dialog.loading = false
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
    checkCapsLock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
          this.capsTooltip = true
        } else {
          this.capsTooltip = false
        }
      }
      if (key === 'CapsLock' && this.capsTooltip === true) {
        this.capsTooltip = false
      }
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
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showPwd1() {
      if (this.dialog.passwordType1 === 'password') {
        this.dialog.passwordType1 = ''
      } else {
        this.dialog.passwordType1 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.dialogPassword.focus()
      })
    },
    showPwd2() {
      if (this.dialog.passwordType2 === 'password') {
        this.dialog.passwordType2 = ''
      } else {
        this.dialog.passwordType2 = 'password'
      }
      this.$nextTick(() => {
        this.$refs.confirmPassword.focus()
      })
    },
    forgetPassword() {
      this.dialog.visible = true
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', Encrypt(this.loginForm))
            .then(() => {
              this.$router.push({ path: '/datav', query: this.otherQuery })
              // 跳转大屏链接
              // document.getElementById('bigScreen').click()
              this.loading = false
              this.test()
            })
            .catch((e) => {
              this.$message({
                type: 'error',
                message: e
              })
              this.loading = false
            })
        } else {
          this.$message({
            showClose: true,
            message: '登录失败'
          })
          this.loading = false
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0;
      -webkit-appearance: none;
      border-radius: 0;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }
  .logo{
    margin: 15rem 0 0 20rem;
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#72777e;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-code {
  height: 47px;
  width: 100%;
  /*flex 布局*/
  display: flex;
  /*实现垂直居中*/
  align-items: center;
}
.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    float: right;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin-right: 15rem;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  /*.thirdparty-button {*/
    /*position: absolute;*/
    /*right: 0;*/
    /*bottom: 6px;*/
  /*}*/
  /*@media only screen and (max-width: 470px) {*/
    /*.thirdparty-button {*/
      /*display: none;*/
    /*}*/
  /*}*/
}
.el-scrollbar__wrap {
    background: #72777e;
  }
</style>
