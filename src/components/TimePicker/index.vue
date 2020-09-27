<template>
  <div class="flex-hb time-box">
    <div>时间</div>
    <div class="flex-hbc"
         style="width: 114px">
      <el-link class="time-sel"
               :underline="false"
               @click="handleTimeClick(o, i)"
               :class="{active: curTime===i}"
               v-for="(o, i) in times"
               :key="i">{{o.name}}</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-picker',
  props: ['times', 'curTime'],
  data () {
    return {

    }
  },
  methods: {
    handleTimeClick (o, i) {
      this.$emit('change', o, i)
    }
  }
};
</script>

<style lang="scss" scoped>
.time-box {
  width: 160px;
  font-size: 14px;
}
.time-sel {
  color: #7c8fa5;
}
.time-sel.active {
  color: #434d57;
}
</style>
