<template>
<el-dialog
  :show-close="false"
  :title="isWait? '房间状态' : '咨询开始'"
  :visible.sync="isShow"
  width="530px"
  center>
  <section class="modal-main">
    <div v-if="isWait">
      <!-- 头像 -->
      <div class="flex-hc">
        <avatar></avatar>
      </div>
      <div class="flex-hbc" style="margin-top: 40px; margin-bottom: 20px">
        <div class="line"></div>
        <p>距离结束还有</p>
        <div class="line"></div>
      </div>
      <count-down bg="#7C8FA5"></count-down>
    </div>
    <div v-else class="progress-box">
      <el-progress :show-text="false" :width="250" color="#36AE82" style="position: relative" type="circle" :percentage="percent"></el-progress>
      <div class="number">3</div>
    </div>
  </section>
  <span slot="footer" class="dialog-footer">
    <!-- 咨询者 -->
    <!-- <el-button size="mini" type="primary" plain @click="handleConfirmTime">等待对方加入</el-button> -->
    <!-- <el-button size="mini" type="primary" plain @click="handleConfirmTime">我已经准备好</el-button> -->
    <!-- 咨询师 -->
    <el-button size="mini" type="info" plain @click="confirm">等待对方加入</el-button>
  </span>
</el-dialog>
</template>

<script>
import Avatar from '@/components/Avatar'
import CountDown from '@/components/CountDown'
export default {
  name: 'room-status',
  components: {
    Avatar,
    CountDown,
  },
  props: ['isShow'],
  data () {
    return {
      isWait: false,
      percent: 0,
    }
  },
  methods: {
    confirm() {
      const sid = setInterval(() => {
        if (this.percent == 100) {
          clearInterval(sid)
          this.percent = 0
          return false
        }
        this.percent +=10
      }, 300)
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-main  {
  font-size: 14px;
  color: #7C8EA5;
  margin: 0 auto;
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
  font-size: 200px;
  color: #15479E;
}
</style>
