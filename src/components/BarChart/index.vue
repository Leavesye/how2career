<template>
  <v-charts ref="chart" :options="options"></v-charts>
</template>

<script>
import VCharts from 'vue-echarts'
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require("echarts/lib/component/dataZoom")
require("echarts/lib/component/dataZoomInside")
require("echarts/lib/component/dataZoomSlider")

export default {
  props: ['d'],
  components: { VCharts },
  watch: {
    'd': function(n, o) {
      this.options.xAxis.data = n.x
      this.options.series[0].data = n.y
      this.$refs.chart.resize();
    }
  },
  data () {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          }
        },
        grid: {
          top: "40px",
          left: "10px",
          right: "10px",
          bottom: "40px",
          backgroundColor: '#fff',
          width: "auto", //图例宽度
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: { color: '#B3B3B3' }
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            lineStyle: { color: '#EEEEEE' }
          }
        },
        series: [{
          data: [],
          type: 'bar',
          itemStyle: {
            color: '#36AE82'
          },
          barMaxWidth: 40
        }],
        dataZoom: [ {
          type: 'slider',
          show: false
        }],
      }
    }
  },
  mounted() {
    window.addEventListener("resize", this.$refs.chart.resize)
  }
};
</script>

<style lang="scss">
.echarts {
  width: 100%;
  height: 100%;
}
</style>
