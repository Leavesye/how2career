<template>
<el-card>
  <ul v-for="(o, i) in list" :key="i" class="list-item flex-hbc" :style="{borderBottom: noBorder? 'none': '1px solid #edeeef'}">
    <li>
      <p style="margin-bottom: 10px">订单号：{{o.orderno}}</p>
      <div class="flex-vc">
        <el-avatar class="avatar"
                  size="small"
                  icon="el-icon-user-solid"></el-avatar>
        <div>{{o.name}}</div>
      </div>
    </li>
    <li>
      <p style="margin-bottom: 10px">创建时间：{{o.createTime}}</p>
      <div>
        咨询时间(北京时间){{o.createTime}}
        <el-link type="success">时间调整</el-link>
      </div>
    </li>
    <li>
      <div class="order-amount">订单金额：{{o.amount}}</div>
      <div class="flex-he">
        <el-button type="success" plain size="small" @click="handelOrderCancel">订单取消</el-button> 
        <el-button type="success" plain size="small" @click="handelOrderDetail">订单支付</el-button> 
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
  methods: {
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
    handelOrderCancel() {
      
    },
    handelOrderDetail() {
      
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
.avatar {
  margin-right: 10px;
}
.order-amount {
  margin-bottom: 10px;
  text-align: right
}
</style>
