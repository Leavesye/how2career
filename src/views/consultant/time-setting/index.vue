<template>
  <div style="padding: 30px">
    <!-- 状态面板 -->
    <pannel @change="handlePannelChange"
            :pannels="pannels"
            css="consultant"
            :selPannel="selPannel"></pannel>
    <!-- 日程表 -->
    <el-card v-if="selPannel.status==1">
      <scheduler v-if="isLoaded"
                 :events="events"
                 @reload="handleReloadSchduler"></scheduler>
    </el-card>
    <section v-else>
      <el-card style="margin-bottom: 20px">
        <!-- 数据面板 -->
        <ul class="slot-pannels flex-hbc">
          <li>
            <p>当前Slot数</p>
            <div>{{countMap.total}}</div>
          </li>
          <li>
            <p>可用Slot数</p>
            <div>{{countMap.usable}}</div>
          </li>
          <li>
            <p>停用Slot数</p>
            <div>{{countMap.total - countMap.usable}}</div>
          </li>
        </ul>
        <div class="slot-desc">
          <div>*Slot（周预约时段）数指在一个自然周内，可以成功预约的咨询服务数量，每个Slot时间长度为1小时30分钟，以确保1小时的标准服务时间；</div>
          <div>*为保证每次咨询服务的质量，咨询师需要按照自己的Slot数缴纳服务押金，每个Slot押金为人民币300元；</div>
          <div>*为了保证正常接单，咨询师需要保证至少一个周预约时段有足够的押金；</div>
          <div>*咨询师的服务押金管理，详见《异常流程处理办法》。</div>
        </div>
      </el-card>
      <ul class="slot-box">
        <template v-for="(item, i) in list">
          <li :key="i"
              v-if="!item.isBlank"
              class="slot-item">
            <h1 class="flex-hbc">
              <span>Slot Id {{item.slotId}}</span>
              <div class="slot-state" :style="{backgroundColor: item.color}">{{ item.status }}</div>
            </h1>
            <div class="slot-times">
              <p v-if="item.occupied">服务时间:{{item.occupiedTime}}</p>
              <p v-if="!item.active">需补缴费用:{{item.cost-item.costLeft}} RMB</p>
              <p>过期时间:{{item.expireTime}}</p>
            </div>
            <div class="slot-btns">
              <el-button plain v-if="!item.active" @click="handlePayBack(item)">补缴费用</el-button>
              <el-button plain v-if="item.status!='占用'" @click="handleCloseSlot(item)">关闭</el-button>
            </div>
          </li>
          <li :key="i" v-else class="blank-item"></li>
        </template>
      </ul>
      <div class="flex-he">
        <el-button :loading="isLoading" type="primary" @click="handleBuySlot">获取更多Slot</el-button>
      </div>
    </section>
    <!-- 支付 -->
    <pay-modal :isShow="isShowPay"
               :payInfo="payInfo"
               @close="handleClosePay"
               @confirm="handleConfirmPay">
               <p class="pay-tips">当前所需支付费用为{{payAmout}}RMB,请选择您的支付方式</p>
    </pay-modal>
  </div>
</template>
<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import Pannel from '@/components/Pannel'
import Scheduler from '@/components/Scheduler'
import PayModal from '@/components/Pay'
import { getUserInfo } from '@/api/user'
import { getSlots, closeSlot, getSlotPrice, getSignStatus } from '@/api/consultant'

