<template>
<el-dialog
  title="订单详情"
  :visible.sync="isShow"
  width="560px"
  center>
  <section class="modal-main">
    <div class="flex-hb order-info">
      <p class="order-no">订单号: fjdljfdkjfldkjf</p>
      <div>创建时间: 2020-12-11 20:13:12</div>
    </div>
    <div class="flex rate">
      <p style="margin-right: 10px">评价:</p>
      <el-rate v-model="value1"></el-rate>
    </div>
    <p class="desc">评价说明：时间的价值远比年终奖宝贵，行动得越慢，决策成本越高。非常感谢老师！</p>
    <p class="explain">反馈说明:</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      v-model="textarea">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button size="mini" type="primary" @click="handleConfirmTime">确认时间</el-button>
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
    handleConfirmTime() {
      this.$emit('close')
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
