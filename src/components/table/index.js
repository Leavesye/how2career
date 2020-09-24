import axTable from './table.vue'
import axTableColumn from './tableColumn.vue'

axTable.install = function( Vue ){
  Vue.component( 'axTable', axTable );
}

axTableColumn.install = function( Vue ){
  Vue.component( 'axTableColumn', axTableColumn );
}

export {
  axTable,
  axTableColumn
}
