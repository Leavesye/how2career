<template>
  <div style="padding: 30px">
    <el-row :gutter="10" type="flex" justify="space-between">
      <el-col :span="6">
        <el-card class="card-l">
          <div class="title"
              style="margin-bottom: 40px">咨询师</div>
          <div class="header">
            <avatar :imgUrl="info.avatar"></avatar>
            <div class="micro" :class="[playState == 'PLAYING'? 'ani': '']"><i class="iconfont iconhuatong"></i></div>
          </div>
          <p class="user-name">{{info.name}}</p>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="card-c">
          <p class="title">咨询问题</p>
          <div class="q-box">
            <p class="question" v-for="(item, i) in info.question" :key="i">{{item}}?</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="card-r">
          <p class="title"
            style="margin-bottom: 28px">咨询开始时间</p>
          <p>北京时间</p>
          <p>{{info.startText}}</p>
          <p class="ques-status">咨询中</p>
          <!-- 计时器 -->
          <count-down bg="#36AE82" :targetTime="info.startTime"></count-down>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="detail-card">
      <div class="d-item">
        <p class="field-name title">最高学历</p>
        <div class="flex-hbc">
            <span>{{edu.desc}}</span>
            <el-button plain v-if="edus.length>1" @click="toggleEdu">更多</el-button>
        </div>
      </div>
      <div class="d-item">
        <p class="field-name title">工作信息</p>
        <p>所属行业：{{work.industryText}}</p>
        <div class="flex-hbc">
          <div class="flex work-item">
            <span>公司名称：{{work.companyText}}</span>
            <span>职位：{{work.positionText}}</span>
            <span>工作年限：{{work.workingYears}}</span>
          </div>
          <el-button plain v-if="works.length>1" @click="toggleWork">更多</el-button>
        </div>
      </div>
      <div class="d-item">
        <p class="field-name title">主要工作内容</p>
        <p class="duty">{{work.duty}}</p>
      </div>
      <div class="d-item">
        <p class="field-name title">工作个人技能</p>
        <p>{{skills}}</p>
      </div>
      <div class="flex-he">
        <el-button class="stop-btn" type="success" @click="handleLeaveRoom">结束服务</el-button> 
      </div>
    </el-card>
    <!-- 房间状态 -->
    <room-status :isShow="isShow"
                 @start="handleChatStart" :targetTime="info.startTime" :info="info"></room-status>
    <!-- 更多学历 -->
    <more-edu :isShow="isShowEdu"
                 @close="toggleEdu" :edus="edus"></more-edu>
    <!-- 更多工作 -->
    <more-work :isShow="isShowWork"
                 @close="toggleWork" :works="works"></more-work>
    <div id="local_stream"></div>
    <div v-html="remoteStream">
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import roomMixin from '@/mixins/room'
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from '@/components/RoomStatus'
import MoreEdu from './modal/more-edu'
import MoreWork from './modal/more-work'
import { getOrderById, stopService } from '@/api/order'
import { getPublicInfo, getDicts } from '@/api/user'
import { getSign } from '@/api/room'

export default {
  name: 'room',
  components: {
    Avatar,
    CountDown,
    RoomStatus,
    MoreEdu,
    MoreWork
  },
  mixins: [roomMixin],
  data () {
    return {
      isShow: true,
      isShowEdu: false,
      isShowWork: false,
      work: {},
      works: [],
      edu: {},
      edus: [],
      skills: '',
      info: {},
      targetTime: 0,
      remoteStream: '', // 远方流播放
      playState: '',
    }
  },
  async created() {
    this.orderId = this.$route.params.id
    const l = this.loading()
    const res = await Promise.all([
      getOrderById({ orderId: this.orderId }),
      getDicts(),
      getSign()
    ]).catch(e=> l.close())
    if (res[0].result) {
      const { consultant:{ avatar, name,  _id }, consumer, startTime, question, roomId, slotId } = res[0].msg
      const { countries, majors, degrees, industry:industrys, gender:genders, company: companys, position: positions } = res[1].msg
      // 初始化语音聊天
      this.roomInfo = { roomId, userId: consumer, sign: res[2].msg, orderId: this.orderId }
      // 查询咨询师公共信息
      const ret = await getPublicInfo({ userId: _id }).catch(e=>l.close())
      if (ret.result) {
        const { birthday, gender, selfIntroduction, detailedIntroduction, resume } = ret.msg.publicInfo
        // 基本信息
        this.info = {
          slotId,
          consultantId: _id,
          consumerId: consumer,
          orderId: this.orderId,
          roomId,
          birthday, 
          detailedIntroduction,
          selfIntroduction,
          gender: genders.find(o=> o.value == gender).text,
          startTime, question,avatar,name,
          startText: moment(startTime*1000).format('MM月DD日 HH:mm') + '~' + moment(startTime*1000).subtract('-90', 'minutes').format('HH:mm'),
        }
        if (resume) {
          const { education = [], workExperience = [], skills = [] } = resume
          this.skills = skills.toString()
          // 学历列表
          this.edus = education.map(o => {
            const schools = countries.find(v => v.value == o.country).schools
            const schoolText = schools.find(v => v.value == o.school).text
            const disciplineText = majors.find(v => v.value == o.discipline).text
            const degreeText = degrees.find(v => v.value == o.degree).text
            return {
              desc: `${schoolText} ${disciplineText} ${degreeText}`
            }
          })
          this.edu = this.edus[0]
          // 工作列表
          this.works =  workExperience.map(o => {
            // 工作年限
            let lastTime = o.resignationTime ? moment(o.resignationTime).valueOf() : moment().valueOf()
            let workingYears = Math.ceil((lastTime - moment(o.entryTime).valueOf()) / (365*24*60*60*1000))
            return {
              company: o.company,
              companyText: companys.find(v => v.value == o.company).text,
              industry: o.industry,
              industryText: industrys.find(v => v.value == o.industry).text,
              position: o.position,
              positionText: positions.find(v => v.value == o.position).text,
              workingYears: workingYears?`${workingYears}年`: '',
              duty: o.duty
            }
          })
          this.work = this.works[0]
        }
      }
    }
    l.close()
  },
  methods: {
    handlePeerLeave() {
      this.alert('对方已离开房间')
      this.$router.replace('/consumer/index')
    },
    handleChatStart () {
      this.isShow = false
      // 加入聊天室
      this.initRtcClient(this.roomInfo)
    },
    toggleEdu() {
      this.isShowEdu = !this.isShowEdu
    },
    toggleWork() {
      this.isShowWork = !this.isShowWork
    },
    handleLeaveRoom() {
      // 退出房间
      this.leaveRoom(this.client)
      this.playState = ''
      this.alert('服务已结束')
      this.$router.replace('/consumer/index')
      return 
      this.$alert('点击服务确认将结束此次服务，无法再次进入房间', '服务结束确认', {
        confirmButtonText: '确认',
        callback: action => {
          if (action == 'confirm') {
            stopService({ orderId: this.orderId }).then(res => {
              if (res.result) {
                // 退出房间
                this.leaveRoom(this.client)
                this.playState = ''
                this.alert('服务已结束')
                this.$router.replace('/consumer/index')
              }
            })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.card-l,
.card-r {
  height: 275px;
}
.card-c {
  height: 275px;
  color: #7c8ea5;
}

.card-l {
  display: flex;
  flex-direction: column;
  align-items: center;
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
.duty {
  height: 40px;
  overflow: auto;
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
