<template>
  <section style="padding: 30px">
    <el-image :src="banner"
              class="banner"></el-image>
    <el-card>
      <!-- 搜索条件 -->
      <search-form @search="handleSearch" title="我的奖励"></search-form>
      <!-- 订单列表 -->
      <quick-table :table="table"></quick-table>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he" style="margin-top: 20px">
      <el-pagination
        id="pagin"
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
    <detail-modal :isShow="isShow" :reward="reward" @close="handleClose"></detail-modal>
  </section>
</template>

<script>
import QuickTable from '@/components/QuickTable'
import SearchForm from '@/components/SearchForm'
import DetailModal from './modal/detail'
import { queryReward } from '@/api/order'
import moment from 'moment'

export default {
  components: {
    QuickTable,
    SearchForm,
    DetailModal
  },
  computed: {
    banner: function() {
      return require('@/assets/invite.png')
    }
  },
  data () {
    let fn = this.handleOpenReward
    return {
      isShow: false,
      reward: {},
      table: {
        data: [],
        columns: [
          // {
          //   type: 'selection',
          // },
          {
            label: '订单号',
            prop: 'orderId',
            render(h, scope) {
              return (
                <i>订单号:{scope.row.orderId}</i>
              )
            },
            width: '300',
          },
          {
            label: '类型',
            prop: 'cardTitle'
          },
          {
            sortable: true,
            label: '创建时间',
            prop: 'cTime'
          },
          {
            label: '',
            prop: '',
            render(h, scope) {
              return (
                <el-button plain onClick={ () => fn(scope.row) }>查看奖励</el-button> 
              )
            }
          },
        ],
        props: {
          headerCellStyle: {
            background: '#EDEEEF',
            fontSize: '14px!important',
            color: '#7C8FA5!important',
            fontWeight: '200',
            textAlign: 'left'
          },
          cellStyle: {
            fontSize: '14px!important',
            color: '#7C8FA5!important',
            textAlign: 'left'
          }
        }
      },
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
    this.params = { from: 0, to: 2601444690 }
    this.query()
  },
  methods: {
    handleOpenReward(row) {
      this.reward = row
      this.isShow = true
    },
    handleClose() {
      this.isShow = false
    },
    async query() {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { from, to, order } = this.params
      const p = {
        from: from || 0,
        to: to || 2601444690,
        page: pageIndex || 0,
        limit: pageSize || 10,
        condition: 'status==2',
      }
      order && (p.order = order)
      const res = await queryReward(p).catch(e=> l.close())
      if (res.result) {
        this.pagination.total = res.msg.count
        this.table.data = res.msg.list.map(o => {
          const { _id: orderId, cardTitle, cardContent, cTime } = o
          return { 
            orderId,
            cardTitle,
            cardContent,
            cTime: moment(cTime*1000).format('YYYY-MM-DD HH:mm:ss'), 
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
.banner {
  height: 220px;
  width: 100%;
  margin-bottom: 30px;
}
.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #EDEEEF;
}
.order-status {
  margin-right: 10px;
  color: #15479E;
  font-size: 14px;
}
.title {
  font-size: 14px;
  color: #15479E;
}
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
  color: #7C8EA5;
  font-size: 14px;
}
.list-item-top {
  width: 880px;
  height: 150px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border-radius: 8px;
  border: 1px solid #15479E;
  margin-bottom: 20px;
}
</style>
