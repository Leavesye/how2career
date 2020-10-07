<template>
<el-dialog
  title="评价反馈"
  :visible.sync="isShowRate"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="flex-hb order-info">
      <p class="order-no">订单号: 12134323424</p>
      <div>创建时间: 2020-12-11 20:13:12</div>
    </div>
    <div class="flex rate">
      <p style="margin-right: 10px">评价:</p>
      <el-rate disabled v-model="form.rate"></el-rate>
    </div>
    <p class="desc">评价说明：时间的价值远比年终奖宝贵，行动得越慢，决策成本越高。非常感谢老师！</p>
    <p class="explain">反馈说明:</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      v-model="form.desc">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="handleFeedback">反馈</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'consultant-finish-detail',
  props: ['isShowRate'],
  data () {
    return {
      form: {
        rate: 0,
        desc: ''
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
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
