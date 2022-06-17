<template>
  <div class="dashboard-container">
    <!-- <scheduler /> -->
    <el-table border :data="[]" :fit="true" style="width: 100%">
      <el-table-column v-for="(item,index) in columns" :label="item.label"
                :prop="item.prop" :key="index" align="center" :width="item.width"></el-table-column></el-table>
  </div>
</template>

<script>
import Scheduler from '@/components/Scheduler'

export default {
  name: 'Dashboard',
  components: {
    Scheduler,
  },
  data () {
    return {
      columns: [
          {
              label: '日期日期日期日期日期日期日期',
              prop: 'date',
              width: '100px'
          },
            {
              label: '姓名',
              prop: 'name',
              width: '100px'
          },
            {
              label: '省份',
              prop: 'province',
              width: '100px'
          },
            {
              label: '市区',
              prop: 'city',
              width: '100px'
          },
            {
              label: '地址',
              prop: 'address',
              width: '100px'
          },
          {
              label: '邮编',
              prop: 'zip',
          },
          //   {
          //     label: '这是测试字段01',
          //     prop: 'test01'
          // },
          //   {
          //     label: '这是测试字段02',
          //     prop: 'test02'
          // },
          //   {
          //     label: '这是测试字段03',
          //     prop: 'test03'
          // },
          //   {
          //     label: '这是测试字段04',
          //     prop: 'test04'
          // }
      ]
    }
  },
  methods: {
    test() {
      alert(11111)
    }
  },
  mounted() {
    console.log(222)
  }
}
</script>

<style lang="scss" scoped>
#chart {
  height: 300px;
}
</style>
