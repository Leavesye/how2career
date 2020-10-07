<template>
  <div>
    <h1 class="page-title flex-hbc">
      <span>订单确认</span>
      <el-button plain
                 size="mini"
                 icon="el-icon-arrow-left"
                 @click="goBack">返回</el-button>
    </h1>
    <section class="card-box">
      <el-card>
        <div class="flex-hb conform-info">
          <div class="content-l">
            <avatar :imgUrl="info.avatarImage"></avatar>
            <p class="name">{{info.nickName}}</p>
            <el-rate class="user-rate"
                     disabled
                     v-model="rate"></el-rate>
          </div>
          <div class="content-r">
            <div class="flex base-info">
              <span>所属行业: {{info.industry}}</span>
              <span>公司名称: {{info.company}}</span>
              <span>职位: {{info.position}}</span>
            </div>
            <h1 class="time-title">候选预约时间</h1>
            <ul class="book-times flex-hb">
              <li v-for="(item, i) in info.times"
                  :key="i">
                {{item.selText}}
                <i class="el-icon-error"></i>
              </li>
            </ul>
            <p class="degree">你的个人信息完整度是60%,建议完善个人信息让咨询师提供更为针对性的建议 <el-link type="success">完善信息</el-link>
            </p>
          </div>
        </div>
        <div class="flex-hec cost-box">
          <span class="cost-item"
                style="margin-right: 20px">咨询费用</span>
          <div class="confirm-num">{{info.price}}</div>
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
    <pay :isShow="isShowPay"
         @close="handleClosePay"
         @confirm="handleConfirmPay"></pay>
  </div>
</template>

<script>
import Avatar from '@/components/Avatar'
import Pay from '@/components/Pay'
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
    Avatar,
    Pay
  },
  data () {
    return {
      info: {},
      rate: 4,
      isShow: false,
      checked: false,
      isShowPay: false,
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async created () {
    // this.info = JSON.parse(this.$route.query.info)
  },
  methods: {
    handleClickPay () {
      this.isShowPay = true
    },
    handleClosePay () {
      this.isShowPay = false
    },
    handleConfirmPay () {
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
  margin-bottom: 20px;
}
.motto {
  font-size: 14px;
  margin-bottom: 40px;
  text-align: justify;
  height: 150px;
  overflow: hidden;
}
.user-rate {
  text-align: center;
}
.cost-item {
  font-size: 14px;
  color: #36ae82;
  text-align: center;
  margin-top: 10px;
  font-weight: 600;
}
.num {
  font-size: 26px;
  margin-right: 10px;
  color: #7c8fa5;
}
.confirm-num {
  font-size: 26px;
  margin-right: 10px;
  color: #7c8fa5;
  padding-top: 8px;
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
  font-weight: 600;
}
.calendar-card {
  margin-top: 20px;
}
.calendar-card h1 {
  color: #36ae82;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 14px;
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
  margin-top: 20px;
  margin-bottom: 20px;
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
  top: -5px;
  right: -5px;
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
