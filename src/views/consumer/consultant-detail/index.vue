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
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col :span="8">
          <el-card class="left">
            <avatar :imgUrl="info.avatarImage"></avatar>
            <p class="name">{{info.nickName}}</p>
            <el-rate style="text-align: center" disabled
                      v-model="info.rate"></el-rate>
            <div class="flex-hb icons">
              <div @click="showRateDetail" class="rate-count flex-vc"><i class="iconfont icondianping-01"></i>
                <div style="margin-left: 4px">{{info.rateCount || 0}}</div>
              </div>
              <div class="favorite flex-vc" @click="handleFavorite">
                <i class="iconfont" :class="[isFavorite? 'iconyiguanzhu-01 active': 'iconshoucang-01']"></i>
                <div style="margin-left: 4px">{{isFavorite?'已收藏': '收藏'}}</div>
              </div>
            </div>
            <p class="motto">{{info.selfIntroduction}}</p>
            <p class="cost-item">咨询费用</p>
            <div class="flex-hc cost-num">
              <div class="num">{{info.price}}</div>
              <div class="unit">RMB</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="16">
          <el-card class="right">
            <ul>
              <li class="flex-hbc info-item">
                <div>
                  <h1>最高学历</h1>
                  <p>{{ highEdu.desc }}</p>
                </div>
                <el-button v-if="edus.length > 1" @click="toggleEdu"
                          plain>更多</el-button>
              </li>
              <li class="info-item flex-hbc">
                <div>
                  <h1>工作信息</h1>
                  <p style="margin-bottom: 10px">所属行业: {{lastWork.industryText}}</p>
                  <p>公司名称: {{lastWork.companyText}}</p>
                </div>
                <div>职位: {{lastWork.positionText}}</div>
                <div>工作年限: {{lastWork.workingYears}}年</div>
                <el-button v-if="works.length > 1" @click="toggleWork"
                          plain>更多</el-button>
              </li>
              <li class="info-item">
                <h1>主要工作内容</h1>
                <p class="work-duty">{{lastWork.duty}}</p>
              </li>
              <li class="info-item">
                <h1>工作个人技能</h1>
                <p>{{skills}}</p>
              </li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
      <el-card class="calendar-card">
        <h1>可预约时间表(北京时间)</h1>
        <calendar @set-time="handleSetTime" :order="order" @init-data="handleInitData">
          <el-button class="appintment-btn"
                   :type="user.role=='consumer'? 'success': 'primary'"
                   @click="handleCreateOrder">预约单生成</el-button>
        </calendar>
      </el-card>
    </section>
    <!-- 评价列表 -->
    <rate-list :isShow="isShow"
              :rateList="rateList"
               @close="handleClose"></rate-list>
    <!-- 更多学历 -->
    <more-edu :isShow="isShowEdu"
                 @close="toggleEdu" :edus="edus"></more-edu>
    <!-- 更多工作 -->
    <more-work :isShow="isShowWork"
                 @close="toggleWork" :works="works"></more-work>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Calendar from '@/components/Calendar'
import RateList from '@/components/RateList'
import MoreEdu from '../room/modal/more-edu'
import MoreWork from '../room/modal/more-work'
import { createOrder } from '@/api/order'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getRateList } from '@/api/consultant'
import { changeConsultant } from '@/api/order'
import { getPublicInfo, favorite, delFavorite, getFavorites, getDicts, trackViewConsultant } from '@/api/user'

