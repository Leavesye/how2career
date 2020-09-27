<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange" :pannels="pannels" :current="curPannel"></pannel>
    <el-card class="list-item-top">
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
        <el-button size="mini">查询</el-button>
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
    <confirm-detail :isShow="isShow" @close="handleClose" />
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
  data () {
    return {
      orderStuts: '',
      orderDate: '',
      isShow: false,
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
    handleClose() {
      this.isShow = false
    },
    handleOpenDetail() {
      this.isShow = true
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
