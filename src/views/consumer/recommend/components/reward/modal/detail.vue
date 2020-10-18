<template>
<el-dialog
  title="奖励内容"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="430px"
  center>
  <section class="modal-main">
    <p style="margin-bottom: 10px;">{{reward.cardTitle}}</p>
    <div>{{reward.cardContent}}</div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: ['isShow', 'reward'],
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

</style>
