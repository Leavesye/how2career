<template>
<el-dialog
  title="订单取消"
  :visible.sync="isShow"
  :before-close="handleClose"
  append-to-body
  width="430px"
  center>
  <section class="modal-main">
    <p style="margin-bottom: 20px; line-height: 22px;">{{msg}}</p>
    <p><el-link type="success">点击了解更多规则</el-link></p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" size="small" type="success" plain @click="confirm">确认取消</el-button>
  </span>
</el-dialog>
</template>

<script>
import { cancelOrder } from '@/api/order'

export default {
  props: ['isShow', 'order', 'msg'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async confirm() {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await cancelOrder({ orderId: this.order.orderId }).catch(e=>this.isLoading=false)
      if (res.result) {
        this.alert('订单取消成功')
        this.$emit('close', true)
      }
      this.isLoading=false
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  text-align: center;
  font-size: 14px;
  color: #7C8EA5;
}

</style>
