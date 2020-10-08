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
            <el-option v-for="item in []"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div>
        <time-picker @change="handleTimeChange"
                     :times='times'
                     :curTime="search.curTime"></time-picker>
        <el-date-picker style="width: 230px"
                        size="small"
                        v-model="search.orderDate"
                        type="daterange"
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
                         @click="handleOpenDetail">订单详情</el-button>
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
    <!-- 评价 -->
    <rate-modal :isShowRate="isShowRate"
                @close="handleCloseRate"
                @feedback="handleFeedback"></rate-modal>
    <!-- 申请仲裁 -->
    <arbitration-modal :isShowApply="isShowApply"
                @close="handleCloseApply"
                @apply="handleApplyArbitration"></arbitration-modal>
    <!-- 订单详情 -->
    <detail-modal :isShowDetail="isShowDetail"
                  @close="handleCloseDetail"
                  @apply="handleShowArbitration"
                  @feedback="handleShowFeedback"
                  @confirm="handleConfirm"></detail-modal>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker'
import RateModal from './modal/rate'
import ArbitrationModal from './modal/arbitration'
import DetailModal from './modal/detail'
import SmallAvatar from '@/components/SmallAvatar'

export default {
  name: 'finish-order',
  props: ['list', 'pagination'],
  components: {
    TimePicker,
    RateModal,
    ArbitrationModal,
    DetailModal,
    SmallAvatar
  },
  data () {
    return {
      isShowRate: false,
      isShowApply: false,
      isShowDetail: false,
      search: {
        status: '',
        curTime: '',
        orderDate: '',
      },
      times: [
        { name: '7天' },
        { name: '15天' },
        { name: '30天' },
      ],
    }
  },
  methods: {
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
    handleTimeChange () { },
    handleCloseRate () {
      this.isShowRate = false
    },
    handleFeedback () {
      this.isShowRate = false
    },
    handleOpenDetail () {
      this.isShowDetail = true
    },
    handleCloseDetail () {
      this.isShowDetail = false
    },
    handleConfirm () {
      this.handleCloseDetail()
    },
    handleShowArbitration() {
      this.handleCloseDetail()
      this.isShowApply = true
    },
    handleApplyArbitration() {
      this.handleCloseApply()
    },
    handleShowFeedback() {
      this.handleCloseDetail()
      this.isShowRate = true
    },
    handleCloseApply() {
      this.isShowApply = false
    },
    handleSearch () { }
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
