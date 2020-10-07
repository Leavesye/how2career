<template>
<el-card>
  <ul v-for="(o, i) in list" :key="i" class="list-item flex-hbc" :style="{borderBottom: noBorder? 'none': '1px solid #edeeef'}">
    <li>
      <p style="margin-bottom: 10px">订单号：{{o.orderId}}</p>
      <div class="flex-vc">
        <el-image class="avatar"
                  :src="o.avatar || defaultAvatar"></el-image>
        <div>{{o.name}}</div>
      </div>
    </li>
    <li>
      <p style="margin-bottom: 10px">创建时间：{{o.cTime}}</p>
      <div>
        咨询时间(北京时间){{o.consumerTime}}
        <el-link type="success">时间调整</el-link>
      </div>
    </li>
    <li>
      <div class="order-amount">订单金额：{{o.price}}</div>
      <div class="flex-he">
        <el-button type="success" plain size="small" @click="handelOrderCancel(o.orderId)">订单取消</el-button> 
        <el-button type="success" plain size="small" @click="handelPayOrder(o.orderId)">订单支付</el-button> 
      </div>
    </li>
  </ul>
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
</el-card>
</template>

<script>
import { cancelOrder } from '@/api/order'

export default {
  name: 'waiting-pay',
  props: ['list', 'noBorder'],
  data () {
    return {
      pagination: {
        total: 1000,
        pageIndex: 1,
        pageSize: 10,
        events: {
          'current-change': this.handlePageChange,
          'size-change': this.handlePageSizeChange,
        },
        props: {},
      },
    }
  },
  computed: {
    defaultAvatar: function () {
      return require('@/assets/default-avatar.png')
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
    async handelOrderCancel(orderId) {
      const l = this.loading()
      const res = await cancelOrder({ orderId }).catch(e=>l.close())
      l.close()
    },
    handelPayOrder() {
      this.$router.push('/consumer/order-confirm')
    },
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
  color: #7C8EA5;
  font-size: 14px;
  margin-bottom: 0;
}
.order-amount {
  margin-bottom: 10px;
  text-align: right
}
.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
</style>
