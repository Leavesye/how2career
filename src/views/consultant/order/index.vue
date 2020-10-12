<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            :selPannel="selPannel"></pannel>
    <!-- 订单列表 -->
    <component v-bind:is="selPannel.component"
              :pagination="pagination"
              :query="query"
              :immediatelyOrder="immediatelyOrder"
              @condition-query="handleQueryByCondition"
              v-if="list.length"
              :list="list" />
    <!-- 无订单数据 -->
    <el-card v-if="list.length==0"
             class="no-order">
      <p>暂无订单数据</p>
    </el-card>
  </section>
</template>

<script>
import Pannel from '@/components/Pannel'
import WaitingConfirm from './components/waiting-confirm'
import WaitingService from './components/waiting-service'
import FinishOrder from './components/finish-order'
import { getOrders } from '@/api/order'
import tool from '@/utils/tool'

export default {
  name: 'consultant-order',
  components: {
    Pannel,
    WaitingConfirm,
    WaitingService,
    FinishOrder,
  },
  mounted () {
    let condition = 'status==2'
    // 处理带参跳转
    let status = this.$route.query.status
    if (status) {
      condition = tool.getCondition(status)
      this.selPannel = this.pannels.find(o => o.status == status)
    }
    this.params = { from: 0, to: 2601444690, condition }
    this.query()
  },
  data () {
    return {
      selPannel: { name: '待确认订单', status: '2', component: 'waiting-confirm' },
      pannels: [
        { name: '待确认订单', status: '2', component: 'waiting-confirm' },
        { name: '待服务订单', status: '4,5', component: 'waiting-service' },
        { name: '已完成订单', status: '0,7,8', component: 'finish-order' },
      ],
      list: [],
      immediatelyOrder: {}, // 服务中订单
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
        const l = res.msg.list
        if (status == '4,5') {
          this.list = l.filter(o => o.status == '4')
          // 马上开始的
          this.immediatelyOrder = l.filter(o => o.status == '5')
          // 
        } else {
          this.list = l
        }
        this.list = tool.formatConsultantOrder(this.list)
      }
      l.close()
    },
    // 已完成订单条件查询
    handleQueryByCondition(params) {
      this.params = params
      this.query()
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
    handleClose () {
      this.isShowDetail = false
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
      this.params.condition = tool.getCondition(item.status)
      this.query()
    },
  }
}
</script>

<style lang="scss" scoped>
.no-order {
  height: 100px;
}
.no-order p {
  text-align: center;
  margin-top: 20px;
  color: #7c8ea5;
  font-size: 16px;
}
</style>
