<template>
<div class="layout">
  <navbar></navbar>
  <section class="app-main flex">
    <!-- 页面路由 -->
    <transition name="fade-transform" mode="out-in">
      <router-view class="router-view" />
    </transition>
  </section>
</div>
</template>

<script>
import { Navbar } from './components'

export default {
  name: 'reg-layout',
  components: {
    Navbar
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 940px;
  margin: 20px auto 0;
  padding-bottom: 20px;
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
