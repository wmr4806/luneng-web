<template>
  <el-container style="height: 100%;">
    <el-header>
      <span style="float: left">菜单信息</span>
      <el-button :disabled="editButton" :loading="loading" type="primary" icon="el-icon-edit" class="animated zoomIn slow" @click="edit">修改</el-button>
    </el-header>
    <el-main>
      <el-scrollbar style="height: 100%">
        <el-form :model="form" label-width="80px" label-position="left">
          <el-form-item label="编号">
            <el-input v-model="form.menuName" disabled placeholder="菜单编号" />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.title" :disabled="form.menuId === ''" placeholder="菜单名称" />
          </el-form-item>
          <el-form-item v-if="showTree" label="上级菜单">
            <tree-select
              v-model="form.parentId"
              style="width: 50%"
              :options="options"
              placeholder="上级菜单"
              :searchable="false"
              clearable
              :normalizer="normalizer"
            />
          </el-form-item>
          <el-form-item label="图标">
            <el-select v-model="form.icon" :disabled="form.menuId === ''">
              <el-option v-for="item in iconOptions" :key="item" :label="item" :value="item">
                <svg-icon :icon-class="item" /> &nbsp; {{ item }}
              </el-option>
            </el-select>
            <svg-icon :icon-class="form.icon" />
          </el-form-item>
          <el-form-item label="是否缓存">
            <el-switch v-model="form.noCache" :disabled="form.menuId === ''" />
          </el-form-item>
          <el-form-item label="路径">
            <el-input v-model="form.path" disabled />
          </el-form-item>
          <el-form-item label="组件">
            <el-input v-model="form.component" disabled />
          </el-form-item>
          <el-form-item label="创建人员">
            <el-input v-model="form.creatorId" disabled />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="form.createTime" disabled />
          </el-form-item>
          <el-form-item label="修改人">
            <el-input v-model="form.modifierId" disabled />
          </el-form-item>
          <el-form-item label="修改时间">
            <el-input v-model="form.modifyTime" disabled />
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { isObjectValueEqual } from '@/utils/index'
export default {
  components: { TreeSelect },
  data() {
    return {
      options: [],
      editButton: true,
      loading: false,
      showTree: false,
      cacheData: {},
      form: {
        menuId: '',
        menuName: '',
        title: '',
        parentId: null,
        parentName: '',
        component: '',
        path: '',
        icon: '',
        noCache: false,
        creatorId: '',
        createTime: '',
        modifierId: '',
        modifyTime: ''
      },
      iconOptions: [
        '404', 'bug', 'chart', 'clipboard', 'component', 'dashboard', 'documentation',
        'drag', 'edit', 'education', 'email', 'example', 'excel', 'exit-fullscreen', 'eye',
        'eye-open', 'form', 'fullscreen', 'guide', 'icon', 'international', 'language',
        'link', 'list', 'lock', 'message', 'money', 'nested', 'password', 'pdf', 'people',
        'peoples', 'search', 'shopping', 'size', 'skill', 'star', 'tab', 'table',
        'theme', 'tree', 'tree-table', 'user', 'zip', 'aiwork', 'aigorven', 'aiperson', 'energy', 'temputer', 'air', 'safe', 'pf'
      ],
      normalizer(node) { // 自定义下拉树节点模板
        return {
          id: node.menuId,
          label: node.title,
          children: JSON.stringify(node.children) === '[]' ? '' : node.children
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
  created() {
    this.loadTreeOptions()
    this.$bus.$on('menuNodeSelect', this.handleNodeClick)
  },
  beforeDestroy() {
    this.$bus.$off('menuNodeSelect', this.handleNodeClick)
  },
  methods: {
    async edit() {
      this.loading = true
      const params = {
        url: '/manage/editMenu',
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
    },
    handleNodeClick(data) {
      Object.assign(this.form, data)
      this.cacheData = data
      this.showTree = data.parentId !== '0'
    },
    async loadTreeOptions() {
      const params = {
        url: '/manage/getMenuTreeById',
        params: ''
      }
      const res = await this.$store.dispatch('http/get', params)
      this.options = res.data
    }
  }
}
</script>

<style scoped>
</style>
