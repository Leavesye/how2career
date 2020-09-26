<template>
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
  <foot-bar />
</div>
</template>

<script>
import { Navbar,SideBar,FootBar } from './components'

export default {
  name: 'Layout',
  components: {
    Navbar,
    SideBar,
    FootBar
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
