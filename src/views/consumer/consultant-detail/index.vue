<template>
  <div>
    <h1 class="page-title flex-hbc">
      <span>{{isConfirm?'订单确认':'咨询师详情'}}</span>
      <el-button plain
                 size="mini"
                 icon="el-icon-arrow-left"
                 @click="goBack">返回</el-button>
    </h1>
    <section v-if="!isConfirm"
             class="card-box">
      <div class="flex-hb">
        <el-card class="left">
          <avatar></avatar>
          <p class="name">Frank</p>
          <div class="rate-box"
               @click="showRateDetail">
            <el-rate class="user-rate"
                     disabled
                     v-model="rate"></el-rate>
            <p class="rate-count">评价:234</p>
          </div>
          <p class="motto">把你的问题交给我，让你拥有不同的人生与未</p>
          <p class="cost-item">咨询费用</p>
          <div class="flex-hc">
            <div class="num">1000</div>
            <div class="unit">RMB</div>
          </div>
        </el-card>
        <el-card class="right">
          <ul>
            <li class="flex-hbc info-item">
              <div>
                <h1>最高学历</h1>
                <p>上海交通大学 电子工程 博士 2015年毕业</p>
              </div>
              <el-button size="mini"
                         plain>更多</el-button>
            </li>
            <li class="info-item flex-hbc">
              <div>
                <h1>工作信息</h1>
                <p style="margin-bottom: 10px">所属行业: 金融与保险</p>
                <p>公司名称: 中国平安</p>
              </div>
              <div>职位: 华东区总经理</div>
              <div>工作年限: 5年</div>
              <el-button size="mini"
                         plain>更多</el-button>
            </li>
            <li class="info-item">
              <h1>主要工作内容</h1>
              <p>负责华东区所有市场和销售工作,考核员工业绩,对区域销售和市场结果负责</p>
            </li>
            <li class="info-item">
              <h1>工作个人技能</h1>
              <p>销售,管理,市场,营销分析</p>
            </li>
          </ul>
        </el-card>
      </div>
      <el-card class="calendar-card">
        <calendar @create-order="handleCreateOrder"></calendar>
      </el-card>
    </section>
    <section v-if="isConfirm"
             class="card-box">
      <el-card>
        <div class="flex-hb conform-info">
          <div class="content-l">
            <avatar></avatar>
            <p class="name">Frank</p>
            <el-rate class="user-rate"
                     disabled
                     v-model="rate"></el-rate>
          </div>
          <div class="content-r">
            <div class="flex base-info">
              <span>所属行业: 金融与保险</span>
              <span>公司名称: 中国平安</span>
              <span>职位: 华东区总经理</span>
            </div>
            <h1 class="time-title">候选预约时间</h1>
            <ul class="book-times flex-hb">
              <li v-for="(item, i) in 3"
                  :key="i">
                2020-10-22 19:00-20:30
                <i class="iconfont iconA_shanchu-01"></i>
              </li>
            </ul>
            <p class="degree">你的个人信息完整度是60%,建议完善个人信息让咨询师提供更为针对性的建议 <el-link type="success">完善信息</el-link>
            </p>
          </div>
        </div>
        <div class="flex-hec cost-box">
          <span class="cost-item"
                style="margin-right: 20px">咨询费用</span>
          <div class="num">1000</div>
          <div class="unit">RMB</div>
        </div>
        <div class="flex-hec terms">
          <el-checkbox class="check-box"
                       v-model="checked">我已阅读条款 点击 <el-link type="success">了解规则</el-link>
          </el-checkbox>
          <el-button type="success"
                     size="small"
                     @click="handleClickPay">确认付款</el-button>
        </div>
      </el-card>
    </section>
    <rate-list :isShow="isShow"
               @close="handleClose"></rate-list>
    <pay :isShow="isShowPay" @close="handleClosePay" @confirm="handleConfirmPay"></pay>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Calendar from '@/components/Calendar'
import RateList from './modal/rate-list'
import Pay from '@/components/Pay'
import { getPublicInfo } from '@/api/user'

export default {
  name: 'consultant-detail',
  components: {
    Avatar,
    Calendar,
    RateList,
    Pay
  },
  data () {
    return {
      rate: 4,
      isShow: false,
      checked: false,
      isConfirm: false,
      isShowPay: false,
    }
  },
  async created() {
    const l = this.loading()
    const res = await getPublicInfo({ userId: this.$route.params.id }).catch(e => l.close())
    l.close()
  },
  methods: {
    handleClickPay() {
      this.isShowPay = true
    },
    handleCreateOrder () {
      this.isConfirm = true
    },
    showRateDetail () {
      this.isShow = true
    },
    handleClose () {
      this.isShow = false
    },
    handleClosePay () {
      this.isShowPay = false
    },
    handleConfirmPay() {
      this.isShowPay = false
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  padding: 18px 30px;
  font-weight: 600;
  font-size: 16px;
  color: #36ae82;
  border-bottom: 1px solid #edeeef;
}
.card-box {
  padding: 30px;
}
.left {
  width: 220px;
  color: #7c8ea5;
}
.right {
  width: 640px;
}
.name {
  font-size: 18px;
  text-align: center;
  margin: 18px 0;
}
.rate-box {
  cursor: pointer;
}
.user-rate {
  text-align: center;
}
.rate-count {
  text-align: center;
  margin-bottom: 30px;
  margin-top: 10px;
}
.motto {
  font-size: 14px;
  margin-bottom: 40px;
}
.cost-item {
  font-size: 14px;
  color: #36ae82;
  text-align: center;
}
.num {
  font-size: 26px;
  margin-right: 10px;
  color: #7c8fa5;
}
.unit {
  color: #7c8fa5;
  font-size: 18px;
  margin-top: 7px;
}
.info-item {
  padding: 20px 0;
  font-size: 14px;
  color: #7c8ea5;
  border-bottom: 1px solid #edeeef;
  align-items: flex-end;
}
.info-item h1 {
  color: #36ae82;
  margin-bottom: 10px;
}
.calendar-card {
  margin-top: 20px;
}
.conform-info {
  padding-bottom: 30px;
  border-bottom: 1px solid #edeeef;
}
.content-l {
  width: 200px;
}
.content-r {
  flex: 1;
  font-size: 14px;
  color: #7c8ea5;
}
.base-info span {
  margin-right: 30px;
}
.time-title {
  color: #36ae82;
  margin-top: 50px;
  margin-bottom: 30px;
}
.book-times li {
  position: relative;
  width: 196px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #edeeef;
  border-radius: 4px;
}
.book-times li i {
  position: absolute;
  top: -14px;
  right: -7px;
}
.degree {
  margin-top: 30px;
  text-align: right;
  padding-right: 50px;
}
.cost-box {
  padding-bottom: 18px;
  border-bottom: 1px solid #edeeef;
}
.terms {
  margin: 30px 0 50px 0;
}
.check-box {
  margin-right: 30px;
}
</style>
