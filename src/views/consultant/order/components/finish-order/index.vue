<template>
  <div>
    <el-card>
      <!-- 搜索条件 -->
      <search-form @search="handleSearch"></search-form>
      <!-- 无订单数据 -->
      <p v-if="list.length==0" class="no-order">暂无订单数据</p>
      <!-- 订单列表 -->
      <section v-if="list.length" v-for="(o ,i) in list"
               :key="i">
        <ul class="order-item flex-hb">
          <li>
            <p class="order-no">订单号：{{o.orderId}}</p>
            <div class="flex-vc">
              <small-avatar :imgUrl="o.avatar"></small-avatar>
              <div class="user-name">{{o.name}}</div>
            </div>
          </li>
          <li>
            <p class="create-time">创建时间：{{o.cTime}}</p>
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
            <div class="order-amount">订单金额:{{o.price}} RMB</div>
            <div class="flex-he">
              <el-button plain
                         @click="handleOpenDetail(o)">订单详情</el-button>
            </div>
          </li>
        </ul>
      </section>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he"
          v-if="list.length" 
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
import RateModal from './modal/rate'
import ArbitrationModal from './modal/arbitration'
import DetailModal from './modal/detail'
import SmallAvatar from '@/components/SmallAvatar'
import SearchForm from '@/components/SearchForm'
import { getDicts } from '@/api/user'  

export default {
  name: 'finish-order',
  props: ['list', 'pagination', 'query'],
  components: {
    RateModal,
    ArbitrationModal,
    DetailModal,
    SmallAvatar,
    SearchForm
  },
  data () {
    return {
      order: {},
      isShowRate: false,
      isShowApply: false,
      isShowDetail: false,
    }
  },
  methods: {
    handleSearch(p) {
      this.$emit('condition-query', p)
    },
    async handleOpenDetail(order) {
      const res = await getDicts()
      if (res.result) {
        if (order.complaint) {
          order.complaintTitle = res.msg.complaint.find(o => o.value == order.complaint.title).text
          order.complaintContent = order.complaint.content
        }
        if (order.evaluation) {
          order.rateVal = order.evaluation.point
          order.rateContent = order.evaluation.content
          order.consultantReply = order.evaluation.consultantReply
        }
      }
      this.order = order
      this.isShowDetail = true
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
.order-item > li:nth-child(1) {
  width: 30%
}
.order-item > li:nth-child(2) {
  width: 25%
}
.user-name {
  margin-left: 10px;
}
.order-no {
  margin-bottom: 10px;
}
.create-time {
  height: 36px;
}
.order-amount {
  margin-bottom: 10px; text-align: right
}
.no-order {
  margin-top: 30px;
  text-align: center;
  color: #7c8ea5;
  font-size: 16px;
}
</style>
