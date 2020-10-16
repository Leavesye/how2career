<template>
<!-- 搜索条件 -->
<section class="flex-hbc search">
  <div class="flex-hbc">
    <el-link :type="user.role=='consumer' ?'success':'primary'"
              :underline="false" style="font-weight: 600">{{title || '订单状态'}}</el-link>
    <el-select v-if="!title" class="order-status"
                v-model="search.status"
                placeholder=""
                size="small">
      <el-option v-for="item in orderStates"
                  :key="item.value"
                  :label="item.text"
                  :value="item.value">
      </el-option>
    </el-select>
  </div>
  <section class="flex-hec">
    <time-picker @change="handleTimeChange"
                  :times='times'
                  style="margin-right: 30px"
                  :curTime="search.curIndex"></time-picker>
    <el-date-picker style="width: 230px; margin-right: 10px"
                    size="small"
                    v-model="search.orderDate"
                    type="daterange"
                    @change="handleDateChange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
    </el-date-picker>
    <el-button  plain
                @click="handleSearch">查询</el-button>
  </section>
</section>
</template>

<script>
import moment from 'moment'
import { ORDER_STATUS } from '@/utils/enums'
import TimePicker from '@/components/TimePicker'
import { mapGetters } from 'vuex'

export default {
  props: ['title'],
  components: {TimePicker},
  data () {
    const day7 = moment().subtract(7, 'day').startOf('day')
    const day15 = moment().subtract(15, 'day').startOf('day')
    const day30 = moment().subtract(30, 'day').startOf('day')
    const now = moment()
    return {
      times: [
        { name: '7天', v: [day7, now]},
        { name: '15天', v: [day15, now]},
        { name: '30天', v: [day30, now] },
      ],
      search: {
        status: '',
        curIndex: '',
        orderDate: '',
      },
    }
  },
  computed: {
    orderStates: function() {
      return ORDER_STATUS.filter(o => o.tag == 7)
    },
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    handleTimeChange (value, i) { 
      this.search.orderDate = [...value.v]
      this.search.curIndex = i
    },
    handleDateChange(v) {
      this.search.curIndex = -1
    },
    handleSearch () { 
      const { orderDate, status } = this.search
      const p = {}
      if (!this.title) {
        p.condition = status ? `status==${status}` : 'status==0:status==7:status==8'
      }
      if (orderDate && orderDate.length) {
        p.from = orderDate[0] ? orderDate[0].valueOf()/1000 : 0
        p.to = orderDate[1] ? Math.ceil(orderDate[1].valueOf()/1000) : 2601444690
      }
      this.$emit('search', p)
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #edeeef;
}
.order-status {
  width: 140px;
  margin-left: 10px;
}

.title {
  font-size: 14px;
  color: #15479e;
}
</style>
