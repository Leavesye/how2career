<template>
<el-dialog
  title="咨询问题"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="ques-item" v-for="(item, i) in questions" :key="i">{{item}}</div>
  </section>
</el-dialog>
</template>

<script>
import { rateOrder } from '@/api/order'

export default {
  props: ['isShow', 'questions'],
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
.ques-item {
  margin-bottom: 14px;
}
</style>
