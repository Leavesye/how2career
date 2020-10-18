<template>
<el-dialog
  title="信息已经提交审核"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="430px"
  center>
  <section class="modal-main">
    <p>如果你还未设置过您的服务时间 </p>
    <p>可以通过下面按钮设置</p>
    <p>以便通过审核后立即开始接受订单</p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary" plain @click="handleConfirmTime">服务时间设置</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'order-detail',
  props: ['isShow'],
  data () {
    return {
      
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleConfirmTime() {
      this.$emit('close')
      this.$router.push('/consultant/setting')
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
