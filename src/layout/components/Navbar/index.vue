<template>
  <section class="navbar">
    <section class="menu-container flex-hbc">
      <el-image  @click="goHome" class="logo" :src="logoImg"></el-image>
      <ul class="menu">
        <li v-for="(o, i) in menus" :key="i"><el-link class="link" :underline="false">{{o.name}}</el-link></li>
      </ul>
      <el-avatar size="small" icon="el-icon-user-solid"></el-avatar>
    </section>
  </section>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {
      logoImg: require('../../../assets/logo.png'),
      menus :[
        {name: '首页', path: ''},
        {name: '我们的服务', path: ''},
        {name: '关于我们', path: ''},
        {name: '联系我们', path: ''},
      ]
    }
  },
  computed: {
    logoImg: function() {
      return require('../../../assets/logo.png')
    }
  },
  methods: {
    goHome() {
      this.$router.push('/home')
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  height: 60px;
  background: #292E3D;
  .menu-container {
    width: 1180px;
    height: 100%;
    margin: 0 auto;
    .logo {
      width: 96px;
      height: 40px;
      background: #fff;
      cursor: pointer;
    }
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
  }
}
.link {
  color: #fff;
}
</style>
