<template>
  <section style="padding: 30px">
    <!-- 未认证简历或者没有填写服务时间 -->
    <div v-if="!isSettingTime">
      <el-image class="banner"
                :src="bannerImg"></el-image>
      <p class="reg-success">你已经成功注册咨询师</p>
      <p class="condition">只需再完成以下2个步骤即可开始接受咨询</p>
      <section class="flex-hb">
        <!-- 步骤1 -->
        <div class="step"
             :class="{active: !isFinishReview }">
          <el-image class="step-num"
                    :src="step1"></el-image>
          <!-- 审核中 -->
          <el-image v-if="isFillResume && !isFinishReview"
                    class="status-img"
                    :src="certApply"></el-image>
          <div class="step-review"
               v-if="isFillResume && !isFinishReview">
            <p>审核中</p>
            <p>你也可以设置服务时间</p>
          </div>
          <!-- 审核完成 -->
          <el-image v-if="isFinishReview"
                    class="status-img"
                    :src="certFinish"></el-image>
          <div class="step-review"
               v-if="isFinishReview">
            <p>审核完成</p>
            <p>请设置服务时间</p>
          </div>
          <!-- 填写简历 -->
          <div class="step-fill"
               v-if="!isFillResume">
            <p>成为咨询师需要认证简历信息</p>
            <p>请先完成简历填写</p>
          </div>
          <div v-if="!isFillResume"
               class="step-btn"
               @click="linkTo('/consultant/resume')">完善个人信息</div>
        </div>
        <!-- 步骤2 -->
        <div class="step"
             :class="{active: isFinishReview}"
             @click="handleClickStep(2)">
          <el-image class="step-num"
                    :src="step2"></el-image>
          <div class="step-setting">
            <p>你也可以设置您的服务时间</p>
            <p>以便通过审核后立即开始接受订单</p>
          </div>
          <div class="step-btn"
               @click="linkTo('/consultant/setting')">服务时间设置</div>
        </div>
      </section>
    </div>
    <!-- 已认证 -->
    <div v-if="isSettingTime">
      <!-- 状态面板 -->
      <div class="pannel flex-hb">
        <div class="p-item"
             :class="{ active: isActive == i }"
             v-for="(o, i) in pannels"
             :key="i"
             @click="handleClickPannel(o, i)">
          <p>{{o.name}}</p>
          <div>{{o.count}}</div>
        </div>
      </div>
      <!-- 表格 -->
      <el-card class="order-card">
        <p class="title">即将开始的咨询</p>
        <ul class="list-item flex-hbc"
            v-for="(o, i) in list1"
            :key="i">
          <li class="flex-hbc">
            <el-image class="avatar"
                       :src="defaultAvatar"></el-image>
            <div>{{o.name}}</div>
          </li>
          <li>开始时间: {{o.start}}</li>
          <li>{{o.rest}}</li>
          <li class="flex-hb">
            <el-button type="primary"
                       size="mini"
                       @click="linkTo('/consultant/room')">进入房间</el-button>
            <el-button size="mini">订单详情</el-button>
          </li>
        </ul>
        <div class="more"
             @click="linkTo('/consultant/order?status=4,5')">更多订单<i class="el-icon-arrow-right"></i></div>
      </el-card>
      <el-card class="order-card">
        <p class="title">即将超时确认的订单</p>
        <ul class="list-item flex-hbc"
            v-for="(o, i) in list1"
            :key="i">
          <li class="flex-hbc">
            <el-image class="avatar"
                       :src="defaultAvatar"></el-image>
            <div>{{o.name}}</div>
          </li>
          <li>开始时间: {{o.start}}</li>
          <li>{{o.rest}}</li>
          <li class="flex-hb">
            <el-button type="primary"
                       size="mini"
                       @click="linkTo('/consultant/room')">进入房间</el-button>
            <el-button size="mini">订单详情</el-button>
          </li>
        </ul>
        <div class="more"
             @click="linkTo('/consultant/order?status=2')">更多订单<i class="el-icon-arrow-right"></i></div>
      </el-card>
    </div>
  </section>
</template>

<script>
import { getOrders, getOrdersCount } from '@/api/order'
import { getUserInfo } from '@/api/user'

