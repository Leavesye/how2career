<template>
<el-dialog
  title="申请仲裁"
  :visible.sync="isShowApply"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="flex-hb order-info">
      <p class="order-no">订单号: fjdljfdkjfldkjf</p>
      <div>创建时间: 2020-12-11 20:13:12</div>
    </div>
    <div class="flex rate">
      <p style="margin-right: 10px">投诉:</p>
      <div>未完成服务</div>
    </div>
    <p class="desc">投诉说明：时间的价值远比年终奖宝贵，行动得越慢，决策成本越高。非常感谢老师！</p>
    <p class="explain">仲裁说明:</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      v-model="desc">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" type="primary" @click="handleApply">申请仲裁</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: ['isShowApply'],
  data () {
    return {
      desc: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    handleApply() {
      this.$emit('apply')
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
