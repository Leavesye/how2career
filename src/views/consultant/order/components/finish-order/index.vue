<template>
  <div>
    <el-card>
      <!-- 搜索条件 -->
      <section class="flex-hbc search">
        <div class="flex-hbc">
          <el-link type="primary"
                   :underline="false">订单状态</el-link>
          <el-select class="order-status"
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
        <time-picker @change="handleTimeChange"
                     :times='times'
                     :curTime="search.curIndex"></time-picker>
        <el-date-picker style="width: 230px"
                        size="small"
                        v-model="search.orderDate"
                        type="daterange"
                        @change="handleDateChange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="small"
                   type="primary"
                   plain
                   @click="handleSearch">查询</el-button>
      </section>
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list"
               :key="i">
        <ul class="order-item flex-hbc">
          <li>
            <p style="margin-bottom: 10px">订单号：{{o.orderId}}</p>
            <div class="flex-vc">
              <small-avatar :imgUrl="o.avatar"></small-avatar>
              <div class="user-name">{{o.name}}</div>
            </div>
          </li>
          <li>
            <p style="margin-bottom: 10px">创建时间：{{o.cTime}}</p>
            <div>开始时间：{{o.startTime}}</div>
          </li>
          <li class="flex-hbc"
              style="margin-top:30px">
            <p style="margin-right: 10px">评价</p>
            <el-rate v-model="o.rate"
                     disabled></el-rate>
          </li>

          <li>{{o.rest}}</li>
          <li>
            <div style="margin-bottom: 10px; text-align: right">订单金额:{{o.price}} RMB</div>
            <div class="flex-he">
              <el-button size="small"
                         plain
                         type="primary"
                         @click="handleOpenDetail(o)">订单详情</el-button>
            </div>
          </li>
        </ul>
      </section>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he"
         style="margin-top: 20px">
      <el-pagination id="pagin"
                     :page-sizes="pagination.pageSizes || [10, 20, 30, 40]"
                     :total="pagination.total"
                     :current-page="pagination.pageIndex"
                     :page-size="pagination.pageSize"
                     layout="prev, pager, next"
                     background
                     small
                     v-bind="pagination.props"
                     v-on="pagination.events"
                     ref="pagination">
      </el-pagination>
    </div>
    <!-- 评价反馈 -->
    <rate-modal :isShowRate="isShowRate"
                @close="handleCloseRate"
                :order="order"></rate-modal>
    <!-- 申请仲裁 -->
    <arbitration-modal :isShowApply="isShowApply"
                @close="handleCloseApply" 
                :order="order"></arbitration-modal>
    <!-- 订单详情 -->
    <detail-modal :isShowDetail="isShowDetail"
                  :order="order"
                  @close="handleCloseDetail"
                  @apply="handleShowArbitration"
                  @feedback="handleShowFeedback"></detail-modal>
  </div>
</template>

<script>
import moment from 'moment'
import TimePicker from '@/components/TimePicker'
import RateModal from './modal/rate'
import ArbitrationModal from './modal/arbitration'
import DetailModal from './modal/detail'
import SmallAvatar from '@/components/SmallAvatar'
import { ORDER_STATUS } from '@/utils/enums'

export default {
  name: 'finish-order',
  props: ['list', 'pagination', 'query'],
  components: {
    TimePicker,
    RateModal,
    ArbitrationModal,
    DetailModal,
    SmallAvatar
  },
  data () {
    const day7 = moment().subtract(7, 'day').startOf('day')
    const day15 = moment().subtract(15, 'day').startOf('day')
    const day30 = moment().subtract(30, 'day').startOf('day')
    const now = moment()
    return {
      order: {},
      isShowRate: false,
      isShowApply: false,
      isShowDetail: false,
      search: {
        status: '',
        curIndex: '',
        orderDate: '',
      },
      times: [
        { name: '7天', v: [day7, now]},
        { name: '15天', v: [day15, now]},
        { name: '30天', v: [day30, now] },
      ],
    }
  },
  computed: {
    orderStates: function() {
      return ORDER_STATUS.filter(o => o.tag == 7)
    }
  },
  methods: {
    handleTimeChange (value, i) { 
      this.search.orderDate = [...value.v]
      this.search.curIndex = i
    },
    handleDateChange(v) {
      this.search.curIndex = -1
    },
    handleOpenDetail(order) {
      this.isShowDetail = true
      this.order = order
    },
    handleCloseDetail () {
      this.isShowDetail = false
    },
    handleShowArbitration() {
      this.handleCloseDetail()
      this.isShowApply = true
    },
    handleShowFeedback() {
      this.handleCloseDetail()
      this.isShowRate = true
    },
    handleCloseRate (isConfirm) {
      this.isShowRate = false
      if (isConfirm) {
        this.query()
      }
    },
    handleCloseApply(isConfirm) {
      this.isShowApply = false
      if (isConfirm) {
        this.query()
      }
    },
    handleSearch () { 
      const { orderDate, status } = this.search
      const params = {
        from: orderDate[0] ? orderDate[0].valueOf()/1000 : 0,
        to: orderDate[1] ? Math.ceil(orderDate[1].valueOf()/1000) : 2601444690,
        condition: status ? `status==${status}` : 'status==0:status==7:status==8'
      }
      this.$emit('condition-query', params)
    }
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  padding: 20px 0;
  border-bottom: 1px solid #edeeef;
  font-size: 14px;
  color: #7c8fa5;
}
.user-name {
  margin-left: 10px;
}
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
