<template>
  <div style="padding: 30px">
    <section class="flex">
      <el-card class="card-l">
        <div class="title"
             style="margin-bottom: 40px">咨询师</div>
        <div class="header">
          <avatar :imgUrl="info.avatar"></avatar>
          <div class="micro ani"><i class="iconfont iconhuatong"></i></div>
        </div>
        <p class="user-name">{{info.name}}</p>
      </el-card>
      <el-card class="card-c">
        <p class="title">咨询问题</p>
        <div class="q-box">
          <p class="question" v-for="(item, i) in info.question" :key="i">{{item}}?</p>
        </div>
      </el-card>
      <el-card class="card-r">
        <p class="title"
           style="margin-bottom: 28px">咨询开始时间</p>
        <p>北京时间</p>
        <p>{{info.startText}}</p>
        <p class="ques-status">咨询中</p>
        <!-- 计时器 -->
        <count-down bg="#36AE82" :targetTime="info.startTime"></count-down>
      </el-card>
    </section>
    <el-card class="detail-card">
      <div class="d-item">
        <p class="field-name title">最高学历</p>
        <div class="flex-hbc">
            <span>{{info.edus[0].desc}}</span>
            <el-button plain>更多</el-button>
        </div>
      </div>
      <div class="d-item">
        <p class="field-name title">工作信息</p>
        <p>所属行业：{{info.works[0].industry}}</p>
        <div class="flex-hbc">
          <div class="flex work-item">
            <span>公司名称：{{info.works[0].company}}</span>
            <span>职位：{{info.works[0].position}}</span>
            <span>工作年限：{{info.works[0].workingYears}}</span>
          </div>
          <el-button plain>更多</el-button>
        </div>
      </div>
      <div class="d-item">
        <p class="field-name title">主要工作内容</p>
        <p>{{info.works[0].duty}}</p>
      </div>
      <div class="d-item">
        <p class="field-name title">工作个人技能</p>
        <p>{{info.skills}}</p>
      </div>
      <div class="flex-he">
        <el-button class="stop-btn" type="success">结束服务</el-button> 
      </div>
    </el-card>
    <!-- 房间状态 -->
    <room-status :isShow="isShow"
                 @close="handleCloseModal"></room-status>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from './modal/room-status'
import { getOrderById } from '@/api/order'
import { getPublicInfo, getDicts } from '@/api/user'
import moment from 'moment'
import { GENDERS } from '@/utils/enums'

export default {
  name: 'room',
  components: {
    Avatar,
    CountDown,
    RoomStatus
  },
  data () {
    return {
      roomStatus: 1, // 1 距离开始  2 距离结束
      isShow: false,
      activeName: 'first',
      info: {
        edus: [{desc: ''}]
      }
    }
  },
  async created() {
    const orderId = this.$route.params.id
    const l = this.loading()
    const res = await Promise.all([
      getOrderById({ orderId }),
      getDicts()
    ]).catch(e=> l.close())
    if (res[1].result) {
      this.dicts = res[1].msg
    }
    if (res[0].result) {
      const { consultant:{ avatar, name,  _id }, startTime, question } = res[0].msg
      // 查询咨询师公共信息
      const ret = await getPublicInfo({ userId: _id }).catch(e=>l.close())
      if (ret.result) {
        const { birthday,gender,selfIntroduction,detailedIntroduction, 
        resume: {education, workExperience, skills}} = ret.msg.publicInfo
        this.info = {
          birthday, 
          detailedIntroduction,
          selfIntroduction,
          gender: GENDERS.find(o=> o.value == gender).text,
          startTime, question,avatar,name,
          startText: moment(startTime*1000).format('MM月DD日 HH:mm') + '~' + moment(startTime*1000).subtract('-90', 'minutes').format('HH:mm'),
          edus: education.map(o => {
            const { countries, majors, degrees  } = this.dicts
            const schools = countries.find(v => v.value == o.country).schools
            const schoolText = schools.find(v => v.value == o.school).text
            const disciplineText = majors.find(v => v.value == o.discipline).text
            const degreeText = degrees.find(v => v.value == o.degree).text
            return {
              desc: `${schoolText} ${disciplineText} ${degreeText}`
            }
          }),
          works: workExperience.map(o => {
            // 工作年限
            let lastTime = o.resignationTime ? moment(o.resignationTime).valueOf() : moment().valueOf()
            let workingYears = Math.ceil((lastTime - moment(o.entryTime).valueOf()) / (365*24*60*60*1000))
            return {
              company: o.company,
              industry: this.dicts.industry.find(v => v.value == o.industry).text,
              position: o.position,
              workingYears: workingYears?`${workingYears}年`: '',
              duty: o.duty
            }
          }),
          skills: skills ? skills.toString(): ''
        }
        const now = moment().valueOf()
        const start = startTime*1000
        // 还没开始
        this.roomStatus = start > now ? 1:2
      }

    }
    l.close()
    
  },
  methods: {
    handleCloseModal () {
      this.isShow = false
    }
  },
  mounted () {
    // setInterval(() => this.isShow = true, 30*1000)
  }
}
</script>

<style lang="scss" scoped>
.card-l,
.card-r {
  width: 220px;
  height: 275px;
}
.card-c {
  width: 410px;
  height: 275px;
  margin-right: 20px;
  color: #7c8ea5;
}

.card-l {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
  text-align: center;
}
.card-r {
  text-align: center;
  color: #7c8ea5;
}
.title {
  font-size: 14px;
  font-weight: 600;
  color: #36ae82;
}
.q-box {
  height: 200px;
  overflow: auto;
}
.question {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
}
.ques-status {
  font-size: 20px;
  margin-top: 45px;
  margin-bottom: 20px;
}

.detail-card {
  position: relative;
  margin-top: 30px;
  font-size: 14px;
  color: #7c8ea5;
  height: 495px;
  overflow: auto;
}
.d-item {
  border-bottom: 1px solid #edeeef;
  padding-bottom: 12px;
  margin-bottom: 20px;
}
.work-item > span {
  margin-right: 40px;
}
.field-name {
  margin-bottom: 10px;
}
.header {
  position: relative;
}
.user-name {
  font-size: 18px;
  font-weight: 400;
  color: #7c8ea5;
  margin-top: 20px;
}
.micro {
  position: absolute;
  left: 31px;
  bottom: -10px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #36ae82;
}
.micro i {
  color: #fff;
  font-size: 19px;
}
@keyframes flash {
  from {
    background: #36ae82;
  }
  to {
    background: #15ca83;
  }
}
.ani {
  animation: flash 1s infinite;
}
</style>
