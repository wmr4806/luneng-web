<template>
  <div class="record">
    <el-card v-if="recordshow" class="box-card">
      <!-- <div slot="header" class="clearfix">
        <span>出入登记</span>
      </div> -->
      <div class="form-cart">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="160px"
          label-position="left"
          class="demo-ruleForm"
        >
          <el-form-item prop="visitorName">
            <template slot="label">
              <div
                style="display:flex;justify-content:space-between;position: relative;top: -2.2rem;padding-left: 0.5rem;"
              >
                <span>姓</span>
                <span>名:</span>
              </div>
            </template>
            <el-input v-model="ruleForm.visitorName" style="width:11.3rem" />
          </el-form-item>
          <!-- <el-form-item prop="entryTime">
            <template slot="label">
              <div
                style="display:flex;justify-content:space-between;position: relative;top: -2.2rem;padding-left: 0.5rem;"
              >
                <span>进</span>
                <span>入</span>
                <span>时</span>
                <span>间:</span>
              </div>
            </template>
            <el-date-picker
              v-model="ruleForm.entryTime"
              type="date"
              value-format="yyyy-MM-dd HH:mm"
              format="yyyy-MM-dd HH:mm"
              disabled
              style="width:11.3rem"
            />
          </el-form-item> -->
          <!-- <el-form-item label="：" prop="outTime">
            <template slot="label">
              <div
                style="display:flex;justify-content:space-between;position: relative;top: -2.2rem;padding-left: 0.5rem;"
              >
                <span>出</span>
                <span>去</span>
                <span>时</span>
                <span>间:</span>
              </div>
            </template>
            <el-date-picker
              v-model="ruleForm.outTime"
              type="datetime"
              style="width:11.3rem"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="请选择时间"
            />
          </el-form-item> -->
          <el-form-item label="" prop="unitContactPerson">
            <template slot="label">
              <div
                style="display:flex;justify-content:space-between;position: relative;top: -2.2rem;padding-left: 0.5rem;"
              >
                <span>联</span>
                <span>系</span>
                <span>人:</span>
              </div>
            </template>
            <el-input
              v-model="ruleForm.unitContactPerson"
              style="width:11.3rem"
            />
          </el-form-item>
          <el-form-item v-if="inputshow" label="" prop="reasons">
            <template slot="label">
              <div
                style="display:flex;justify-content:space-between;position: relative;top: -2.2rem;padding-left: 0.5rem;"
              >
                <span>事</span>
                <span>由:</span>
              </div>
            </template>
            <el-input v-model="ruleForm.reasons" style="width:11.3rem" />
          </el-form-item>
          <el-form-item v-if="inputshow" label="" prop="personNumber">
            <template slot="label">
              <div
                style="display:flex;justify-content:space-between;position: relative;top: -2.2rem;padding-left: 0.5rem;"
              >
                <span>人</span>
                <span>数:</span>
              </div>
            </template>
            <el-input
              v-model="ruleForm.personNumber"
              style="width:11.3rem"
              @keyup.native="InputNumber('personNumber')"
            />
          </el-form-item>
          <el-form-item label-width="70px">
            <el-button
              v-loading.fullscreen.lock="fullscreenLoading"
              type="primary"
              @click="submitForm('ruleForm')"
            >立即登记</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card
      v-if="
        recordshow == false ? true : false & (recordsss == true) ? true : false
      "
      class="box-card"
      style="width:100%;height:100%;position: relative;"
    >
      <div
        style="display:flex;flex-direction: column;align-items:center;  position: absolute;top: 0;right: 0;bottom: 0;left: 0;margin: auto;width:20rem;height:20rem"
      >
        <p>
          <i class="el-icon-success" style="color:green" />
        </p>
        <p style="font-size:24px">登记成功，请进入</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import axios from 'axios'
