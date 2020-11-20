<template>
  <component v-bind:is="view" @finsh-sign="handleFinishSign" :step="curStep" />
</template>

<script>
import CostList from './list'
import SignInfo from './sign'
import { getSignStatus } from '@/api/consultant'

export default {
  components: {
    CostList,
    SignInfo
  },
  data () {
    return {
      view: '',
      curStep: 0,
    }
  },
  async created() {
    const l = this.loading()
    const res = await getSignStatus().catch(e=> l.close())
    if (res.result) {
      this.view = !res.msg.contractSign ? 'sign-info': 'cost-list'
      this.curStep = res.msg.contractSignStep - 1
    }
    l.close()
  },
  methods: {
    handleFinishSign() {
      this.view = 'cost-list'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
