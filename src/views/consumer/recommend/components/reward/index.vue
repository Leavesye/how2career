<template>
  <section style="padding: 30px">
    <el-image :src="banner"
              class="banner"></el-image>
    <el-card>
      <!-- 搜索条件 -->
      <section class="flex-hbc search">
        <h-title>我的奖励</h-title>
        <time-picker @change="handleTimeChange" :times='times' :curTime="curTime"></time-picker>
        <el-date-picker
          style="width: 230px"
          v-model="datetime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button>查询</el-button>
      </section>
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
  </section>
</template>

<script>
import QuickTable from '@/components/QuickTable'
import Pannel from '@/components/Pannel'
import TimePicker from '@/components/TimePicker'

export default {
  components: {
    QuickTable,
    TimePicker
  },
  computed: {
    banner: function() {
      return require('@/assets/invite.png')
    }
  },
  data () {
    return {
      datetime: '',
      isShow: false,
      curTime: '',
      times: [
        {name: '7天'},
        {name: '15天'},
        {name: '30天'},
      ],
      table: {
        data: [{a:'fhfhfhfhfhf', b: '2400 RMB', c: '2020-11-12 20:13:12', d: '2020-11-12 20:13:12'}],
        columns: [
          {
            type: 'selection',
          },
          {
            label: '订单号',
            prop: 'a',
            render(a, b) {
              console.log(a,b )
              return (
                <i>订单号:{b.row.a}</i>
              )
            },
          },
          {
            label: '类型',
            prop: 'b'
          },
          {
            sortable: true,
            label: '创建时间',
            prop: 'c'
          },
          {
            label: '',
            prop: 'e',
            render() {
              return (
                <el-button size="mini">提现</el-button> 
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
    handleClose() {
      this.isShow = false
    },
    handleTimeChange(v, i) {
      this.curTime = i
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
