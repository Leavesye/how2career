<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange" :pannels="pannels" :current="curPannel"></pannel>
    <el-card style="margin-bottom: 20px">
      <p class="title">即将开始的咨询</p>
      <order-item :o="o" :noBorder="true" />
    </el-card>
    <el-card>
      <!-- 搜索条件 -->
      <section class="flex-hbc search">
        <div class="flex-hbc">
          <el-link type="primary" :underline="false">订单状态</el-link>
          <el-select class="order-status" v-model="orderStuts" placeholder="" size="small">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <time-picker @change="handleTimeChange" :times='times' :curTime="curTime"></time-picker>
        <el-date-picker
          style="width: 230px"
          size="small"
          v-model="orderDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="mini" @click="handleSearch">查询</el-button>
      </section>
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list" :key="i">
        <order-item :o="o" />
      </section>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he" style="margin-top: 20px">
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
    <confirm-detail :isShowDetail="isShowDetail" @close="handleClose" />
    <!-- <finish-detail :isShow="isShow" @close="handleClose" /> -->
  </section>
</template>

<script>
import { ConfirmDetail, FinishDetail } from './modal/order-detail'
import OrderItem from '@/components/OrderItem'
import Pannel from '@/components/Pannel'
import TimePicker from '@/components/TimePicker'
export default {
  name: 'answerer',
  components: {
    OrderItem,
    ConfirmDetail,
    FinishDetail,
    Pannel,
    TimePicker
  },
  created() {

  },
  data () {
    return {
      orderStuts: '',
      orderDate: '',
      isShowDetail: false,
      curPannel: '',
      curTime: '',
      pannels: [
        { name: '待确认订单', count: 5 },
        { name: '待服务订单', count: 5 },
        { name: '已完成订单', count: 5 },
      ],
      times: [
        {name: '7天'},
        {name: '15天'},
        {name: '30天'},
      ],
      o: {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name:"Tom"},
      list: [
        {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110,name:"Tom", cb: this.handleOpenDetail},
        {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110,name:"Tom"},
        {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110,name:"Tom"},
      ],
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
    handleSearch() {
      
    },
    handleClose() {
      this.isShowDetail = false
    },
    handleOpenDetail() {
      console.log(111)
      this.isShowDetail = true
    },
    handlePannelChange (item, i) {
      this.curPannel = i
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

.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #EDEEEF;
}
.order-status {
  width: 140px;
  margin-left: 10px;
}

.title {
  font-size: 14px;
  color: #15479E;
}
</style>