import { getToken } from '@/utils/auth'
// import { getrecord } from '@/api/quantity'
export default {
  data() {
    const blurText = async(rule, value, callback) => {
      // const reg = /^\-\d\.?\d*$/
      // const boolean = reg.test(value)
      const boolean = new RegExp('^[1-9][0-9]*$').test(value) // console.log(boolean)
      if (!boolean) {
        this.$message.warning('请输入正整数')
        this.ruleForm.personNumber = ''
      }
    }
    return {
      inputshow: true,
      recordshow: true,
      recordsss: false,
      fullscreenLoading: false,
      ruleForm: {
        visitorName: '',
        // entryTime: new Date().format('yyyy-MM-dd HH:mm'),
        // outTime: '',
        unitContactPerson: '',
        reasons: '',
        personNumber: ''
        // recordsss: false
      },
      rules: {
        visitorName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
        entryTime: [
          { required: true, message: '请输入出去时间', trigger: 'blur' }
        ],
        outTime: [
          { required: true, message: '请选择出去时间', trigger: 'blur' }
        ],
        reasons: [
          { required: true, message: '请填写来访事由', trigger: 'blur' },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '姓名不支持特殊字符',
            trigger: 'blur'
          }
        ],
        personNumber: [
          { required: true, message: '输入值', trigger: 'blur' },
          { validator: blurText, trigger: 'blur' } // 表单验证的时候会调用的方法
        ],
        unitContactPerson: [
          { required: true, message: '请填写单位联系人', trigger: 'blur' },
          {
            min: 2,
            max: 10,
            message: '长度在 2 到 10 个字符',
            trigger: 'blur'
          },
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
            message: '不支持特殊字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {},
  mounted() {
    setInterval(() => {
      this.ruleForm.entryTime = new Date().format('yyyy-MM-dd HH:mm')
    }, 1000 * 60)
  },
  created() {
    // let ar = sessionStorage.getItem("token");
    // // console.log(ar);
    // this.ruleForm.reasons = ar
    // console.log(this.ruleForm.reasons)
  },
  methods: {
    InputNumber(property) {
      this.ruleForm[property] = this.limitInputNumber(this.ruleForm[property])
    },
    // 验证只能输入数字
    limitInputNumber(val) {
      if (val) {
        return String(val).replace(/\D/g, '')
      }
      return val
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.reasons = '事由：' + this.ruleForm.reasons
          axios({
            url:
              'http://101.132.169.245:8071/public-gateway/manage/addVisitorRegist',
            method: 'post',
            data: this.ruleForm,
            headers: {
              token: getToken()
            }
          }).then(res => {
            this.fullscreenLoading = true
            setTimeout(() => {
              this.fullscreenLoading = false
              this.recordshow = false
            }, 1000)
            // setTimeout(() => {
            //   // this.fullscreenLoading = false
            //   this.recordshow = true
            //   this.inputshow = false
            //   // this.$refs[formName].resetFields()
            // }, 3000)
          })
          //   alert("submit!");
        } else {
          this.fullscreenLoading = true
          setTimeout(() => {
            this.fullscreenLoading = false
            return this.$message.error('登记失败，请重新登记')
          }, 2000)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
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
.box-card {
  width: 24rem;
  height: 30rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
.demo-ruleForm {
  margin-top: 3rem;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-form-item /deep/ .el-form-item__error {
  color: #ff4949;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 2.8rem;
  left: 0;
}
@media screen and (max-width: 768px) {
  .box-card {
    width: 100%;
    height: 100%;
    position: relative;
    .form-cart {
      width: 22rem;
      height: 22rem;
      position: fixed;
      left: 52%;
      top: 40%;
      transform: translate(-50%, -50%);
    }
  }
  .el-form-item {
    margin-bottom: 0px;
  }
  .el-form-item /deep/ .el-form-item__error {
    color: #ff4949;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 2.8rem;
    left: 0;
  }
}
p {
  //   width: 100%;
  //   position: absolute;
  //   top: 40%;
  text-align: center;
  //   right: 0;
  i {
    // position: relative;
    // top: 10%;
    font-size: 6rem;
  }
  //   /* bottom: 0;
  //   left: 0; */
  //   /* margin: auto; */
}
</style>
