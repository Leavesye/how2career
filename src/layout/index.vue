<template>
<!-- <div class="layout"> -->
  <!-- 顶部导航 -->
  <!-- <navbar></navbar> -->
  <!-- 中间内容区 -->
  <!-- <section class="app-main flex"> -->
    <!-- 侧边栏 -->
    <!-- <side-bar /> -->
    <!-- 页面路由 -->
    <!-- <transition name="fade-transform" mode="out-in">
      <router-view class="router-view" />
    </transition> -->
  <!-- </section> -->
  <!-- 底部导航 -->
  <!-- <bottom-navbar></bottom-navbar> -->
<!-- </div> -->
<div class="layout">
  <navbar></navbar>
  <section class="app-main flex">
    <!-- 侧边栏 -->
    <side-bar />
    <!-- 页面路由 -->
    <transition name="fade-transform" mode="out-in">
      <router-view class="router-view" />
    </transition>
  </section>
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
.app-main {
  width: 1180px;
  margin: 20px auto;
  overflow: hidden;
}

.router-view {
  height: auto;
  width: 940px;
  background: #FDFDFD;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
