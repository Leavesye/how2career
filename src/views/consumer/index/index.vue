<template>
  <section style="padding: 30px">
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
      <el-card class="order-card">
        <p class="title"
           style="font-size: 14px">即将开始的咨询</p>
        <div v-if="list.length">
          <ul class="list-item flex-hbc"
              v-for="(o, i) in list"
              :key="i">
            <li class="flex-hbc">
              <small-avatar :imgUrl="o.avatar"></small-avatar>
              <div>{{o.name}}</div>
            </li>
            <li>开始时间: {{o.startTime}}</li>
            <li>{{o.rest}}</li>
            <li class="flex-hb">
              <el-button type="success"
                         size="small"
                         v-if="o.status==5"
                         @click="linkTo('/consumer/room/'+o.orderId)">进入房间</el-button>
              <el-button size="small"
                         plain
                         type="success">订单详情</el-button>
            </li>
          </ul>
        </div>
        <p v-else
           class="no-data">暂无数据</p>
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
import SmallAvatar from '@/components/SmallAvatar'
import CardList from '@/components/CardList'
import CareerList from '@/components/CareerList'
import { getOrders, getOrdersCount } from '@/api/order'
import tool from '@/utils/tool'

export default {
  name: 'consumer-index',
  components: {
    CardList,
    CareerList,
    SmallAvatar
  },
  async created () {
    const l = this.loading()
    const res = await Promise.all([
      getOrders({
        "from": "0",
        "to": "2601444690",
        "page": "0",
        "limit": "3",
        "condition": "status==4:status==5"
      }),
      getOrdersCount({ condition: "status==2:status==4:status==7" })
    ]).catch(e => l.close())
    if (res[0].result) {
      this.list = tool.formatConsumerOrder(res[0].msg.list)
    }
    if (res[1].result) {
      // this.list = format.order(res[1].msg.list)
    }
    l.close()

  },
  data () {
    return {
      isActive: false,
      rate: 4,
      pannels: [
        { name: '待付款订单', count: 0, path: '/consumer/order?status=1' },
        { name: '待服务订单', count: 0, path: '/consumer/order?status=4,5' },
        { name: '已完成订单', count: 0, path: '/consumer/order?status=0,7,8' },
        { name: '开始查找咨询师', count: 'search', path: '/consumer/search' }
      ],
      list: [],
      favorites: [
        { id: '5f781c38b6e04a5e2a037f5f', img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
        { img: '', name: '马里奥', rate: 3, role: '高级专家', rateCount: '234', btn: { name: '预约', cb: this.handleAppintment }, desc: '高桥於1994年创立了自己的品牌Undercover，而当时Nigo…' },
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
      this.$router.push(item.path)
    },
    handleAppintment () {
      this.alert('预约')
    },
    linkTo (path) {
      this.$router.push(path)
    },
  }
}
</script>

<style lang="scss" scoped>
$color: #36ae82;
.pannel {
  margin-bottom: 20px;
}
.p-item {
  width: 207px;
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
.p-item:hover,
.p-item.active {
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
  margin-bottom: 20px;
  font-weight: 600;
}
.no-data {
  text-align: center;
  height: 60px;
  font-size: 14px;
  color: #7c8ea5;
}
</style>