export default {
  name: 'time-setting',
  components: {
    Scheduler,
    PayModal,
    Pannel
  },
  data () {
    return {
      countMap: {
        total: 0,
        usable: 0,
      },
      isShowPay: false,
      selPannel: { name: '服务时间设置', status: 1 },
      pannels: [
        { name: '服务时间设置', status: 1 },
        { name: 'Slot设置', status: 2 },
      ],
      slots: [],
      events: [],
      isLoaded: false,
      payInfo: {},
      payAmout: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    list: function() {
      let target = this.slots
      const rest = this.slots.length % 3
      if (rest > 0) {
        let blankCount = 3-rest
        Array.from({ length: blankCount }).forEach(o => {
          target.push({ isBlank: true })
        })
      }
      return target
    }
  },
  methods: {
    handlePannelChange (item) {
      // 未完成审核
      if (item.status == 2 && this.user.status!=4) {
        this.$alert('请完成资料审核后再设置slot')
        return false
      }
      if (this.selPannel.name == item.name) {
        return false
      }
      this.$router.push(`/consultant/setting/${item.status}`)
      this.selPannel = item
      if (item.status == 2) {
        this.querySlots()
      } else {
        this.getSchdulerData()
      }
    },
    async querySlots() {
      const l = this.loading()
        const res = await getSlots().catch(e=> l.close())
        if (res.result && res.msg) {
          this.slots = (res.msg.slots || []).map(o => {
            // active: 可用/不可用   occupied 被占用  
            const { _id: slotId, occupied, occupiedTime, cost, costLeft, expireTime, active } = o
            let status = '不可用'
            let color= '#FF5F5E'
            const isExpire = moment().valueOf() > expireTime * 1000
            if (isExpire) {
              status = '已过期'
              color = '#C8C8C8'
            } else if (occupied) {
              status = '占用'
              color = '#15479F'
            } else if (active) {
              status = '可用'
              color = '#36AE82'
            }
            return {
              slotId, cost, costLeft, status,color, occupied, active, isExpire,
              occupiedTime: occupiedTime ? moment(occupiedTime * 1000).format('YYYY-MM-DD HH:mm'): '',
              expireTime: expireTime?moment(expireTime * 1000).format('YYYY-MM-DD'): ''
            }
          })
        }
        this.countMap.total = this.slots.length
        this.countMap.usable = this.slots.filter(o => o.active).length
        l.close()
    },
    // 补缴费用
    handlePayBack(item) {
      this.isShowPay = true
      this.payAmout = item.cost-item.costLeft
      this.payInfo = { slotId: item.slotId, consultantId: this.user.userId, subject: 'slot激活费', type: 'activeSlot' }
    },
    // 购买slot
    async handleBuySlot() {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await getSlotPrice().catch(e=>this.isLoading=false)
      if (res.result) {
        this.isShowPay = true
        this.payAmout = res.msg.price
        this.payInfo = { consultantId: this.user.userId, subject: '购买slot', type: 'newSlot' }
      }
      this.isLoading=false
    },
    async handleCloseSlot(item) {
      this.$confirm(`关闭slot您将获得${item.costLeft}RMB退款`, 'Slot关闭', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'primary',
          center: true
        }).then(() => {
          this.closeSlot(item)
        })
    },
    async closeSlot(item) {
      const l = this.loading()
      const res = await closeSlot({ slotId: item.slotId }).catch(e => l.close())
      if (res.result) {
        this.querySlots()
      }
      l.close()
    },
    handleClosePay () {
      this.isShowPay = false
    },
    handleConfirmPay (isPayment) {
      this.isShowPay = false
      if (isPayment) {
        this.alert('支付成功')
        this.querySlots()
      } else {
        this.alert('未支付成功', 'warning')
      }
    },
    handleReloadSchduler () {
      this.getSchdulerData()
    },
    async getSchdulerData () {
      this.isLoaded = false
      const l = this.loading()
      const res = await getUserInfo().catch(e => {
        l.close()
        this.isLoaded = true
      })
      if (res.result) {
        const { publicInfo: { availableTime = [] } } = res.msg
        this.events = availableTime
      }
      this.isLoaded = true
      l.close()
    }
  },
  async created () {
    // 获取最新审核状态
    let res = await getSignStatus()
    this.$store.dispatch('user/setUser', { status: res.msg.backgroundVerifyStatus })
    // 处理带参跳转
    let status = this.$route.params.status
    this.selPannel = this.pannels.find(o => o.status == status)
    if (status == '1') {
      this.getSchdulerData()
    } else {
      this.querySlots()
    }
  },
}
</script>

<style lang="scss" scoped>
.slot-pannels {
  width: 600px;
  margin: 0 auto;
  text-align: center;
}
.slot-pannels li p {
  font-size: 14px;
  color: #15479e;
  margin-bottom: 10px;
  font-weight: 600;
}
.slot-pannels li div {
  font-size: 26px;
  color: #7c8fa5;
  font-weight: 600;
  font-family: 'notosans-bold,notosans-regular';
}
.slot-desc {
  width: 640px;
  font-size: 14px;
  color: #7c8fa5;
  background: #f6f6f6;
  border-radius: 3px;
  margin: 0 auto;
  padding: 20px;
  margin-top: 10px;
}
.slot-desc div {
  margin-bottom: 10px;
}
.slot-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.slot-item {
  position: relative;
  flex-basis: 32.2%;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
  transition: box-shadow .3s,border-color .3s;
}
.slot-item:hover {
    border-color: transparent;
    box-shadow: 0 1px 2px -2px rgba(0,0,0,.16), 0 3px 6px 0 rgba(0,0,0,.12), 0 5px 12px 4px rgba(0,0,0,.09)
}
.blank-item {
  flex-basis: 32%;
  height: 180px;
}
.slot-item h1 {
  font-size: 14px;
  color: #15479E;
  padding: 10px 20px;
  border-bottom: 1px solid #EDEEEF;
}
.slot-item h1 > span {
  font-weight: 600
}
.slot-state {
  border-radius: 13px;
  color: #fff;
  min-width: 40px;
  text-align: center;
  font-weight: 400;
  padding: 0 5px;
}
.slot-times {
  padding-top: 12px;
}
.slot-times > p {
  color: #7C8EA5;
  font-size: 14px;
  margin-bottom: 8px;
  padding-left: 20px;
}
.slot-btns {
  position: absolute;
  right: 18px;
  bottom: 18px;
}
.pay-tips {
  text-align: center;
  margin-bottom: 30px;
}
</style>
