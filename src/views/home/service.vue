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
          <img
            class="fadeout-left"
            :src="homeN1"
            alt=""
          />
          <h1 class="fadeout-left">60min职场达人1V1咨询</h1>
          <p class="fadeout-left">
            IntoCareer<sup>TM</sup>为你 pick目标行业资深职场达人，
          </p>
          <p class="fadeout-left">
            亲授职场实战经验，行业动向、企业风格、岗位实际需求……
          </p>
          <p class="fadeout-left">一网打尽，在分秒必争的求职路上不走弯路。</p>
        </div>
        <img
          class="s-img1 fadeout-right"
          :src="homeService1"
          alt=""
        />
      </div>
      <div class="service-items flex-hbc">
        <img
          class="s-img2 fadeout-left"
          :src="homeService2"
          alt=""
        />
        <div class="s-content fadeout-right">
          <img
            class="fadeout-right"
            :src="homeN2"
            alt=""
          />
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
    <section
      class="tongji flex-hc"
      v-show="isShow"
    >
      <div
        class="tj-item"
        v-for="(item, i) in countList"
        :key="i"
      >
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
          <i
            class="plus"
            :style="{ right: item.right + 'px' }"
          >+</i>
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
      <div class="steps-list">
        <div
          class="step-item"
          v-for="(item, i) in steps"
          :key="i"
        >
          <div>STEP {{ item.no }}</div>
          <h1 class="step-title">{{ item.title }}</h1>
          <p class="step-p">{{ item.p1 }}</p>
          <p class="step-p">{{ item.p2 }}</p>
        </div>
      </div>
    </section>
    <div
      class="submit-btn"
      @click="goReg"
    >立即注册</div>
    <foot-bar />
  </div>
</template>

<script>
import FootBar from "@/layout/components/FootBar";
import TopNavbar from "@/components/TopNavbar";
import CountTo from "vue-count-to";

export default {
  metaInfo: {
    title: "IntoCareer职前咨询平台",
    meta: [
      {
        name: "keywords",
        content: "intocareer,intocareer,...",
      },
      {
        name: "description",
        content: "IntoCareer职前咨询平台",
      },
    ],
  },
  components: {
    FootBar,
    TopNavbar,
    CountTo,
  },
  data() {
    return {
      isShow: false,
      countList: [
        { count: 2000, text: "已帮助求职应届生", right: -20 },
        { count: 60, text: "已帮助海归求职者", right: 20 },
        { count: 90, unit: "percent", text: "用户认为很有帮助", right: 20 },
      ],
      steps: [
        {
          no: "01",
          title: "快速注册，填写基本信息",
          p1: "在个人信息页填写你的详细简历，让我们更好地了解你的教育经历和求职兴趣。",
          p2: "简历资料的完成度越高，越能为你匹配到适合的咨询师。",
        },
        {
          no: "02",
          title: "搜索咨询师",
          p1: "在咨询师搜索页面，选择“向专业人士咨询”或“向人力资源咨询”。",
          p2: "输入搜索条件，结合你的个人简历，我们将为你匹配出所有符合条件的咨询师。",
        },
        {
          no: "03",
          title: "预约咨询师时间，确认订单",
          p1: "选择咨询师，查看可预约时间表，从中选择（最多）三个候选时间段。",
          p2: "确认订单并完成付款，即可向咨询师直接发出预约邀请！",
        },
        {
          no: "06",
          title: "评价服务",
          p1: "通话结束后，为你的咨询师打个分数，并留下你的真实评价吧！",
          p2: "",
        },
        {
          no: "05",
          title: "开始服务",
          p1: "按照预约确认的时间准时进入咨询房间，与你的咨询师完成线上语音通话。",
          p2: "",
        },
        {
          no: "04",
          title: "咨询师确认预约，完善信息",
          p1: "待咨询师确认时间后，请登录个人中心填写补充信息。",
          p2: "并在待服务订单中添加你想要得到针对性解答的个人求职问题。",
        },
      ],
    };
  },
  computed: {
    serviceBottom: function () {
      return require("@/assets/steps.png");
    },
    homeN1: function () {
      return require("@/assets/home-n1.png");
    },
    homeN2: function () {
      return require("@/assets/home-n2.png");
    },
    homeService1: function () {
      return require("@/assets/home-service1.png");
    },
    homeService2: function () {
      return require("@/assets/home-service2.png");
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    goReg() {
      this.$router.push("/home?sign=true");
    },
    onScroll() {
      const bodyHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const top = document.querySelector(".tongji").getBoundingClientRect().top;
      this.isShow = top < bodyHeight;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
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
  z-index: 10000;
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
.use-step > h1 {
  font-size: 36px;
  font-weight: 600;
  color: #292e3d;
  line-height: 50px;
  margin-top: 70px;
  margin-bottom: 40px;
}
.use-step > p {
  font-size: 16px;
  font-weight: 300;
  color: #434d57;
  line-height: 36px;
}
.steps-list {
  width: 1034px;
  height: 635px;
  background-image: url(../../assets/steps.png);
  background-size: cover;
  background-position: center;
  margin: 0 auto;
  margin-top: 70px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
}
.step-item {
  width: 320px;
  height: 290px;
  padding: 40px 30px;
  box-sizing: border-box;
  text-align: left;
}
.step-item > div {
  font-size: 26px;
  color: #36ae82;
  line-height: 31px;
  margin-bottom: 20px;
}
.step-item .step-title {
  font-size: 20px;
  font-weight: 400;
  color: #292e3d;
  line-height: 28px;
  margin-bottom: 34px;
}
.step-item .step-p {
  font-weight: 300;
  color: #434d57;
  line-height: 26px;
  font-size: 14px;
}
.service-items {
  width: 1180px;
  margin: 0 auto;
}
.s-content img {
  width: 310px;
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
  border: 1px solid #36ae82;
  font-size: 16px;
  font-weight: 400;
  color: #36ae82;
  cursor: pointer;
  margin: 0 auto;
  margin-bottom: 100px;
}
.submit-btn:hover {
  background: #36ae82;
  color: #fff;
}
</style>
