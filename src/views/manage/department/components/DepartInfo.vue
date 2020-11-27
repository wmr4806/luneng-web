<template>
  <el-container>
    <el-header>
      <span style="float: left">部门详情</span>
      <el-button type="success" icon="el-icon-plus" plain @click="add">新增</el-button>
      <el-button v-if="isShow" type="primary" icon="el-icon-edit" plain class="animated zoomIn slow" @click="edit">修改</el-button>
      <el-button v-if="isShow" type="danger" icon="el-icon-minus" plain :loading="loading" @click="deleteDept">删除</el-button>
    </el-header>
    <el-main>
      <el-scrollbar style="height: 100%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="机构编号">
            <el-input v-model="form.code" disabled placeholder="机构编号" />
          </el-form-item>
          <el-form-item label="机构名称">
            <el-input v-model="form.departmentName" disabled placeholder="机构名称" />
          </el-form-item>
          <el-form-item label="上级机构">
            <el-input v-model="form.parentName" disabled placeholder="上级机构" />
          </el-form-item>
          <el-form-item label="工作地址">
            <el-input v-model="form.address" disabled placeholder="工作地址" />
          </el-form-item>
          <el-form-item label="创建人员">
            <el-input v-model="form.creatorId" disabled placeholder="创建人员" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" disabled placeholder="修改时间" />
          </el-form-item>
          <el-form-item label="修改人员">
            <el-input v-model="form.modifierId" disabled placeholder="修改人员" />
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="form.modifyTime" disabled placeholder="修改时间" />
          </el-form-item>
        </el-form>
      </el-scrollbar>

    </el-main>
  </el-container>
</template>

<script>

export default {
  name: 'DepartInfo',
  data() {
    return {
      form: {
        departmentId: '',
        code: '',
        departmentName: '',
        parentId: '',
        parentName: '',
        address: '',
        creatorId: '',
        createTime: '',
        modifierId: '',
        modifyTime: ''
      },
      isShow: false,
      loading: false
    }
  },
  // 钩子函数，处理左侧机构树节点选中
  created() {
    this.$bus.$on('deptNodeSelect', this.handleNodeClick)
  },
  beforeDestroy() {
    this.$bus.$off('deptNodeSelect', this.handleNodeClick)
  },
  methods: {
    add() {
      this.$emit('handleDepartAddBtn')
    },
    edit() {
      const data = {}
      Object.assign(data, this.form)
      data.parentId = data.parentId === '0' ? '1' : data.parentId
      this.$emit('handleDepartEditBtn', data)
    },
    handleNodeClick(data) {
      // 深拷贝，拷贝对象不能包含引用，否则还是浅拷贝
      Object.assign(this.form, data)
      this.isShow = true
    },
    async deleteDept() {
      this.loading = true
      const params = {
        url: '/manage/deleteDepartment',
        params: this.form
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
        this.$bus.$emit('deptChange')
      } else {
        this.$message({ showClose: true, message: res.msg, type: 'error' })
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
