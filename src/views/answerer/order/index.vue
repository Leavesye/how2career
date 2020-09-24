<template>
  <section>
    <!-- 状态面板 -->
    <div class="pannel flex">
      <div class="p-item"
          :class="{ active: isActive == i }"
          v-for="(o, i) in pannels"
          :key="i"
          @click="handleClickPannel(item, i)">
        <p>{{o.name}}</p>
      </div>
    </div>
    <el-card class="list-item-top">
      <p class="title">即将开始的咨询</p>
      <order-item :o="o" :noBorder="true" />
    </el-card>
    <el-card>
      <!-- 搜索条件 -->
      <section class="flex-hbc search">
        <div class="flex-hbc">
          <div class="order-status">订单状态</div>
          <el-select v-model="value" placeholder="" size="small" style="width: 140px">
            <el-option
              v-for="item in []"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="flex-hb time-box">
          <div>时间</div>
          <div class="flex-hbc" style="width: 114px">
            <div class="time-sel" @click="handleTimeClick(o, i)" :class="{active: curTime==i}" v-for="(o, i) in times" :key="i">{{o.name}}</div>
          </div>
        </div>
        <el-date-picker
          style="width: 230px"
          size="small"
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button size="mini">查询</el-button>
      </section>
      <!-- 订单列表 -->
      <section v-for="(o ,i) in list" :key="i">
        <order-item :o="o" />
      </section>
    </el-card>
    <!-- 分页 -->
    <div class="flex-he" style="margin-top: 20px">
      <el-pagination
        :page-sizes="pagination.pageSizes || [10, 20, 30, 40]"
        :total="pagination.total"
        :current-page="pagination.pageIndex"
        :page-size="pagination.pageSize"
        layout="prev, pager, next"
        background
        small
        v-bind="pagination.props" v-on="pagination.events"
        ref="pagination"
        >
      </el-pagination>
    </div>
    <!-- <confirm-detail :isShow="isShow" @close="handleClose" /> -->
    <finish-detail :isShow="isShow" @close="handleClose" />
  </section>
</template>

<script>
import { ConfirmDetail, FinishDetail } from './modal/order-detail'
import OrderItem from '../../components/OrderItem'

export default {
  name: 'answerer',
  components: {
    OrderItem,
    ConfirmDetail,
    FinishDetail
  },
  data () {
    return {
      isShow: false,
      isActive: false,
      curTime: false,
      pannels: [
        { name: '待确认订单', count: 5 },
        { name: '待服务订单', count: 5 },
        { name: '已完成订单', count: 5 },
      ],
      times: [
        {name: '7天'},
        {name: '15天'},
        {name: '30天'},
      ],
      o: {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110, name:"Tom"},
      list: [
        {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110,name:"Tom", cb: this.handleOpenDetail},
        {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110,name:"Tom"},
        {orderno: 'fdfdfdfdf',createTime: '2020-12-11', startTime: '2020-12-11', amount: 110,name:"Tom"},
      ],
      pagination: {
        total: 0,
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
    handleClose() {
      this.isShow = false
    },
    handleOpenDetail() {
      this.isShow = true
    },
    handleClickPannel (item, i) {
      this.isActive = i
    },
    handleTimeClick(v, i) {
      this.curTime = i
    },
    handlePageChange (pageIndex) {
      this.pagination.pageIndex = pageIndex
      this.query()
    },
    handlePageSizeChange (pageSize) {
      this.pagination.pageSize = pageSize
      this.query()
    },
  }
}
</script>

<style lang="scss" scoped>

.pannel {
  margin-bottom: 20px;
}
.p-item {
  margin-right: 20px;
  width: 205px;
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #7C8EA5;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
  margin-left: 20px;
}
.p-item.active {  
  background: linear-gradient(123deg, #15479E 0%, #3271CD 100%);
  border-radius: 8px;
  color: #fff;
}
.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #EDEEEF;
}
.order-status {
  margin-right: 10px;
  color: #15479E;
  font-size: 14px;
}
.time-box {
  width: 160px;
  font-size: 14px;
}
.time-sel {
  color:#7C8FA5;
}
.time-sel.active {
  color: #434D57;
}
.title {
  font-size: 14px;
  color: #15479E;
}
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
  color: #7C8EA5;
  font-size: 14px;
}
.list-item-top {
  width: 880px;
  height: 150px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border-radius: 8px;
  border: 1px solid #15479E;
  margin-bottom: 20px;
}
</style>
