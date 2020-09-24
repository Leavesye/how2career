<template>
  <section class="navbar">
    <section class="menu-container flex-hbc">
      <div class="logo"></div>
      <ul class="menu">
        <li v-for="(o, i) in menus" :key="i">{{o.name}}</li>
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
      menus :[
        {name: '首页', path: ''},
        {name: '我们的服务', path: ''},
        {name: '关于我们', path: ''},
        {name: '联系我们', path: ''},
      ]
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.navbar {
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
</style>
