<template>
  <section style="padding: 30px">
    <!-- 未认证 -->
    <div v-if="!realVerified">
      <el-image class="banner"
                :src="bannerImg"></el-image>
      <p class="reg-success">你已经成功注册咨询师</p>
      <p class="condition">只需再完成以下2个步骤即可开始接受咨询</p>
      <section class="flex-hb">
        <!-- 步骤1 -->
        <div class="step"
             :class="{active: curStep == 1}"
             @click="handleClickStep(1)">
          <el-image class="step-num"
                    :src="step1"></el-image>
          <!-- 审核状态 -->
          <el-image class="status-img"
                    :src="certFinish"></el-image>
          <div class="step-review"
               v-if="false">
            <p>审核中</p>
            <p>你也可以设置服务时间</p>
          </div>
          <div class="step-review">
            <p>审核完成</p>
            <p>请设置服务时间</p>
          </div>
          <!-- 填写简历 -->
          <div class="step-fill"
               v-if="false">
            <p>成为咨询师需要认证简历信息</p>
            <p>请先完成简历填写</p>
          </div>
          <div v-if="false"
               class="step-btn"
               :class="{active: curStep == 1}"
               @click="linkTo('/consultant/fill')">完善个人信息</div>
        </div>
        <!-- 步骤2 -->
        <div class="step"
             :class="{active: curStep == 2}"
             @click="handleClickStep(2)">
          <el-image class="step-num"
                    :src="step2"></el-image>
          <div class="step-setting">
            <p>你也可以设置您的服务时间</p>
            <p>以便通过审核后立即开始接受订单</p>
          </div>
          <div class="step-btn"
               :class="{active: curStep == 2}"
               @click="linkTo('/consultant/setting')">服务时间设置</div>
        </div>
      </section>
    </div>
    <!-- 已认证 -->
    <div v-if="realVerified">
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
            <el-avatar class="avatar"
                       size="small"
                       icon="el-icon-user-solid"></el-avatar>
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
             @click="linkTo('/consultant/order')">更多订单<i class="el-icon-arrow-right"></i></div>
      </el-card>
      <el-card class="order-card">
        <p class="title">即将超时确认的订单</p>
        <ul class="list-item flex-hbc"
            v-for="(o, i) in list1"
            :key="i">
          <li class="flex-hbc">
            <el-avatar class="avatar"
                       size="small"
                       icon="el-icon-user-solid"></el-avatar>
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
             @click="linkTo('/consultant/order')">更多订单<i class="el-icon-arrow-right"></i></div>
      </el-card>
    </div>
  </section>
</template>

<script>
import { getConsultant } from '@/api/user'
import { getConsultantOrders, getConsultantOrdersCount } from '@/api/order'

export default {
  name: 'answerer-center',
  components: {
  },
  async created () {
    const l = this.loading()
    const res = await getConsultant().catch(e => l.close())
    if (res.result) {
      const o = res.msg
      this.realVerified = o.realVerified
      const ret = await Promise.all([getConsultantOrders(), getConsultantOrdersCount()]).catch(e=> l.close())
    }
    l.close()
    this.alert('数据加载成功')
  },
  data () {
    return {
      realVerified: true,
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
  },
  methods: {
    handleClickPannel (item, i) {
      this.isActive = i
    },
    handleClickStep (i) {
      this.curStep = i
    },
    linkTo (path) {
      this.$router.push(path)
    },
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
}
.step-btn.active {
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
}
.more {
  text-align: center;
  color: $color;
  font-size: 14px;
  margin-top: 18px;
  cursor: pointer;
}
</style>
