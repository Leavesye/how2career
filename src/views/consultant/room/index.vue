<template>
  <div style="padding: 30px">
    <section class="flex">
      <el-card class="card-l">
        <div class="title"
             style="margin-bottom: 40px">咨询者</div>
        <div class="header">
          <avatar :imgUrl="info.avatar"></avatar>
          <div class="micro ani"><i class="iconfont iconhuatong"></i></div>
        </div>
        <p class="user-name">{{info.name}}</p>
      </el-card>
      <el-card class="card-c">
        <p class="title">咨询问题</p>
        <div class="q-box">
          <p class="question"
             v-for="(item, i) in info.question"
             :key="i">{{item}}?</p>
        </div>
      </el-card>
      <el-card class="card-r">
        <p class="title"
           style="margin-bottom: 28px">咨询开始时间</p>
        <p>北京时间</p>
        <p>{{info.startText}}</p>
        <p class="ques-status">咨询中</p>
        <!-- 计时器 -->
        <count-down bg="#15479E"
                    :targetTime="info.startTime"></count-down>
      </el-card>
    </section>
    <el-card class="detail-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息"
                     name="first">
          <div class="d-item">
            <section class="info-row">
              <div style="margin-bottom: 10px;">
                <p class="field-name">姓名</p>
                <p class="field-name">性别</p>
                <p class="field-name">出生年月</p>
              </div>
              <div>
                <p>{{info.name}}</p>
                <p>{{info.gender}}</p>
                <p>{{info.birthday}}</p>
              </div>
            </section>
          </div>
          <div class="d-item">
            <p class="field-name">最高学历</p>
            <p>{{info.edus[0].desc}}</p>
          </div>
          <div class="d-item">
            <p class="field-name">自我评价</p>
            <p>{{info.selfIntroduction}}</p>
          </div>
          <div class="d-item">
            <p class="field-name">详细介绍</p>
            <p>{{info.detailedIntroduction}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学历信息"
                     name="second">
          <div class="d-item" v-for="(item, i) in info.edus" :key="i">
            <p class="field-name">{{i==0?'最高学历': '前学历'}}</p>
            <p>{{item.desc}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社会实践"
                     name="third">
          <div v-for="(item, i) in info.works"
               :key="i">
            <div class="d-item">
              <section class="info-row">
                <div>
                  <p class="field-name">工作类型</p>
                  <p class="field-name">行业</p>
                  <p class="field-name">企业</p>
                </div>
                <div>
                  <p>{{item.type}}</p>
                  <p>{{item.industry}}</p>
                  <p>{{item.company}}</p>
                </div>
              </section>
            </div>
            <div class="d-item">
              <section class="info-row">
                <div>
                  <p class="field-name">职位</p>
                  <p class="field-name">入职时间</p>
                  <p class="field-name">离职时间</p>
                </div>
                <div>
                  <p>{{item.position}}</p>
                  <p>{{item.entryTime}}</p>
                  <p>{{item.resignationTime}}</p>
                </div>
              </section>
            </div>
            <div class="d-item">
              <p class="field-name">主要工作内容</p>
              <p>{{item.duty}}</p>
            </div>
            <div class="d-item">
              <p class="field-name">奖励和荣誉</p>
              <p>{{item.reward}}</p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="其他信息"
                     name="fourth">
          <h-title style="margin-top: 20px;">获奖经历</h-title>
          <div class="d-item"
               v-if="rewards.length">
            <section class="info-row">
              <div>
                <p>名称</p>
                <p>有效期</p>
                <p>备注</p>
              </div>
              <div v-for="(item, i) in rewards"
                   :key="i">
                <p>{{item.name}}</p>
                <p>{{item.expireDate}}</p>
                <p>{{item.comments}}</p>
              </div>
            </section>
          </div>
          <div v-else
               style="margin-top: 20px">暂无获奖经历</div>
          <h-title style="margin-top: 20px;">执照与证书</h-title>
          <div class="d-item"
               v-if="certs.length">
            <section class="info-row">
              <div>
                <p>名称</p>
                <p>有效期</p>
                <p>备注</p>
              </div>
              <div v-for="(item, i) in certs"
                   :key="i">
                <p>{{item.name}}</p>
                <p>{{item.expireDate}}</p>
                <p>{{item.comments}}</p>
              </div>
            </section>
          </div>
          <div v-else
               style="margin-top: 20px">暂无执照与证书</div>
          <div class="d-item">
            <p class="field-name">语言</p>
            <p>{{info.language}}</p>
          </div>
          <div class="d-item">
            <p class="field-name">工作个人技能</p>
            <p>{{info.skills}}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 房间状态 -->
    <room-status :isShow="isShow"
                 @start="handleChatStart"
                 :targetTime="info.startTime"
                 :info="info"></room-status>
  </div>
</template>

<script>
import RtcClient from '@/utils/rtc-client'
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from '@/components/RoomStatus'
import { getOrderById, queryConsumerByOrderId } from '@/api/order'
import { getDicts } from '@/api/user'
import { getSign } from '@/api/room'
import moment from 'moment'

export default {
  name: 'room',
  components: {
    Avatar,
    CountDown,
    RoomStatus
  },
  data () {
    return {
      targetTime: 0,
      isShow: false,
      activeName: 'first',
      rewards: [],
      certs: [],
      info: {
        edus: [{ desc: '' }]
      }
    }
  },
  async created () {
    const orderId = this.$route.params.id
    const l = this.loading()
    const res = await Promise.all([
      getDicts(),
      getOrderById({ orderId }),
      queryConsumerByOrderId({ orderId }),
      getSign()
    ]).catch(e => l.close())
    if (res[1].result) {
      // 订单信息
      const { slotId, roomId, consultant: { _id, }, consumer, consumerAvatar: avatar, consumerNickName: name, startTime, question } = res[1].msg
      this.initRtcClient(roomId, consumer, res[3].msg)
      if (res[2].result) {
        const { countries, majors, degrees, gender: genders, industry: industrys, workCategory } = res[0].msg
        // 咨询者信息
        let { basic: { name, gender, birthday, highestEducation, selfIntroduction, detailedIntroduction } } = res[2].msg
        const resume = res[2].msg.resume
        let edus = []
        let works = []
        let langs = []
        let skills = []
        if (resume) {
          const { education, workExperience } = resume
          edus = education || []
          works = workExperience || []
          if (resume.other) {
            const { rewardHistory, certificatesHistory, language, skills:skill } = resume.other
            langs = language || []
            skills = skill || []
            this.rewards = (rewardHistory || []).map(o => {
              return {
                name: o.name,
                comments: o.comments,
                expireDate: moment(o.expireDate).format('YYYY-MM-DD')
              }
            })
            this.certs = (certificatesHistory || []).map(o => {
              return {
                name: o.name,
                comments: o.comments,
                expireDate: moment(o.expireDate).format('YYYY-MM-DD')
              }
            })
          }
        }
        highestEducation = highestEducation || []
        edus.unshift(highestEducation)
        this.info = {
          slotId,
          orderId,
          roomId,
          consultantId: _id,
          consumerId: consumer,
          avatar, name, birthday, question, startTime,
          startText: moment(startTime * 1000).format('MM月DD日 HH:mm') + '~' + moment(startTime * 1000).subtract('-90', 'minutes').format('HH:mm'),
          selfIntroduction, detailedIntroduction,
          gender: genders.find(o => o.value == gender).text,
          edus: edus.map(o => {
            const schools = countries.find(v => v.value == o.country).schools
            const schoolText = schools.find(v => v.value == o.school).text
            const disciplineText = o.discipline ? majors.find(v => v.value == o.discipline).text : ''
            console.log(degrees, o.degree)
            const degreeText = o.degree ? degrees.find(v => v.value == o.degree).text : ''
            return {
              desc: `${schoolText} ${disciplineText} ${degreeText}`
            }
          }),
          works: works.map(o => {
            return {
              type: o.JobCategory ? workCategory.find(v => v.value == o.JobCategory).text : '',
              industry: o.industry ? industrys.find(v => v.value == o.industry).text : '',
              company: o.company, position: o.position,
              entryTime: moment(o.entryTime).format('YYYY-MM-DD'),
              resignationTime: o.resignationTime ? moment(o.resignationTime).format('YYYY-MM-DD') : '',
              duty: o.duty, reward: o.reward
            }
          }),
          language: langs.toString(),
          skills: skills.toString(),
        }
      }
    }
    l.close()
  },
  methods: {
    initRtcClient (roomId, userId, sign) {
      this.rtc = new RtcClient({
        userSig: sign,
        userId, 
        roomId,
      })
      this.rtc.join()
      console.log(this.rtc, 'rtc')
    },
    handleChatStart () {
      this.isShow = false
      // 加入聊天室
      this.rtc.join()
    },
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
  color: #15479e;
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
  margin-top: 30px;
  font-size: 14px;
  color: #7c8ea5;
  height: 495px;
  overflow: auto;
}
.d-item {
  padding: 20px 0;
  border-bottom: 1px solid #edeeef;
}
.info-row > div {
  display: flex;
  margin-right: 20px;
  margin-bottom: 10px;
}
.info-row > div > p {
  width: 200px;
  margin-right: 20px;
}
.field-name {
  color: #15479e;
  margin-bottom: 10px;
  font-weight: 600;
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
  background: #15479e;
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
