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
    <p class="time">咨询备选时间 (北京时间)：</p>
    <ul class="flex-hb" style="margin-bottom: 20px">
      <li class="time-item" v-for="(o, i) in order.times" :key="i">{{o}}</li>
    </ul>
    <div v-if="isShowCalendar">
      <calendar></calendar>
    </div>
    <p class="select-other" @click="toggleTimePicker">选择其他时间<i :class="[isShowCalendar?'el-icon-arrow-up':'el-icon-arrow-down']"></i></p>
    <div class="flex info-box">
      <div class="head">
        <div></div>
        <p class="role">咨询者</p>
        <p class="name">{{}}</p>
      </div>
      <div class="info">
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
        <div class="info-item">
          <div class="title">最高学历</div>
          <p class="desc">电子工程</p>
        </div>
      </div>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="handleConfirmTime">订单取消</el-button>
    <el-button size="small" type="primary" @click="handleConfirmTime">提交等待咨询者确认</el-button>
    <el-button size="small" type="primary" @click="handleConfirmTime">确认时间</el-button>
  </span>
</el-dialog>
</template>

<script>
import Calendar from '@/components/Calendar'

export default {
  props: ['isShow', 'order'],
  components: {
    Calendar
  },
  data () {
    return {
      isShowCalendar: false,
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleConfirmTime() {
      this.$emit('confrim')
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
