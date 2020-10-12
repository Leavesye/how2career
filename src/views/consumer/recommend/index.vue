<template>
  <div>
    <component v-bind:is="'explain-page'" />
  </div>
</template>

<script>
import CostPage from './components/cost'
import ReportPage from './components/report'
import ExplainPage from './components/explain'
import RewardPage from './components/reward'
export default {
  components: {
    CostPage,
    ReportPage,
    ExplainPage,
    RewardPage
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
