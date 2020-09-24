<template>
  <section>
    <!-- 未认证 -->
    <div v-if="!isCert">
      <div class="banner"></div>
      <p class="reg-success">你已经成功注册咨询师</p>
      <p class="step-desc">只需再完成以下2个步骤即可开始接受咨询</p>
      <section class="flex-hb">
        <!-- 步骤1 -->
        <div class="step" :class="{active: curStep == 1}" @click="handleClickStep(1)">
          <div class="step-num"></div>
          <div class="status-img" v-if="false"></div>
          <div class="step-desc">
            <p>审核中</p>
            <p>你也可以设置服务时间</p>
          </div>
          <div class="step-btn" :class="{active: curStep == 1}">完善个人信息</div>
        </div>
        <!-- 步骤2 -->
        <div class="step" :class="{active: curStep == 2}" @click="handleClickStep(2)">
          <div class="step-num"></div>
          <div class="status-img" v-if="false"></div>
          <div class="step-desc">
            <p>审核中</p>
            <p>你也可以设置服务时间</p>
          </div>
          <div class="step-btn" :class="{active: curStep == 2}">服务时间设置</div>
        </div>
      </section>
    </div>
    <!-- 已认证 -->
    <div v-if="isCert">
      <!-- 状态面板 -->
      <div class="pannel flex-hb">
        <div class="p-item"
            :class="{ active: isActive == i }"
            v-for="(o, i) in pannels"
            :key="i"
            @click="handleClickPannel(item, i)">
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
                      size="mini">进入房间</el-button>
            <el-button size="mini">订单详情</el-button>
          </li>
        </ul>
        <p class="more">更多订单<i class="el-icon-arrow-right"></i></p>
      </el-card>
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
                      size="mini">进入房间</el-button>
            <el-button size="mini">订单详情</el-button>
          </li>
        </ul>
        <p class="more">更多订单<i class="el-icon-arrow-right"></i></p>
      </el-card>
    </div>
  </section>
</template>

<script>
import CommonTable from '@/components/CommonTable'

export default {
  name: 'answerer',
  components: {
    CommonTable,
  },
  data () {
    return {
      isCert: true,
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
  methods: {
    handleClickPannel (item, i) {
      this.isActive = i
    },
    handleClickStep (i) {
      this.curStep = i
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #15479e;
.banner {
  height:240px;
  background: #ccc;
}
.step {
  width: 420px;
  height: 420px;
  background: #FFFFFF;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.step.active {
  border: 1px solid $color;
}
.step-num {
  width: 70px;
  height: 70px;
  background: #ccc;
}
.status-img {
  width: 90px;
  height: 90px;
  background: #ccc;
}
.step-desc {
  color: $color;
  font-size: 16px;
}
.step-btn {
  width: 180px;
  height: 46px;
  border-radius: 23px;
  border: 1px solid #15479E;
  margin: 50px 0;
  line-height: 46px;
  text-align: center;
  color: $color;
}
.step-btn.active {
  background: linear-gradient(123deg, #15479E 0%, #3271CD 100%);
  color: #fff;
}
.reg-success {
  text-align: center;
  font-size:32px;
  color: $color;
}
.step-desc {
  text-align: center;
  color: #36AE82;
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
  color:$color;
  font-size: 14px;
  margin-top: 18px;
}
</style>
