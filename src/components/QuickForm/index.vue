<!-- author : L.lawliet -->
<template lang="html">
  <ax-form @submit.native.prevent class="form" :model="model" :disabled="disabled" label-position="right" size="medium" :label-width=" labelWidth || '110px'"  ref="form">
    <el-row :gutter="20">
      <el-col v-for="item,prop,itemIndex in model" v-if="!item.slot" v-bind="item.layout || layout" :key="prop">
        <quick-form-item :model="item"  :prop="prop" :key="prop" :ref="prop" :label-width="labelWidth || '110px'" ></quick-form-item>
      </el-col>
    </el-row>
    <slot></slot>
  </ax-form>
</template>

<script>
import quickFormItem from '../QuickFormItem/index.vue'
// 快捷表单组件 （ 多用于 dialog 中编辑表单快速配置 ）
export default {
  name : 'quick-form',
  components : {
    quickFormItem,
  },
  props : {
    model : {},
    layout : {
      default : ()=>{ return { xs : 24, sm : 24, md : 24, lg : 24, xl : 24 } },
    },
    labelWidth : {},
    disabled : {
      default : ()=>{ return false },
    }
  },
  beforeDestroy(){
    this.resetFields();
  },
  methods : {
    validate(){
      return this.$refs.form.validate.apply( this , arguments );
    },
    validateField(){
      return this.$refs.form.validateField.apply( this , arguments );
    },
    resetFields(){
      return this.$refs.form.resetFields.apply( this , arguments );
    },
    clearValidate(){
      return this.$refs.form.clearValidate.apply( this , arguments );
    },
    getFormData(){
      return this.$refs.form.getFormData();
    },
    getFormItem( prop ){
      if( this.$refs[ prop ] ){
        return this.$refs[ prop ][0].$refs['form-item'];
      }
      return null;
    },
    getInput( prop ){
      let formItem = this.getFormItem( prop )
      if( formItem ){
        return formItem.getInput();
      }
      return null;
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
