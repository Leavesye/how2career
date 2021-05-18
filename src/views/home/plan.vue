<template>
  <div class="about">
    <section class="top-bar">
      <top-navbar />
    </section>
    <div class="about-banner">
      IntoCareer<sup>TM</sup>校园计划
    </div>
    
    <section class="bottom">
      <div class="about-us">
        <h1 style="width: 710px;text-align: center">
          IntoCareer<sup>TM</sup> 邀请海内外优秀在校生的加入
        </h1>
        <p>
          如果你是积极活跃的校园达人
        </p>
        <p>
          如果优秀的你想要变得更优秀
        </p>
        <p>快来加入IntoCareer<sup>TM</sup> 校园团队吧</p>
      </div>
      <div class="you-will">
        <h1>你将收获…</h1>
        <div class="get-list">
          <div v-for="(item, i) in list" :key="i">
            <i class="iconfont" :class="[item.icon]"></i>
            <p>{{ item.p1 }}</p>
            <p>{{ item.p2 }}</p>
          </div>
        </div>
      </div>
      <div class="submit-btn" @click="goReg">点击这里 提交申请</div>
    </section>

    <foot-bar />
  </div>
</template>

<script>
import FootBar from "@/layout/components/FootBar";
import TopNavbar from "@/components/TopNavbar";

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
    TopNavbar
  },
  data() {
    return {
      list: [
        { icon: "iconzan-01", p1: "一个发挥你个人实力", p2: "和影响力的平台" },
        { icon: "iconrenmai-01", p1: "助力你打造更广阔的", p2: "校内外人脉网络" },
        { icon: "icon1-01", p1: "属于你的从0到1", p2: "创业项目实战经验" },
        { icon: "icon0-1-01", p1: "结识各个行业", p2: "职场达人的宝贵经历" },
        { icon: "iconzhiye-01", p1: "深入了解职场，", p2: "引领你探索职业发展" },
        { icon: "iconfuli-01", p1: "还有实习工资、实习证明… ", p2: "及更多福利！" }
      ]
    };
  },
  methods: {
    goReg() {
      this.$router.push('/home?sign=true')
    },
  }
};
</script>

<style lang="scss" scoped>
.about {
  background: #fff;
}
.top-bar {
  background: #292e3d;
  position: sticky;
  top: 0px;
  z-index: 10000;
}
.about-banner {
  min-width: 1180px;
  height: 440px;
  background-image: url(../../assets/school-i.png);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  line-height: 440px;
  text-align: center;
  font-size: 40px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 1px;
}
.about-us {
  margin-top: 90px;
  margin-bottom: 140px;
}
.about-us h1 {
  width: 144px;
  font-size: 36px;
  font-weight: 600;
  color: #292e3d;
  line-height: 50px;
  margin: 0 auto;
  margin-bottom: 44px;
  border-bottom: 1px solid #292e3d;
  padding-bottom: 25px;
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
  width: 710px;
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
.svg-i {
  width: 18px;
  height: 18px;
  margin-right: 10px;
  margin-top: 2px;
}
.you-will h1 {
  font-size: 38px;
  font-weight: 500;
  color: #292e3d;
  line-height: 53px;
  text-align: center;
  margin-bottom: 40px;
}
.get-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 810px;
  margin: 0 auto;
}
.get-list div {
  width: 220px;
  font-size: 14px;
  font-weight: 300;
  color: #434d57;
  line-height: 26px;
  margin-bottom: 30px;
  text-align: left;
}
.get-list i {
  color: #15479E;
  font-size: 44px;
}
.submit-btn {
  width: 180px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-radius: 23px;
  border: 1px solid #15479e;
  font-size: 16px;
  font-weight: 400;
  color: #15479e;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 100px;
}
.submit-btn:hover {
  background: #15479e;
  color: #fff;
}
</style>
