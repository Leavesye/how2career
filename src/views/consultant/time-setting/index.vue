<template>
  <div style="padding-bottom: 20px">
    <!-- 标题 -->
    <h1 class="title flex-vc">
      <p>服务时间设置</p>
      <div>通过添加服务时间,你可以设置多个自己可服务的时间段</div>
    </h1>
    <el-card style="margin: 0 30px">
      <!-- 数据面板 -->
      <ul class="slot-pannels flex-hbc">
        <li class>
          <p>当前Slot数</p>
          <div>04</div>
        </li>
        <li>
          <p>可用Slot数</p>
          <div>04</div>
        </li>
        <li>
          <p>停用Slot数</p>
          <div>04</div>
        </li>
      </ul>
      <p class="slot-desc">Slot数代表在一个自然周内,你可同时接的预约,你可以通过购买更多的slot来增加每周的同时预约数</p>
      <!-- 按钮组 -->
      <ul class="slot-btns flex-hc">
        <li v-for="(item, i) in btns"
            :key="i"
            @click="handleClickBtn(item, i)"
            :class="{active: current===i}">{{item.name}}</li>
      </ul>
      <!-- 日程表 -->
      <scheduler v-if="isLoaded" :events="events" @reload="handleReloadSchduler"></scheduler>
    </el-card>
    <change-slot :isShow="isShow"></change-slot>
  </div>
</template>

<script>
import ChangeSlot from './modal/change-slot'
import { getPublicInfo } from '@/api/user'
import Scheduler from '@/components/Scheduler'
import { mapGetters } from 'vuex'

export default {
  name: 'time-setting',
  components: {
    ChangeSlot,
    Scheduler
  },
  data () {
    return {
      isShow: false,
      current: 0,
      btns: [
        { name: '调整Slot数量' },
        { name: '补缴Slot费用' },
      ],
      events: [],
      isLoaded: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    handleClickBtn(i) {
      this.current = i
    },
    handleReloadSchduler() {
      this.init()
    },
    async init() {
      this.isLoaded = false
      const l = this.loading()
      const res = await getPublicInfo({ userId: this.user.userId }).catch(e=>{
        l.close()
        this.isLoaded = true
      })
      if (res.result) {
        const { publicInfo: { availableTime }} = res.msg
        this.events = availableTime
      }
      this.isLoaded = true
      l.close()
    }
  },
  async created () {
    this.init()
  },
}
</script>

<style lang="scss" scoped>
.title {
  padding: 20px 30px;
  border-bottom: 1px solid #edeeef;
  margin-bottom: 30px;
}
.title > p {
  font-size: 16px;
  color: #15479e;
  margin-right: 20px;
}
.title > div {
  font-size: 14px;
  color: #7c8ea5;
}
.slot-pannels {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.slot-pannels li p {
  font-size: 14px;
  color: #15479e;
  margin-bottom: 10px;
}
.slot-pannels li div {
  font-size: 26px;
  color: #7c8fa5;
}
.slot-desc {
  width: 620px;
  font-size: 14px;
  color: #7c8fa5;
  background: #f6f6f6;
  border-radius: 3px;
  margin: 10px auto 30px;
  text-align: center;
}
.slot-btns {
  margin-bottom: 30px;
}
.slot-btns li {
  width: 120px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  border-radius: 3px;
  font-size: 14px;
  color: #7c8fa5;
  border: 1px solid #e0e0e0;
  background: #ffffff;
  margin-left: 20px;
}
.slot-btns li.active {
  background: #15479e;
  color: #fff;
}
</style>
