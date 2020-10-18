<template>
<el-dialog
  title="消息通知"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="630px"
  center>
  <section class="modal-main">
    <div class="flex-hb" style="margin-bottom: 14px;">
      <p>标题内容</p>
      <div>2020-08-14 20:13:12</div>
    </div>
    <p>转采了你的采集时尚几何图案彩色图形创意背</p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose">关闭</el-button>
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
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
}

</style>
