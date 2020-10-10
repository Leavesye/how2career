<template>
<el-card>
  <section class="order-item" v-for="(o, i) in list" :key="i" >
    <div class="flex-hb row">
      <div class="flex">
        <span class="order-no">订单号:{{o.orderId}}</span>
        <span>创建时间:{{o.cTime}}</span>
      </div>
      <div>订单金额:{{o.price}} RMB</div>
    </div>
    <div class="flex-hb row">
      <div class="flex">
        <p class="order-times">咨询时间(北京时间):</p>
        <div style="margin-right: 10px" v-for="(item, j) in o.consumerTime" :key="j">{{item.text}}</div>
      </div>
      <el-link type="success" @click="handleOpenTime(o)">时间调整</el-link>
    </div>
    <div class="flex-hb">
      <div class="flex-vc">
        <small-avatar :imgUrl="o.avatar"></small-avatar>
        <div>{{o.name}}</div>
      </div>
      <div class="flex-he">
        <el-button type="success" plain size="small" @click="handelOpenCancel(o.orderId)">订单取消</el-button> 
        <el-button type="success" plain size="small" @click="handelPayOrder(o.orderId)">订单支付</el-button> 
      </div>
    </div>
  </section>
  <!-- 分页 -->
  <div class="flex-he"
      style="margin-top: 20px" v-if="list.length">
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
  <!-- 取消订单弹框 -->
  <cancel-modal :isShow="isShow" @close="handleClose" :orderId="orderId"></cancel-modal>
  <change-modal :isShow="isShowTime" @close="handleCloseTime" :order="order"></change-modal>
</el-card>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'
import CancelModal from './modal/cancel-order'
import ChangeModal from './modal/change-time'
import { cancelOrder } from '@/api/order'
import { getAlipayUrl } from '@/api/pay'

export default {
  name: 'waiting-pay',
  props: ['list', 'pagination', 'query'],
  components: {
    SmallAvatar,
    CancelModal,
    ChangeModal
  },
  data () {
    return {
      isShowTime: false,
      isShow: false,
      orderId: '',
      order: '',
    }
  },
  methods: {
    handelOpenCancel(orderId) {
      this.isShow = true
      this.orderId = orderId
    },
    handleClose(isCancel) {
      this.isShow = false
      if (isCancel) {
        // 刷新数据
        this.query()
      }
    },
    handleOpenTime(order) {
      this.order = order
      this.isShowTime = true
    },
    handleCloseTime(isConfirm) {
      this.isShowTime = false
      if (isConfirm) {
        // 刷新数据
        this.query()
      }
    },
    async handelPayOrder(orderId) {
      const res = await getAlipayUrl({
        orderId,
        amount: 1000,
        subject: '测试商品',
        type: 'order'
      })
      console.log(decodeURIComponent(res.msg))
      // this.$router.push(`/consumer/order-confirm/${orderId}`)
    },
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  font-size: 14px;
  color: #7C8EA5;
  padding-bottom: 16px;
  border-bottom: 1px solid #EDEEEF;
}
.order-no {
  margin-right: 20px;
}
.row {
  margin-bottom: 12px;
}
.order-times {
  margin-right: 20px;
}
</style>
