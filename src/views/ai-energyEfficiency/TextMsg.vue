<template>
  <div class="content">
    {{ msg }}：{{ allData }}
  </div>
</template>

<script>
export default {
  name: 'TextMsg',
  props: {
    msg: {
      type: String,
      default: '动力'
    },
    allData: {
      type: String
    }
  }
}
</script>

<style scoped>
  .content {
    width: 96%;
    height: 32px;
    border: 1px solid #000000;
    line-height: 32px;
    font-size: 16px;
    text-align: center;

  }
</style>

