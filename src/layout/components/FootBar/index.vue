<template>
  <el-row class="footer" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="15" class="inner">
      <section class="flex-hb links">
        <div class="flex-hbc left">
          <svg-icon @click="linkTo('/home')" icon-class="logo" class="logo"></svg-icon>
          <ul class="flex-hb">
            <li v-for="(o,i) in links" @click="linkTo(o.path)"
                :key="i">
              <el-link class="link" :underline="false">{{o.name}}</el-link>
            </li>
          </ul>
        </div>
        <ul class="flex-hb right">
          <li v-for="(o,i) in icons"
              :key="i"><el-link class="link" :underline="false"><i :class="[o.code]"></i></el-link></li>
        </ul>
      </section>
      <section class="copyright">Copyright © 2020 howto careers All rights reserved 好途职场有限公司 版权所有 沪ICP备11011234号-1 沪公网安备3100020000号</section>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'footbar',
  data () {
    return {
      links: [
        { name: '我们的服务', path: '/service' },
        { name: '关于我们', path: '/about' },
        { name: '在线客服', path: '' },
      ],
      icons: [
        { code: 'iconfont iconweixin' },
        { code: 'iconfont iconweibo' },
        { code: 'iconfont iconTwitter' },
      ],
    }
  },
  methods: {
    linkTo(path) {
      this.$router.push(path)
    },
  }
};
</script>

<style lang="scss" scoped>
.footer {
  color: #fff;
  height: 150px;
  background: #292e3d;
  .inner {
    margin: 0 auto;
    .logo {
      width: 125px;
      height: 40px;
      cursor: pointer;
      margin-right: 20px;
    }
    .links {
      padding: 24px 0;
      border-bottom: 1px solid #fff;
      .left {
        font-size: 14px;
        ul {
          width: 322px;
      
        }
      }
      .right > li {
        margin-left: 30px;
      }
    }
    .copyright {
      margin-top: 20px;
      font-size: 12px;
    }
  }
}
.link {
  color: #fff;
}
</style>
