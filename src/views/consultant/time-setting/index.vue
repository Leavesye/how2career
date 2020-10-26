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
        <p class="slot-desc">该数字代表在一个自然周内,你可同时接的预约,你可以通过购买更多的slot来增加每周的同时预约数</p>
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
              <el-button plain @click="handleCloseSlot(item)">关闭</el-button>
            </div>
          </li>
          <li :key="i" v-else class="blank-item"></li>
        </template>
      </ul>
      <div class="flex-he">
        <el-button :loading="isLoading" type="primary" @click="handleBuySlot">购买更多slot</el-button>
      </div>
    </section>
    <!-- 支付 -->
    <pay-modal :isShow="isShowPay"
               :payInfo="payInfo"
               @close="handleClosePay"
               @confirm="handleConfirmPay">
               <p class="pay-tips">当前所需支付费用为{{payAmout}}RMB,亲选择您的支付方式</p>
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
import { getSlots, closeSlot, getSlotPrice } from '@/api/consultant'

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
      if (this.selPannel.name == item.name) {
        return false
      }
      this.selPannel = item
      if (item.status == 2) {
        this.querySlots()
      }
    },
    async querySlots() {
      const l = this.loading()
        const res = await getSlots().catch(e=> l.close())
        if (res.result) {
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
        this.alert('未完成支付', 'warning')
      }
    },
    handleReloadSchduler () {
      this.init()
    },
    async init () {
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
    this.init()
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
  text-align: center;
  padding: 3px;
  margin-top: 10px;
}
.slot-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.slot-item {
  position: relative;
  flex-basis: 32%;
  height: 180px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-bottom: 20px;
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
