<template>
<div class="nav-bar flex-hbc" :style="{background: isBlack?'#292E3D':''}">
  <svg-icon @click="linkTo('/home')"  icon-class="logo" class="logo"></svg-icon>
  <ul class="nav-menu flex-hbc">
    <li v-for="(o, i) in menus" :key="i" @click="linkTo(o.path)">
      {{ o.name }}
    </li>
    <li v-if="user.role" @click="linkTo(user.role=='consumer' ? '/consumer/index': 'consultant/index')">{{user.role=='consumer' ? '咨询者' : '咨询师'}}</li>
  </ul>
  <el-dropdown style="margin-top: 7px;cursor: pointer" v-if="user.nickName || user.sales" @visible-change="handleOnDropdownShow">
    <el-image class="avatar-img el-dropdown-link" :src="avatar"></el-image>
    <el-dropdown-menu slot="dropdown" class="top-dropdown">
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
  <div class="top-btns flex-hbc" v-else>
    <div class="sign-in" @click="action(1)">登录 / 注册</div>
    <!-- <div class="sign-up" @click="action(2)">免费注册</div> -->
  </div>
  <login
    id="login"
    @close="handleCloseLogin"
    :isShow="isShow"
    :type="type"
    :refer="refer"
    :sales="sales"
  ></login>
</div>
</template>

<script>
import { mapGetters } from "vuex"
import Login from "@/components/Login";
export default {
  components: {
    Login
  },
  props: {
    isBlack: {
      type: Boolean,
      default: true
    },
    refer: {
      type: String
    },
    sales: {
      type: String
    },
  },
  data () {
    return {
      isShow: false,
      type: 1,
      menus: [
        { name: "首页", path: "/home" },
        { name: "咨询服务", path: "/service" },
        { name: "关于我们", path: "/about" },
        { name: "校园计划", path: "/plan" },
      ],
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
  watch: {
    'refer': function(n, o) {
      this.$nextTick(() => {
        this.isShow = !!n || this.sales
        this.type = 2
      })
    },
    'sales': function(n, o) {
      this.$nextTick(() => {
        this.isShow = !!n || this.refer
        this.type = 2
      })
    },
  },
  methods: {
    linkTo(path) {
      this.$router.push(path)
    },
    handleCloseLogin() {
      this.isShow = false;
    },
    action(type) {
      this.isShow = true;
      this.type = type;
    },
    loginOut() {
      this.$store.dispatch('user/loginout')
    },
    handleOnDropdownShow(isShow) {
      if (isShow) {
        document.querySelector('.top-bar').style.zIndex = 1000
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-bar {
  margin: 0 auto;
  padding: 15px 0;
  width: 1180px;
}
.nav-bar .logo {
  width: 125px;
  height: 40px;
  cursor: pointer;
}
.nav-menu {
  width: 434px;
  height: 26px;
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 26px;
  cursor: pointer;
}
.sign-in {
  margin-right: 37px;
  font-weight: 400;
  color: #ffffff;
  line-height: 26px;
  cursor: pointer;
}
.sign-up {
  width: 86px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
}
.sign-up:hover {
  color: #226f9b;
  background: #ffffff;
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
