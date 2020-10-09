<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            :selPannel="selPannel"></pannel>
    <!-- 订单列表 -->
    <component v-bind:is="selPannel.component"
              :pagination="pagination"
              :query="query"
              v-if="list.length"
               :list="list" />
    <!-- 无订单数据 -->
    <el-card v-if="list.length==0"
             class="no-order">
      <p>暂无订单数据</p>
    </el-card>
  </section>
</template>

<script>
import Pannel from '@/components/Pannel'
import WaitingConfirm from './components/waiting-confirm'
import WaitingService from './components/waiting-service'
import FinishOrder from './components/finish-order'
import { getOrders } from '@/api/order'
import moment from 'moment'
export default {
  name: 'consultant-order',
  components: {
    Pannel,
    WaitingConfirm,
    WaitingService,
    FinishOrder,
  },
  async created () {
    this.query()
  },
  data () {
    return {
      selPannel: { name: '待确认订单', status: '2', component: 'waiting-confirm' },
      pannels: [
        { name: '待确认订单', status: '2', component: 'waiting-confirm' },
        { name: '待服务订单', status: '4', component: 'waiting-service' },
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
  methods: {
    // 查询订单列表
    async query () {
      const l = this.loading()
      const { pageIndex, pageSize } = this.pagination
      const { status } = this.selPannel
      const arr = status.split(',')
      let condition = ''
      arr.forEach((o, i) => {
        if (i == arr.length - 1) {
          condition += `status==${o}`
        } else {
          condition += `status==${o}:`
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
          const { avatar, name, readme } =  o.consultant
          let rest = ''
          // 倒计时时间计算
          if (o.confirmTimeout) {
             const countdown = o.confirmTimeout*1000 - moment().valueOf()
             if (countdown > 0) {
               let times = countdown/(3600*1000)
               let hours = Math.floor(times)
               let mintus = Math.ceil((times - hours)*60)
               rest = `还有${hours}小时${mintus}分开始`
             } else {
               rest = '已过期'
             }
          }
          return {
            orderId: o._id,
            avatar: process.env.VUE_APP_HOST_NAME + avatar,
            name,
            readme,
            ...o.consultant.education,
            ...o.consultant.work,
            cTime: moment(o.cTime * 1000).format('YYYY-MM-DD HH:mm:ss'),
            rest,
            startTime: o.startTime ? moment(o.startTime * 1000).format('YYYY-MM-DD HH:mm:ss'): '',
            consumerTime: o.consumerTime ? o.consumerTime.map(v => {
              // 秒转毫秒
              let ms = v*1000
              return {
                text: `${moment(ms).format('YYYY-MM-DD')} ${moment(ms).format('HH:mm:ss')}~${moment(ms).subtract(-90, 'minutes').format('HH:mm:ss')}`,
                value: v
              }
            }) : [],
            consultantTime: o.consultantTime ? o.consultantTime.map(v => {
               // 秒转毫秒
              let ms = v*1000
              return {
                text: `${moment(ms).format('YYYY-MM-DD')} ${moment(ms).format('HH:mm:ss')}~${moment(ms).subtract(-90, 'minutes').format('HH:mm:ss')}`,
                value: v
              }
            }) : [],
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
      this.isShowDetail = false
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
  }
}
</script>

<style lang="scss" scoped>
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
