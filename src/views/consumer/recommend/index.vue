<template>
  <div>
    <component v-bind:is="'report-page'" />
  </div>
</template>

<script>
import CostPage from './components/cost'
import ReportPage from './components/report'
export default {
  components: {
    CostPage,
    ReportPage
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {

  }
}
</script>
<style>
#pagin .el-pager .number.active {
  background-color: #36ae82;
  color: #ffffff;
}
#pagin .el-pager > .number {
  color: #36ae82;
}
#pagin .el-icon {
  color: #36ae82;
}
</style>
<style lang="scss" scoped>

</style>
