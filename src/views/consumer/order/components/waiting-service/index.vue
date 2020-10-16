<template>
  <div>
    <el-card class="order-item"
             v-for="(o, i) in orderList"
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
          <p style="margin-bottom: 16px">创建时间：{{o.cTime}}</p>
          <p>咨询时间(北京时间){{o.startTime}}</p>
        </li>
        <li>
          <div class="order-amount">订单金额：{{o.price}}RMB</div>
          <div class="flex-he">
            <el-button plain
                       @click="handleOpenChange(o)">时间调整</el-button>
          </div>
        </li>
      </ul>
      <div class="desc">职业：{{o.industry}} 简介：{{o.readme}}</div>
      <h-title>咨询的问题</h-title>
      <ul class="question-list">
        <li class="flex-vc"
            v-for="(item, index) in o.question"
            :key="index">
          <el-input class="question-input"
                    size="medium"
                    v-model="item.v" :maxLength="100"></el-input>
          <el-button class="op-btn"
                     @click="handleRemoveQuestion(i, index)">删除</el-button>
        </li>
      </ul>
      <el-button type="success"
                 plain
                 @click="handleAddQuestion(i)">+添加问题</el-button>
      <el-button :loading="isLoading"
                 type="success"
                 plain
                 v-if="o.question.length"
                 @click="handleSaveQuestion(o)">保存</el-button>
      <div class="flex-he btns">
        <el-button plain
                   @click="handleOpenCancel(o)">订单取消</el-button>
        <el-button type="success"
                   @click="handleEnterRoom(o.orderId)">进入房间</el-button>
      </div>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he"
         style="margin-top: 20px"
         v-if="list.length">
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
    <!-- 取消订单弹框 -->
    <cancel-modal :isShow="isShow"
                  @close="handleClose"
                  :order="order" :msg="cancelMsg"></cancel-modal>
    <!-- 时间调整弹框 -->
    <change-modal :isShow="isShowTime"
                  @close="handleCloseTime"
                  :order="order" :msg="changeMsg"></change-modal>
  </div>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'
import CancelModal from './modal/cancel-order'
import ChangeModal from './modal/change-time'
import { orderAddQuestion, queryCancelMsg, queryUpdateTimeMsg } from '@/api/order'

export default {
  name: 'waiting-service',
  props: ['list', 'pagination', 'query'],
  components: {
    SmallAvatar,
    CancelModal,
    ChangeModal
  },
  data () {
    return {
      isShowTime: false,
      isShow: false,
      order: {},
      orderList: this.list,
      isLoading: false,
      cancelMsg: '',
      changeMsg: '',
    }
  },
  methods: {
    async handleSaveQuestion (o) {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await orderAddQuestion({
        orderId: o.orderId,
        question: o.question ? o.question.map(q => q.v): []
      }).catch(e => this.isLoading = false)
      if (res.result) {
        this.alert('保存成功')
      }
      this.isLoading = false
    },
    handleRemoveQuestion (i, j) {
      this.orderList[i].question.splice(j, 1)
      // 如果是最后一个 触发保存
      if (!this.orderList[i].question.length) {
        this.handleSaveQuestion(this.orderList[i])
      }
    },
    handleAddQuestion (i) {
      // 0-20个问题
      if (this.orderList[i].question.length == 20) return false
      this.orderList[i].question.push({ v: '' })
    },
    async handleOpenCancel (order) {
      this.isShow = true
      this.order = order
      const l = this.loading()
      const res = await queryCancelMsg({ orderId: order.orderId }).catch(e=> l.close())
      if (res.result) {
        this.cancelMsg = res.msg
      }
      l.close()
    },
    handleClose (isCancel) {
      this.isShow = false
      if (isCancel) {
        // 刷新列表
        this.query()
      }
    },
    async handleOpenChange (order) {
      this.isShowTime = true
      this.order = order
      const l = this.loading()
      const res = await queryUpdateTimeMsg({ orderId: order.orderId }).catch(e=> l.close())
      if (res.result) {
        this.changeMsg = res.msg
      }
      l.close()
    },
    handleCloseTime (isConfirm) {
      this.isShowTime = false
      if (isConfirm) {
        // 刷新列表
        this.query()
      }
    },
    handleEnterRoom (orderId) {
      this.$router.push(`/consumer/room/${orderId}`)
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
  color: #7c8ea5;
  font-size: 14px;
  padding: 0 20px;
  margin-bottom: 20px;
}
.question-list {
  margin-top: 20px;
  height: 280px;
  overflow: auto;
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
