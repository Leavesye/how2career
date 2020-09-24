<template>
  <el-table :data="data" v-bind="props" v-on="events" ref="elTable">
    <ax-table-column v-for="column,index in columns" v-if="!column.hide" :column="column" :key="index"></ax-table-column>
  </el-table>
</template>

<script>
import axTableColumn from "./tableColumn.vue";

let methods = {};
[
  "clearSelection",
  "toggleRowSelection",
  "toggleAllSelection",
  "toggleRowExpansion",
  "setCurrentRow",
  "clearSort",
  "clearFilter",
  "doLayout",
  "sort"
].forEach(fn => {
  methods[fn] = function() {
    return this.$refs.elTable[fn].apply(this, arguments);
  };
});

export default {
  name: "axTable",
  props: ["data", "columns", "props", "events"],
  props: {
    data: {},
    columns: {},
    props: {
      default: function() {
        return {};
      }
    },
    events: {
      default: function() {
        return {};
      }
    }
  },
  components: {
    axTableColumn
  },
  computed: {
    selection: function() {
      return this.$refs.elTable.selection;
    }
  },
  data() {
    return {
      selectedRow: null
    };
  },
  methods: methods,
  created() {
    let vm = this;

    if (this.columns.length && !!this.props.showRadiobox) {
      this.columns.unshift({
        render: function(createElem, data) {
          return (
            <el-radio v-model={this.selectedRow} label={data.row}>
              {"  "}
            </el-radio>
          );
        }.bind(vm),
        width: "80px",
        align: "center"
      });
    }

    this.events["row-click"] = [].concat(this.events["row-click"] || []);
    this.events["row-click"].unshift(row => {
      this.selectedRow = row;
    });

    if (this.columns) {
      this.columns.forEach(c => {
        if (!c.renderHeader) {
          let icon = c.icon || "";
          c.renderHeader = function(createElem, { column }) {
            return (
              <span class="middle">
                <i class={[icon, "middle"]}></i> {column.label}
              </span>
            );
          };
        }
        c.align = "center";
        c.headerAlign = "center";
      });
    }
  }
};
</script>

<style lang="css" scoped>
</style>
