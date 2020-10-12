<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="700px"
  center>
  <section class="modal-main">
    <div class="flex">
      <p class="order-no">订单号: {{order.orderId}}</p>
      <div>创建时间: {{order.cTime}}</div>
    </div>
    <p class="time">咨询时间(北京时间){{order.startTime}}</p>
    <p class="time">调整时间会产生XXXRMB的费用 <el-link type="success">点击了解更多规则</el-link></p>
    <calendar v-if="isShow" @set-time="handleSetTime" :order="order">
      <el-button style="margin-top:40px" :loading="isLoading" size="small" type="success" @click="handleConfirmTime">确认调整</el-button>
    </calendar>
  </section>
</el-dialog>
</template>

<script>
import Calendar from '@/components/Calendar'
import { updateTime } from '@/api/order'
import moment from 'moment'

export default {
  props: ['isShow', 'order'],
  components: {
    Calendar
  },
  data () {
    return {
      isLoading: false,
      times: [] , // 选择的其他服务时间列表
    }
  },
  methods: {
    handleSetTime(times) {
      this.times = times
    },
    handleClose() {
      this.$emit('close')
    },
    // 更换服务时间给咨询师确认
    async handleConfirmTime() {
      if (!this.times.length) {
        this.alert('请选择时间', 'warning')
        return false
      }
      if (this.isLoading) return false
      this.isLoading = true
      const res = await updateTime({
        orderId: this.order.orderId,
        consumerTime: this.times.map(o => Math.ceil(o.value / 1000))
      }).catch(e=> this.isLoading = false)
      if (res.result) {
        this.alert('更新时间成功')
        this.$emit('close', true)
      }
      this.isLoading = false
    },
  }
};
</script>
<style>
.e-appointment {
  background: #36AE82!important;
}
</style>
<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
}
.order-no {
  margin-right: 40px;
  margin-bottom: 15px;
}
.time {
  margin-bottom: 15px;
}
.time-item {
  padding: 0 10px;
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
  color: #36AE82;
  cursor: pointer;
}
.info-box {
  margin-top: 20px;
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
  color: #36AE82;
}
</style>
