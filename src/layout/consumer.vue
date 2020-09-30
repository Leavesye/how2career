<template>
<div class="layout">
  <navbar></navbar>
  <section class="app-main flex">
    <!-- 侧边栏 -->
    <side-bar :menus="menus" :type="1"/>
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
  },
  data () {
    return {
      menus: [
        { name: '我的首页', icon: 'iconshouye-01', path: '/consumer/index' },
        { name: '我的订单', icon: 'icondingdan-01', path: '/consumer/order' },
        { name: '咨询师搜索', icon: 'iconsousuo-01', path: '/consumer/search' },
        { name: '好友推荐', icon: 'iconfeiyong-01', path: '/consumer/recommend' },
        {
          name: '个人中心', icon: 'icongerenzhongxin-01', children: [
            { name: '账户信息', path: '/consumer/search' },
            { name: '实名认证', path: '/consumer/search' },
            { name: '补充信息', path: '/consumer/search' },
            { name: '我的收藏', path: '/consumer/search' },
            { name: '消息通知', path: '/consumer/search' },
          ]
        },
      ]
    }
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
