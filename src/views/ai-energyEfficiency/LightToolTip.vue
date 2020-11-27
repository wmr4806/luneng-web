<template>
  <div>
    <!-- <div v-for="(item, index) in msg" :key="item.item">
      <span>{{ tags[index] }}：{{ item.value }}</span>
    </div> -->
    <div v-if="msg.length === 4">
      <div>{{ tags[0] }}： {{ msg[0].value === 'false' ? '无故障' : '有故障' }}</div>
      <div>{{ tags[1] }}： {{ msg[1].value === 'false' ? '未启动' : '已启动' }}</div>
      <div>{{ tags[2] }}： {{ msg[2].value }}</div>
      <div>{{ tags[3] }}： {{ msg[3].value === 'false' ? '未运行' : '运行中' }}</div>
    </div>
    <div v-if="msg.length === 3">
      <div>{{ tags[0] }}： {{ msg[0].value === 'false' ? '无故障' : '有故障' }}</div>
      <div>{{ tags[2] }}： {{ msg[1].value }}</div>
      <div>{{ tags[3] }}： {{ msg[2].value === 'false' ? '未运行' : '运行中' }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LightToTip',
  props: {
    msg: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    tags() {
      return ['故障状态', '启动控制', '手自动状态', '运行状态']
    }
  }
}
</script>

<style scoped>
  div {
    width: 200px;
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
  }
</style>
