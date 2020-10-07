<template>
<div>
  <el-card class="order-item" v-for="(o, i) in list" :key="i">
    <ul class="list-item flex-hb" :style="{borderBottom: noBorder? 'none': '1px solid #edeeef'}">
      <li>
        <p style="margin-bottom: 10px">订单号：{{o.orderno}}</p>
        <div class="flex-vc">
          <el-image class="avatar"
                  :src="o.avatar || defaultAvatar"></el-image>
          <div>{{o.name}}</div>
        </div>
      </li>
      <li>
        <p style="margin-bottom: 30px">创建时间：{{o.createTime}}</p>
      </li>
      <li>
        <div class="order-amount">订单金额：{{o.amount}}RMB</div>
        <div class="flex-he">
          <el-link type="success">待咨询师确认</el-link> 
        </div>
      </li>
    </ul>
    <h-title>待确认时间(北京时间)</h-title>
    <ul class="flex confirm-time">
      <li v-for="(item, j) in 3" :key="j">
        <el-radio v-model="radio" :label="j">2020-09-10 20:00 ~ 21:00</el-radio></li>
    </ul>
    <div class="flex-he btns">
      <el-button size="small" type="success" plain>获取补偿金</el-button>
      <el-button size="small" type="success" plain>更换咨询师</el-button>
      <el-button size="small" type="success" plain>接受时间调整</el-button>
    </div>
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
</div>
</template>

<script>
export default {
  name: 'waiting-confirm',
  props: ['list', 'noBorder'],
  data () {
    return {
      radio: 1,
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
    handelOrderCancel() {
      
    },
    handelOrderDetail() {
      
    },
  }
};
</script>
<style>
.el-radio__input.is-checked .el-radio__inner {
  border-color: #36AE82;
  background: #36AE82;
}
</style>
<style lang="scss" scoped>
.order-item {
  margin-bottom: 20px;
}
.list-item {
  border-bottom: 1px solid #edeeef;
  color: #7C8EA5;
  font-size: 14px;
  padding-bottom: 20px;
  margin-bottom: 20px;
}
.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.order-amount {
  margin-bottom: 10px;
  text-align: right
}
.confirm-time {
  margin-top: 15px;
  margin-bottom: 20px;
  color: #7C8EA5;
  font-size: 14px;
}
.confirm-time > li {
  margin-right: 60px;
}
.btns {
  padding-top: 20px;
  border-top: 1px solid #EDEEEF;
}
</style>
