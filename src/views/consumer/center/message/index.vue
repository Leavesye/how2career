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
  </section>
</template>

<script>
import QuickTable from '@/components/QuickTable'

export default {
  components: {
    QuickTable,
  },
  data () {
    return {
      table: {
        data: [{ a: 'fhfhfhfhfhf', b: '2400 RMB', c: '2020-11-12 20:13:12', d: '2020-11-12 20:13:12' }],
        columns: [
          {
            label: '发送时间',
            prop: 'a'
          }, {
            label: '标题',
            prop: 'b'
          },
          {
            label: '内容',
            prop: 'c'
          },
          {
            label: '操作',
            prop: 'e',
            render () {
              return (
                <el-button size="mini">详情</el-button>
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
  methods: {
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
<style>
#pagin .el-pager .number.active {
  background-color: #36ae82;
  color: #ffffff;
}
#pagin .el-pager > .number {
  color: #36ae82;
}
#pagin .el-icon {
  color: #36ae82;
}
</style>
<style lang="scss" scoped>
.page-title {
  font-size: 16px;
  font-weight: 600;
  color: #36ae82;
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
