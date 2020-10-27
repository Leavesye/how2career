<template>
<el-dialog
  title="请在新页面完成支付"
  :visible.sync="isShow"
  :before-close="handleClose"
  append-to-body
  width="400px"
  center>
  <section class="modal-main">
    <p>支付完成前请不要关闭此窗口，</p>
    <p>完成支付后根据您的情况点击下面按钮</p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handlePay">立即支付</el-button>
    <el-button plain @click="handleFinish">已完成支付</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: ['isShow'],
  data () {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleFinish() {
      this.$emit('finish')
    },
    handlePay() {
      this.$emit('pay')
    },
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  text-align: center;
  line-height: 20px;
}

</style>
