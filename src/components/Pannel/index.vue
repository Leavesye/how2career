<template>
<div class="pannel flex">
  <div class="p-item"
      :class="{ active: current === i }"
      v-for="(o, i) in pannels"
      :key="i"
      @click="handleClickPannel(o, i)">
    <p>{{o.name}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'pannel',
  props: ['pannels', 'current'],
  data () {
    return {
      
    }
  },
  methods: {
    handleClickPannel(o, i) {
      this.$emit('change', o, i)
    }
  }
};
</script>

<style lang="scss" scoped>
.pannel {
  margin-bottom: 20px;
}
.p-item {
  margin-right: 20px;
  width: 205px;
  height: 60px;
  background: #FFFFFF;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #7C8EA5;
  cursor: pointer;
  transition: .5s all;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
  margin-left: 20px;
}
.p-item.active {  
  background: linear-gradient(123deg, #15479E 0%, #3271CD 100%);
  color: #fff;
}
</style>