export default {
  async created () {
    const l = this.loading()
    const res = await getUserInfo().catch(e => l.close())
    if (res.result) {
      // 无resume  就是未填写
      // backgroundVerifyStatus= 0  未审核
      // backgroundVerifyStatus= 1  待审核
      // backgroundVerifyStatus= 2  资料待修正
      // backgroundVerifyStatus= 3  已审核
      const o = res.msg
      // 是否填写过简历
      this.isFillResume = !!o.publicInfo.resume
      // 是否审核完成
      this.isFinishReview = o.backgroundVerifyStatus == 3
      // 是否设置过服务时间
      this.isSettingTime = !!o.publicInfo.availableTime
      const ret = await Promise.all([
        getOrders({
          from: "0",
          to: "2601444690",
          page: "1",
          limit: "100",
          condition: "status==2:status==4:status==5:"
        }),
        getOrdersCount({ condition: "status==2:status==4:status==7:status==10" })
      ]).catch(e => l.close())
      console.log(ret)
    }
    l.close()
  },
  data () {
    return {
      isFillResume: false,
      isFinishReview: false,
      isSettingTime: false,
      isActive: false,
      curStep: 1,
      pannels: [
        { name: '待确认订单', count: 5 },
        { name: '待服务订单', count: 5 },
        { name: '已完成订单', count: 5 },
        { name: '待结算订单', count: 5 }
      ],
      list1: [
        { img: '', name: '马里奥', start: '2020-1-22', rest: '有2小时30分开始' },
        { img: '', name: '马里奥', start: '2020-1-22', rest: '有2小时30分开始' },
        { img: '', name: '马里奥', start: '2020-1-22', rest: '有2小时30分开始' },
      ]
    }
  },
  computed: {
    bannerImg: function () {
      return require('../../../assets/cert-top.png')
    },
    step1: function () {
      return require('../../../assets/step1.svg')
    },
    step2: function () {
      return require('../../../assets/step2.svg')
    },
    certApply: function () {
      return require('../../../assets/cert-apply.png')
    },
    certFinish: function () {
      return require('../../../assets/cert-finish.png')
    },
    defaultAvatar: function() {
      return require('@/assets/default-avatar.png')
    }
  },
  methods: {
    handleClickPannel (item, i) {
      this.isActive = i
    },
    linkTo (path) {
      this.$router.push(path)
    },
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
$color: #15479e;
.banner {
  height: 244px;
}
.step {
  width: 420px;
  height: 420px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step.active {
  border: 1px solid $color;
}
.step-num {
  width: 70px;
  height: 70px;
  margin-top: 60px;
  margin-bottom: 50px;
}
.status-img {
  width: 90px;
  height: 90px;
  margin-bottom: 24px;
  margin: 0 auto;
}
.step-review {
  color: #15479e;
  font-size: 16px;
  text-align: center;
}
.step-setting,
.step-fill {
  color: #7c8ea5;
  font-size: 16px;
  text-align: center;
}
.step-btn {
  width: 180px;
  height: 46px;
  border-radius: 23px;
  border: 1px solid #15479e;
  margin: 50px 0;
  line-height: 46px;
  text-align: center;
  color: $color;
  cursor: pointer;
}
.step-btn:hover {
  background: linear-gradient(123deg, #15479e 0%, #3271cd 100%);
  color: #fff;
}
.reg-success {
  text-align: center;
  font-size: 32px;
  color: $color;
}
.condition {
  text-align: center;
  color: #36ae82;
  font-size: 18px;
  margin-top: 4px;
  margin-bottom: 40px;
}
.pannel {
  margin-bottom: 20px;
}
.p-item {
  width: 205px;
  height: 114px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #7c8ea5;
  cursor: pointer;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
}
.p-item > div {
  font-size: 26px;
  margin-top: 20px;
}
.p-item.active {
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border: 1px solid $color;
  color: $color;
}
.order-card {
  margin-bottom: 20px;
}
.list-item {
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
}
.title {
  font-size: 14px;
  color: $color;
  margin-bottom: 20px;
}
.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.more {
  text-align: center;
  color: $color;
  font-size: 14px;
  margin-top: 18px;
  cursor: pointer;
}
</style>
