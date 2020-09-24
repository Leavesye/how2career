<template lang="html">
  <el-dialog
    title="提示"
    :visible.sync="m.isShow"
    width="300px"
    :before-close="handleClose">
  <span>这是一段信息 <slot></slot></span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="handleConfirm">确 定</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  name: 'modal',
  props: ['m'],
  methods: {
    handleClose() {
      this.m.cancel()
    },
    handleConfirm() {
      this.m.confirm()
    },
  }
};
</script>

<style lang="css" scoped>
</style>
