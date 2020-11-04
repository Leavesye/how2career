<template>
<el-dialog
  :visible.sync="isShow"
  :before-close="handleClose"
  width="430px"
  center>
  <span slot="title">
    <div class="icon"><i class="iconfont" :class="[item.error ? 'iconbianzu20':'iconbianzu18']"></i></div>
  </span>
  <section class="modal-main">
    <p class="title">{{item.title}}</p>
    <div class="create-time">{{item.cTime}}</div>
    <p class="content">{{item.content}}</p>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button style="width: 120px" type="success" @click="handleClose">关闭</el-button>
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
  text-align: center;
}
.icon {
  text-align: center;
}
.icon > i {
  font-size: 40px;
  color: #36AE82;
}
.title {
  font-size: 22px;
  color: #262626;
  font-weight: 400;
  margin-bottom: 10px;
}
.create-time { 
  font-weight: 400;
  color: #262626;
}
.content {
  font-size: 16px;
  margin-top: 30px;
  padding: 0 30px;
  line-height: 22px;
  font-weight: 400;
}
</style>
