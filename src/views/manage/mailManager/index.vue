<template>
  <div class="container">
    <el-container class="main">
      <el-header style="background-color:#18111f;color:#fff">
        <span class="left">企业邮箱管理</span>
      </el-header>
      <el-scrollbar style="height: 100%;background-color:#18111f;color:#fff">
        <el-main>
          <div style="width: 35%;float: left">
            <el-form ref="mailForm" :model="form" :rules="rules" status-icon label-position="left" label-width="120px">
              <el-form-item label="邮箱服务器" prop="host">
                <el-select v-model="form.host" placeholder="请选择" class="formItem" clearable>
                  <el-option label="smtp.qq.com（qq邮箱）" value="smtp.qq.com" />
                  <el-option label="smtp.163.com（163邮箱）" value="smtp.163.com" />
                </el-select>
              </el-form-item>
              <el-form-item label="端口号" prop="port">
                <el-tooltip class="item" effect="dark" content="默认端口号" placement="top">
                  <el-input v-model="form.port" disabled class="formItem" />
                </el-tooltip>
              </el-form-item>
              <el-form-item label="企业邮箱账号" prop="userName">
                <el-input v-model="form.userName" placeholder="请输入企业邮箱账号" clearable class="formItem" />
              </el-form-item>
              <el-form-item label="企业邮箱授权码" prop="password">
                <el-input v-model="form.password" show-password placeholder="请输入企业邮箱授权码" clearable class="formItem" />
              </el-form-item>
              <el-button :disabled="editButton" :loading="loading" type="primary" icon="el-icon-edit" class="animated zoomIn slow" @click="editMail">修改</el-button>
            </el-form>
          </div>

          <div style="width: 65%;float: right">
            <el-tabs type="border-card">
              <el-tab-pane label="qq邮箱设置">
                <el-carousel height="30rem" :autoplay="false" arrow="always" indicator-position="outside" trigger="click">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <el-image
                      :src="require('@/assets/mailConfig/qqMail/qqMail-'+item+'.png')"
                      style="width:100%;height: 100%;"
                      fit="fill"
                    />
                  </el-carousel-item>
                </el-carousel>
              </el-tab-pane>
              <el-tab-pane label="163邮箱设置">
                <el-carousel height="30rem" :autoplay="false" arrow="always" indicator-position="outside" trigger="click">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <el-image
                      :src="require('@/assets/mailConfig/163Mail/163Mail-'+item+'.png')"
                      style="width:100%;height: 100%;"
                      fit="fill"
                    />
                  </el-carousel-item>
                </el-carousel>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-main>
      </el-scrollbar>
    </el-container>
  </div>
</template>

<script>
import { isObjectValueEqual } from '@/utils/index'
export default {
  name: 'MailManager',
  data() {
    return {
      editButton: true,
      loading: false,
      cacheData: {},
      form: {
        host: '',
        port: '465',
        userName: '',
        password: ''
      },
      rules: {
        host: [{ required: true, message: '请输入邮箱服务器', trigger: 'blur' }],
        userName: [{ required: true, message: '请输入企业邮箱账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入企业邮箱授权码', trigger: 'blur' }]
      }
    }
  },
  watch: {
    form: {
      handler: function(newVal, oldVal) {
        this.editButton = isObjectValueEqual(newVal, this.cacheData)
      },
      deep: true,
      immediate: false
    }
  },
  created() {
    this.$nextTick(async() => {
      this.getMail()
    })
  },
  methods: {
    async getMail() {
      const params = {
        url: '/manage/getMail',
        params: ''
      }
      const res = await this.$store.dispatch('http/get', params)
      this.cacheData = res.data
      Object.assign(this.form, res.data)
    },
    async editMail() {
      this.$refs.mailForm.validate(async valid => {
        if (valid) {
          this.loading = true
          const params = {
            url: '/manage/editMail',
            params: this.form
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ showClose: true, message: '保存成功', type: 'success' })
          } else {
            this.$message({ showClose: true, message: '保存失败', type: 'error' })
            Object.assign(this.form, this.cacheData)
          }
          this.loading = false
          this.editButton = true
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .left{
    float: left;
    padding-left: 3px;
  }
  .el-form-item /deep/ .el-form-item__label{
    color: #fff;
  }
  .formItem{
    width: 80%;
  }
  .container{
    background-color: #18111f;
    height: calc(100vh - 84px);
    // padding: 5px;
  }
  .main{
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
