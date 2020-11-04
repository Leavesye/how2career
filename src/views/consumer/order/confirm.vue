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
                     v-model="info.rate"></el-rate>
          </div>
          <div class="content-r">
            <div class="flex base-info">
              <span>所属行业: {{info.industry}}</span>
              <span>公司名称: {{info.company}}</span>
              <span>职位: {{info.position}}</span>
            </div>
            <h1 class="time-title">候选预约时间</h1>
            <ul class="book-times flex-hs">
              <li v-for="(item, i) in info.times"
                  :key="i">
                {{item.text}}
                <i v-if="info.times.length > 1" class="el-icon-error" style="cousor: pointer" @click="handleDelTime(i)"></i>
              </li>
            </ul>
            <p class="degree"
               v-if="user.completion < 100">你的个人信息完整度是{{user.completion}}%,建议完善个人信息让咨询师提供更为针对性的建议 <el-link type="success"
                       @click="toPerfect">完善信息</el-link>
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
                     @click="handleClickPay">确认付款</el-button>
                     <!-- 如果是更换咨询师显示订单确认无须再支付 -->
          <el-button v-if="false" type="success"
                     @click="handleClickPay">订单确认</el-button>
        </div>
      </el-card>
    </section>
    <pay :isShow="isShowPay"
         @close="handleClosePay"
         @confirm="handleConfirmPay" :payInfo="payInfo"></pay>
  </div>
</template>

<script>
import _ from 'lodash'
import Avatar from '@/components/Avatar'
import Pay from '@/components/Pay'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { getOrderById, updateTime } from '@/api/order'
import { getDicts } from '@/api/user'

export default {
  components: {
    Avatar,
    Pay
  },
  data () {
    return {
      info: {},
      isShow: false,
      checked: false,
      isShowPay: false,
      payInfo: {},
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async created () {
    const l = this.loading()
    this.orderId = this.$route.params.id
    const res = await getOrderById({ orderId: this.orderId }).catch(e => l.close())
    if (res.result) {
      const { _id: orderId, price, consumerTime, consultant: { _id: consultantId, avatar, name, evaluationPoint, evaluationCount, 
      work: { industry, company, position } } } = res.msg
      this.payInfo = { orderId, consultantId, subject: '咨询费用', type: 'order' }
      this.oriTimes = _.cloneDeep(consumerTime)
      let rate = evaluationPoint > 0 ? evaluationPoint / evaluationCount : 0
      this.info = {
        avatarImage: avatar, nickName: name, rate, industry, company, position,
        times: consumerTime.map(o => {
          return {
            v: o,
            text: `${moment(o*1000).format('YYYY-MM-DD')} ${moment(o*1000).format('HH:mm:ss')}-${moment(o*1000).subtract(-90, 'minutes').format('HH:mm:ss')}`
          }
        }),
        price,
      }
    }
    l.close()
  },
  methods: {
    handleDelTime(i) {
      if (this.info.times.length == 1) return false
      this.info.times.splice(i, 1)
    },
    async handleClickPay () {
      if (!this.checked) {
        this.alert('请先阅读条款', 'warning')
        return false
      }
      this.isShowPay = true
      // 时间有变动  更新服务时间
      if (this.oriTimes.length != this.info.times) {
        const l = this.loading()
        const res = await updateTime({
          orderId: this.orderId,
          consumerTime: this.info.times.map(o => o.v),
        }).catch(e=>l.close())
        l.close()
      }
    },
    handleClosePay () {
      this.isShowPay = false
    },
    handleConfirmPay (isPayment) {
      this.isShowPay = false
      if (isPayment) {
        this.$router.push('/consumer/order?status=2,3,12')
      } else {
        this.alert('订单未支付成功', 'warning')
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    toPerfect () {
      this.$router.push('/consumer/perfect')
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
  font-weight: 600;
}
.book-times li {
  position: relative;
  padding: 0 4px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #edeeef;
  border-radius: 4px;
  margin-right: 8px;
}
.book-times li i {
  position: absolute;
  top: -5px;
  right: -5px;
}
.degree {
  margin-top: 30px;
  padding: 5px 9px;
  background: #f6f6f6;
  border-radius: 3px;
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
