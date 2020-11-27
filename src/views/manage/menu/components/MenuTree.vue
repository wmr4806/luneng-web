<template>
  <el-container style="height: 100%;">
    <el-header>
      <span style="float: left">菜单信息</span>
      <el-button type="info" icon="el-icon-refresh" plain @click="reload">刷新菜单</el-button>
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
  name: 'MenuTree',
  data() {
    return {
      defaultProps: {
        label: 'title',
        children: 'children'
      },
      treeKey: '',
      data: []
    }
  },
  created() {
    this.loadTreeList()
  },
  methods: {
    reload() {
      this.treeKey = +new Date()
      this.loadTreeList()
    },
    // 菜单树节点选中
    nodeClick(data, node, con) {
      delete data.children
      Object.keys(data).forEach(item => {
        if (!data[item]) {
          data[item] = ''
        }
      })
      this.$bus.$emit('menuNodeSelect', data)
    },
    async loadTreeList() {
      const params = {
        url: '/manage/getMenuTreeById',
        params: ''
      }
      const res = await this.$store.dispatch('http/get', params)
      this.data = res.data
    }
  }
}
</script>

<style scoped>
  .treeStyle{
    width: 100%;
    min-height: 100%
  }
</style>
