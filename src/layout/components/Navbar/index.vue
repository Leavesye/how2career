<template>
  <el-row class="navbar" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="15" class="menu-container flex-hbc">
      <svg-icon @click="linkTo('/home')" icon-class="logo" class="logo"></svg-icon>
      <ul class="menu">
        <li @click="linkTo(o.path)" v-for="(o, i) in menus" :key="i"><el-link class="link" :underline="false">{{o.name}}</el-link></li>
      </ul>
      <el-dropdown style="margin-top: 7px;cursor: pointer" v-if="user.nickName || user.sales">
        <el-image class="avatar-img el-dropdown-link" :src="avatar"></el-image>
        <el-dropdown-menu slot="dropdown">
          <div class="user-info">
            <div class="flex-hbc nick-name">
              <span>{{user.nickName || user.sales }}</span>
              <span @click="loginOut" style="cursor: pointer">退出</span>
            </div>
            <!-- 咨询者才有 -->
            <div v-if="user.role == 'consumer'">
              <p class="info-percent">信息完成度</p>
              <el-progress :percentage="user.completion" color="#FF5F5E" style="width: 170px"></el-progress>
            </div>
          </div>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      isShow: false,
      menus :[
        {name: '首页', path: '/home'},
        {name: '咨询服务', path: '/service'},
        {name: '关于我们', path: '/about'},
        { name: "校园计划", path: "/plan" },
      ]
    }
  },
  computed: {
    avatar: function() {
      const logo = this.user.role == 'consumer' ? require('@/assets/g-logo.png') : require('@/assets/b-logo.png')
      return this.user.avatar ? process.env.VUE_APP_HOST_NAME + this.user.avatar : logo
    },
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    handleShowDetail() {
      this.isShow = true
    },
    loginOut() {
      this.$store.dispatch('user/loginout')
    },
    linkTo(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss">
.menu {
  width: 504px;
  display: flex;
  justify-content: space-around;
  li {
    height: 60px;
    line-height: 60px;
    text-align: center;     
    font-size: 14px;
    color: #fff
  }
}
@media screen and (max-width: 768px) {
  .menu {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 60px;
  background: #292E3D;
  .menu-container {
    height: 100%;
    margin: 0 auto;
    .logo {
      width: 125px;
      height: 40px;
      cursor: pointer;
    }
  }
}
.link {
  color: #fff;
}
.avatar-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}
.user-info {
  padding: 0 15px;
  width: 200px;
  background: #FFFFFF;

}
.nick-name {
  font-size: 14px;
  color: #292E3D;
}
.info-percent {
  color: #7A7F84;
  font-size: 14px;
  margin-top: 14px;
}
</style>
