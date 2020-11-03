<template>
  <div class="dashboard-container">
    <scheduler />
  </div>
</template>

<script>
import Scheduler from '@/components/Scheduler'

export default {
  name: 'Dashboard',
  components: {
    Scheduler,
  },
  data () {
    return {
    }
  },
  methods: {
    test() {
      alert(11111)
    }
  },
  mounted() {
    console.log(222)
  }
}
</script>

<style lang="scss" scoped>
#chart {
  height: 300px;
}
</style>
