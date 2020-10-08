<template>
  <div>
    <el-card class="order-item"
             v-for="(o, i) in list"
             :key="i">
      <ul class="list-item flex-hb">
        <li>
          <p style="margin-bottom: 10px">订单号：{{o.orderno}}</p>
          <div class="flex-vc">
            <small-avatar :imgUrl="o.avatar"></small-avatar>
            <div>{{o.name}}</div>
          </div>
        </li>
        <li>
          <p style="margin-bottom: 10px">创建时间：{{o.createTime}}</p>
          <p>咨询时间(北京时间)2020-09-10</p>
        </li>
        <li>
          <div class="order-amount">订单金额：{{o.amount}}RMB</div>
          <div class="flex-he">
            <el-button size="small">时间调整</el-button>
          </div>
        </li>
      </ul>
      <div class="desc">职业：高级人力资源最多十字简介：高桥於1994年创立了自己的品牌U</div>
      <h-title>咨询的问题</h-title>
      <ul class="question-list">
        <li class="flex-vc" v-for="(item, index) in 2" :key="index">
          <el-input class="question-input" size="medium"></el-input>
          <el-button class="op-btn" size="small">编辑</el-button>
          <el-button class="op-btn" size="small">删除</el-button>
        </li>
      </ul>
      <el-button type="success" plain size="small">+添加问题</el-button>
      <div class="flex-he btns">
        <el-button size="small" plain type="success" @click="handleOpenCancel(o.orderId)">订单取消</el-button>
        <el-button size="small" plain type="success" @click="handleEnterRoom(o.roomId)">进入房间</el-button>
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
    <!-- 取消订单弹框 -->
    <cancel-modal :isShow="isShow" @close="handleClose" :orderId="orderId"></cancel-modal>
  </div>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'
import CancelModal from './modal/cancel-order'

export default {
  name: 'waiting-service',
  props: ['list', 'pagination'],
  components: {
    SmallAvatar,
    CancelModal
  },
  data () {
    return {
      isShow: false,
      orderId: ''
    }
  },
  methods: {
    handleOpenCancel(orderId) {
      this.isShow = true
      this.orderId = orderId
    },
    handleClose () {
      this.isShow = false
    },
    handleEnterRoom (roomId) {
      this.$router.push(`/consumer/room/${roomId}`)
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
