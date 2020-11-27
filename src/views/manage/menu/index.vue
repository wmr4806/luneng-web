<template>
  <div class="container">
    <el-row class="panel-group" :gutter="20">
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel animated pulse">
          <menu-tree />
        </div>
      </el-col>
      <el-col :span="16" class="card-panel-col">
        <div class="card-panel animated pulse">
          <menu-info />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MenuTree from './components/MenuTree.vue'
import MenuInfo from './components/MenuInfo.vue'

export default {
  name: 'Menu',
  components: {
    MenuTree, MenuInfo
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
