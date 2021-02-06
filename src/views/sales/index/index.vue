<template>
  <section style="padding: 30px">
    <el-image :src="banner"
              class="banner"></el-image>
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
    <div class="chart-box">
      <search-form @search="handleSearch" title="订单报表" />
      <div class="bar-chart">
        <bar-chart :d="orderData"></bar-chart>
      </div>
    </div>
    <div class="chart-box">
      <search-form @search="handleSearch" title="用户注册报表" />
      <div class="bar-chart">
        <bar-chart :d="regData"></bar-chart>
      </div>
    </div>
  </section>
</template>

<script>
import BarChart from '@/components/BarChart'
import SearchForm from '@/components/SearchForm'
import { getHomeCount, getOrderReport, getRegReport } from '@/api/sales'

export default {
  components: {
    BarChart,
    SearchForm
  },
  computed: {
    banner: function() {
      return require('@/assets/invite.png')
    }
  },
  data () {
    return {
      orderData: {},
      regData: {},
      isActive: false,
      pannels: [
        { name: '已产生订单', count: 0 },
        { name: '已注册用户', count: 0 },
      ]
    }
  },
  created() {
    this.query()
  },
  methods: {
    async query() {
      const l = this.loading()
      const res = await Promise.all([getHomeCount(), getOrderReport(), getRegReport()]).catch(e=> l.close())
      const { orderCount, regCount }  = res[0].msg
      this.pannels[0].count = orderCount
      this.pannels[1].count = regCount
      const orderList = res[1].msg.list
      this.orderData = {
        x: orderList.map(o => o.date),
        y: orderList.map(o => o.count),
      }
      const regList = res[2].msg.list
      this.regData = {
        x: regList.map(o => o.date),
        y: regList.map(o => o.count),
      }
      l.close()
    },
    handleClickPannel (item, i) {
      if (i == this.pannels.length - 1) {
        this.isActive = ''
      } else {
        this.isActive = i
      }
    },
    handleSearch(p) {
      this.params.from = p.from
      this.params.to = p.to
      if (p.condition) {
        this.params.condition = p.condition
      }
      this.query()
    },
  }
}
</script>
<style lang="scss" scoped>
$color: #36ae82;
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
  flex: 1;
  border: 1px solid transparent;
  transition: all .5s;
}
.p-item:first-child {
  margin-right: 20px;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
}
.p-item > div {
  font-size: 26px;
  margin-top: 20px;
  text-align: center;
}
.p-item > h1 {
  margin: 40px;
}
.p-item:hover,
.p-item.active {
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border: 1px solid $color;
  color: $color;
}
.search {
  padding: 14px;
  border-bottom: 1px solid #edeeef;
}
.chart-box {
  height: 426px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 30px;
}
.bar-chart {
  height: 350px;
  width:100%;
}
</style>
