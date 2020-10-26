<template>
  <section style="padding: 30px">
    <div>
      <!-- 状态面板 -->
      <div class="pannel flex-hb">
        <div class="p-item"
             :class="[o.count == 'search'? 'flex-cc': '',{ active: isActive === i }]"
             :style="{paddingLeft:o.count == 'search'? '0': '20px' }"
             v-for="(o, i) in pannels"
             :key="i"
             @click="handleClickPannel(o, i)">
          <p v-if="o.count != 'search'">{{o.name}}</p>
          <div class="order-count" v-if="o.count != 'search'">{{o.count|num}}</div>
          <h1 v-else style="font-weight: 400"><i class="iconfont iconsousuo-01"></i>{{o.name}}</h1>
        </div>
      </div>
      <el-card class="order-card">
        <p class="start-title"
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
                         v-if="o.status==5"
                         @click="linkTo('/consumer/room/'+o.orderId)">进入房间</el-button>
              <el-button plain @click="handleOpenDetail(o)">订单详情</el-button>
            </li>
          </ul>
        </div>
        <p v-else class="no-data">暂无数据</p>
      </el-card>
      <p class="title">我的收藏</p>
      <card-list v-if="favorites.length" :list="favorites"></card-list>
      <el-card v-else>
        <p class="no-data">暂无数据</p>
      </el-card>
      <p class="title" style="margin-top: 0">经常查看的咨询师</p>
      <card-list v-if="top4.length" :list="top4"></card-list>
      <el-card v-else>
        <p class="no-data">暂无数据</p>
      </el-card>
      <p class="title" style="margin-top: 0">更多职业选择</p>
      <career-list></career-list>
    </div>
    <detail-modal :isShow="isShow" :order="order" @close="handleClose"></detail-modal>
  </section>
</template>

<script>
import SmallAvatar from '@/components/SmallAvatar'
import CardList from '@/components/CardList'
import CareerList from '@/components/CareerList'
import DetailModal from './modal/detail'
import { getOrders, getOrdersCount } from '@/api/order'
import { getFavorites, getDicts, getTop4Consultant } from '@/api/user'
import tool from '@/utils/tool'

export default {
  name: 'consumer-index',
  components: {
    CardList,
    CareerList,
    SmallAvatar,
    DetailModal
  },
  data () {
    return {
      isShow: false,
      isActive: false,
      pannels: [
        { name: '待付款订单', count: 0, path: '/consumer/order?status=1' },
        { name: '待服务订单', count: 0, path: '/consumer/order?status=4,5' },
        { name: '已完成订单', count: 0, path: '/consumer/order?status=0,7,8' },
        { name: '开始查找咨询师', count: 'search', path: '/consumer/search' }
      ],
      list: [],
      favorites: [],
      top4: [],
      order: {}
    }
  },
  async created () {
    const l = this.loading()
    const res = await Promise.all([
      getOrders({
        from: "0",
        to: "2601444690",
        page: "0",
        limit: "3",
        condition: "status==4:status==5"
      }),
      getOrdersCount({ condition: "status==1:status==4:status==5:status==0:status==7:status==8" }),
      getFavorites(),
      getTop4Consultant(),
      getDicts()
    ]).catch(e => l.close())
    if (res[4].result) {
      this.dicts = res[4].msg
    }
    if (res[0].result) {
      this.list = tool.formatConsumerOrder(res[0].msg.list)
      // 缓存status==5服务中订单号
      const servicing = this.list[0]
      if (servicing && servicing.status == '5') {
        this.$store.dispatch('room/setRoom', servicing.orderId)
      }
    }
    if (res[1].result) {
      const info = res[1].msg
      this.pannels[0].count = info['1']
      this.pannels[1].count = info['4'] + info['5']
      this.pannels[2].count = info['0'] + info['7'] + info['8']
    }
    // 我的收藏
    if (res[2].result && res[2].msg.list) {
      this.favorites = tool.formatFavorites(res[2].msg.list, '预约', this.handleAppintment, this.dicts.position)
    }
    // 经常查看的咨询师top4
    if (res[3].result && res[3].msg.list) {
      this.top4 = tool.formatFavorites(res[3].msg.list, '预约', this.handleAppintment, this.dicts.position)
    }
    l.close()
  },
  methods: {
    handleOpenDetail(order){
      this.order = order
      this.isShow = true
    },
    handleClose() {
      this.isShow = false
    },
    handleClickPannel (item, i) {
      if (i == this.pannels.length - 1) {
        this.isActive = ''
      } else {
        this.isActive = i
      }
      this.$router.push(item.path)
    },
    handleAppintment (id) {
      this.$router.push(`/consumer/consultant-detail/${id}`)
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
  flex: 1;
  margin-right: 20px;
  height: 114px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #7c8ea5;
  cursor: pointer;
}
.p-item:last-child {
  margin-right: 0;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
  font-weight: 400;
}
.p-item > div {
  font-size: 26px;
  margin-top: 26px;
}
.p-item:hover,
.p-item.active {
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border: 1px solid $color;
  color: $color;
}
.order-count {
  font-weight: 600;
  font-family: 'notosans-bold,notosans-regular';
}
.order-card {
  margin-bottom: 20px;
}
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
  font-size: 14px;
  color:#7c8ea5;
}
.start-title {
  font-size: 16px;
  color: $color;
  font-weight: 600;
}
.title {
  font-size: 16px;
  color: $color;
  margin: 20px 0;
  font-weight: 600;
}
.no-data {
  text-align: center;
  font-size: 14px;
  color: #7c8ea5;
}
</style>
