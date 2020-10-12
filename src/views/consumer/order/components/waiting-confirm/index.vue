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
      <li>
        <template v-if="o.status=='3'">
          <el-radio v-for="(item, j) in o.consultantTime" :key="j" v-model="radio" :label="j">{{item.text}}</el-radio>
        </template>
        <span style="margin-right: 10px" v-else v-for="(item, j) in o.consumerTime" :key="j">{{item.text}}</span>
      </li>
    </ul>
    <div class="flex-he btns" v-if="o.status=='3'">
      <!-- 后台自动赔偿  暂时不用 -->
      <!-- <el-button size="small" type="success" plain>获取补偿金</el-button> -->
      <el-button :loading="isLoading" plain @click="handleOpenChange(o)">更换咨询师</el-button>
      <el-button :loading="isLoading"  plain @click="handleConfirmTime(o)">接受时间调整</el-button>
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
  <change-consultant :isShow="isShow" @close="handleClose" :order="order"></change-consultant>
</div>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'
import ChangeConsultant from './modal/change-consultant'
import { timeConfirm } from '@/api/order'

export default {
  props: ['list', 'pagination', 'query'],
  data () {
    return {
      radio: -1,
      isLoading: false,
      isShow: false,
      order: {}
    }
  },
  components: {
    SmallAvatar,
    ChangeConsultant
  },
  methods: {
    handleClose(isConfirm) {
      this.isShow = false
      if (isConfirm) {
        this.query()
      }
    },
    handleOpenChange(order) {
      this.isShow = true
      this.order = order
    },
    // 确认时间
    async handleConfirmTime(order) {
      if (this.radio < 0) {
        this.alert('请选择一个咨询时间', 'warning')
        return false
      }
      if (this.isLoading) return false
      this.isLoading = true
      const res = await timeConfirm({
        orderId: order.orderId,
        startTime: order.consultantTime[this.radio].value
      }).catch(e=> this.isLoading = false)
      if (res.result) {
        this.alert('更新服务时间成功')
        this.query()
      }
      this.isLoading = false
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
