<template>
<el-dialog
  title="评价"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="flex rate">
      <p style="margin-right: 10px">评价:</p>
      <el-rate v-model="point"></el-rate>
    </div>
    <p class="explain">说明:</p>
    <el-input
      type="textarea"
      :maxLength="300"
      :rows="4"
      placeholder=""
      v-model="content">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" size="small" type="success" @click="handleRate">确认提交</el-button>
  </span>
</el-dialog>
</template>

<script>
import { rateOrder } from '@/api/order'

export default {
  props: ['isShow', 'orderId'],
  data () {
    return {
      point: 0,
      content: '',
      isLoading: false
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleRate() {
      if (this.point <1) {
        this.alert('请选择评分', 'warning')
        return false
      }
      if (!this.content) {
        this.alert('请填写评价说明', 'warning')
        return false
      }
      if (this.isLoading) return
      this.isLoading = true
      const res = await rateOrder({ 
        point: this.point,
        content: this.content,
        orderId: this.orderId
      }).catch(e=> this.isLoading = false)
      this.isLoading = false
      if (res.result) {
        this.alert('评价成功')
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
