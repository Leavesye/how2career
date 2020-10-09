<template>
  <div>
    <el-card class="top-item">
      <h-title>即将开始的咨询</h-title>
      <ul class="flex-hbc">
        <li>
          <p style="margin-bottom: 10px">订单号：{{firstOrder.orderno}}</p>
          <div class="flex-vc">
            <small-avatar :imgUrl="firstOrder.avatar"></small-avatar>
            <div class="user-name">{{firstOrder.name}}</div>
          </div>
        </li>
        <li>
          <p style="margin-bottom: 10px">创建时间：{{firstOrder.createTime}}</p>
          <div>开始时间：{{firstOrder.createTime}}</div>
        </li>
        <li>
          <div style="margin-top:30px">还有12小时30分开始</div>
        </li>
        <li>{{firstOrder.rest}}</li>
        <li>
          <div style="margin-bottom: 10px; text-align: right">订单金额:{{firstOrder.amount}} RMB</div>
          <div class="flex-he">
            <el-button type="primary"
                       size="small"
                       @click="handleEnterRoom">进入房间</el-button>
            <el-button size="small"
                       @click="handleOpenDetail">订单详情</el-button>
          </div>
        </li>
      </ul>
    </el-card>
    <el-card>
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list"
               :key="i">
        <ul class="order-item flex-hbc">
          <li>
            <p style="margin-bottom: 10px">订单号：{{o.orderId}}</p>
            <div class="flex-vc">
              <small-avatar :imgUrl="o.avatar"></small-avatar>
              <div class="user-name">{{o.name}}</div>
            </div>
          </li>
          <li>
            <p style="margin-bottom: 10px">创建时间：{{o.cTime}}</p>
            <div>开始时间：{{o.startTime}}</div>
          </li>
          <li>
            <div style="margin-top:30px">{{o.rest}}</div>
          </li>
          <li>{{o.rest}}</li>
          <li>
            <div style="margin-bottom: 10px; text-align: right">订单金额:{{o.price}} RMB</div>
            <div class="flex-he">
              <el-button size="mini"
                         @click="handleOpenDetail">订单详情</el-button>
            </div>
          </li>
        </ul>
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
    <!-- 订单详情 -->
    <detail-modal :isShowDetail="isShowDetail"
                  @close="handleCloseDetail"
                  @confirm="handleConfirm"></detail-modal>
  </div>
</template>

<script>
import DetailModal from './modal/detail'
import SmallAvatar from '@/components/SmallAvatar'

export default {
  name: 'waiting-service',
  props: ['list', 'pagination'],
  components: {
    DetailModal,
    SmallAvatar
  },
  data () {
    return {
      isShowDetail: false,
      firstOrder: { orderno: 'fdfdfdfdf', rate: 3, createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom" },
    }
  },
  methods: {
    handleEnterRoom () {
      this.$router.push('/consultant/room')
    },
    handleOpenDetail () {
      this.isShowDetail = true
    },
    handleCloseDetail () {
      this.isShowDetail = false
    },
    handleConfirm () {
      this.handleCloseDetail()
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
  border-bottom: 1px solid #EDEEEF;
  margin-bottom: 20px;
  font-size: 14px;
  color: #7C8FA5;
}
.user-name {
  margin-left: 10px;
}
</style>
