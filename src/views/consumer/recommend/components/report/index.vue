<template>
  <section style="padding: 30px">
    <el-image src="" class="banner"></el-image>
    <!-- 状态面板 -->
    <div class="pannel flex-hb">
      <div class="p-item"
            :class="{ active: isActive === i }"
            v-for="(o, i) in pannels"
            :key="i"
            @click="handleClickPannel(o, i)">
        <p v-if="o.count != 'search'">{{o.name}}</p>
        <div v-if="o.count != 'search'">{{o.count}}</div>
        <h1 v-else>{{o.name}} <i class="iconfont iconsousuo-01"></i></h1>
      </div>
    </div>
    <el-card>
      <!-- 搜索条件 -->
      <section class="flex-hbc search">
        <el-link type="success" :underline="false">推广订单产生统计</el-link>
        <time-picker @change="handleTimeChange" :times='times' :curTime="curTime"></time-picker>
        <el-date-picker
          style="width: 230px"
          size="small"
          v-model="datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="small" type="success" plain>查询</el-button>
      </section>
      <div id="chart"></div>
    </el-card>
  </section>
</template>

<script>
import TimePicker from '@/components/TimePicker'
export default {
  components: {
    TimePicker
  },
  mounted () {
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

  },
  data () {
    return {
      datetime: '',
      isActive: false,
      pannels: [
        { name: '已产生订单', count: 5 },
        { name: '未提现订单', count: 12 },
        { name: '费用待发订单', count: 23 },
        { name: '已结算费用', count: 3635 }
      ],
      times: [
        {name: '7天'},
        {name: '15天'},
        {name: '30天'},
      ],
      curTime: '',
    }
  },
  computed: {
  },
  methods: {
    handleClickPannel (item, i) {
      if (i == this.pannels.length - 1) {
        this.isActive = ''
      } else {
        this.isActive = i
      }
    },
    handleTimeChange(v, i) {
      this.curTime = i
    },
  }
}
</script>

<style lang="scss" scoped>
$color: #36AE82;
.banner {
  height: 220px;
  width: 100%;
  margin-bottom: 30px;
}
.pannel {
  margin-bottom: 20px;
}
.p-item {
  width: 207px;
  height: 114px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #7c8ea5;
  cursor: pointer;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
}
.p-item > div {
  font-size: 26px;
  margin-top: 20px;
}
.p-item > h1 {
  margin: 40px;
}
.p-item:hover, .p-item.active {
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border: 1px solid $color;
  color: $color;
}
.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #EDEEEF;
}
#chart {
  height: 300px;
}
</style>
