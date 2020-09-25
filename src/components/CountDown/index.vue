<template>
<div class="flex-cc" style="font-size: 18px">
  <div class="countdown-item" :style="{background: bg}">00</div>
  <div>:</div>
  <div class="countdown-item" :style="{background: bg}">15</div>
  <div>:</div>
  <div class="countdown-item" :style="{background: bg}">00</div>
</div>
</template>

<script>
export default {
  name: 'countdown',
  props: ['bg'],
  data () {
    return {
      
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.countdown-item {
  width: 35px;
  height: 35px;
  line-height: 35px;
  text-align: center;
  background: #15479E;
  border-radius: 4px;
  color: #fff;
}
</style>
