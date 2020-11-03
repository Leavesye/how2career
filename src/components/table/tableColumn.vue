<template lang="html">
  <el-table-column :show-overflow-tooltip="true" :label="column.label" v-bind="column" v-if="column.render">
    <!-- 自定义表格内容 -->
    <template slot-scope="scope">
      <column-template :template="column.render" :data="scope"></column-template>
    </template>
  </el-table-column>
  <el-table-column :label="column.label" v-bind="column" v-else>
  </el-table-column>
</template>

<script>

import abstract from '../abstractTemplate';

let columnTemplate = abstract('columnTemplate');

export default {
  name : 'axTableColumn',
  props : ['column'],
  components : {
    columnTemplate,
  }
}
</script>

<style lang="css">
</style>
