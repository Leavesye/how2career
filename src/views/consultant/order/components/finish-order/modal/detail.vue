<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShowDetail"
  :before-close="handleClose"
  width="700px"
  center>
  <section class="modal-main">
    <div class="flex" style="margin-bottom: 10px">
      <p class="order-no">订单号：{{order.orderId}}</p>
      <div>创建时间:{{order.cTime}}</div>
    </div>
    <div v-if="order.complaint">
      <div class="flex-vc rate">
        <p class="order-no">投诉: {{order.complaintTitle}}</p>
        <el-button size="small" @click="handleApply">申请仲裁</el-button>
      </div>
      <p class="desc-p">投诉说明：{{order.complaintContent}}</p>
    </div>
    <div v-if="order.evaluation">
      <div class="flex-vc rate">
        <p style="margin-right: 10px">评价:</p>
        <el-rate style="margin-right: 40px" v-model="order.rateVal" disabled></el-rate>
        <el-button plain v-if="!order.consultantReply" @click="handleFeedback">评价反馈</el-button>
      </div>
      <p class="desc-p">评价说明：{{order.rateContent}}</p>
    </div>
    <!-- 咨询者详情 -->
    <consumer-info v-if="isShowDetail" :order="order"></consumer-info>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
import ConsumerInfo from '@/components/ConsumerInfo'

export default {
  props: ['isShowDetail', 'order'],
  components: {
    ConsumerInfo
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleConfirmTime() {
      this.$emit('confrim')
    },
    handleApply() {
      this.$emit('apply')
    },
    handleFeedback() {
      this.$emit('feedback')
    }
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
.rate {
  margin-bottom: 15px;
}
.desc-p {
  padding: 15px;
  margin-bottom: 30px;
  background: #F6F6F6;
  border-radius: 4px;
}
.explain {
  margin-bottom: 10px;
}
</style>
