<template>
  <div class="about">
    <section class="about-top">
      <top-navbar />
      <div class="about-banner">
        求职信息咨询领域的开拓者和引领者
      </div>
    </section>
    <section class="bottom">
      <div class="about-us">
        <h1>关于我们</h1>
        <p>
          IntoCareer是求职信息咨询领域的开拓者和引领者，致力于打造一个专业的职场知识咨询平台。
        </p>
        <p>
          我们汇聚各行业的职场精英人士，掌握最前沿的职场知识，力图打破求职过程中的信息不对称。
        </p>
        <p>从最真实的职场经验出发，为求职者打造属于自己的职业发展策略。</p>
      </div>
      <div class="contact-us">
        <h1>联系我们</h1>
        <p class="flex">
          <i class="iconfont icondingdan-01"></i
          ><span>公司地址：上海市浦东新区/深圳市南山区</span>
        </p>
        <p class="flex">
          <i class="iconfont icondingdan-01"></i
          ><span>联系电话：021-12345678</span>
        </p>
        <p class="flex">
          <i class="iconfont icondingdan-01"></i><span>联系邮箱：TBD</span>
        </p>
      </div>
      <div class="wx-qrcode">
        <img src="" alt="微信公众号" />
        <p>微信公众号</p>
      </div>
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
      isShow: false
    };
  },
  computed: {
    serviceBottom: function() {
      return require("@/assets/service-bottom.png");
    }
  },
  methods: {},
  mounted() {
    const bodyHeight = document.documentElement.clientHeight || window.innerHeight;
    window.addEventListener("scroll", () => {
      const top = document.querySelector(".tongji").getBoundingClientRect().top;
      this.isShow = top < bodyHeight;
    });
  }
};
</script>

<style lang="scss" scoped>
.about {
  background: #fff;
}
.about-top {
  background: #292e3d;
}
.about-banner {
  width: 100%;
  height: 380px;
  background-image: url(../../assets/about-banner.jpg);
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
.about-us {
  margin-top: 90px;
  margin-bottom: 140px;
}
.about-us h1,
.contact-us h1 {
  width: 144px;
  font-size: 36px;
  font-weight: 600;
  color: #292e3d;
  line-height: 50px;
  padding-bottom: 25px;
  border-bottom: 1px solid #292e3d;
  margin: 0 auto;
  margin-bottom: 44px;
}
.about-us p {
  text-align: center;
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 36px;
}
.contact-us p {
  margin: 0 auto;
  width: 370px;
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 25px;
  margin-bottom: 35px;
}
.contact-us p i {
  margin-right: 10px;
}
.wx-qrcode {
  margin-top: 140px;
}
.wx-qrcode img {
  background: #ccc;
  width: 140px;
  height: 140px;
  display: block;
  margin: 0 auto;
}
.wx-qrcode p {
  font-size: 18px;
  font-weight: 300;
  color: #292e3d;
  margin-top: 25px;
  text-align: center;
}
.bottom {
  padding-bottom: 120px;
}
</style>
