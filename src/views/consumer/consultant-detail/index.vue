<template>
  <div>
    <h1 class="page-title flex-hbc">
      <span>咨询师详情</span>
      <el-button plain
                 size="mini"
                 icon="el-icon-arrow-left"
                 @click="goBack">返回</el-button>
    </h1>
    <section class="card-box">
      <div class="flex-hb">
        <el-card class="left">
          <avatar :imgUrl="info.avatarImage"></avatar>
          <p class="name">{{info.nickName}}</p>
          <el-rate style="text-align: center" disabled
                     v-model="info.rate"></el-rate>
          <div class="flex-hb icons">
            <div @click="showRateDetail" class="rate-count flex-vc"><i class="iconfont icondianping-01"></i>
              <div style="margin-left: 4px">{{info.rateCount}}</div>
            </div>
            <div class="favorite flex-vc" @click="handleFavorite">
              <i class="iconfont" :class="[isFavorite? 'iconyiguanzhu-01 active': 'icontianjiashoucang']"></i>
              <div style="margin-left: 4px">{{isFavorite?'已收藏': '收藏'}}</div>
            </div>
          </div>
          <p class="motto">{{info.selfIntroduction}}</p>
          <div class="flex-hb">
            <p class="cost-item">咨询费用</p>
            <div class="flex-hc">
              <div class="num">{{info.price}}</div>
              <div class="unit">RMB</div>
            </div>
          </div>
        </el-card>
        <el-card class="right">
          <ul>
            <li class="flex-hbc info-item">
              <div>
                <h1>最高学历</h1>
                <p>{{ info.highEdu }}</p>
              </div>
              <el-button size="mini"
                         plain>更多</el-button>
            </li>
            <li class="info-item flex-hbc">
              <div>
                <h1>工作信息</h1>
                <p style="margin-bottom: 10px">所属行业: {{info.industry}}</p>
                <p>公司名称: {{info.company}}</p>
              </div>
              <div>职位: {{info.position}}</div>
              <div>工作年限: {{info.workingYears}}年</div>
              <el-button size="mini"
                         plain>更多</el-button>
            </li>
            <li class="info-item">
              <h1>主要工作内容</h1>
              <p>{{info.duty}}</p>
            </li>
            <li class="info-item">
              <h1>工作个人技能</h1>
              <p>{{info.skills}}</p>
            </li>
          </ul>
        </el-card>
      </div>
      <el-card class="calendar-card">
        <h1>可预约时间表(北京时间)</h1>
        <calendar @set-time="handleSetTime" :order="order" @init-data="handleInitData">
          <el-button class="appintment-btn"
                   :type="user.role=='consumer'? 'success': 'primary'"
                   @click="handleCreateOrder">预约单生成</el-button>
        </calendar>
      </el-card>
    </section>
    <rate-list :isShow="isShow"
                :rateList="rateList"
               @close="handleClose"></rate-list>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Calendar from '@/components/Calendar'
import RateList from '@/components/RateList'
import { getPublicInfo } from '@/api/user'
import { createOrder } from '@/api/order'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getRateList } from '@/api/consultant'
import { favorite, delFavorite, getFavorites } from '@/api/user'

