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
          <depart-info @handleDepartAddBtn="addDepartBtn" @handleDepartEditBtn="editDepartBtn" />
        </div>
      </el-col>
    </el-row>
    <el-dialog v-if="dialogVisible" :visible.sync="dialogVisible" :title="title" width="60%" destroy-on-close @close="closeDialog">

      <el-form ref="form" status-icon :model="form" :rules="rules" label-width="80px">
        <el-row class="panel-group" :gutter="20">
          <el-col :span="10">
            <el-form-item label="机构编号" prop="code">
              <el-input v-model="form.code" placeholder="机构编号" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="机构名称" prop="departmentName">
              <el-input v-model="form.departmentName" placeholder="机构名称" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="panel-group" :gutter="20">
          <el-col :span="10">
            <el-form-item label="上级机构" prop="parentId">
              <tree-select
                v-model="form.parentId"
                :options="options"
                placeholder="上级机构"
                :searchable="false"
                clearable
                :normalizer="normalizer"
              />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="工作地址" prop="address">
              <el-input v-model="form.address" name="address" placeholder="工作地址" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isEdit" class="panel-group" :gutter="20">
          <el-col :span="10">
            <el-form-item label="创建人员">
              <el-input v-model="form.creatorId" placeholder="创建人员" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="创建时间">
              <el-input v-model="form.createTime" placeholder="创建时间" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-show="isEdit" class="panel-group" :gutter="20">
          <el-col :span="10">
            <el-form-item label="修改人员">
              <el-input v-model="form.modifierId" placeholder="修改人员" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-form-item label="修改时间">
              <el-input v-model="form.modifyTime" placeholder="修改时间" disabled />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" icon="el-icon-back" plain @click="closeDialog">返回</el-button>
        <el-button :disabled="editButton" :loading="loading" type="success" icon="el-icon-check" plain @click="saveClick">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import DepartTree from './components/DepartTree'
import DepartInfo from './components/DepartInfo'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { isObjectValueEqual } from '@/utils/index'
export default {
  name: 'Department',
  components: {
    DepartTree,
    DepartInfo,
    TreeSelect
  },
  data() {
    return {
      editButton: true,
      title: '',
      dialogVisible: false,
      isEdit: false,
      saveMethodName: null,
      cacheData: {},
      form: {
        departmentId: '',
        code: '',
        departmentName: '',
        address: '',
        parentId: null,
        parentName: '',
        creatorId: '',
        createTime: '',
        modifierId: '',
        modifyTime: '',
        treeAbout: ''
      },
      rules: {
        code: [
          { required: true, message: '请输入机构编号', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入工作地址', trigger: 'blur' }
        ],
        parentId: [
          { required: true, validator: this.checkParentId, trigger: 'change' }
        ]
      },
      loading: false,
      options: [],
      normalizer(node) { // 自定义下拉树节点模板
        return {
          id: node.departmentId,
          label: node.departmentName,
          children: JSON.stringify(node.children) === '[]' ? '' : node.children // 当选中节点展开时没有子节点，设置其子节点为''
        }
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
  beforeDestroy() {
    this.$off('handleDepartAddBtn', this.addDepartBtn)
    this.$off('handleDepartEditBtn', this.editDepartBtn)
  },
  methods: {
    async checkParentId(rule, value, callback) {
      if (!value) {
        callback(new Error('请选择上级机构'))
      } else if (value === this.form.departmentId) {
        callback(new Error('不能选择自己做为上级机构'))
      } else {
        callback()
      }
    },
    addDepartBtn() {
      this.title = '新增部门信息'
      this.saveMethodName = '/manage/addDepartment'
      this.dialogVisible = true
      this.initMethod()
    },
    editDepartBtn(val) {
      this.title = '修改部门信息'
      // 深拷贝，拷贝对象不能包含引用，否则还是浅拷贝
      this.cacheData = val
      Object.assign(this.form, val)
      this.isEdit = true
      this.saveMethodName = '/manage/editDepartment'
      this.dialogVisible = true
      this.initMethod()
    },
    async initMethod() {
      // 加载页面下拉框树（只加载根节点）
      const params = {
        url: '/manage/getDepartmentTreeById',
        params: {
          id: this.form.parentId ? this.form.parentId : this.$store.state.user.userInfo.departmentId
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      this.options = res.data // 填充下拉树
    },
    closeDialog() {
      Object.assign(this.$data, this.$options.data())
      this.$refs.form.resetFields()
      this.$bus.$emit('deptChange')
    },
    saveClick() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 提交后台
          this.loading = true
          if (this.saveMethodName === '/manage/addDepartment') {
            this.form.creatorId = this.$store.state.user.userInfo.userId
          } else {
            this.form.modifierId = this.$store.state.user.userInfo.userId
          }
          const params = {
            url: this.saveMethodName,
            params: this.form
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ showClose: true, message: '提交成功', type: 'success' })
            this.closeDialog()
          } else {
            this.$message({ showClose: true, message: '提交失败', type: 'error' })
          }
          this.loading = false
        } else {
          return false
        }
      })
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
