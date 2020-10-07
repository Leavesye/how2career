<template>
  <section style="padding: 30px">
    <!-- 已认证 -->
    <div>
      <!-- 状态面板 -->
      <div class="pannel flex-hb">
        <div class="p-item"
             :class="{ active: isActive === i }"
             v-for="(o, i) in pannels"
             :key="i"
             @click="handleClickPannel(o, i)">
          <p v-if="o.count != 'search'">{{o.name}}</p>
          <div v-if="o.count != 'search'">{{o.count}}</div>
          <h1 v-else>{{o.name}} <i class="iconfont iconsousuo-01"></i></h1>
        </div>
      </div>
      <!-- 表格 -->
      <el-card class="order-card">
        <p class="title" style="font-size: 14px">即将开始的咨询</p>
        <ul class="list-item flex-hbc"
            v-for="(o, i) in list1"
            :key="i">
          <li class="flex-hbc">
            <el-avatar class="avatar"
                       size="small"
                       icon="el-icon-user-solid"></el-avatar>
            <div>{{o.name}}</div>
          </li>
          <li>开始时间: {{o.start}}</li>
          <li>{{o.rest}}</li>
          <li class="flex-hb">
            <el-button type="success"
                       size="mini"
                       @click="linkTo('/consumer/room')">进入房间</el-button>
            <el-button size="mini" plain type="success">订单详情</el-button>
          </li>
        </ul>
      </el-card>
      <p class="title">我的收藏</p>
      <card-list :list="favorites"></card-list>
      <p class="title">经常查看的咨询师</p>
      <card-list :list="favorites"></card-list>
      <p class="title">更多职业选择</p>
      <career-list></career-list>
    </div>
  </section>
</template>

<script>
import CardList from '@/components/CardList'
import CareerList from '@/components/CareerList'
import { getConsultantOrders, getConsultantOrdersCount } from '@/api/order'

export default {
  name: 'consumer-index',
  components: {
    CardList,
    CareerList
  },
  async created () {
    // const ret = await Promise.all([
    //   getConsultantOrders({
    //     "from": "0",
    //     "to": "2601444690",
    //     "page": "0",
    //     "limit": "100",
    //     "condition": "status==1"
    //   }),
    //   getConsultantOrdersCount({ condition: "status==2:status==4:status==7:status==10" })
    // ]).catch(e => l.close())

  },
  data () {
    return {
      isActive: false,
      rate: 4,
      pannels: [
        { name: '待付款订单', count: 5 },
        { name: '待服务订单', count: 5 },
        { name: '已完成订单', count: 5 },
        { name: '开始查找咨询师', count: 'search' }
      ],
      list1: [
        { img: '', name: '马里奥', start: '2020-1-22', rest: '有2小时30分开始' },
        { img: '', name: '马里奥', start: '2020-1-22', rest: '有2小时30分开始' },
        { img: '', name: '马里奥', start: '2020-1-22', rest: '有2小时30分开始' },
      ],
      favorites: [
         { id: '5f781c38b6e04a5e2a037f5f', img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment}, desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
         { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment},desc:'高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
      ]
    }
  },
  computed: {
  },
  methods: {
    handleClickPannel (item, i) {
      if (i == this.pannels.length - 1) {
        this.isActive = ''
      } else {
        this.isActive = i
      }
    },
    handleAppintment() {
      this.alert('预约')
    },
    linkTo (path) {
      this.$router.push(path)
    },
  }
}
</script>

<style lang="scss" scoped>
$color: #36AE82;
.pannel {
  margin-bottom: 20px;
}
.p-item {
  width: 205px;
  height: 114px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #7c8ea5;
  cursor: pointer;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
}
.p-item > div {
  font-size: 26px;
  margin-top: 20px;
}
.p-item > h1 {
  margin: 40px;
}
.p-item:hover, .p-item.active {
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border: 1px solid $color;
  color: $color;
}
.order-card {
  margin-bottom: 20px;
}
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
}
.title {
  font-size: 16px;
  color: $color;
  margin: 20px 0;
  font-weight: 600;
}

</style>
