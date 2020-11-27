<template>
  <el-container style="height: 100%;">
    <el-header>
      <span style="float: left">部门列表</span>
      <el-button type="info" icon="el-icon-refresh" plain @click="reload">刷新</el-button>
    </el-header>
    <el-main>
      <el-scrollbar style="height: 100%">
        <el-tree
          :key="treeKey"
          default-expand-all
          :data="data"
          class="treeStyle"
          :props="defaultProps"
          :expand-on-click-node="false"
          :highlight-current="true"
          @node-click="nodeClick"
        />
      </el-scrollbar>

    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'DepartTree',
  data() {
    return {
      defaultProps: {
        label: 'departmentName',
        children: 'children'
      },
      treeKey: '',
      data: []
    }
  },
  created() {
    this.loadTreeList()
    this.$bus.$on('deptChange', this.reload)
  },
  methods: {
    reload() {
      this.treeKey = +new Date()
      this.loadTreeList()
    },
    // 机构树节点选中
    nodeClick(data, node, con) {
      delete data.children
      Object.keys(data).forEach(item => {
        if (!data[item]) {
          data[item] = ''
        }
      })
      this.$bus.$emit('deptNodeSelect', data)
    },
    async loadTreeList() {
      const params = {
        url: '/manage/getDepartmentTreeById',
        params: {
          id: this.$store.state.user.userInfo.departmentId
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      this.data = res.data
    }
  }
}
</script>

<style scoped>
  .treeStyle{
    width: 100%;
    height: 100%;
  }
</style>
