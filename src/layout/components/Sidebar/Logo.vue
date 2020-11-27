<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <div v-if="collapse" class="sidebar-logo-link" style="background-color:#191623">

        <a class="sidebar-title" :href="bigScreenUrl" target="_self"><div style="margin-left: 0px;margin-top:15px"><img src="../../../assets/goBack.png" style="position:relative;left:-1px;width: 30%;height:3%"></div></a>
      </div>
      <div v-else class="sidebar-logo-link" style="background-color:#191623">
        <a class="sidebar-title" :href="bigScreenUrl" target="_self"><div style="margin-left: -100px;margin-top:15px"><img src="../../../assets/goBack.png" style="position:relative;left:-10px;width: 5.5%;height:3%">{{ title }}</div></a>
      </div>
    </transition>
  </div>
</template>

<script>
// import defaultSettings from '@/settings'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      bigScreenUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:9090/#/datav' : 'http://101.132.169.245/#/datav',
      title: '主 页'// defaultSettings.title || 'GeniusesBT'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  // background: #114378; // 修改 #2b2f3a
  background: #191623; // 修改 #2b2f3a
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
