<template>
  <div class="layout" >
    <navbar></navbar>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="15" class="app-main">
        <el-row type="flex">
          <!-- 侧边栏 -->
          <side-bar :menus="menus" />
          <!-- 页面路由 -->
          <transition name="fade-transform"
                      mode="out-in">
            <router-view style="flex:1" class="router-view" />
          </transition>
        </el-row>
      </el-col>
    </el-row>
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
        { name: '好友推荐', icon: 'iconhaoyouyaoqing-01', path: '/consumer/recommend' },
        {
          name: '个人中心', icon: 'icongerenzhongxin-01', children: [
            { name: '账户信息', path: '/consumer/baseinfo' },
            { name: '实名认证', path: '/consumer/verified' },
            { name: '补充信息', path: '/consumer/perfect' },
            { name: '我的收藏', path: '/consumer/favorites' },
            { name: '消息通知', path: '/consumer/message' },
          ]
        },
      ]
    }
  },
}
</script>
<style lang="scss" scoped>
.app-main {
  margin: 20px 0;
  overflow: hidden;
}

.router-view {
  height: auto;
  background: #FDFDFD;
  border-radius: 8px;
  box-sizing: border-box;
}
</style>
