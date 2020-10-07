<template>
  <div>
    <el-card>
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list"
               :key="i">
        <ul class="order-item flex-hbc">
          <li>
            <p style="margin-bottom: 10px">订单号：{{o.orderno}}</p>
            <div class="flex-vc">
              <el-image class="avatar"
                         :src="defaultAvatar"></el-image>
              <div class="user-name">{{o.name}}</div>
            </div>
          </li>
          <li>
            <p style="margin-bottom: 10px">创建时间：{{o.createTime}}</p>
            <div>开始时间：{{o.createTime}}</div>
          </li>
          <li>
            <div style="margin-top:30px">还有12小时30分开始</div>
          </li>
          <li>{{o.rest}}</li>
          <li>
            <div style="margin-bottom: 10px; text-align: right">订单金额:{{o.amount}} RMB</div>
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
    <detail :isShow="isShow" @close="handleCloseDetail" @confrim="handleConfirmTime"></detail>
  </div>
</template>

<script>
import Detail from './modal/detail'

export default {
  name: 'waiting-confirm',
  components: {
    Detail
  },
  data () {
    return {
      isShow: false,
      firstOrder: { orderno: 'fdfdfdfdf', rate: 3, createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom" },
      list: [
        { orderno: 'fdfdfdfdf', rate: 1, createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom", cb: this.handleOpenDetail },
        { orderno: 'fdfdfdfdf', rate: 2, createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom" },
        { orderno: 'fdfdfdfdf', rate: 3, createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name: "Tom" },
      ],
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
    defaultAvatar: function() {
      return require('@/assets/default-avatar.png')
    }
  },
  methods: {
    handlePageChange (pageIndex) {

    },
    handlePageSizeChange (pageSize) {

    },
    handleEnterRoom () {
      this.$router.push('/consultant/room')
    },
    handleOpenDetail () {
      this.isShow = true
    },
    handleCloseDetail() {
      this.isShow = false
    },
    handleConfirmTime() {
      this.isShow = false
    }
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #EDEEEF;
  margin-bottom: 20px;
  font-size: 14px;
  color: #7C8FA5;
}
.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.user-name {
  margin-left: 10px;
}
</style>
