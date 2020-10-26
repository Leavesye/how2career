<template>
  <div>
    <el-card>
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list"
               :key="i" class="order-item">
        <div class="flex-hb row">
          <span>订单号：{{o.orderId}}</span>
          <span>创建时间:{{o.cTime}}</span>
          <span>订单金额:{{o.price}} RMB</span>
        </div>
        <div class="flex-hb">
          <div class="flex-vc">
            <small-avatar :imgUrl="o.avatar"></small-avatar>
            <div class="user-name">{{o.name}}</div>
          </div>
          <div class="rest-time">{{o.confirmCountDown}}</div>
          <el-button plain
                     @click="handleOpenDetail(o)">订单详情</el-button>
        </div>
      </section>
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
    <detail :isShow="isShow"
            :order="order"
            @close="handleCloseDetail"></detail>
  </div>
</template>

<script>
import Detail from './modal/detail'
import SmallAvatar from '@/components/SmallAvatar'

export default {
  name: 'waiting-confirm',
  props: ['list', 'pagination', 'query'],
  components: {
    Detail,
    SmallAvatar
  },
  data () {
    return {
      isShow: false,
      order: {}
    }
  },
  methods: {
    handleEnterRoom () {
      this.$router.push('/consultant/room')
    },
    async handleOpenDetail (order) {
      this.isShow = true
      this.order = order
    },
    handleCloseDetail (isConfirm) {
      this.isShow = false
      if (isConfirm) {
        this.query()
      }
    },
    handleConfirmTime (times) {
      this.isShow = false
    }
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  font-size: 14px;
  color: #7C8EA5;
  padding-bottom: 17px;
  border-bottom: 1px solid #EDEEEF;
  margin-bottom: 14px;
}
.order-item:last-child {
  margin-bottom: 0
}
.row {
  margin-bottom: 14px;
}
.user-name {
  margin-left: 10px;
}
.rest-time {
  padding-left: 26px;
  margin-top: 7px;
}
</style>
