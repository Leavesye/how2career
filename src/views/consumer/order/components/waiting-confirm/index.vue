<template>
<div>
  <el-card class="order-item" v-for="(o, i) in list" :key="i">
    <ul class="list-item flex-hb">
      <li>
        <p style="margin-bottom: 10px">订单号：{{o.orderId}}</p>
        <div class="flex-vc">
          <small-avatar :imgUrl="o.avatar"></small-avatar>
          <div>{{o.name}}</div>
        </div>
      </li>
      <li>
        <p style="margin-bottom: 30px">创建时间：{{o.cTime}}</p>
      </li>
      <li>
        <div class="order-amount">订单金额：{{o.price}}RMB</div>
        <div class="flex-he">
          <el-link type="success" :underline="false">{{o.status =='2' ? '待咨询师确认': '待咨询者确认'}}</el-link> 
        </div>
      </li>
    </ul>
    <h-title>待确认时间(北京时间)</h-title>
    <ul class="flex confirm-time">
      <li v-for="(item, j) in o.times" :key="j">
        <el-radio v-if="status=='3'" v-model="radio" :label="j">{{item}}</el-radio>
        <span v-else>{{item}}</span>
      </li>
    </ul>
    <div class="flex-he btns" v-if="o.status=='3'">
      <!-- 后台自动赔偿  暂时不用 -->
      <!-- <el-button size="small" type="success" plain>获取补偿金</el-button> -->
      <el-button size="small" type="success" plain>更换咨询师</el-button>
      <el-button size="small" type="success" plain>接受时间调整</el-button>
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
</div>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'

export default {
  props: ['list', 'pagination'],
  data () {
    return {
      radio: 1,
    }
  },
  components: {
    SmallAvatar,
  },
  methods: {
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
