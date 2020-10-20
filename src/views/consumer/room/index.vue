<template>
  <div style="padding: 30px">
    <el-row :gutter="10" type="flex" justify="space-between">
      <el-col :span="6">
        <el-card class="card-l">
          <div class="title"
              style="margin-bottom: 40px">咨询师</div>
          <div class="header">
            <avatar :imgUrl="info.avatar"></avatar>
            <div class="micro ani"><i class="iconfont iconhuatong"></i></div>
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
            <span>公司名称：{{work.company}}</span>
            <span>职位：{{work.position}}</span>
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
    <!-- <room-status :isShow="isShow"
                 @start="handleChatStart" :targetTime="info.startTime" :info="info"></room-status> -->
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
import TRTC from 'trtc-js-sdk'
import moment from 'moment'
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
      const { countries, majors, degrees, industry:industrys, gender:genders } = res[1].msg
      // 初始化语音聊天
      this.initRtcClient(roomId, consumer, res[2].msg)
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
              industry: o.industry,
              industryText: industrys.find(v => v.value == o.industry).text,
              position: o.position,
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
    initRtcClient(roomId, userId, sign) {
      this.client = TRTC.createClient({
        mode: 'rtc',
        sdkAppId: process.env.VUE_APP_SKDAPPID,
        userId,
        userSig: sign
      })
      //注册远程监听，要放在加入房间前--这里用了发布订阅模式
      this.subscribeStream(this.client)
      //初始化后才能加入房间
      this.joinRoom(this.client, roomId, userId)
    },
    //加入房间
    joinRoom (client, roomId, userId) {
      client.join({ roomId })
        .catch(error => {
          console.error('进房失败 ' + error);
        })
        .then(() => {
          console.log('进房成功');
          //创建本地流
          this.createStream(userId)
          //播放远端流
          this.playStream(this.client)
      });
    },
    
    //创建本地音视频流
    createStream (userId) {
      const localStream = TRTC.createStream({ userId, audio: true, video: false });
      this.localStream =localStream 
     
      localStream
        .initialize()
        .catch(error => {
          console.error('初始化本地流失败 ' + error);
        })
        .then(() => {
          console.log('初始化本地流成功');
          // 创建好后才能播放 本地流播放 local_stream 是div的id
          localStream.play('local_stream');
          //创建好后才能发布
          this.publishStream(localStream, this.client)
        });
    },

    //发布本地音视频流
    publishStream (localStream, client) {
      client
        .publish(localStream)
        .catch(error => {
          console.error('本地流发布失败 ' + error);
        })
        .then(() => {
          console.log('本地流发布成功');
        });
     },
     
    //订阅远端流--加入房间之前
    subscribeStream (client) {
      client.on('stream-added', event => {
        const remoteStream = event.stream;
        console.log('远端流增加: ' + remoteStream.getId());
        //订阅远端流
        client.subscribe(remoteStream);
      });
    },

    //播放远端流
    playStream (client) {
      client.on('stream-subscribed', event => {
        const remoteStream = event.stream;
        console.log('远端流订阅成功：' + remoteStream.getId());
        // 创建远端流标签，因为id是动态的，所以动态创建，用了v-html
        
        this.remoteStream = `<view id="${'remote_stream-' + remoteStream.getId()}"  ></view>`;
        
        //做了dom操作 需要使用$nextTick(),否则找不到创建的标签无法进行播放
        this.$nextTick(() => {
            //播放
          remoteStream.play('remote_stream-' + remoteStream.getId());
        })
      });
    },

    //退出音视频
    leaveRoom (client) {
      client
        .leave()
        .then(() => {
            console.log('退房成功')
          // 停止本地流，关闭本地流内部的音视频播放器
          this.localStream.stop();
          // 关闭本地流，释放摄像头和麦克风访问权限
          this.localStream.close();
          this.localStream = null;
          this.client = null
          // 退房成功，可再次调用client.join重新进房开启新的通话。
        })
        .catch(error => {
          console.error('退房失败 ' + error);
          // 错误不可恢复，需要刷新页面。
        });
    },
    handleChatStart () {
      this.isShow = false
      // 加入聊天室
      this.rtc.join()
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
      // this.$alert('点击服务确认将结束此次服务，无法再次进入房间', '服务结束确认', {
      //   confirmButtonText: '确认',
      //   callback: action => {
      //     console.log(action)
      //     if (action == 'confirm') {
      //       stopService({ orderId: this.orderId }).then(res => {
      //         if (res.result) {
      //           // 退出房间
      //           this.leaveRoom(this.client)
      //           this.alert('服务已结束')
      //         }
      //       })
      //     }
      //   }
      // })
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
