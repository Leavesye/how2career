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
            <section class="flex-hb"
                     style="width: 300px">
              <div>
                <p class="field-name">姓名</p>
                <p>{{info.name}}</p>
              </div>
              <div>
                <p class="field-name">性别</p>
                <p>{{info.gender}}</p>
              </div>
              <div>
                <p class="field-name">出生年月</p>
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
          <div class="d-item">
            <p class="field-name">最高学历</p>
            <p>{{info.edus[0].desc}}</p>
          </div>
          <div class="d-item">
            <p class="field-name">前学历</p>
            <p>{{info.edus[1] ? info.edus[1].desc : '无'}}</p>
          </div>
          <div class="d-item">
            <p class="field-name">前学历</p>
            <p>{{info.edus[2] ? info.edus[2].desc : '无'}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社会实践"
                     name="third">
          <div v-for="item, i in info.works"
                     :key="i">
            <div class="d-item">
              <section class="flex-hb"
                       style="width: 300px">
                <div>
                  <p class="field-name">工作类型</p>
                  <p>{{item.type}}</p>
                </div>
                <div>
                  <p class="field-name">行业</p>
                  <p>{{item.industry}}</p>
                </div>
                <div>
                  <p class="field-name">企业</p>
                  <p>{{item.company}}</p>
                </div>
              </section>
            </div>
            <div class="d-item">
              <section class="flex-hb"
                       style="width: 300px">
                <div>
                  <p class="field-name">职位</p>
                  <p>{{item.position}}</p>
                </div>
                <div>
                  <p class="field-name">入职时间</p>
                  <p>{{item.entryTime}}</p>
                </div>
                <div>
                  <p class="field-name">离职时间</p>
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
                     name="fourth">其他信息</el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 房间状态 -->
    <room-status :isShow="isShow"
                 @start="handleChatStart" :targetTime="info.startTime" :info="info"></room-status>
  </div>
</template>

<script>
import RtcClient from '@/utils/rtc-client'
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from '@/components/RoomStatus'
import { getOrderById, queryConsumerByOrderId } from '@/api/order'
import { getDicts } from '@/api/user'
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
      isShow: true,
      activeName: 'first',
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
      queryConsumerByOrderId({ orderId })
    ]).catch(e => l.close())
    if (res[1].result) {
      // 订单信息
      const { slotId, roomId, consultant: { _id, },consumer, consumerAvatar: avatar, consumerNickName: name, startTime, question } = res[1].msg
      this.initRtcClient(roomId, consumer)
      if (res[2].result) {
        const { countries, majors, degrees, gender: genders, industry: industrys, workCategory } = res[0].msg
        // 咨询者信息
        let { basic: { name, gender, birthday, highestEducation, selfIntroduction, detailedIntroduction },
          resume: { education, workExperience } } = res[2].msg
        education = education || []
        highestEducation = highestEducation || []
        education.unshift(highestEducation)
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
          edus: education.map(o => {
            const schools = countries.find(v => v.value == o.country).schools
            const schoolText = schools.find(v => v.value == o.school).text
            const disciplineText = o.discipline ? majors.find(v => v.value == o.discipline).text : ''
            console.log(degrees, o.degree)
            const degreeText = o.degree ? degrees.find(v => v.value == o.degree).text : ''
            return {
              desc: `${schoolText} ${disciplineText} ${degreeText}`
            }
          }),
          works: workExperience.map(o => {
            return {
              type: o.JobCategory ? workCategory.find(v => v.value == o.JobCategory).text : '',
              industry: o.industry ? industrys.find(v => v.value == o.industry).text : '',
              company: o.company, position: o.position,
              entryTime: moment(o.entryTime).format('YYYY-MM-DD'),
              resignationTime: o.resignationTime ? moment(o.resignationTime).format('YYYY-MM-DD') : '',
              duty: o.duty, reward: o.reward
            }
          })
        }
        const now = moment().valueOf()
        const start = startTime * 1000
      }
    }
    l.close()
  },
  methods: {
    initRtcClient(roomId, userId) {
      this.rtc = new RtcClient({
        sdkAppId: process.env.VUE_APP_SKDAPPID,
        userSig: process.env.VUE_APP_USERSIG,
        userId, 
        roomId,
      })
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
.field-name {
  color: #15479e;
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
