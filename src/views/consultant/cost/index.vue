<template>
  <component v-bind:is="view" />
</template>

<script>
import CostList from './list'
import SignInfo from './sign'

export default {
  components: {
    CostList,
    SignInfo
  },
  data () {
    return {
      view: 'sign-info'
    }
  },
  created() {
    this.view = true? 'sign-info': 'cost-list'
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
</style>
