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
import { mapGetters } from 'vuex'
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
        { name: '订单管理', icon: 'icondingdan-01', path: '/consultant/order/2' },
        { name: '费用管理', icon: 'iconfeiyong-01', path: '/consultant/cost/9' },
        {
          name: '个人中心', icon: 'icongerenzhongxin-01', children: [
            { name: '基本信息', path: '/consultant/baseinfo' },
            { name: '详细信息', path: '/consultant/resume' },
            { name: '服务时间', path: '/consultant/setting/1' },
            { name: '消息通知', path: '/consultant/message' },
          ]
        },
        {
          name: '平台条款', icon: 'icontiaokuan', children: [
            { name: '咨询师管理条例', url: '/html/manage-consultant.html', pageCount: 9 },
            { name: '异常流程管理条例', url: '/html/err-manage-consultant.html', pageCount: 3 },
          ]
        },
        // { name: '咨询师手册', icon: 'icontiaokuan', path: '/pdf/IntoCareer咨询师手册-20211215.pdf', isOpenNew: true }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted() {
    if (this.user.status == '4') {
      this.menus.push({ name: '咨询师手册', icon: 'icontiaokuan', path: '/pdf/IntoCareer咨询师手册-20211215.pdf', isOpenNew: true },)
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
