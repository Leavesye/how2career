<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="630px"
  center>
  <section class="modal-main">
    <div class="flex">
      <p class="order-no">订单号: {{order.orderId}}</p>
      <div>创建时间: {{order.cTime}}</div>
    </div>
    <!-- 咨询师详情 -->
    <consumer-info :order="order"></consumer-info>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
import ConsumerInfo from '@/components/ConsumerInfo'

export default {
  props: ['isShow', 'order'],
  components: {
    ConsumerInfo
  },
  data () {
    return {
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
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
</style>