export default {
  name: 'consultant-detail',
  components: {
    Avatar,
    Calendar,
    RateList,
  },
  data () {
    this.id = this.$route.params.id
    return {
      info: {},
      times: [],
      isShow: false,
      rateList: [],
      order: { consultantId: this.id },
      isFavorite: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async created() {
    const res = await getFavorites()
    if (res.result) {
      this.isFavorite = res.msg.list && !!res.msg.list.filter(o => o._id == this.id)
    }
  },
  methods: {
    // 避免重复调用接口 由子组件初始化页面数据
    handleInitData(res){
      if (res.result && res.msg.publicInfo) {
        this.publicInfo = res.msg.publicInfo
        const o = res.msg.publicInfo
        let { school, discipline, degree, graduationTime } = o.resume.education[0]
        const { industry, company, position, duty } = o.resume.workExperience[0]
        // 评分
        let rate = o.evaluationPoint > 0 ? o.evaluationPoint / o.evaluationCount : 0
        // 工作年限
        let works = o.resume.workExperience
        let lastTime = works[0].resignationTime
        lastTime = lastTime ? moment(lastTime).valueOf() : moment().valueOf()
        let workingYears = Math.ceil((lastTime - moment(works[works.length-1].entryTime).valueOf()) / (365*24*60*60*1000))
        this.info = {
          price: res.msg.price,
          nickName: o.nickName,
          avatarImage: o.avatarImage,
          selfIntroduction: o.selfIntroduction,
          rateCount: o.evaluationCount,
          totalRate: o.evaluationPoint,
          rate,
          highEdu: `${school} ${discipline} ${degree} ${moment(graduationTime).format('YYYY年毕业')}`,
          industry,
          company,
          position,
          duty,
          workingYears,
          skills: o.resume.skills.toString()
        }
      }
    },
    // 收藏/取消收藏
    async handleFavorite() {
      const l = this.loading()
      const fn = this.isFavorite ? delFavorite: favorite
      const res = await fn({ consultantId: this.id }).catch(e=> e.close())
      if (res.result) {
        this.alert(this.isFavorite ?'取消收藏成功':'收藏成功')
        this.isFavorite = !this.isFavorite
      }
      l.close()
    },
    handleSetTime(times) {
      this.times = times
    },
    async handleCreateOrder () {
      if (!this.times.length) {
        this.alert('请选择时间', 'warning')
        return false
      }
      // 参数处理
      const {
        nickName, avatarImage, selfIntroduction, industry, company, 
        position, duty, workingYears, skills, totalRate, rateCount
      } = this.info
      let { school, discipline, degree, graduationTime } = this.publicInfo.resume.education[0]
      const p = {
        consumerNickName: this.user.nickName,
        consumerAvatar: this.user.avatar,
        consultant: {
          _id: this.$route.params.id,
          name: nickName,
          avatar: avatarImage,
          readme: selfIntroduction,
          education: { school, discipline, degree, graduationTime },
          work: { industry, company, position, workingYears, duty, skills },
          evaluationCount: rateCount,
          evaluationPoint: totalRate,
        },
        consumerTime: this.times.map(o => Math.ceil(o.value/1000))
      }
      console.log(p, '参数')
      const l = this.loading()
      const res = await createOrder(p).catch(e => l.close())
      if (res.result) {
        this.alert('订单已生成')
        this.$router.push(`/consumer/order-confirm/${res.msg}`)
      }
      l.close()
    },
    async showRateDetail () {
      this.isShow = true
      const l = this.loading()
      const res = await getRateList({ consultantId: this.id }).catch(e=> l.close())
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
    handleClose () {
      this.isShow = false
    },
    goBack () {
      this.$router.go(-1)
    }
  },
}
</script>
<style>
.e-appointment {
  background: #36AE82!important;
}
</style>
<style lang="scss" scoped>
.page-title {
  padding: 18px 30px;
  font-weight: 600;
  font-size: 16px;
  color: #36ae82;
  border-bottom: 1px solid #edeeef;
}
.card-box {
  padding: 30px;
}
.left {
  width: 280px;
  color: #7c8ea5;
}
.right {
  width: 580px;
}
.icons {
  width: 140px;
  margin: 0 auto;
  margin-top: 18px;
}
.name {
  font-size: 18px;
  text-align: center;
  margin: 18px 0;
}
.favorite {
  font-size: 14px;
  cursor: pointer;
}
.favorite i.active{
  color: #36AE82;
  font-weight: 600;
}
.rate-box {
  cursor: pointer;
}
.motto {
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 40px;
  text-align: justify;
  height: 150px;
  overflow: hidden;
}
.user-rate {
  text-align: center;
}
.cost-item {
  font-size: 14px;
  color: #36ae82;
  text-align: center;
  margin-top: 10px;
  font-weight: 600;
}
.num {
  font-size: 26px;
  margin-right: 10px;
  color: #7c8fa5;
}
.confirm-num {
  font-size: 26px;
  margin-right: 10px;
  color: #7c8fa5;
  padding-top: 8px;
}
.unit {
  color: #7c8fa5;
  font-size: 18px;
  margin-top: 7px;
}
.info-item {
  padding: 20px 0;
  font-size: 14px;
  color: #7c8ea5;
  border-bottom: 1px solid #edeeef;
  align-items: flex-end;
}
.info-item h1 {
  color: #36ae82;
  margin-bottom: 10px;
  font-weight: 600;
}
.calendar-card {
  margin-top: 20px;
}
.calendar-card h1 {
  color: #36ae82;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 14px;
}
.conform-info {
  padding-bottom: 30px;
  border-bottom: 1px solid #edeeef;
}
.content-l {
  width: 200px;
}
.content-r {
  flex: 1;
  font-size: 14px;
  color: #7c8ea5;
}
.base-info span {
  margin-right: 30px;
}

.degree {
  margin-top: 30px;
  text-align: right;
  padding-right: 50px;
}
.cost-box {
  padding-bottom: 18px;
  border-bottom: 1px solid #edeeef;
}
.terms {
  margin: 30px 0 50px 0;
}
.check-box {
  margin-right: 30px;
}
.appintment-btn {
  margin-top: 40px;
}
</style>
