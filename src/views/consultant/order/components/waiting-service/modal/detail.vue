<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="700px"
  center>
  <section class="modal-main">
    <div class="flex">
      <p class="order-no">订单号:{{order.orderId}}</p>
      <div>创建时间:{{order.cTime}}</div>
    </div>
    <p class="time">咨询时间 (北京时间):{{order.startTime}}</p>
    <p class="time">{{msg}} <el-link type="success">点击了解更多规则</el-link></p>
    <div>
      <calendar v-if="isShow" :order="order" @set-time="handleSetTime"></calendar>
    </div>
    <p v-if="false" class="select-other" @click="toggleTimePicker">选择其他时间<i :class="[isShowCalendar?'el-icon-arrow-up':'el-icon-arrow-down']"></i></p>
    <!-- 咨询者详情 -->
    <consumer-info v-if="isShow" :order="order"></consumer-info>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" size="small" type="primary" @click="handleOpenCancel(order)">订单取消</el-button>
    <el-button :loading="isLoading" size="small" type="primary" @click="handleChangeTime">时间调整</el-button>
  </span>
  <!-- 取消订单弹框 -->
  <cancel-modal :isShow="isShowCancel"
                @close="handleCloseCancel"
                :order="order" :msg="cancelMsg"></cancel-modal>
</el-dialog>
</template>

<script>
import Calendar from '@/components/Calendar'
import { updateTime, queryCancelMsg } from '@/api/order'
import moment from 'moment'
import ConsumerInfo from '@/components/ConsumerInfo'
import CancelModal from '@/views/consumer/order/components/waiting-service/modal/cancel-order'

export default {
  props: ['isShow', 'order', 'msg'],
  components: {
    Calendar,
    ConsumerInfo,
    CancelModal
  },
  data () {
    return {
      isShowCancel: false,
      isShowCalendar: false,
      isLoading: false,
      times: [],
      cancelMsg: ''
    }
  },
  methods: {
    handleCloseCancel() {
      this.isShowCancel = false
    },
    handleSetTime(times) {
      this.times = times
    },
    handleClose() {
      this.$emit('close')
    },
    async handleOpenCancel (order) {
      this.isShowCancel = true
      this.order = order
      const res = await queryCancelMsg({ orderId: this.order.orderId })
      if (res.result) {
        this.cancelMsg = res.msg
      }
    },
    // 更换服务时间给咨询者确认
    async handleChangeTime() {
      if (!this.times.length) {
        this.alert('请选择时间', 'warning')
        return false
      }
      if (this.isLoading) return false
      this.isLoading = true
      const res = await updateTime({
        orderId: this.order.orderId,
        consultantTime: this.times.map(o => Math.ceil(o.value / 1000))
      }).catch(e=> this.isLoading = false)
      if (res.result) {
        this.alert('更新时间成功')
        this.$emit('close', true)
      }
      this.isLoading = false
    },
    toggleTimePicker() {
      this.isShowCalendar = !this.isShowCalendar
    },
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  height: 540px;
  overflow: auto;
}
.order-no {
  margin-right: 40px;
  margin-bottom: 15px;
}
.time {
  margin-bottom: 15px;
}
.time-item {
  width: 200px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 4px;
  border: 1px solid #E0E0E0;
}
.select-other {
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: #15479E;
  cursor: pointer;
}
.info-box {
  padding-top: 30px;
  border-top: 1px solid #EDEEEF;
}
.head {
  margin-right: 34px;
  margin-left: 30px;
  text-align: center;
}
.head > div {
  width: 90px;
  height: 90px;
  background: #D8D8D8;
  box-shadow: 0px 2px 8px 0px rgba(21, 71, 159, 0.4);
  border: 6px solid #FFFFFF;
  border-radius: 50%;
  margin-bottom: 10px;
}
.info {
  flex: 1;
  height: 200px;
  overflow: auto;
}
.info-item {
  margin-bottom: 15px;
}
.name {
  font-size: 16px;
  margin-bottom: 10px;
}
.title {
  color: #15479E;
}
</style>
