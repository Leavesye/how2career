<template>
  <div class="sider-bar" :style="{minHeight}">
    <el-menu
      default-active="2"
      text-color="#fff"
      style="background: #15479E"
      active-text-color="#fff">
      <el-menu-item index="1" @click="linkTo('/consultant/center')">
        <i class="iconfont iconshouye-01"></i>
        <span slot="title">我的首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="linkTo('/consultant/order')">
        <i class="iconfont icondingdan-01"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="linkTo('/consultant/cost')">
        <i class="iconfont iconfeiyong-01"></i>
        <span slot="title">费用管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icongerenzhongxin-01"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item class="sub-item" index="2-1" @click="linkTo('/consultant/center')">基本信息</el-menu-item>
        <el-menu-item class="sub-item" index="2-2" @click="linkTo('/consultant/center')">资质信息</el-menu-item>
        <el-menu-item class="sub-item" index="2-3" @click="linkTo('/consultant/center')">服务时间</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-image class="room-btn" :src="roomBtn" @click="linkTo('/consultant/room')"></el-image>
    <div class="flex-hbc bottom-links">
      <el-link :underline="false" style="color: #fff">在线客服</el-link>
      <div>|</div>
      <el-link :underline="false" style="color: #fff">常见问题</el-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      minHeight: '700px'
    }
  },
  computed: {
    roomBtn: function() {
      return require('../../../assets/enter-room-btn.png')
    }
  },
  methods: {
    linkTo(path) {
      this.$router.push(path)
    },
  },
  mounted() {
    this.minHeight = document.body.clientHeight - (150+60+20*2) + 'px'
    console.log(document.body.clientHeight)
  },
};
</script>

<style lang="scss" scoped>
.sider-bar {
  position: relative;
  width: 240px;
  background: #15479E;
  padding-top: 28px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
i{
  color: #fff;
  width: 24px;
}
span {
  margin-left: 14px;
}
.sub-item {
  padding-left: 50px!important;
}
.room-btn {
  width: 180px;
  height: 50px;
  margin: 200px 0 50px 30px;
  cursor: pointer;
}
.bottom-links {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  width: 154px;
  font-size: 14px;
  color: #fff;
}
</style>
