<template>
<el-dialog
  title="评价反馈"
  :visible.sync="isShowRate"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="flex-hb order-info">
      <p class="order-no">订单号:{{order.orderId}}</p>
      <div>创建时间:{{order.cTime}}</div>
    </div>
    <div class="flex rate">
      <p style="margin-right: 10px">评价:</p>
      <el-rate disabled v-model="order.rateVal"></el-rate>
    </div>
    <p class="desc">评价说明：{{order.rateContent}}</p>
    <p class="explain">反馈说明:</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      :maxLength="300"
      v-model="consultantReply">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" size="small" type="primary" @click="handleFeedback">反馈</el-button>
  </span>
</el-dialog>
</template>

<script>
import { rateOrder } from '@/api/order'

export default {
  props: ['isShowRate', 'order'],
  data () {
    return {
      isLoading: false,
      consultantReply: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleFeedback() {
      if (!this.consultantReply) {
        this.alert('请填写反馈内容', 'warning')
        return false
      }
      if (this.isLoading) return
      this.isLoading = true
      const res = await rateOrder({ 
        consultantReply: this.consultantReply,
        orderId: this.order.orderId
      }).catch(e=> this.isLoading = false)
      this.isLoading = false
      if (res.result) {
        this.alert('反馈成功')
        this.$emit('close', true)
      }
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
