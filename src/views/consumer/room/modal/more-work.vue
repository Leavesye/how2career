<template>
<el-dialog
  title="工作信息"
  :visible.sync="isShow"
  :before-close="handleClose"
  width="560px"
  center>
  <section class="modal-main">
    <div class="d-item" v-for="(item,i) in works" :key="i">
      <p class="field-name title">工作信息</p>
      <p>所属行业：{{item.industryText}}</p>
      <div class="flex-hbc fields">
        <p class="field-name">公司名称：{{item.companyText}}</p>
        <p class="field-name">职位：{{item.positionText}}</p>
        <p class="field-name">工作年限：{{item.workingYears}}</p>
      </div>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="handleClose">关闭</el-button>
  </span>
</el-dialog>
</template>

<script>
export default {
  props: ['works', 'isShow'],
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
  padding-bottom: 12px;
  border-bottom: 1px solid #edeeef;
  margin-bottom: 20px;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: #36ae82;
  margin-bottom: 10px;
}
.fields {
  margin-top: 10px;
}
</style>
