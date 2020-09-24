<template>
  <el-menu
      default-active="2"
      class="sider-bar"
      @open="handleOpen"
      @close="handleClose"
      background-color="#15479F"
      text-color="#fff"
      active-text-color="#fff">
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">我的首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">费用管理</span>
      </el-menu-item>
      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>个人中心</span>
        </template>
        <el-menu-item index="2-1">基本信息</el-menu-item>
        <el-menu-item index="2-2">资质信息</el-menu-item>
        <el-menu-item index="2-3">服务时间</el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  name: 'sidebar',
  data () {
    return {
      
    }
  },
  methods: {
    handleOpen() {

    },
    handleClose() {}
  }
};
</script>

<style lang="scss" scoped>
.sider-bar {
  width: 240px;
}
</style>
