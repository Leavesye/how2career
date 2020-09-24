<!-- author : L.lawliet -->
<template lang="html">
  <div class="tableView" v-if="table">
    <ax-table ref="table" v-bind="table"></ax-table>
    <!-- 分页器视图 -->
    <div class="paginationView" style="text-align:right;margin-top:20px;" v-if="pagination">
      <el-pagination
        :page-sizes="pagination.pageSizes || [10, 20, 30, 40]"
        :total="pagination.total"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :layout="(pagination.props && pagination.props.layout) || 'total, sizes, prev, pager, next, jumper'"
        v-bind="pagination.props" v-on="pagination.events"
        ref="pagination"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// 快捷表格组件
export default {
  name : 'quick-table',
  props : ['config'],
  data(){
    return {
      table : this.config.table,
      pagination : this.config.pagination,
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
