<template lang="html">
  <ax-form-item v-if="model" :model="model" :prop="prop" :label-width=" model.labelWidth "  ref="form-item">
    <div slot="label" :style="model.style">
      <i class="middle" :class="model.icon"></i>
      <span class="middle">{{model.label}}</span>
    </div>
  </ax-form-item>
</template>

<script>
export default {
  props : ['model' , 'prop'],
  methods : {
    getInput(){
      return this.$refs['form-item'].getInput();
    }
  }
}
</script>

<style lang="css" scoped>
</style>
