<!-- author : L.lawliet -->
<template lang="html">
  <div class="tableView" v-if="table">
    <ax-table ref="table" v-bind="table"></ax-table>
  </div>
</template>

<script>
// 快捷表格组件
export default {
  name : 'quick-table',
  props : ['table'],
  data(){
    return {
    }
  },
  computed : {
    selection : function(){
      return this.$refs.table.selection
    }
  },
  methods : {
    getTable(){
      return this.$refs.table;
    },
    getSelectedRow(){
      return this.getTable().selectedRow;
    },
    setSelectedRow( val ){
      this.getTable().selectedRow = val;
      return this;
    },
    setSelectedRowBy( field , val ){
      let row = this.table.data.find(( item )=> item[field] == val);
      this.setSelectedRow( row );
      return this;
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
