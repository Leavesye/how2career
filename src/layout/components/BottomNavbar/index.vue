<template>
  <section class="footer">
    <div class="inner">
      <section class="flex-hb links">
        <div class="flex-hbc left">
          <div>好途职场</div>
          <ul class="flex-hb">
            <li v-for="(o,i) in links"
                :key="i">{{o.name}}</li>
          </ul>
        </div>
        <ul class="flex-hb right">
          <li v-for="(o,i) in imgs"
              :key="i">{{o.name}}</li>
        </ul>
      </section>
      <section class="copyright">Copyright © 2020 howto careers All rights reserved 好途职场有限公司 版权所有 沪ICP备11011234号-1 沪公网安备3100020000号</section>
    </div>
  </section>
</template>

<script>
export default {
  name: 'bottom-navbar',
  data () {
    return {
      links: [
        { name: '我们的服务', path: '' },
        { name: '关于我们', path: '' },
        { name: '联系我们', path: '' },
        { name: '在线客服', path: '' },
      ],
      imgs: [
        { name: '关于我们', path: '' },
        { name: '联系我们', path: '' },
        { name: '在线客服', path: '' },
      ],
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.footer {
  color: #fff;
  height: 150px;
  background: #292E3D;
  display: none;
  .inner {
    width: 1180px;
    margin: 0 auto;
    .links {
      padding: 24px 0;
      border-bottom: 1px solid #fff;
      .left {
        width: 450px;
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
</style>
