<!--<template>-->
<!--  <div>-->
<!--    <Datav />-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import Datav from './components/datav/index.vue'-->
<!--export default {-->
<!--  name: 'Dashboard',-->
<!--  components: {-->
<!--    Datav-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style>-->

<!--</style>-->
<template>
  <div class="dashboard-container">
    <admin-dashboard />
  </div>
</template>

<script>
import adminDashboard from './admin'

export default {
  name: 'Dashboard',
  components: { adminDashboard },
  data() {
    return {
    }
  },
  computed: {
  },
  created() {
  }
}
</script>
