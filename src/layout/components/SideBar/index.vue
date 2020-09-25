<template>
  <div class="sider-bar">
    <el-menu
      default-active="2"
      text-color="#fff"
      style="background: #15479E"
      active-text-color="#fff">
      <el-menu-item index="1" @click="linkTo('/answerer/center')">
        <i class="iconfont iconshouye-01"></i>
        <span slot="title">我的首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="linkTo('/answerer/order')">
        <i class="iconfont icondingdan-01"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="3" @click="linkTo('/answerer/cost')">
        <i class="iconfont iconfeiyong-01"></i>
        <span slot="title">费用管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="iconfont icongerenzhongxin-01"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item class="sub-item" index="2-1" @click="linkTo('/answerer/center')">基本信息</el-menu-item>
        <el-menu-item class="sub-item" index="2-2" @click="linkTo('/answerer/center')">资质信息</el-menu-item>
        <el-menu-item class="sub-item" index="2-3" @click="linkTo('/answerer/center')">服务时间</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      
    }
  },
  methods: {
    linkTo(path) {
      this.$router.push(path)
    },
  }
};
</script>

<style lang="scss" scoped>
.sider-bar {
  width: 250px;
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
</style>
