<template>
  <div style="padding: 30px">
    <section class="flex">
      <el-card class="card-l">
        <div class="title" style="margin-bottom: 40px">咨询者</div>
        <!-- 头像 -->
        <avatar></avatar>
      </el-card>
      <el-card class="card-c">
        <p class="title">咨询问题</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
        <p class="question">阿里P10对技术架构要求是什么?</p>
      </el-card>
      <el-card class="card-r">
        <p class="title" style="margin-bottom: 28px">咨询开始时间</p>
        <p>北京时间</p>
        <p>10月10日 20:00 ~ 21:00</p>
        <p class="ques-status">咨询中</p>
        <!-- 计时器 -->
        <count-down></count-down>
      </el-card>
    </section>
    <el-card class="detail-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="first">
          <div class="d-item">
            <section class="flex-hb" style="width: 300px">
              <div>
                <p class="field-name">姓名</p>
                <p>马里奥</p>
              </div>
              <div>
                <p class="field-name">性别</p>
                <p>男</p>
              </div>
              <div>
                <p class="field-name">出生年月</p>
                <p>1998-01-10</p>
              </div>
            </section>
          </div>
          <div class="d-item">
            <p class="field-name">最高学历</p>
            <p>中央民族大学 计算机科学  硕士</p>
          </div>
          <div class="d-item">
            <p class="field-name">自我评价</p>
            <p>知乎盐选会员，是付费内容服务和用户体验的一次升级，旨在让知友们花的时间更值得。</p>
          </div>
          <div class="d-item">
            <p class="field-name">评价介绍</p>
            <p>知乎盐选会员，是付费内容服务和用户体验的一次升级，旨在让知友们花的时间更值得。盐选会员不仅可以为广大知友提社区功能权益、身份权益以及内容权益等多重福利；还能在社区问答的原生体验中，便捷地获得优质付费内容；完善的「盐选」机制，也能提升知友们获得好内容的效率。 可以在「我的」页面，点击「开通盐选会员」进行盐选会员的开通。目前 iOS 用户支持应用内购买，安卓用户支持微信支付。</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学历信息" name="second">
          <div class="d-item">
            <p class="field-name">最高学历</p>
            <p>中央民族大学 计算机科学  硕士</p>
          </div>
          <div class="d-item">
            <p class="field-name">前学历</p>
            <p>中国清华大学 电子工程 硕士</p>
          </div>
          <div class="d-item">
            <p class="field-name">前学历</p>
            <p>中国清华大学 电子工程 硕士</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="社会实践" name="third">社会实践</el-tab-pane>
        <el-tab-pane label="其他信息" name="fourth">其他信息</el-tab-pane>
      </el-tabs>
    </el-card>
    <room-status :isShow="isShow" @close="handleCloseModal"></room-status>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import RoomStatus from './modal/room-status'

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
      activeName: 'first'
    }
  },
  methods: {
    handleCloseModal() {
      this.isShow = false
    }
  },
  mounted() {
    // setInterval(() => this.isShow = true, 30*1000)
  }
}
</script>

<style lang="scss" scoped>
.card-l, .card-r  {
  width: 220px;
  height: 275px;
}
.card-c {
  width: 410px;
  height: 275px;
  margin-right: 20px;
  overflow: auto;
  color: #7C8EA5;
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
  color: #7C8EA5;
}
.title {
  color: #15479E;
}
.question {
  padding: 14px 0;
  border-bottom: 1px solid #EDEEEF;
}
.ques-status {
  font-size: 20px;
  margin-top: 45px;
  margin-bottom: 20px;
}

.detail-card {
  margin-top: 30px;
  font-size: 14px;
  color: #7C8EA5;
  height: 495px;
  overflow: auto;
}
.d-item {
  padding: 20px 0;
  border-bottom: 1px solid #EDEEEF;
}
.field-name {
  color: #15479E;
  margin-bottom: 10px;
}
</style>