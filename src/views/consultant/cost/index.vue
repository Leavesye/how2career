<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange" :pannels="pannels" :selPannel="selPannel" css="consultant"></pannel>
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
import moment from 'moment'

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
    let status = this.$route.params.status
    if (status) {
      condition = tool.getCondition(status)
      this.selPannel = this.pannels.find(o => o.status == status)
    }
    this.params = { from: 0, to: 2601444690, condition }
    this.setColumns(this.selPannel.status)
    this.table.events['sort-change'] = this.handleSort
    this.query()
  },
  methods: {
    handleSort(data) {
      this.params.order = data.order == 'ascending' ? '-':''
      this.query()
    },
    setColumns (s){
      if (s == '9') {
        this.table.columns[3].label = '创建时间'
        this.table.columns[3].prop = 'cTime'
        this.table.columns[0].hide = false
        this.table.columns[1].renderHeader = this.renderHeader
        this.table.columns[4].render = this.renderOper
      }
      if (s == '2') {
        this.table.columns[3].label = '申请提现时间'
        this.table.columns[3].prop = 'cTime'
        this.table.columns[0].hide = true
        this.table.columns[4].hide = true
      }
      if (s == '3') {
        this.table.columns[3].label = '结算时间'
        this.table.columns[3].prop = 'uTime'
        this.table.columns[0].hide = true
        this.table.columns[4].hide = true
      }
    },
    renderHeader() {
      const status = this.selPannel.status
      return (
        <div class="flex-vc">
          <div style="margin-right: 14px">{status=='9'?'全选':'订单号'}</div>
          { status=='9'&&<el-button plain>批量提现</el-button>}
        </div>
      )
    },
    renderOper(h, scope) {
      return (
        <el-button plain>提现</el-button> 
      )
    },
    async query() {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { from, to, condition, order } = this.params
      const fn = this.selPannel.status == '9' ? getOrders : getConsultantFinanceOrder
      const p = {
        from: from || 0,
        to: to || 2601444690,
        page: pageIndex || 0,
        limit: pageSize || 10,
        condition: condition || '',
      }
      order && (p.order = order)
      const res = await fn(p).catch(e=> l.close())
      if (res.result) {
        this.pagination.total = res.msg.count
        this.table.data = res.msg.list.map(o => {
          const { _id: orderId, cTime, uTime, amount } = o
          return { 
            orderId, 
            cTime: moment(cTime*1000).format('YYYY-MM-DD HH:mm:ss'), 
            uTime: moment(uTime*1000).format('YYYY-MM-DD HH:mm:ss'), 
            amount
          }
        })
      }
      l.close()
    },
    handleSearch(p) {
      this.params.from = p.from
      this.params.to = p.to
      if (p.condition) {
        this.params.condition = p.condition
      }
      this.query()
    },
    handlePannelChange (item) {
      const { status } = this.selPannel
      if (item.status == status) return false
      this.$router.push(`/consultant/cost/${item.status}`)
      this.selPannel = item
      this.setColumns(this.selPannel.status)
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
