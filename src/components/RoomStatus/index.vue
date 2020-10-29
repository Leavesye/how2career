<template>
<el-dialog
  :show-close="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :title="isReady && online ? '咨询开始' : '房间状态'"
  :visible.sync="isShow"
  width="530px"
  center>
  <section class="modal-main">
    <!-- 双方都准备好倒计时三秒 -->
    <div v-if="isReady && online" class="progress-box">
      <el-progress :show-text="false" :width="250" color="#36AE82" style="position: relative" type="circle" :percentage="percent"></el-progress>
      <div class="number" :class="[o.ani]" v-for="(o, i) in nums" :key="i">{{o.v}}</div>
    </div>
    <div v-else>
      <!-- 头像 -->
      <div class="flex-hc room-header">
        <avatar :imgUrl="info.avatar"></avatar>
        <div class="speak-icon">
          <i class="iconfont iconlixian"></i>
        </div>
      </div>
      <p class="user-role">{{user.role=='consumer'? '咨询师' : '咨询者'}}</p>
      <p class="user-name">{{info.name}}</p>
      <div class="flex-hbc" style="margin-top: 40px; margin-bottom: 20px">
        <div class="line"></div>
        <p>距离{{timer.isStart ? '结束': '开始'}}还有</p>
        <div class="line"></div>
      </div>
      <count-down :timer="timer"></count-down>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <el-button :loading="isLoaded" style="width: 180px" :type="user.role=='consumer' ? 'success':'primary'" plain round @click="handleConfirm">
      {{isReady ? '等待对方加入': '我已经准备好了'}}</el-button>
  </span>
</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
import { clickReady, getRoomStatus, getRoomStatusAfterReady } from '@/api/room'

export default {
  props: ['isShow', 'timer', 'info'],
  components: {
    Avatar,
    CountDown,
  },
  data () {
    return {
      isLoaded: false,
      isReady: false,
      online: false,
      percent: 0,
      nums: [
        {v: '3', ani: ''},
        {v: '2', ani: ''},
        {v: '1', ani: ''},
      ]
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
  mounted() {
    // 未准备好轮询
    this.beforeTimer = setInterval(() => {
      this.getRoomStatus()
    }, 5000)
  },
  methods: {
    async getRoomStatus() {
      const { roomId, orderId, consultantId, consumerId } = this.info
      let roomMate = this.user.role == 'consumer' ? consultantId : consumerId
      const res = await getRoomStatus({ roomId, orderId, roomMate }).catch(e=>{
        console.log(e)
      })
      if (res.result) {
        if (res.msg == 'orderCancel') {
          this.alert('咨询超过20分钟未开始,已自动取消', 'warning')
          this.$router.push(this.user.role == 'consumer'?'/consumer/order?status=6': '/consultant/order?status=0,7,8')
        }
        // 对方是否在线
        this.online = res.msg.online
        // 对方在线 停止轮询
        if (this.online) {
          clearInterval(this.beforeTimer)
        }
      }
    },
    async getRoomStatusAfterReady() {
      const {roomId, consultantId, consumerId, orderId, slotId, startTime } = this.info
      let roomMate = this.user.role == 'consumer' ? consultantId : consumerId
      const res = await getRoomStatusAfterReady({ 
        roomId, roomMate, orderId,
        slotId, consultant: consultantId, startTime }).catch(e=>{console.log(e)})
      if (res.result) {
        if (res.msg == 'orderCancel' || res.msg == 'orderExpire') {
          this.alert(res.msg == 'orderExpire'?'咨询时间结束,请给此次服务评价':'咨询超过20分钟未开始,已自动取消', 'warning')
          this.$router.push(this.user.role == 'consumer'?'/consumer/order?status=6': '/consultant/order?status=0,7,8')
        }
        // 对方是否在线
        this.online = res.msg.online
        // 对方掉线
        if (!res.msg.online && !this.isShow) {
          this.$emit('reopen')
        }
      }
    },
    // 点击准备好了
    async handleConfirm() {
      if (this.isLoaded) return false
      this.isLoaded = true
      const res = await clickReady({
        orderId: this.info.orderId
      }).catch(e=>this.isLoaded = false)
      this.isLoaded = false
      if (res.result) {
        this.isReady = true
        // 销毁准备前定时器
        clearInterval(this.beforeTimer)
        // 启动准备后定时器轮询对方状态
        this.afterTimer = setInterval(() => {
          this.getRoomStatusAfterReady()
        }, 5000)
        if (this.isReady && this.online) {
          // 3 2 1倒计时
          this.go()
        }
      }
    },
    go() {
      this.nums.forEach((o, i) => {
        let j = i
        setTimeout(() => {
          o.ani="animate"
          this.percent += 100/3
          if (j==2) {
            setTimeout(() => this.$emit('start'), 500)
          }
        }, 1000 * j)
      })
    }
  },
  beforeDestroy() {
    // 销毁定时器
    clearInterval(this.beforeTimer)
    clearInterval(this.afterTimer)
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  margin: 0 auto;
}
.room-header {
  position: relative;
}
.speak-icon {
  position: absolute;
  bottom: -13px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background:#9B9B9B;
  padding-left: 3px;
}
.speak-icon > i {
  color: #fff;
  font-size: 22px;
}
.user-role {
  text-align: center;
  margin-top: 20px;
}
.user-name {
  text-align: center;
  font-size: 18px;
  margin-top: 10px;
}
.line {
  width: 190px;
  height: 1px;
  background: #EDEEEF;
}
.progress-box {
  margin: 0 auto;
  width: 250px;
  height: 250px;
  position: relative;
}
.number {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 160px;
  color: #15479E;
  opacity: 0;
}
@keyframes numChange {
  0%   {font-size: 120px;opacity: .5}
  50%  {font-size: 200px; opacity: 1;}
  100% {font-size: 200px;opacity: 0;}
}
.animate {
  animation: numChange 1.2s;
}
</style>
