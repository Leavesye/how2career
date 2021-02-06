<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange" :pannels="pannels" :selPannel="selPannel" css="sales"></pannel>
    <el-card>
      <!-- 搜索条件 -->
      <search-form @search="handleSearch" title=" "></search-form>
      <!-- 订单列表 -->
      <quick-table ref="qtable" :table="table"></quick-table>
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
import { getOrders, getSalesPerformance } from '@/api/sales'
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
      selPannel: {},
      pannels: [
        { name: '销售订单', status: '1', fn: getOrders },
        { name: '注册用户', status: '2', fn: getSalesPerformance },
        { name: '二级注册用户', status: '3', fn: getSalesPerformance },
      ],
      table: cfg['1'],
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
  beforeUpdate(){
    //在数据加载完，重新渲染表格 防止抖动
    this.$nextTick(() => {
      this.$refs['qtable'].$refs.table.doLayout();
    })
  },
  created() {
    this.selPannel = this.pannels[0]
    this.params = { from: 0, to: 2601444690 }
    this.query()
  },
  methods: {
    async query() {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { from, to, condition } = this.params
      const p = {
        from: from || 0,
        to: to || 2601444690,
        page: pageIndex || 0,
        limit: pageSize || 10,
      } 
      console.log(condition)
      if (condition) {
        p.condition = condition
      }
      const res = await this.selPannel.fn(p).catch(e=> l.close())
      if (res.result) {
        this.pagination.total = res.msg.count
        if (this.selPannel.status == 1) {
          this.table.data = res.msg.list.map(o => {
            o.cTime =  moment(o.cTime*1000).format('YYYY-MM-DD HH:mm:ss')
            o.successFinish = o.successFinish ? '是' : '否'
            return o
          })
        } else {
          this.table.data = res.msg.list.map(o => {
            o.cTime =  moment(o.cTime*1000).format('YYYY-MM-DD HH:mm:ss')
            return o
          })
        }
      }
      l.close()
    },
    handleSearch(p) {
      this.params.from = p.from
      this.params.to = p.to
      this.query()
    },
    handlePannelChange (item) {
      const { status } = this.selPannel
      if (item.status == status) return false
      this.selPannel = item
      this.table = cfg[item.status]
      // 参数重置
      this.list = []
      this.pagination.total = 0
      this.pagination.pageIndex = 0
      this.pagination.pageSize = 10
      this.params.from = 0
      this.params.to = 2601444690
      if (item.status > 1) {
        this.params.condition = `salesLevel==${item.status-1}`
      } else {
        delete this.params.condition
      }
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
