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
        <p class="question" v-for="(item, i) in info.question" :key="i">{{item}}?</p>
      </el-card>
      <el-card class="card-r">
        <p class="title"
           style="margin-bottom: 28px">咨询开始时间</p>
        <p>北京时间</p>
        <p>{{info.startText}}</p>
        <p class="ques-status">咨询中</p>
        <!-- 计时器 -->
        <count-down :targetTime="info.startTime"></count-down>
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
            <p>{{info.edus[1] ? info.edus[1].desc : '无'}}</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社会实践"
                     name="third">社会实践</el-tab-pane>
        <el-tab-pane label="其他信息"
                     name="fourth">其他信息</el-tab-pane>
      </el-tabs>
    </el-card>
    <room-status :isShow="isShow"
                 @close="handleCloseModal"></room-status>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from './modal/room-status'
import { getOrderById } from '@/api/order'
import { getPublicInfo } from '@/api/user'
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
    const res = await getOrderById({ orderId }).catch(e=>l.close())
    if (res.result) {

      const {
        consultant:{ avatar, name,  _id },
        startTime,
        question
      } = res.msg
      // 查询咨询师公共信息
      const ret = await getPublicInfo({ userId: _id }).catch(e=>l.close())
      if (ret.result) {
        const { birthday,gender,selfIntroduction,detailedIntroduction, resume: {education, workExperience}} = ret.msg.publicInfo
        this.info = {
          birthday, 
          detailedIntroduction,
          selfIntroduction,
          gender: GENDERS.find(o=> o.value == gender).text,
          startTime, question,avatar,name,
          startText: moment(startTime*1000).format('MM月DD日 HH:mm') + '~' + moment(startTime*1000).subtract('-90', 'minutes').format('HH:mm'),
          edus: education.map(o => {
            return {
              desc: `${o.school} ${o.discipline} ${o.degree}`
            }
          }),
          works: workExperience
        }
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
  overflow: auto;
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
