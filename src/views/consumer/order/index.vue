<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            :selPannel="selPannel"></pannel>
    <!-- 订单列表 -->
    <component v-bind:is="selPannel.component" :list="list" />
    <!-- 职业选择 -->
    <p class="title">更多职业选择</p>
    <career-list></career-list>
    <!-- 对话框 -->
    <confirm-detail :isShow="isShow"
                    @close="handleClose" />
    <!-- <finish-detail :isShow="isShow" @close="handleClose" /> -->
  </section>
</template>

<script>
import { ConfirmDetail, FinishDetail } from './modal/order-detail'
import WaitingPay from './components/waiting-pay'
import WaitingConfirm from './components/waiting-confirm'
import WaitingService from './components/waiting-service'
import WaitingRate from './components/waiting-rate'
import FinishOrder from './components/finish-order'
import Pannel from '@/components/Pannel'
import CareerList from '@/components/CareerList'

export default {
  name: 'consumer-order',
  components: {
    WaitingPay,
    WaitingConfirm,
    WaitingService,
    WaitingRate,
    FinishOrder,
    ConfirmDetail,
    FinishDetail,
    Pannel,
    CareerList
  },
  data () {
    return {
      selPannel: { name: '待付款订单', status: 1, component: 'waiting-pay' },
      orderDate: '',
      isShow: false,
      pannels: [
        { name: '待付款订单', status: 1, component: 'waiting-pay' },
        { name: '待确认订单', status: 2, component: 'waiting-confirm' },
        { name: '待服务订单', status: 4, component: 'waiting-service' },
        { name: '待评价订单', status: 6, component: 'waiting-rate' },
        { name: '已完成订单', status: 7, component: 'finish-order' },
      ],
      list: [
        { orderno: 'fdfdfdfdf', createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom", cb: this.handleOpenDetail },
        { orderno: 'fdfdfdfdf', createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom" },
        { orderno: 'fdfdfdfdf', createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom" },
      ],
    }
  },
  methods: {
    handleSearch () {

    },
    handleClose () {
      this.isShow = false
    },
    handleOpenDetail () {
      console.log(111)
      this.isShow = true
    },
    handlePannelChange (item) {
      this.selPannel = item
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
.order-status {
  width: 140px;
  margin-left: 10px;
}
.title {
  font-size: 16px;
  color: #36AE82;
  margin: 20px 0;
  font-weight: 600;
}
</style>
