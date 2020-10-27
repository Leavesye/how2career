<template>
  <div>
    <el-card class="order-item"
             v-for="(o, i) in list"
             :key="i">
      <ul class="list-item flex-hb" :style="{paddingBottom: o.status=='7' ? '10px': 0}">
        <li>
          <p style="margin-bottom: 10px">订单号:{{o.orderId}}</p>
          <div class="flex-vc">
            <small-avatar :imgUrl="o.avatar"></small-avatar>
            <div>{{o.name}}</div>
          </div>
        </li>
        <li>
          <p style="margin-bottom: 18px">创建时间:{{o.cTime}}</p>
          <p>咨询时间(北京时间){{o.startTime}}</p>
        </li>
        <li>
          <div class="order-amount">订单金额:{{o.price}} RMB</div>
          <p class="flex" v-if="o.status=='7'">
            <span>评价：</span>
            <el-rate v-model="o.rate" disabled></el-rate></p>
           <p v-else class="order-cancel">已取消</p>
        </li>
      </ul>
      <div class="flex-he btns" v-if="o.status=='7' && o.question && o.question.length">
        <el-button plain @click="handleOpenQuestion(o)">咨询问题</el-button>
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
    <question-modal :isShow="isShow" @close="handleClose" :questions="questions"></question-modal>
  </div>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'
import QuestionModal from './modal/question'

export default {
  name: 'finish-order',
  props: ['list', 'pagination'],
  components: {
    QuestionModal,
    SmallAvatar
  },
  data () {
    return {
      isShow: false,
      questions: [],
    }
  },
  methods: {
    handleOpenQuestion (order) {
      this.isShow = true
      this.questions = order.question
    },
    handleClose(order) {
      this.isShow = false
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
}
.list-item > li:nth-child(1) {
  width: 40%
}
.list-item > li:nth-child(2) {
  width: 40%
}

.order-amount {
  margin-bottom: 18px;
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
  padding-top: 20px;
  border-top: 1px solid #EDEEEF;
}
.order-cancel {
  text-align:right;
}
</style>
