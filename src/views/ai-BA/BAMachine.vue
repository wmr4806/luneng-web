<template>
  <div style="text-align: center;">
    <!-- <div style="text-align: center;" @click.capture.stop="() => {}"> -->
    <div>
      <el-tooltip class="item" effect="dark" placement="top">
        <div slot="content">{{ msg }} <br> 压力 </div>
        <el-image
          :src="require(`@/assets/ba/pic_jq_2.png`)"
          style="width: 15%;position: absolute;left:33%;top:57%;"
          fit="fill"
          lazy
        />
      </el-tooltip>
      <el-image
        :src="require(`@/assets/ba/gif_pipe_5.gif`)"
        style="width: 10%;position: absolute;left:24%;top:44%;z-index:-1"
        fit="fill"
        lazy
      />
      <el-image
        :src="require(`@/assets/ba/pic_jq_2.png`)"
        style="width: 15%;position: absolute;left:33%;top:38%;"
        fit="fill"
        lazy
      />
    </div>
    <el-image
      :src="require(`@/assets/ba/gif_pipe_6.gif`)"
      style="width: 9%;position: absolute;left:48%;top:41%;"
      fit="fill"
      lazy
    />
    <el-image
      :src="require(`@/assets/ba/gif_pipe_7.gif`)"
      style="width: 7%;position: absolute;left:48%;top:60%;"
      fit="fill"
      lazy
    />
    <el-image
      :src="require(`@/assets/ba/pic_jq_2.png`)"
      style="width: 15%;position: absolute;left:33%;top:87%;"
      fit="fill"
      lazy
    />
    <el-image
      :src="require(`@/assets/ba/gif_pipe_5.gif`)"
      style="width: 10%;position: absolute;left:24%;top:75%;z-index:-1"
      fit="fill"
      lazy
    />
    <el-image
      :src="require(`@/assets/ba/pic_jq_2.png`)"
      style="width: 15%;position: absolute;left:33%;top:68%;"
      fit="fill"
      lazy
    />
  </div>
</template>

<script>
export default {
  name: 'BAMachine',
  props: {
    isWinter: {
      type: Boolean,
      default: false
    },
    fan: {
      type: Object,
      default() {
        return {
          open: false,
          speed: 0
        }
      }
    },
    pipe: {
      type: Object,
      default() {
        return {
          open: false
        }
      }
    },
    ahu: {
      type: Object,
      default() {
        return {
          newWind: [],
          sendWind: [],
          water: '',
          returnWind: ''
        }
      }
    }
  },
  data() {
    return {
      msg: '温度'
    }
  },
  computed: {
    speed() {
      const { fan: { open, speed = 0 }} = this
      const handle = s => {
        switch (s) {
          case 0:
            return 'low'
          case 1:
            return 'mid'
          case 2:
            return 'high'
          default:
            return 'low'
        }
      }
      return open ? `ahu_${handle(speed)}.gif` : 'ahu.png'
    }
  }
}
</script>

<style scoped lang="less">

</style>
