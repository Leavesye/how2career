<template>
  <div class="layout">
    <navbar></navbar>
    <section class="app-main flex">
      <!-- 侧边栏 -->
      <side-bar :menus="menus" :type="2" />
      <!-- 页面路由 -->
      <transition name="fade-transform"
                  mode="out-in">
        <router-view class="router-view" />
      </transition>
    </section>
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
        { name: '我的首页', icon: 'iconshouye-01', path: '/consultant/index' },
        { name: '订单管理', icon: 'icondingdan-01', path: '/consultant/order' },
        { name: '费用管理', icon: 'iconfeiyong-01', path: '/consultant/cost' },
        {
          name: '个人中心', icon: 'icongerenzhongxin-01', children: [
            { name: '基本信息', path: '/consultant/baseinfo' },
            { name: '资质信息', path: '/consultant/resume' },
            { name: '服务时间', path: '/consultant/setting' },
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
  background: #fdfdfd;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
