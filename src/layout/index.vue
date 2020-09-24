<template>
<div class="layout">
  <!-- 顶部导航 -->
  <navbar></navbar>
  <!-- 中间内容区 -->
  <section class="app-main flex">
    <!-- 侧边栏 -->
    <side-bar />
    <!-- 页面路由 -->
    <transition name="fade-transform" mode="out-in">
      <router-view class="router-view" />
    </transition>
  </section>
  <!-- 底部导航 -->
  <bottom-navbar></bottom-navbar>
</div>
</template>

<script>
import { Navbar,SideBar,BottomNavbar } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    SideBar,
    BottomNavbar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.app-main {
  flex:1;
  width: 1180px;
  margin: 10px auto;
  background: #15479F;
  border-radius: 8px;
  overflow: hidden;
}
.router-view {
  overflow: auto;
  flex: 1;
  background: #FDFDFD;
  border-radius: 8px;
  padding: 30px;
  box-sizing: border-box;
}
</style>
