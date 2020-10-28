<template>
  <div class="flex-cc"
       style="font-size: 18px">
    <div class="countdown-item"
         :style="{background: timer.bg}">{{hours}}</div>
    <div>:</div>
    <div class="countdown-item"
         :style="{background: timer.bg}">{{minutes}}</div>
    <div>:</div>
    <div class="countdown-item"
         :style="{background: timer.bg}">{{seconds}}</div>
  </div>
</template>

<script>
function pad (n) {
  return (n < 10 ? '0' : '') + n
}
export default {
  name: 'countdown',
  props: ['timer'],
  data () {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  },
  watch: {
    'timer.targetTime': function(n, o) {
      this.secondsLeft = n
      this.getCountdown()
      this.sid = setInterval(this.getCountdown, 1000)
    }
  },
  methods: {
    getCountdown () {
      this.hours = pad(parseInt(this.secondsLeft / 3600))
      const minutesSeconds = this.secondsLeft % 3600
      this.minutes = pad(parseInt(minutesSeconds / 60))
      this.seconds = pad(parseInt(this.secondsLeft % 60))
      if (this.secondsLeft == 0 ) {
        // 未开始到服务中时间处理
        if (!this.isStart) {
          // 倒计时90分钟
          this.secondsLeft = 90 * 60
        } else {// 服务时间结束 销毁定时器
          clearInterval(this.sid)
        }
      } else {
        this.secondsLeft--
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.countdown-item {
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: #15479e;
  border-radius: 4px;
  color: #fff;
}
</style>
