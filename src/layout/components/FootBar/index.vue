<template>
  <el-row class="footer" type="flex" justify="center">
    <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="15" class="inner">
      <section class="flex-hb links">
        <div class="flex-hbc left">
          <svg-icon @click="linkTo('/home')" icon-class="logo" class="logo"></svg-icon>
          <ul class="flex-hb">
            <li v-for="(o,i) in links" @click="handleClickLink(o)"
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
      <a class="copyright" href="https://beian.miit.gov.cn/">Copyright © 2021 intocareer All rights reserved 好途网络科技（上海）有限公司 版权所有 沪ICP备2020029242号-2</a>
    </el-col>
    <terms :isShow="isShow" @close="handleClose" :url="url" :isShowBtn="false" :pageCount="pageCount" />
  </el-row>
</template>

<script>
import Terms from "@/components/Terms";
export default {
  components: { Terms },
  data () {
    return {
      isShow: false,
      pageCount: 1,
      url: '/pdf/cookies-terms.pdf',
      links: [
        { name: '咨询服务', path: '/service' },
        { name: '关于我们', path: '/about' },
        { name: '校园计划', path: '/plan' },
        { name: 'IntoCareer Cookies政策', url: '/html/cookies.html', pageCount: 1},
        { name: 'IntoCareer 隐私政策', url: '/html/yinsi.html', pageCount: 17},
      ],
      icons: [
        { code: 'iconfont iconweixin' },
        { code: 'iconfont iconweibo' },
        { code: 'iconfont iconTwitter' },
        { code: 'iconfont iconin-01' },
        { code: 'iconfont iconf' },
      ],
    }
  },
  methods: {
    handleClose() {
      this.isShow = false
    },
    linkTo(path) {
      this.$router.push(path)
    },
    handleClickLink(item) {
      if (item.url) {
        this.isShow = true
        this.url = item.url
        this.pageCount = item.pageCount
      } else {
        this.linkTo(item.path)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.footer {
  min-width: 1180px;
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
          li {
            margin-right: 30px;
          }
        }
      }
      .right > li {
        margin-left: 30px;
      }
    }
    .copyright {
      display: block;
      margin-top: 20px;
      font-size: 12px;
    }
  }
}
.link {
  color: #fff;
}
</style>
