<template>
  <div>
    <component v-bind:is="currentView" @success="handleJoinSuccess" />
  </div>
</template>

<script>
import ReportPage from './components/report'
import ExplainPage from './components/explain'
import RewardPage from './components/reward'
import { getUserInfo } from '@/api/user'
export default {
  components: {
    ReportPage,
    ExplainPage,
    RewardPage
  },
  data () {
    return {
      currentView: ''
    }
  },
  methods: {
    handleJoinSuccess() {
      this.currentView = 'reward-page'
    }
  },
  async created() {
    const l = this.loading()
    const res = await getUserInfo().catch(e=> l.close())
    if (res.result) {
      this.currentView = res.msg.joinMGM ? 'reward-page': 'explain-page'
    }
    l.close()
  }
}
</script>
<style lang="scss" scoped>

</style>
