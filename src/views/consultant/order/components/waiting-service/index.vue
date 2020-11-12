<template>
  <div>
    <el-card class="top-item" v-if="immediatelyOrder.orderId">
      <h-title>即将开始的咨询</h-title>
      <ul class="flex-hbc">
        <li>
          <p style="margin-bottom: 10px">订单号：{{immediatelyOrder.orderId}}</p>
          <div class="flex-vc">
            <small-avatar :imgUrl="immediatelyOrder.avatar"></small-avatar>
            <div class="user-name">{{immediatelyOrder.name}}</div>
          </div>
        </li>
        <li>
          <p style="margin-bottom: 10px">创建时间：{{immediatelyOrder.cTime}}</p>
          <div>开始时间：{{immediatelyOrder.startTime}}</div>
        </li>
        <li>
          <div style="margin-top:30px">{{immediatelyOrder.rest}}</div>
        </li>
        <li>{{immediatelyOrder.rest}}</li>
        <li>
          <div style="margin-bottom: 10px; text-align: right">订单金额:{{immediatelyOrder.price}} RMB</div>
          <div class="flex-he">
            <el-button type="primary"
                       @click="handleEnterRoom(immediatelyOrder.orderId)">进入房间</el-button>
            <el-button plain
                       @click="handleOpenDetail(immediatelyOrder)">订单详情</el-button>
          </div>
        </li>
      </ul>
    </el-card>
    <el-card v-if="list.length">
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list"
               :key="i" class="order-item">
        <ul class="flex-hbc">
          <li>
            <p style="margin-bottom: 10px">订单号：{{o.orderId}}</p>
            <div class="flex-vc">
              <small-avatar :imgUrl="o.avatar"></small-avatar>
              <div class="user-name">{{o.name}}</div>
            </div>
          </li>
          <li>
            <p style="margin-bottom: 10px">创建时间：{{o.cTime}}</p>
            <div style="padding-top: 10px">开始时间：{{o.startTime}}</div>
          </li>
          <li>
            <div style="margin-top:35px">{{o.serviceCountDown}}</div>
          </li>
          <li>
            <div style="margin-bottom: 10px; text-align: right">订单金额:{{o.price}} RMB</div>
            <div class="flex-he">
              <el-button plain @click="handleOpenDetail(o)">订单详情</el-button>
            </div>
          </li>
        </ul>
      </section>
    </el-card>
    <!-- 无订单数据 -->
    <el-card v-if="list.length==0"
             class="no-order">
      <p>暂无订单数据</p>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he"
         style="margin-top: 20px">
      <el-pagination :page-sizes="pagination.pageSizes || [10, 20, 30, 40]"
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
    <!-- 订单详情 -->
    <detail-modal :isShow="isShow"
                  :order="order"
                  :msg="changeMsg"
                  @close="handleCloseDetail"></detail-modal>
  </div>
</template>

<script>
import DetailModal from './modal/detail'
import SmallAvatar from '@/components/SmallAvatar'
import { queryUpdateTimeMsg } from '@/api/order'

export default {
  name: 'waiting-service',
  props: ['list','pagination', 'immediatelyOrder', 'query'],
  components: {
    DetailModal,
    SmallAvatar
  },
  data () {
    return {
      order: {},
      isShow: false,
      changeMsg: ''
    }
  },
  methods: {
    handleEnterRoom (orderId) {
      this.$router.push(`/consultant/room/${orderId}`)
    },
    async handleOpenDetail (order) {
      this.isShow = true
      this.order = order
      const l = this.loading()
      const res = await queryUpdateTimeMsg({ orderId: order.orderId }).catch(e=> l.close())
      if (res.result) {
        this.changeMsg = res.msg
      }
      l.close()
    },
    handleCloseDetail (isConfirm) {
      this.isShow = false
      if (isConfirm) {
        this.query()
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.top-item {
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border-radius: 8px;
  border: 1px solid #15479e;
  margin-bottom: 20px;
}
.top-item ul {
  margin-top: 20px;
  font-size: 14px;
  color: #7C8FA5;
}
.order-item {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #EDEEEF;
  font-size: 14px;
  color: #7C8FA5;
}
.order-item > ul > li {
  height: 56px;
}
.order-item:last-child {
  margin-bottom: 0
}
.user-name {
  margin-left: 10px;
}
.no-order p {
  text-align: center;
  color: #7c8ea5;
  font-size: 16px;
}
</style>
