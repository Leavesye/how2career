<template>
<section>
  <ul class="my-favorites">
    <li v-for="(item, i) in list"
        :key="i">
      <avatar :imgUrl="item.avatar"></avatar>
      <h1 class="user-name">{{item.nickName}}</h1>
      <el-rate class="user-rate"
               disabled
               v-model="item.rate"></el-rate>
      <div class="user-role">{{item.position}}</div>
      <p class="user-desc">{{item.selfIntroduction}}</p>
      <div class="flex-hbc">
        <h1 @click="handleShowRateList(item.id)" class="rate-count flex-vc"><i class="iconfont icondianping-01"></i>
          <div style="margin-left: 4px">{{item.evaluationCount}}</div>
        </h1>
        <el-button plain
                   @click="handleClick(item.btn.cb)">{{item.btn.name}}</el-button>
      </div>
    </li>
  </ul>
  <rate-list :isShow="isShow" :rateList="rateList" @close="handleCloseRateList"></rate-list>
</section>
</template>

<script>
import Avatar from '@/components/Avatar'
import RateList from '@/components/RateList'
import { getRateList } from '@/api/consultant'
import moment from 'moment'

export default {
  name: 'card-list',
  props: ['list'],
  components: {
    Avatar,
    RateList
  },
  data () {
    return {
      isShow: false,
      rateList: []
    }
  },
  methods: {
    handleClick (cb) {
      cb && cb()
    },
    handleCloseRateList() {
      this.isShow = false
    },
    async handleShowRateList (id) {
      this.isShow = true
      const l = this.loading()
      const res = await getRateList({ consultantId: id }).catch(e=> l.close())
      if (res.result) {
        this.rateList = res.msg.map(o => {
          const { evaluation: { cTime,content, point, consultantReply } }  = o
          return {
            cTime: moment(cTime*1000).format('YYYY-MM-DD HH:mm:ss'),
            content,
            point,
            consultantReply
          }
        })
      }
      l.close()
    },
  },
  mounted () {
    
  }
};
</script>

<style lang="scss" scoped>
.my-favorites {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.my-favorites:after {
  content: "";
  flex: auto;
}
.my-favorites li {
  padding: 30px 20px;
  width: 205px;
  height: 380px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  margin-right: 20px;
}
.my-favorites li:nth-child(4n) {
  margin-right: 0;
}
.my-favorites > li:hover {
  border: 1px solid #36ae82;
}
.user-name {
  text-align: center;
  color: #7c8ea5;
  font-size: 18px;
  font-weight: 400;
  margin-top: 25px;
}
.user-rate {
  text-align: center;
}
.user-role {
  color: #7c8ea5;
  font-size: 14px;
  font-weight: 400;
  margin: 20px 0;
  text-align: center;
}
.user-desc {
  color: #7c8ea5;
  margin-bottom: 25px;
  height: 38px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.rate-count {
  color: #7c8ea5;
  font-weight: 400;
  cursor: pointer;
}
</style>
