<template>
  <div id="app">
    <el-scrollbar style="height: 100%">
      <router-view />
    </el-scrollbar>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .el-scrollbar__view{
    height: 100%!important;
  }
  .el-select-dropdown__wrap, .el-scrollbar__wrap {
    margin-bottom: 0!important;
  }
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /*修复表格不对齐*/
  body .el-table th{
    display: table-cell!important;
  }
  .el-table th {
    display: table-cell!important;
  }
  header{
    background-color: #f1f5f9;
    text-align: right;
    line-height: 5;
  }
  .elFooter{
    width: 100%!important;
    background-color: #f1f5f9;
    bottom: 0;
    position: absolute;
  }
  .vjs-big-play-button {
    visibility:hidden!important;
  }
  .el-pagination{
    display: inline-flex!important;
  }
</style>
