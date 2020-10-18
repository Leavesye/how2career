<template>
<el-dialog
  :show-close="false"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  :title="isReady && online? '房间状态' : '咨询开始'"
  :visible.sync="isShow"
  width="530px"
  center>
  <section class="modal-main">
    <!-- 双方都都准备好倒计时三秒 -->
    <div v-if="isReady && online" class="progress-box">
      <el-progress :show-text="false" :width="250" color="#36AE82" style="position: relative" type="circle" :percentage="percent"></el-progress>
      <div class="number" :class="[o.ani]" v-for="(o, i) in nums" :key="i">{{o.v}}</div>
    </div>
    <div v-else>
      <!-- 头像 -->
      <div class="flex-hc">
        <avatar :imgUrl="info.avatar"></avatar>
      </div>
      <p class="user-role">咨询师</p>
      <p class="user-name">{{info.name}}</p>
      <div class="flex-hbc" style="margin-top: 40px; margin-bottom: 20px">
        <div class="line"></div>
        <p>距离{{targetTime>0? '开始': '结束'}}还有</p>
        <div class="line"></div>
      </div>
      <count-down bg="#7C8FA5" :targetTime="target"></count-down>
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
  props: ['isShow', 'targetTime', 'info'],
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
    target: function() {
      return Math.abs(this.targetTime)
    }
  },
  mounted() {
    // 未准备好轮询
    this.beforeTimer = setInterval(() => {
      this.getRoomStatus()
    }, 5000)
  },
  methods: {
    async getRoomStatus() {
      const res = await getRoomStatus({ roomId: this.info.roomId, roomMate: this.info.consultantId }).catch(e=>{
        console.log(e)
      })
      if (res.result) {
        // 对方是否在线
        this.online = res.msg.online
      }
    },
    async getRoomStatusAfterReady() {
      const {roomId, consultantId, consumerId, orderId, slotId } = this.info
      let roomMate = this.user.rolo == 'consumer' ? consultantId : consumerId
      const res = await getRoomStatusAfterReady({ 
        roomId, roomMate, orderId,
        slotId, consultant: consultantId, }).catch(e=>{
        console.log(e)
      })
      if (res.result) {
        
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
        if (this.isReady && this.online) {
          // 3 2 1倒计时
          this.go()
        }
        // 销毁删除准备前定时器
        clearInterval(this.beforeTimer)
        this.afterTimer = setInterval(() => {
          this.getRoomStatusAfterReady()
        }, 5000)
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
.user-role {
  text-align: center;
  margin-top: 14px;
}
.user-name {
  text-align: center;
  font-size: 18px;
}
.line {
  width: 172px;
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
