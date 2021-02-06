<template>
  <div class="layout" >
    <navbar></navbar>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="15" class="app-main">
        <el-row type="flex">
          <!-- 侧边栏 -->
          <side-bar :menus="menus" />
          <!-- 页面路由 -->
          <router-view style="flex:1" class="router-view" />
          <!-- <transition name="fade-transform"
                      mode="out-in">
          </transition> -->
        </el-row>
      </el-col>
    </el-row>
    <foot-bar />
  </div>
</template>

<script>
import { Navbar, SideBar, FootBar } from './components'

export default {
  name: 'layout-consultant',
  components: {
    Navbar,
    SideBar,
    FootBar
  },
  data () {
    return {
      menus: [
        { name: '我的首页', icon: 'iconshouye-01', path: '/sales/index' },
        { name: '销售报告详情', icon: 'icondingdan-01', path: '/sales/report' },
        { name: '如何使用销售码', icon: 'icondingdan-01', path: '/sales/howto' },
      ]
    }
  }
}
</script>
<style>
.el-button--default.el-button.is-plain:hover{
  background: #FFFFFF;
  border-color: #15479E;
  color: #15479E;
}
</style>
<style lang="scss" scoped>
.app-main {
  margin: 20px auto;
  overflow: hidden;
  background-image: url('../assets/blue-bg.png');
  background-position: 240px 0px;
  background-size: 20px 100%;
  background-repeat: repeat-y;
}

.router-view {
  height: auto;
  background: #fdfdfd;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