export default {
  name: 'consultant-detail',
  components: {
    Avatar,
    Calendar,
    RateList,
    MoreEdu,
    MoreWork
  },
  data () {
    this.id = this.$route.params.id
    return {
      isShowEdu: false,
      isShowWork: false,
      info: {},
      edus: [],
      highEdu: {},
      works: [],
      lastWork: {},
      times: [],
      isShow: false,
      rateList: [],
      skills: '',
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
    const res = await Promise.all([
      getFavorites(),
      // 收集top4咨询师
      trackViewConsultant({ consultantId: this.id } )
    ])
    if (res[0].result) {
      const data = res[0].msg
      this.isFavorite = data.list && !!data.list.filter(o => o._id == this.id)
      console.log(this.isFavorite, 'this.isFavorite')
    }
  },
  methods: {
    toggleEdu() {
      this.isShowEdu = !this.isShowEdu
    },
    toggleWork() {
      this.isShowWork = !this.isShowWork
    },
    // 避免重复调用接口 由子组件初始化页面数据
    async handleInitData(res){
      const ret = await getDicts()
      if (res.result && res.msg.publicInfo) {
        const { countries, majors, degrees, industry:industrys, company: companys, position: positions  } = ret.msg
        const { publicInfo: { resume }} = res.msg
        if (resume) {
          const { education = [], workExperience = [], skills = [] } = resume
          this.skills = skills.toString()
          // 学历列表
          this.edus = education.map(o => {
            let { country, school, discipline, degree, graduationTime } = o
            const schools = countries.find(v => v.value == country).schools
            const schoolText = schools.find(v => v.value == school).school
            const disciplineText = majors.find(v => v.value == discipline).text
            const degreeText = degrees.find(v => v.value == degree).text
            return {
              country, school, discipline, degree, graduationTime,schoolText,disciplineText,degreeText,
              desc: `${schoolText} ${disciplineText} ${degreeText} ${moment(graduationTime).format('YYYY年毕业')}`
            }
          })
          // 最高学历
          this.highEdu = this.edus[0]
          // 工作列表
          this.works = workExperience.map(o => {
            const { industry, company, position, duty, entryTime, resignationTime } = o
            const industryText = industrys.find(v => v.value == industry).text
            const lastTime = resignationTime ? moment(resignationTime).valueOf() : moment().valueOf()
            let workingYears = Math.ceil((lastTime - moment(entryTime).valueOf()) / (365*24*60*60*1000))
            return {
              industry,
              industryText,
              company,
              companyText: companys.find(v => v.value == company).text,
              position,
              positionText: positions.find(v => v.value == position).text,
              duty,
              workingYears
            }
          })
          // 最近一份工作
          this.lastWork = this.works[0]
        }
        const { publicInfo: { evaluationPoint: point, evaluationCount: count,
        nickName, avatarImage, selfIntroduction }, price} = res.msg
        // 评分
        let rate = point > 0 ? point / count : 0
        // 基本信息
        this.info = {
          price,
          nickName,
          avatarImage,
          selfIntroduction,
          rateCount: count,
          totalRate: point,
          rate,
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
        nickName, avatarImage, selfIntroduction, skills, totalRate, rateCount
      } = this.info
      const edu = this.edus[0] || {}
      let { school = '', discipline = '', degree = '', graduationTime = '' } = edu
      const wrok = this.works[0] || {}
      let { industryText = '', companyText = '', positionText = '', workingYears = '', duty = '' } = wrok
      const consumerTime = this.times.map(o => Math.ceil(o.value/1000))
      const consultant = {
        _id: this.$route.params.id,
        name: nickName,
        avatar: avatarImage,
        readme: selfIntroduction,
        education: { school, discipline, degree, graduationTime },
        work: { industry:industryText, company:companyText, position: positionText, workingYears, duty, skills },
        evaluationCount: rateCount,
        evaluationPoint: totalRate,
      }
      const l = this.loading()
      // 更换咨询师
      if (this.$route.query.orderId) {
        const res = await changeConsultant({
          consumerTime,
          consultant,
          orderId: this.$route.query.orderId,
        })
        if (res.result) {
          this.alert('咨询师更换成功')
          this.$router.push(`/consumer/order/2,3,12`)
        }
      } else {
        const p = {
          consumerNickName: this.user.nickName,
          consumerAvatar: this.user.avatar,
          consultant,
          consumerTime
        }
        const res = await createOrder(p).catch(e => l.close())
        if (res.result) {
          this.alert('订单已生成')
          this.$router.push(`/consumer/order-confirm/${res.msg}`)
        }
      }
      l.close()
    },
    async showRateDetail () {
      if (!this.info.rateCount) {
        return false
      }
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
.left,.right {
  height: 500px;
  color: #7c8ea5;
  position: relative;
}
.cost-item {
  position: absolute;
  bottom: 30px;
}
.cost-num {
  position: absolute;
  bottom: 26px;
  right: 30px;
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
  display: -webkit-box;    
  -webkit-box-orient: vertical;    
  -webkit-line-clamp: 6;    
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
  font-family: "notosans-bold,notosans-regular";
  font-weight: 600;
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
  font-family: "notosans-bold,notosans-regular";
  font-weight: 600;
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
.work-duty {
  max-height: 40px;
  overflow: auto;
}
.rate-count {
  cursor: pointer;
}
</style>
