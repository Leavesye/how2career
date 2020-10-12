<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange" :pannels="pannels" :selPannel="selPannel"></pannel>
    <el-card>
      <!-- 搜索条件 -->
      <search-form @search="handleSearch" title="我的订单"></search-form>
      <!-- 订单列表 -->
      <quick-table :table="table"></quick-table>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he" style="margin-top: 20px" v-if="pagination.total">
      <el-pagination
        :page-sizes="pagination.pageSizes || [10, 20, 30, 40]"
        :total="pagination.total"
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        background
        small
        v-bind="pagination.props" v-on="pagination.events"
        ref="pagination"
        >
      </el-pagination>
    </div>
  </section>
</template>

<script>
import QuickTable from '@/components/QuickTable'
import Pannel from '@/components/Pannel'
import SearchForm from '@/components/SearchForm'
import cfg from './table-config.js'
import { getOrders } from '@/api/order'
import { getConsultantFinanceOrder } from '@/api/consultant'
import tool from '@/utils/tool'

export default {
  components: {
    QuickTable,
    Pannel,
    SearchForm
  },
  data () {
    return {
      list: [],
      selPannel: { name: '未提现订单', status: '9' },
      pannels: [
        { name: '未提现订单', status: '9' },
        { name: '费用待发放订单', status: '2' },
        { name: '已结算订单', status: '3' },
      ],
      times: [
        {name: '7天'},
        {name: '15天'},
        {name: '30天'},
      ],
      table: cfg,
      pagination: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        events: {
          'current-change': this.handlePageChange,
          'size-change': this.handlePageSizeChange,
        },
      },
    }
  },
  created() {
    let condition = 'status==9'
    // 处理带参跳转
    let status = this.$route.query.status
    if (status) {
      condition = tool.getCondition(status)
      this.selPannel = this.pannels.find(o => o.status == status)
    }
    this.params = { from: 0, to: 2601444690, condition }
    this.query()
  },
  methods: {
    async query() {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { from, to, condition } = this.params
      const fn = this.selPannel.status == '9' ? getOrders : getConsultantFinanceOrder
      const res = await fn({
        from: from || 0,
        to: to || 2601444690,
        page: pageIndex || 0,
        limit: pageSize || 10,
        condition: condition || ''
      }).catch(e=> l.close())
      if (res.result) {
        this.pagination.total = res.msg.total
        this.list = res.msg.list.map(o => {
          const { _id: orderId, cTime, amount } = o
          return { 
            orderId, 
            cTime, 
            amount
          }
        })
      }
      l.close()
    },
    handleSearch(p) {
      this.params = p
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
      this.params.condition = tool.getCondition(item.status)
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
</style>
