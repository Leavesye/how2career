<template>
<el-dialog
  title="学历信息"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="500px"
  center>
  <section class="modal-main">
    <div class="d-item" v-for="item,i in edus" :key="i">
      <p class="field-name title">学历信息</p>
      <p>{{item.desc}}</p>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: ['edus', 'isShow'],
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
.d-item {
  border-bottom: 1px solid #edeeef;
  padding-bottom: 12px;
  margin-bottom: 20px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: #36ae82;
  margin-bottom: 10px;
}
</style>
