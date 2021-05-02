<template>
  <div class="service">
    <section class="top-bar">
      <top-navbar />
    </section>
    <div class="service-banner">
      你和真实职场，只有一个IntoCareer<sup>TM</sup> 的距离
    </div>
    <div style="padding: 100px 0">
      <div class="service-items flex-hbc">
        <div class="s-content fadeout-left">
          <img class="fadeout-left" :src="homeN1" alt="" />
          <h1 class="fadeout-left">60min职场达人1V1咨询</h1>
          <p class="fadeout-left">
            IntoCareer<sup>TM</sup>为你 pick目标行业资深职场达人，
          </p>
          <p class="fadeout-left">
            亲授职场实战经验，行业动向、企业风格、岗位实际需求……
          </p>
          <p class="fadeout-left">一网打尽，在分秒必争的求职路上不走弯路。</p>
        </div>
        <img class="s-img1 fadeout-right" :src="homeService1" alt="" />
      </div>
      <div class="service-items flex-hbc">
        <img class="s-img2 fadeout-left" :src="homeService2" alt="" />
        <div class="s-content fadeout-right">
          <img class="fadeout-right" :src="homeN2" alt="" />
          <h1 class="fadeout-right">60min资深人力1V1咨询</h1>
          <p class="fadeout-right">
            IntoCareer<sup>TM</sup>为你pick目标行业资深人力资源专家，
          </p>
          <p class="fadeout-right">
            帮你制定最适合你的求职策略和职业发展道路，
          </p>
          <p class="fadeout-right">助力你在职场中更好地实现自我 。</p>
        </div>
      </div>
    </div>
    <section class="tongji flex-hc" v-show="isShow">
      <div class="tj-item" v-for="(item, i) in countList" :key="i">
        <div class="count-box">
          <count-to
            separator=""
            class="count"
            :startVal="0"
            :endVal="item.count"
            :duration="2000"
          />
          <p
            v-show="item.unit == 'percent'"
            :style="{ right: item.right + 'px' }"
          >
            %
          </p>
          <i class="plus" :style="{ right: item.right + 'px' }">+</i>
        </div>
        <p class="tj-desc">{{ item.text }}</p>
      </div>
    </section>
    <section class="use-step">
      <h1>IntoCareer<sup>TM</sup> 打开方式</h1>
      <p>想要和目标行业的职场精英聊聊未来发展吗？</p>
      <p>想要了解自己和目标职位的实际匹配程度吗？</p>
      <p>想要在求职前明确努力的方向，在职场中充分发挥自我价值吗？</p>
      <p>Follow以下步骤，找到你的职场领路人！</p>
      <img :src="serviceBottom" alt="" />
    </section>
    <div class="submit-btn">立即注册</div>
    <foot-bar />
  </div>
</template>

<script>
import FootBar from "@/layout/components/FootBar";
import TopNavbar from "@/components/TopNavbar";
import CountTo from "vue-count-to";

export default {
  metaInfo: {
    title: "IntoCareerTM职前咨询平台",
    meta: [
      {
        name: "keywords",
        content: "intocareer,intocareer,..."
      },
      {
        name: "description",
        content: "IntoCareerTM职前咨询平台"
      }
    ]
  },
  components: {
    FootBar,
    TopNavbar,
    CountTo
  },
  data() {
    return {
      isShow: false,
      countList: [
        { count: 2000, text: "已帮助求职应届生", right: -20 },
        { count: 60, text: "已帮助海归求职者", right: 20 },
        { count: 90, unit: "percent", text: "用户认为很有帮助", right: 20 }
      ]
    };
  },
  computed: {
    serviceBottom: function() {
      return require("@/assets/service-bottom.png");
    },
    homeN1: function() {
      return require("@/assets/home-n1.png");
    },
    homeN2: function() {
      return require("@/assets/home-n2.png");
    },
    homeService1: function() {
      return require("@/assets/home-service1.png");
    },
    homeService2: function() {
      return require("@/assets/home-service2.png");
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const bodyHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const top = document.querySelector(".tongji").getBoundingClientRect().top;
      this.isShow = top < bodyHeight;
    }
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
.service {
  background: #fff;
}
.top-bar {
  background: #292e3d;
  position: sticky;
  top: 0px;
}
.service-banner {
  min-width: 1180px;
  height: 440px;
  background-image: url(../../assets/service-top.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1920px 440px;
  line-height: 440px;
  text-align: center;
  font-size: 40px;
  font-weight: 600;
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
  margin: 0 auto;
  color: #00b17e;
  height: 200px;
  background: #edeeef;
  font-size: 80px;
  font-weight: 400;
}
.tj-item {
  margin-top: 35px;
  margin-right: 180px;
}
.tj-item:last-child {
  margin-right: 0;
}

.count-box {
  position: relative;
}
.count-box i {
  position: absolute;
  top: -6px;
  right: -20px;
  font-size: 42px;
}
.count-box p {
  position: absolute;
  bottom: -6px;
  right: -20px;
  font-size: 42px;
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

.service-items {
  width: 1180px;
  margin: 0 auto;
}
.s-content img {
  width: 296px;
  height: 83px;
}
.s-content h1 {
  font-size: 26px;
  font-weight: 400;
  color: #36ae82;
  line-height: 37px;
  margin-top: 6px;
  margin-bottom: 30px;
}
.s-content p {
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 30px;
}
.s-img1 {
  width: 554px;
  height: 399px;
}
.s-img2 {
  width: 562px;
  height: 436px;
}
.submit-btn {
  width: 180px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-radius: 23px;
  border: 1px solid #36AE82;
  font-size: 16px;
  font-weight: 400;
  color: #36AE82;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 100px;
}
.submit-btn:hover {
  background: #36AE82;
  color: #fff;
}
</style>
