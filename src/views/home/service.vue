<template>
  <div class="service">
    <section class="service-top">
      <top-navbar />
      <div class="service-banner">
        我们的服务与支持
      </div>
    </section>
    <section class="service-desc">
      <p>
        在IntoCareer平台，每天都有来自各个行业领域的职场达人和资深HR成为咨询师，他们共同构建成IntoCareer职场达人网络，以及IntoCareer职场知识矩阵。
      </p>
      <p>
        每一位入驻IntoCareer的咨询师，都经过了平台严格的把关和筛选，他们在行业领域具备领先的工作经验，以最贴近真实职场的经验和建议为你解答个性化求职问题，快来这里找到你的专属职场咨询师吧！
      </p>
    </section>
    <section class="tongji">
      <div class="tongji-inner flex-hb" v-if="isShow">
        <div class="left flex-hb">
          <div>
            <div class="flex-hc">
              <count-to
                separator=""
                class="count"
                :startVal="0"
                :endVal="2000"
                :duration="2000"
              />
              <span class="plus">+</span>
            </div>
            <p class="tj-desc">职场达人入驻平台</p>
          </div>
          <div>
            <div class="flex-hc">
              <count-to
                separator=""
                class="count"
                :startVal="0"
                :endVal="60"
                :duration="2000"
              />
              <span class="plus">+</span>
            </div>
            <p class="tj-desc">热门行业领域</p>
          </div>
        </div>
        <div class="right flex-hb">
          <div>
            <div class="flex-hc">
              <count-to
                separator=""
                class="count"
                :startVal="0"
                :endVal="1500"
                :duration="2000"
              />
              <span class="plus">+</span>
            </div>
            <p class="tj-desc">职场资深HR入驻平台</p>
          </div>
          <div>
            <div class="flex-hc">
              <count-to
                separator=""
                class="count"
                :startVal="0"
                :endVal="50"
                :duration="2000"
              />
              <span class="plus">+</span>
            </div>
            <p class="tj-desc">热门行业领域</p>
          </div>
        </div>
      </div>
    </section>
    <section class="use-step">
      <h1>用户使用步骤</h1>
      <p>想要和目标行业的职场精英聊聊未来发展吗？</p>
      <p>想要了解自己和目标职位的实际匹配程度吗？</p>
      <p>想要在求职前明确努力的方向，在职场中充分发挥自我价值吗？</p>
      <p>Follow以下步骤，找到你的职场领路人！</p>
      <img :src="serviceBottom" alt="" />
    </section>
    <foot-bar />
  </div>
</template>

<script>
import FootBar from "@/layout/components/FootBar";
import TopNavbar from "@/components/TopNavbar";
import CountTo from "vue-count-to";

export default {
  components: {
    FootBar,
    TopNavbar,
    CountTo
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    serviceBottom: function() {
      return require("@/assets/service-bottom.png");
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll() {
      const bodyHeight = document.documentElement.clientHeight || window.innerHeight
      const top = document.querySelector('.tongji').getBoundingClientRect().top
      this.isShow = top < bodyHeight
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  }
};
</script>

<style lang="scss" scoped>
.service {
  background: #fff;
}
.service-top {
  background: #292e3d;
}
.service-banner {
  width: 100%;
  height: 380px;
  background-image: url(../../assets/service-top.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1920px 380px;
  line-height: 380px;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  color: #ffffff;
  letter-spacing: 1px;
}
.service-desc {
  padding: 70px 0;
  width: 990px;
  margin: 0 auto;
}
.service-desc p {
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 36px;
}
.service-desc p:first-child {
  margin-bottom: 26px;
}
.tongji {
  height: 200px;
  background: #edeeef;
}
.tongji-inner {
  width: 1000px;
  margin: 0 auto;
}
.tongji-inner .left {
  margin-top: 50px;
  width: 400px;
  color: #36ae82;
}
.tongji-inner .right {
  margin-top: 50px;
  width: 360px;
  color: #15479e;
}
.count,
.plus {
  font-size: 42px;
  font-weight: bold;
  line-height: 57px;
  margin-right: 10px;
}
.tj-desc {
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 25px;
  margin-top: 17px;
}
.use-step {
  text-align: center;
  padding-bottom: 140px;
}
.use-step h1 {
  font-size: 36px;
  font-weight: 600;
  color: #292e3d;
  line-height: 50px;
  margin-top: 70px;
  margin-bottom: 40px;
}
.use-step p {
  font-size: 16px;
  font-weight: 300;
  color: #434d57;
  line-height: 36px;
}
.use-step img {
  width: 1033px;
  height: 650px;
  display: block;
  margin: 0 auto;
  margin-top: 70px;
}
</style>
