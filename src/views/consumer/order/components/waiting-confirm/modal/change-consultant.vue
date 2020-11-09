<template>
<el-dialog
  title="订单调整"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="430px"
  center>
  <section class="modal-main">
    <div v-if="!isRefuse" class="">
      <p style="margin-bottom: 6px;">很遗憾你们时间不合适</p>
      <p>你可以选择更换同类型其他咨询师</p>
    </div>
    <p v-else class="">{{cancelMsg}}</p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button v-if="!isRefuse" plain @click="handleRefuseChange">拒绝更换</el-button>
    <el-button v-else plain :loading="isLoading" @click="handleCancel">订单取消</el-button>
    <el-button :loading="isLoading" type="success" @click="handleChange">更换咨询师</el-button>
  </span>
</el-dialog>
</template>

<script>
import { cancelOrder, queryCancelMsg } from '@/api/order'

export default {
  props: ['isShow', 'order'],
  data () {
    return {
      isLoading: false,
      isRefuse: false,
      cancelMsg: '',
    }
  },
  watch: {
    'isShow': function(n, o) {
      if (!n) {
        this.isRefuse = false
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleRefuseChange() {
      const res = await queryCancelMsg({ orderId: this.order.orderId }).catch(e=> l.close())
      if (res.result) {
        this.cancelMsg = res.msg
      }
      this.isRefuse = true
    },
    async handleCancel() {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await cancelOrder({ orderId: this.order.orderId }).catch(e=>this.isLoading = false)
      if (res.result) {
        this.alert('订单取消成功')
        this.$emit('close', true)
      }
      this.isLoading=false
    },
    handleChange() {
      this.$router.push(`/consumer/search?orderId=${this.order.orderId}`)
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  text-align: center;
}

</style>
