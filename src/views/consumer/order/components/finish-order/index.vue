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
          <p style="margin-bottom: 10px">创建时间:{{o.cTime}}</p>
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
      <div class="flex-he btns" v-if="o.status=='7'">
        <el-button size="small" plain type="success">获取补偿金</el-button>
        <el-button size="small" plain type="success">咨询问题</el-button>
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
  name: 'finish-order',
  props: ['list', 'pagination'],
  data () {
    return {
    }
  },
  components: {
    SmallAvatar
  },
  methods: {
    handelOrderCancel () {

    },
    handelOrderDetail () {

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
  padding-top: 20px;
  border-top: 1px solid #EDEEEF;
}
.order-cancel {
  text-align:right;
}
</style>
