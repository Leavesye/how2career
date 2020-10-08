<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            :selPannel="selPannel"></pannel>
    <!-- 订单列表 -->
    <component v-if="list.length"
               v-bind:is="selPannel.component"
               :list="list"
               :query="query"
               :pagination="pagination" />
    <!-- 无订单数据 -->
    <el-card v-if="list.length==0"
             class="no-order">
      <p>暂无订单数据</p>
    </el-card>
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
import { getOrders } from '@/api/order'
import moment from 'moment'

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
      selPannel: { name: '待付款订单', status: '1', component: 'waiting-pay' },
      orderDate: '',
      isShow: false,
      pannels: [
        { name: '待付款订单', status: '1', component: 'waiting-pay' },
        { name: '待确认订单', status: '2,3', component: 'waiting-confirm' },
        { name: '待服务订单', status: '4', component: 'waiting-service' },
        { name: '待评价订单', status: '6', component: 'waiting-rate' },
        { name: '已完成订单', status: '0,7', component: 'finish-order' },
      ],
      list: [],
      pagination: {
        total: 0,
        pageIndex: 0,
        pageSize: 10,
        events: {
          'current-change': this.handlePageChange,
          'size-change': this.handlePageSizeChange,
        },
        props: {},
      },
    }
  },
  async created () {
    this.query()
  },
  methods: {
    // 查询订单列表
    async query () {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { status } = this.selPannel
      const arr = status.split(',')
      let condition = ''
      arr.forEach((o, i) => {
        if (i == arr.length-1) {
          condition+=`status==${o}`
        } else {
          condition+=`status==${o}:`
        }
      })
      const res = await getOrders({
        from: "0",
        to: "2601444690",
        page: pageIndex || 0,
        limit: pageSize || 10,
        condition
      }).catch(e => l.close())
      if (res.result && res.msg) {
        this.pagination.total = res.msg.count
        this.list = res.msg.list.map(o => {
          return {
            orderId: o._id,
            avatar: process.env.VUE_APP_HOST_NAME + o.consultant.avatar,
            name: o.consultant.name,
            cTime: moment(o.cTime*1000).format('YYYY-MM-DD HH:mm:ss'),
            times: o.consumerTime.map(v => `${moment(v).format('YYYY-MM-DD')} ${moment(v).format('HH:mm:ss')}~${moment(v).subtract(-90, 'minutes').format('HH:mm:ss')}`),
            price: o.price,
            status: o.status,
            rate: o.evaluation ? o.evaluation.point : 0
          }
        })
      }
      l.close()
    },
    // 监听分页页码变化
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    // 监听分页数量变化
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
    handleClose () {
      this.isShow = false
    },
    handleOpenDetail () {
      console.log(111)
      this.isShow = true
    },
    handlePannelChange (item) {
      if (item.status == this.selPannel.status) return false
      this.selPannel = item
      this.list = []
      this.pagination.total = 0
      this.pagination.pageIndex = 0
      this.pagination.pageSize = 10
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
  color: #36ae82;
  margin: 20px 0;
  font-weight: 600;
}
.no-order {
  height: 100px;
}
.no-order p {
  text-align: center;
  margin-top: 20px;
  color: #7c8ea5;
  font-size: 16px;
}
</style>
