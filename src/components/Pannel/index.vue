<template>
<div class="pannel flex">
  <div class="p-item"
      :class="[css, selPannel.name==o.name ? 'active': '']"
      v-for="(o, i) in pannels"
      :key="i"
      @click="handleClickPannel(o)">
    <p>{{o.name}}</p>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'pannels',
  props: ['pannels', 'selPannel', 'css'],
  data () {
    return {
      
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    handleClickPannel(o) {
      this.$emit('change', o)
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
  margin-top: 22px;
  margin-left: 20px;
}
.p-item.consultant, .p-item.sales{
  width: 205px;
}
.p-item.search {
  width: 245px;
}
.p-item.consumer {
  flex: 1;
}
.p-item.consumer:last-child {
  margin-right: 0;
}
.p-item.consultant.active {  
  background: linear-gradient(123deg, #15479E 0%, #3271CD 100%);
  color: #fff;
}
.p-item.consumer.active {  
  background: linear-gradient(122deg, #36AE82 0%, #50E3A3 100%);
  color: #fff;
}
.p-item.sales.active {  
  background-image: linear-gradient(122deg, #3464ae, #41ab83);
  color: #fff;
}
.p-item.search.active {  
  background: linear-gradient(122deg, #36AE82 0%, #50E3A3 100%);
  color: #fff;
}
</style>
