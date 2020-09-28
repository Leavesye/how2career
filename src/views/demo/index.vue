<template>
  <div class="dashboard-container">
    <div id="chart"></div>
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
      alert(111)
    }
  },
  mounted() {
    const myChart = this.$echarts.init(document.getElementById('chart'))
        myChart.setOption({
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    });
  }
}
</script>

<style lang="scss" scoped>
#chart {
  height: 300px;
}
</style>
