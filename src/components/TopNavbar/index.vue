<template>
<div class="nav-bar flex-hbc" :style="{background: isBlack?'#292E3D':''}">
  <svg-icon @click="linkTo('/home')"  icon-class="logo" class="logo"></svg-icon>
  <ul class="nav-menu flex-hbc">
    <li v-for="(o, i) in menus" :key="i" @click="linkTo(o.path)">
      {{ o.name }}
    </li>
  </ul>
  <div class="top-btns flex-hbc">
    <div class="sign-in" @click="action(1)">登录</div>
    <div class="sign-up" @click="action(2)">免费注册</div>
  </div>
  <login
    @close="handleCloseLogin"
    :isShow="isShow"
    :type="type"
    :refer="refer"
    :sales="sales"
  ></login>
</div>
</template>

<script>
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
        { name: "我们的服务", path: "/service" },
        { name: "关于我们", path: "/about" },
        { name: "在线客服", path: "" }
      ],
    }
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
</style>
