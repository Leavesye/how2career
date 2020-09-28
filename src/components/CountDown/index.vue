<template>
  <div class="flex-cc"
       style="font-size: 18px">
    <div class="countdown-item"
         :style="{background: bg}">{{hours}}</div>
    <div>:</div>
    <div class="countdown-item"
         :style="{background: bg}">{{minutes}}</div>
    <div>:</div>
    <div class="countdown-item"
         :style="{background: bg}">{{seconds}}</div>
  </div>
</template>

<script>
function pad (n) {
  return (n < 10 ? '0' : '') + n
}
export default {
  name: 'countdown',
  props: ['bg'],
  data () {
    return {
      hours: '00',
      minutes: '00',
      seconds: '00',
    }
  },
  methods: {
    getCountdown () {
      const currentDate = new Date().getTime()
      let secondsLeft = (this.targetDate - currentDate) / 1000
      this.hours = pad(parseInt(secondsLeft / 3600))
      secondsLeft = secondsLeft % 3600
      this.minutes = pad(parseInt(secondsLeft / 60))
      this.seconds = pad(parseInt(secondsLeft % 60))
    }
  },
  mounted () {
    this.targetDate = new Date().getTime() + (1000 * 3600 * 48)
    this.getCountdown()
    setInterval(this.getCountdown, 1000)
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
