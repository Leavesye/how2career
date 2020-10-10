<template>
<el-dialog
  title="投诉"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <el-select v-model="title" size="small">
      <el-option value="1" label="未回答提纲问题"></el-option>
    </el-select>
    <p class="explain">说明:</p>
    <el-input
      type="textarea"
      :rows="4"
      placeholder=""
      v-model="content">
    </el-input>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoading" size="small" type="success" @click="handleComplaint">确认提交</el-button>
  </span>
</el-dialog>
</template>

<script>
import { complaintByConsumer } from '@/api/order'

export default {
  props: ['isShow', 'orderId'],
  data () {
    return {
      isLoading: false,
      title: '1',
      content: ''
    }
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    async handleComplaint() {
      if (this.isLoading) return
      this.isLoading = true
      const res = await complaintByConsumer({ 
        title: this.title, 
        content: this.content,
        orderId: this.orderId
      }).catch(e=> this.isLoading = false)
      this.isLoading = false
      if (res.result) {
        this.alert('投诉成功')
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
