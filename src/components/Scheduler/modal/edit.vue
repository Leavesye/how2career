<template>
<section>
  <el-row class="edit-row">
    <p style="margin-bottom: 10px;">标题</p>
    <input id="Subject" readonly="readonly" class="e-field" type="text" value="" name="Subject" style="width: 50%" />
  </el-row>
  <el-row :gutter="20" class="edit-row">
    <el-col :span="12">
      <p>开始时间</p>
      <div><input readonly="readonly" id="StartTime" class="e-field" type="text" name="StartTime"/></div>
    </el-col>
    <el-col :span="12">
      <p>结束时间</p>
      <div><input id="EndTime" class="e-field" type="text" name="EndTime" /></div>
    </el-col>
  </el-row>
  <el-row>
     <div id='RecurrenceEditor'></div>
  </el-row>
</section>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.edit-row {
  margin-bottom: 30px;
}
</style>
