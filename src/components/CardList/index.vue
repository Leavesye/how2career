<template>
<section>
  <ul class="my-favorites">
    <template v-for="(item, i) in tList">
      <li :key="i" class="favorite-item" v-if="!item.isBlank">
        <avatar :imgUrl="item.avatar"></avatar>
        <h1 class="user-name">{{item.nickName}}</h1>
        <el-rate class="user-rate"
                disabled
                v-model="item.rate"></el-rate>
        <div class="user-role">{{item.position}}</div>
        <p class="user-desc">{{item.selfIntroduction}}</p>
        <div class="flex-hbc bottom-btns">
          <h1 @click="handleShowRateList(item)" class="rate-count flex-vc"><i class="iconfont icondianping-01"></i>
            <div style="margin-left: 4px">{{item.evaluationCount || 0}}</div>
          </h1>
          <div>
            <el-button plain v-if="item.btnBook"
                      @click="handleClick(item.btnBook.cb)">{{item.btnBook.name}}</el-button>
            <el-button plain style="margin-left:10px"
                      @click="handleClick(item.btn.cb)">{{item.btn.name}}</el-button>
          </div>
        </div>
      </li>
      <li :key="i" v-else class="blank-item"></li>
    </template>
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
      rateList: [],
    }
  },
  computed: {
    tList: function() {
      let target = this.list
      const rest = this.list.length % 4
      if (rest > 0) {
        let blankCount = 4-rest
        Array.from({ length: blankCount }).forEach(o => {
          target.push({ isBlank: true })
        })
      }
      return target
    }
  },
  methods: {
    handleClick (cb) {
      cb && cb()
    },
    handleCloseRateList() {
      this.isShow = false
    },
    async handleShowRateList (item) {
      if (!item.evaluationCount) {
        return false
      }
      this.isShow = true
      const l = this.loading()
      const res = await getRateList({ consultantId: item.id }).catch(e=> l.close())
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
.favorite-item {
  flex-basis: 23%;
  padding: 30px 18px;
  width: 205px;
  height: 380px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  border:1px solid transparent;
  transition: box-shadow .3s,border-color .5s;
}
.favorite-item:hover {
  border: 1px solid #36ae82;
}
.blank-item {
  flex-basis: 23%;
  height: 380px;
}
.user-name {
  text-align: center;
  color: #7c8ea5;
  font-size: 18px;
  font-weight: 400;
  margin-top: 30px;
  margin-bottom: 12px;
}
.user-rate {
  text-align: center;
}
.user-role {
  color: #7c8ea5;
  font-size: 14px;
  font-weight: 400;
  margin: 12px 0 20px 0;
  text-align: center;
}
.user-desc {
  color: #7c8ea5;
  margin-bottom: 25px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 14px;
  line-height: 20px;
}
.rate-count {
  color: #7c8ea5;
  font-weight: 400;
  cursor: pointer;
}
</style>
