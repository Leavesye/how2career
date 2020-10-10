<template>
<el-dialog
  title="申请仲裁"
  :visible.sync="isShowApply"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="flex-hb order-info">
      <p class="order-no">订单号:{{order.orderId}}</p>
      <div>创建时间:{{order.cTime}}</div>
    </div>
    <div class="flex rate">
      <p style="margin-right: 10px">投诉:</p>
      <div>{{order.complaintTitle}}</div>
    </div>
    <p class="desc">投诉说明：{{order.complaintContent}}</p>
    <p class="explain">仲裁说明:</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      :maxLength="300"
      v-model="consultantReply">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" size="small" type="primary" @click="handleApply">申请仲裁</el-button>
  </span>
</el-dialog>
</template>

<script>
import { feedbackByConsultant } from '@/api/order'

export default {
  props: ['isShowApply', 'order'],
  data () {
    return {
      consultantReply: '',
      isLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleApply() {
      if (!this.consultantReply) {
        this.alert('请填写说明', 'warning')
        return false
      }
      if (this.isLoading) return false
      this.isLoading = true
      const res = await feedbackByConsultant({
        orderId: this.order.orderId,
        consultantReply: this.consultantReply
      }).catch(e=>this.isLoading=false)
      if (res.result) {
        this.alert('申请成功')
        this.$emit('close', true)
      }
      this.isLoading = false
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
}
.order-info {
  margin-bottom: 14px;
}
.order-no {
  margin-right: 40px;
  margin-bottom: 15px;
}
.rate {
  margin-bottom: 15px;
}
.desc {
  padding: 15px;
  margin-bottom: 30px;
  background: #F6F6F6;
  border-radius: 4px;
}
.explain {
  margin-bottom: 10px;
}
</style>
