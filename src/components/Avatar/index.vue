<template>
<el-image
    class="avatar"
    :src="url"></el-image>
    <!-- <div class="micro ani"><i class="iconfont iconhuatong"></i></div> -->
</template>

<script>
export default {
  name: 'avatar',
  props: ['imgUrl'],
  data () {
    return {
      
    }
  },
  computed: {
    url: function() {
      return this.imgUrl ? process.env.VUE_APP_HOST_NAME + this.imgUrl : require('@/assets/default-avatar.png')
    }
  },
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
.avatar {
  width: 90px;
  height: 90px;
  background: #D8D8D8;
  box-shadow: 0px 2px 8px 0px rgba(21, 71, 159, 0.4);
  border: 6px solid #FFFFFF;
  border-radius: 50%;
  display: block;
  margin: 0 auto;
}
.micro {
  position: absolute;
  left: 62px;
  bottom: 30px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #36AE82;
}
.micro i {
  color: #fff;
  font-size: 19px;
}
@keyframes flash {
  from {background: #36AE82}
  to {background: #15CA83}
}
.ani {
  animation: flash 1s infinite;
}
</style>
