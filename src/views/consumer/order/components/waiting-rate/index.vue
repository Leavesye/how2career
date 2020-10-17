<template>
  <div>
    <el-card class="order-item"
             v-for="(o, i) in list"
             :key="i">
      <ul class="list-item flex-hb">
        <li>
          <p style="margin-bottom: 10px">订单号：{{o.orderId}}</p>
          <div class="flex-vc">
            <small-avatar :imgUrl="o.avatar"></small-avatar>
            <div>{{o.name}}</div>
          </div>
        </li>
        <li>
          <p style="margin-bottom: 10px">创建时间：{{o.cTime}}</p>
          <p>咨询时间(北京时间){{o.startTime}}</p>
        </li>
        <li>
          <div class="order-amount">订单金额：{{o.price}}RMB</div>
        </li>
      </ul>
      <div class="desc">职业：{{o.industry}} 简介：{{o.readme}}</div>
      <div v-if="o.question && o.question.length">
        <h-title>咨询的问题</h-title>
        <ul class="question-list">
          <li class="flex-vc" v-for="(item, index) in o.question" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="flex-he btns">
        <el-button plain @click="handleOpenComplaint(o)">投诉</el-button>
        <el-button plain @click="handleOpenRate(o)">评价</el-button>
      </div>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he"
         style="margin-top: 20px" v-if="list.length">
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
    <rate-modal :isShow="isShowRate" @close="handleCloseRate" @rate="handleRate" :orderId="orderId"></rate-modal>
    <!-- 投诉 -->
    <complaint-modal :isShow="isShowComplaint" @close="handleCloseComplaint" @complaint="handleComplaint" :orderId="orderId"></complaint-modal>
  </div>
</template>

<script>
import RateModal from './modal/rate'
import ComplaintModal from './modal/complaint'
import SmallAvatar from '@/components/SmallAvatar'
import { rateOrder } from '@/api/order'

export default {
  name: 'waiting-rate',
  props: ['list', 'pagination', 'query'],
  components: {
    RateModal,
    ComplaintModal,
    SmallAvatar
  },
  data () {
    return {
      orderId: '',
      isShowComplaint: false,
      isShowRate: false,
    }
  },
  methods: {
    handleOpenComplaint (item) {
      this.isShowComplaint = true
      this.orderId = item.orderId
    },
    handleCloseComplaint(isConfirm) {
      this.isShowComplaint = false
      if (isConfirm) {
        this.query()
      }
    },
    handleComplaint() {
      this.isShowComplaint = false
    },
    handleOpenRate (item) {
      this.orderId = item.orderId
      this.isShowRate = true
    },
    handleCloseRate(isConfirm) {
      this.isShowRate = false
      if (isConfirm) {
        this.query()
      }
    },
    async handleRate() {
      this.isShowRate = false
    },
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  margin-bottom: 20px;
}
.list-item {
  color: #7c8ea5;
  font-size: 14px;
  margin-bottom: 20px;
}
.order-amount {
  margin-bottom: 10px;
  text-align: right;
}
.desc {
  height: 50px;
  line-height: 50px;
  background: #f6f6f6;
  border-radius: 4px;
  color: #7C8EA5;
  font-size: 14px;
  padding: 0 20px;
  margin-bottom: 20px;
}
.question-list {
  margin-top: 20px;
}
.question-list > li {
  margin-bottom: 20px;
}
.question-input {
  width: 495px;
  margin-right: 20px;
}
.op-btn {
  height: 32px;
  width: 80px;
}
.btns {
  padding-top: 10px;
}
</style>
