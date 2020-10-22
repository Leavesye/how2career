<template>
  <section>
    <h1 class="page-title">消息通知</h1>
    <div class="table-box">
      <!-- 订单列表 -->
      <quick-table :table="table"></quick-table>
      <!-- 分页 -->
      <div class="flex-he"
          style="margin-top: 20px">
        <el-pagination id="pagin"
                      :page-sizes="pagination.pageSizes || [10, 20, 30, 40]"
                      :total="pagination.total"
                      :current-page="pagination.pageIndex"
                      :page-size="pagination.pageSize"
                      layout="prev, pager, next"
                      background
                      small
                      v-bind="pagination.props"
                      v-on="pagination.events"
                      ref="pagination">
        </el-pagination>
      </div>
    </div>
    <detail-modal :isShow="isShow" @close="handleClose" :item="item"></detail-modal>
  </section>
</template>

<script>
import moment from 'moment'
import QuickTable from '@/components/QuickTable'
import DetailModal from './modal/detail'
import { getMessage } from '@/api/user'

export default {
  components: {
    QuickTable,
    DetailModal
  },
  data () {
    const openDetail = this.handleOpen
    return {
      isShow: false,
      item: {},
      table: {
        data: [],
        columns: [
          {
            label: '发送时间',
            prop: 'cTime'
          }, {
            label: '标题',
            prop: 'title'
          },
          {
            label: '内容',
            prop: 'content'
          },
          {
            label: '操作',
            prop: '',
            render (h, scope) {
              return (
                <el-button plain onClick={() => openDetail(scope.row)}>详情</el-button>
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
          },
          cellStyle: {
            fontSize: '14px!important',
            color: '#7C8FA5!important',
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
        props: {},
      },
    }
  },
  async created() {
    this.query()
  },
  methods: {
    async query() {
      const l = this.loading()
      const res = await getMessage({
        from: 0,
        to: 2601444690,
        page: 0,
        limit: 10,
      }).catch(e => l.close)
      if (res.result) {
        this.pagination.total = res.msg.count
        this.table.data = res.msg.list.map(o => {
          return {
            cTime: moment(o.cTime*1000).format('YYYY-MM-DD HH:mm:ss'),
            title: o.title,
            content: o.content
          }
        })
      }
      l.close()
    },
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
    handleClose() {
      this.isShow = false
    },
    handleOpen(item) {
      this.isShow = true
      this.item = item
    }
  }
}
</script>
<style lang="scss" scoped>
.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #15479E;
  padding: 20px 30px;
  border-bottom: 1px solid #EDEEEF;
}
.table-box {
  padding: 30px;
}
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
  color: #7c8ea5;
  font-size: 14px;
}
</style>
