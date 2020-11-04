<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            css="consumer"
            :selPannel="selPannel"></pannel>
    <!-- 订单列表 -->
    <component v-if="list.length"
               v-bind:is="selPannel.component"
               :list="list"
               :query="query"
               :pagination="pagination" />
    <!-- 无订单数据 -->
    <el-card v-if="list.length==0"
             class="no-order">
      <p>暂无订单数据</p>
    </el-card>
    <!-- 职业选择 -->
    <p class="title">更多职业选择</p>
    <career-list></career-list>
  </section>
</template>

<script>
import WaitingPay from './components/waiting-pay'
import WaitingConfirm from './components/waiting-confirm'
import WaitingService from './components/waiting-service'
import WaitingRate from './components/waiting-rate'
import FinishOrder from './components/finish-order'
import Pannel from '@/components/Pannel'
import CareerList from '@/components/CareerList'
import { getOrders } from '@/api/order'
import tool from '@/utils/tool'

export default {
  name: 'consumer-order',
  components: {
    WaitingPay,
    WaitingConfirm,
    WaitingService,
    WaitingRate,
    FinishOrder,
    Pannel,
    CareerList
  },
  data () {
    return {
      selPannel: { name: '待付款订单', status: '1', component: 'waiting-pay' },
      pannels: [
        { name: '待付款订单', status: '1', component: 'waiting-pay' },
        { name: '待确认订单', status: '2,3,12', component: 'waiting-confirm' },//2：待咨询师确认 3：待咨询者确认
        { name: '待服务订单', status: '4,5', component: 'waiting-service' }, // 待服务/服务中
        { name: '待评价订单', status: '6', component: 'waiting-rate' },
        { name: '已完成订单', status: '0,7,8', component: 'finish-order' },// 0已取消 7已完成 8投诉
      ],
      list: [],
      pagination: {
        total: 0,
        pageIndex: 0,
        pageSize: 10,
        events: {
          'current-change': this.handlePageChange,
          'size-change': this.handlePageSizeChange,
        },
      },
    }
  },
  async created () {
    let condition = 'status==1'
    // 处理带参跳转
    let status = this.$route.query.status
    if (status) {
      condition = tool.formatStatus(status)
      this.selPannel = this.pannels.find(o => o.status == status)
    }
    this.params = { from: 0, to: 2601444690, condition }
    this.query()
  },
  methods: {
    // 查询订单列表
    async query () {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { from, to, condition } = this.params
      const res = await getOrders({
        from: from || 0,
        to: to || 2601444690,
        page: pageIndex || 0,
        limit: pageSize || 10,
        condition: condition || ''
      }).catch(e => l.close())
      if (res.result && res.msg) {
        this.pagination.total = res.msg.count
        this.list = tool.formatConsumerOrder(res.msg.list)
      }
      l.close()
    },
    // 监听分页页码变化
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    // 监听分页数量变化
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
    handlePannelChange (item) {
      const { status } = this.selPannel
      if (item.status == status) return false
      this.selPannel = item
      // 参数重置
      this.list = []
      this.pagination.total = 0
      this.pagination.pageIndex = 0
      this.pagination.pageSize = 10
      this.params.from = 0
      this.params.to = 2601444690
      this.params.condition = tool.formatStatus(item.status)
      this.query()
    },
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
  }
}
</script>
<style lang="scss" scoped>
.order-status {
  width: 140px;
  margin-left: 10px;
}
.title {
  font-size: 16px;
  color: #36ae82;
  margin: 20px 0;
  font-weight: 600;
}
.no-order p {
  text-align: center;
  color: #7c8ea5;
  font-size: 16px;
}
</style>
