<template>
<el-dialog
  title="消息通知"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="630px"
  center>
  <section class="modal-main">
    <div class="flex-hb" style="margin-bottom: 14px;">
      <p>{{item.title}}</p>
      <div>{{item.cTime}}</div>
    </div>
    <p>{{item.content}}</p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: ['isShow', 'item'],
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
