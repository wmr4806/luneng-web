<template>
  <div v-if="isShow" class="container" v-html="message" />
</template>

<script>
export default {
  name: 'MESSAGEBOX',
  props: {
    message: {
      default: ' ',
      type: String
    },
    isShow: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .container {
    width: 20%;
    height: 100px;
    font-size: 22px;
    color: #00CCFF;
    background-color: rgba(0, 0, 0, 0.5);
    text-align: center;
    border-radius: 2%;
  }
</style>
