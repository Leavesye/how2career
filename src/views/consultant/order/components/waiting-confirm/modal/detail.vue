<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="800px"
  center>
  <section class="modal-main">
    <div class="flex">
      <p class="order-no">订单号: {{order.orderId}}</p>
      <div>创建时间: {{order.cTime}}</div>
    </div>
    <p class="time">咨询备选时间 (北京时间)：</p>
    <ul class="flex">
      <li class="time-item" v-for="(o, i) in order.consumerTime" :key="i">
        <el-radio v-model="radio" :label="i">{{o.text}}</el-radio>
      </li>
    </ul>
    <div v-if="isShowCalendar">
      <calendar v-if="isShow" @set-time="handleSetTime" :order="order"></calendar>
    </div>
    <p class="select-other" @click="toggleTimePicker">选择其他时间<i :class="[isShowCalendar?'el-icon-arrow-up':'el-icon-arrow-down']"></i></p>
    <!-- 咨询者详情 -->
    <consumer-info v-if="isShow" :order="order"></consumer-info>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" type="primary" v-if="times.length" @click="handleUpdateTime">提交等待咨询者确认</el-button>
    <el-button :loading="isLoading" type="primary" v-else @click="handleConfirmTime">确认时间</el-button>
  </span>
</el-dialog>
</template>

<script>
import Calendar from '@/components/Calendar'
import { timeConfirm, updateTime } from '@/api/order'
import moment from 'moment'
import ConsumerInfo from '@/components/ConsumerInfo'

export default {
  props: ['isShow', 'order'],
  components: {
    Calendar,
    ConsumerInfo
  },
  data () {
    return {
      isLoading: false,
      times: [] , // 选择的其他服务时间列表
      radio: -1,
      isShowCalendar: false,
    }
  },
  methods: {
    handleSetTime(times) {
      this.times = times
    },
    handleClose() {
      this.$emit('close')
    },
    // 更换服务时间给咨询者确认
    async handleUpdateTime() {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await updateTime({
        orderId: this.order.orderId,
        consultantTime: this.times.map(o => Math.ceil(o.value / 1000))
      }).catch(e=> this.isLoading = false)
      if (res.result) {
        this.alert('更新服务时间成功')
        this.$emit('close', true)
      }
      this.isLoading = false
    },
    // 确认时间
    async handleConfirmTime() {
      if (this.radio < 0) {
        this.alert('请选择一个咨询备选时间')
        return false
      }
      if (this.isLoading) return false
      this.isLoading = true
      const res = await timeConfirm({
        orderId: this.order.orderId,
        startTime: this.order.consumerTime[this.radio].value
      }).catch(e=> this.isLoading = false)
      if (res.result) {
        this.alert('更新服务时间成功')
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
  margin-right: 10px;
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
