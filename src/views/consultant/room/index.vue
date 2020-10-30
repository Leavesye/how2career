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
          <p class="ques-status">{{isShow ? '等待中' : '咨询中'}}</p>
          <!-- 计时器 -->
          <count-down :timer="timer"></count-down>
        </el-card>
      </el-col>
    </el-row>
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
            <p>{{highestEdu.desc}}</p>
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
          <div class="d-item" v-for="(item, i) in edus" :key="i">
            <p class="field-name">{{i==0?'最高学历': '前学历'}}</p>
            <p>{{item.desc}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社会实践"
                     name="third">
          <div v-for="(item, i) in works"
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
                  <p>{{item.industryText}}</p>
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
            <p>{{langs}}</p>
          </div>
          <div class="d-item">
            <p class="field-name">工作个人技能</p>
            <p>{{skills}}</p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 房间状态 -->
    <room-status :isShow="isShow"
                 @start="handleChatStart"
                 @reopen="reOpen"
                 :timer="timer"
                 :info="info"></room-status>
    <div id="local_stream"></div>
    <div v-html="remoteStream">
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from '@/components/RoomStatus'
import roomMixin from '@/mixins/room'
import { getOrderById, queryConsumerByOrderId } from '@/api/order'
import { getDicts } from '@/api/user'
import { getSign, getServiceTime } from '@/api/room'

export default {
  name: 'room',
  components: {
    Avatar,
    CountDown,
    RoomStatus
  },
  mixins: [roomMixin],
  data () {
    return {
      timer: {},
      isShow: true,
      activeName: 'first',
      rewards: [],
      certs: [],
      info: {
        edus: [{ desc: '' }]
      },
      langs: '',
      skills: '',
      edus: [],
      highestEdu: {},
      works: [],
      remoteStream: '',
      playState: ''
    }
  },
  async created () {
    const orderId = this.$route.params.id
    const l = this.loading()
    const res = await Promise.all([
      getDicts(),
      getOrderById({ orderId }),
      queryConsumerByOrderId({ orderId }),
      getSign(),
      getServiceTime()
    ]).catch(e => l.close())
    if (res[1].result) {
      // 订单信息
      const { slotId, roomId, consultant: { _id, }, consumer, consumerAvatar: avatar, consumerNickName: name, startTime, question } = res[1].msg
      this.roomInfo = { roomId, userId: _id, sign: res[3].msg, orderId }
      if (res[2].result) {
        const { countries, majors, degrees, gender: genders, industry: industrys, workCategory } = res[0].msg
        // 咨询者信息
        let { basic: { name, gender, birthday, highestEducation = {}, selfIntroduction, detailedIntroduction } } = res[2].msg
        // 优先取服务器当前时间
        const now = res[4].msg || Math.ceil((moment().valueOf() / 1000))
        const leftStart = startTime - now
        const leftEnd = startTime + 90 * 60 - now
        let targetTime = 0
        let isStart = false
        let bg = '#7c8ea5'
        if (leftStart > 0) {
          targetTime = leftStart
          isStart = false
        } else {
          targetTime = leftEnd
          isStart = true
          bg = '#15479e'
        }
        const sid = setInterval(() => {
          if (targetTime == 0) {
            this.timer.isStart = true
            this.timer.bg = '#15479e'
            clearInterval(sid)
          }
          targetTime--
        }, 1000)
        // 定时器信息
        this.timer = {
          targetTime,
          isStart,
          bg,
        }
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
        }
        const resume = res[2].msg.resume
        if (resume) {
          const { education = [], workExperience = [] } = resume
          education.unshift(highestEducation)
          // 学历列表
          this.edus = education.map(o => {
            const schools = countries.find(v => v.value == o.country).schools
            const schoolText = schools.find(v => v.value == o.school).text
            const disciplineText = o.discipline ? majors.find(v => v.value == o.discipline).text : ''
            const degreeText = o.degree ? degrees.find(v => v.value == o.degree).text : ''
            return {
              desc: `${schoolText} ${disciplineText} ${degreeText}`
            }
          })
          // 最高学历
          this.highestEdu = this.edus[0]
          // 工作列表
          this.works = workExperience.map(o => {
            return {
              type: o.JobCategory ? workCategory.find(v => v.value == o.JobCategory).text : '',
              industryText: o.industry ? industrys.find(v => v.value == o.industry).text : '',
              company: o.company, position: o.position,
              entryTime: moment(o.entryTime).format('YYYY-MM-DD'),
              resignationTime: o.resignationTime ? moment(o.resignationTime).format('YYYY-MM-DD') : '',
              duty: o.duty, reward: o.reward
            }
          })
          if (resume.other) {
            const { rewardHistory = [], certificatesHistory = [], language = [], skills = [] } = resume.other
            this.langs = language.toString()
            this.skills = skills.toString()
            this.rewards = rewardHistory.map(o => {
              return {
                name: o.name,
                comments: o.comments,
                expireDate: moment(o.expireDate).format('YYYY-MM-DD')
              }
            })
            this.certs = certificatesHistory.map(o => {
              return {
                name: o.name,
                comments: o.comments,
                expireDate: moment(o.expireDate).format('YYYY-MM-DD')
              }
            })
          }
        }
      }
    }
    l.close()
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
