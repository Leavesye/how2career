<template>
  <div class="home">
    <!-- 顶部导航 -->
    <div class="top-bar" :class="[isBlack ? 'isscroll' : '']">
      <top-navbar :isBlack="false" :refer="refer" :sales="sales" :sign="sign" />
    </div>
    <section class="home-top">
      <img class="top-img" :src="top" alt="" />
      <div class="inner-home">
        <div class="content">
          <p>你和职场，</p>
          <p>只有一个intoCareer<sup>TM</sup>的距离</p>
          <div>两种1V1咨询服务，IntoCareer<sup>TM</sup> 帮你洞见真实职场，让信息差无处躲藏</div>
        </div>
        <div class="right-now">了解更多</div>
      </div>
    </section>
    <section class="home-center">
      <div class="why-sel">
        <h1>消除求职信息差，我们是专业的！</h1>
        <p>
          IntoCareer<sup>TM</sup> 致力于打造专业职前咨询平台，力求帮助求职者不走弯路
        </p>
      </div>
      <ul class="center-cards flex-hbc">
        <li v-for="(item, i) in list" :key="i">
          <img :src="item.img" alt="" />
          <h1>{{ item.title }}</h1>
          <p v-for="(subitem, j) in item.texts" :key="j">{{ subitem }}</p>
        </li>
      </ul>
      <div class="service">
        <h1>两种专业服务，全方位看职场</h1>
        <p>精准匹配职场达人或资深人力，为你答疑解惑填坑铺路，求职路上不再迷茫</p>
      </div>
      <div class="service-items flex-hbc">
        <div class="s-content fadeout-left">
          <img class="fadeout-left" :src="homeN1" alt="" />
          <h1 class="fadeout-left">60min职场达人1V1咨询</h1>
          <p class="fadeout-left">IntoCareer<sup>TM</sup>为你 pick目标行业资深职场达人，</p>
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
    </section>
    <section class="home-bottom">
      <div class="consultants-part">
        <h1>IntoCareer<sup>TM</sup> 咨询师团队</h1>
        <div>
          <p>在IntoCareer<sup>TM</sup> 平台，每天都有来自各个行业领域的职场达人和资深HR成为咨询师，</p>
          <p>他们共同构建成IntoCareer<sup>TM</sup> 职场达人网络与职场知识矩阵。</p>
        </div>
        <div>
          <p>每一位入驻IntoCareer<sup>TM</sup> 的咨询师，都经过了平台严格的把关和筛选，他们在行业领域具备领先的工作经验，</p>
          <p>以最贴近真实职场的经验和建议为你解答个性化求职问题，快来这里找到你的专属职场咨询师吧！</p>
        </div>
      </div>
      <section class="tongji flex-hc">
      <div class="tj-item" v-for="(item, i) in countList" :key="i">
        <div class="count-box">
          <count-to
            separator=""
            class="count"
            :startVal="0"
            :endVal="item.count"
            :duration="2000"
          />
          <p v-show="item.unit == 'percent'" :style="{ right: item.right + 'px' }">%</p>
          <i class="plus" :style="{ right: item.right + 'px' }">+</i>
        </div>
        <p class="tj-desc">{{ item.text }}</p>
      </div>
    </section>
    </section>
    <!-- <section class="industrys">
      <h1>覆盖行业</h1>
      <ul class="industry-types flex-hbc">
        <li :class="{active: cidx==i}" @click="handleClickIndustry(i)" v-for="(item, i) in industrys" :key="i">{{ item }}</li>
      </ul>
      <img class="logobj" :src="logobj" alt="" />
    </section> -->
    <foot-bar />
  </div>
</template>

<script>
import FootBar from "@/layout/components/FootBar";
import TopNavbar from "@/components/TopNavbar";
import CountTo from "vue-count-to";

export default {
  name: "home",
  metaInfo: {
    title: 'IntoCareerTM职前咨询平台',
    meta: [
      {
        name: 'keywords',
        content: 'intocareer,intocareer,...'
      },
      {
        name: 'description',
        content: 'IntoCareerTM职前咨询平台'
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
      countList: [
        { count: 2000, text: '咨询师入驻', right: -30 },
        { count: 60, text: '覆盖企业数量', right: -20 },
        { count: 1500, text: '覆盖职位', right: -30 },
      ],
      refer: "",
      sales: "",
      sign: "",
      cidx: 0,
      isBlack: false,
      list: [
        {
          img: require("@/assets/home-i1.png"),
          title: "严格筛选的在职精英",
          texts: ["以丰富的行业资深经验", "助力你解决核心需求问题"]
        },
        {
          img: require("@/assets/home-i2.png"),
          title: "精准匹配的职业背景",
          texts: ["行业资深人力资源专家", "帮你制定最适合你的职业发展道路"]
        },
        {
          img: require("@/assets/home-i3.png"),
          title: "实战经验一对一传授",
          texts: ["亲授职场实战经验", "实时在线一对一语音传授"]
        }
      ],
      consultants: [
        {
          img: require("@/assets/consultant-1.png"),
          name: "Peter Pro",
          position: "培训高级顾问",
          rate: 5,
          count: 380,
          desc: "阿里巴巴湖畔学院在线学习负责人 ICF国际教练联盟北京分会副会长"
        },
        {
          img: require("@/assets/consultant-2.png"),
          name: "Kevin Hu",
          position: "金融分析师",
          rate: 4,
          count: 268,
          desc:
            "在美国做金融分析师的经历，分享成为金融分析师的职场规划和进阶之路。"
        },
        {
          img: require("@/assets/consultant-3.png"),
          name: "Yang li",
          position: "人力资源主管",
          rate: 5,
          count: 96,
          desc:
            "阿明尼苏达大学法学院法律博士（JD）学位，目前从事运营/法务相关工作。"
        }
      ],
      industrys: [
        "全部",
        "教育",
        "金融",
        "互联网",
        "制造",
        "广告传媒",
        "医疗",
        "IT"
      ]
    };
  },
  computed: {
    top: function() {
      return require("@/assets/home-top.jpg");
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
    },
    logobj: function() {
      return require("@/assets/logobj.png");
    }
  },
  methods: {
    handleClickIndustry(i) {
      this.cidx = i;
    },
    onScroll() {
      const bodyHeight =
        document.documentElement.clientHeight || window.innerHeight;
      Array.from(document.querySelectorAll(".fadeout-left")).map(o => {
        const top = o.getBoundingClientRect().top;
        if (top < bodyHeight && !o.className.includes("fadein-left")) {
          o.className += " fadein-left";
        }
      });
      Array.from(document.querySelectorAll(".fadeout-right")).map(o => {
        const top = o.getBoundingClientRect().top;
        if (top < bodyHeight && !o.className.includes("fadein-right")) {
          o.className += " fadein-right";
        }
      });
      const scrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      this.isBlack = scrollTop > 70;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  mounted() {
    this.refer = this.$route.query.refer;
    this.sales = this.$route.query.growth;
    this.sign = this.$route.query.sign;
    window.addEventListener("scroll", this.onScroll);
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
}
.top-bar {
  position: fixed;
  z-index: 3200;
  width: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
  transition: all 0.5s;
}
.top-bar:hover {
  background: #292e3d;
}
.isscroll {
  background: #292e3d;
}
.home {
  background: #fff;
}
.home-top {
  position: relative;
  height: 500px;
  // background-image: url(../../assets/home-top.jpg);
  // background-repeat: no-repeat;
  // background-position: center;
  // background-size: 1920px 500px;
  padding: 1px;
  min-width: 1180px;
}
.top-img {
  width: 100%;
  position: absolute;
  z-index: 1;
}
.inner-home {
  position: absolute;
  z-index: 2;
  width: 1180px;
  left: 0;
  right: 0;
  margin: auto;
}
.content {
  margin-top: 120px;
}
.content p {
  font-weight: 600;
  color: #ffffff;
  line-height: 65px;
  font-size: 46px;
  margin-bottom: 10px;
}
.content div {
  font-size: 24px;
  font-weight: 300;
  color: #ffffff;
  line-height: 30px;
  margin-top: 20px;
}
.right-now {
  width: 150px;
  height: 46px;
  line-height: 46px;
  border-radius: 23px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  margin-top: 30px;
  cursor: pointer;
  border: 1px solid #fff;
  color: #fff;
}
.right-now:hover {
  color: #226f9b;
  background: #ffffff;
}
.home-center {
  width: 1180px;
  margin: 0 auto;
  margin-top: 80px;
}
.why-sel h1 {
  font-size: 40px;
  font-weight: 600;
  color: #292e3d;
  line-height: 56px;
  text-align: center;
}
.why-sel p {
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 26px;
  margin-top: 20px;
  text-align: center;
}
.center-cards {
  margin-top: 70px;
  margin-bottom: 100px;
}
.center-cards > li {
  width: 373px;
  height: 254px;
  background: #ffffff;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: all 0.5s;
  text-align: center;
}
.center-cards > li:hover {
  transform: scale(1.05);
}
.center-cards > li img {
  width: 60px;
  height: 60px;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
}
.center-cards > li h1 {
  font-size: 22px;
  font-weight: 400;
  color: #292e3d;
  line-height: 30px;
  margin-top: 25px;
  margin-bottom: 12px;
}
.center-cards > li p {
  font-size: 16px;
  font-weight: 300;
  color: #434d57;
  line-height: 26px;
}
.service h1 {
  font-size: 40px;
  font-weight: 600;
  color: #292e3d;
  line-height: 56px;
  text-align: center;
}
.service p {
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 26px;
  margin-top: 20px;
  text-align: center;
}
.service-items {
  margin-top: 100px;
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
.home-bottom {
  margin-top: 140px;
  min-width: 1180px;
  height: 600px;
  background-image: url(../../assets/home-bottom.jpg);
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
  padding: 1px;
}
.consultants-part {
  margin-top: 80px;
  text-align: center;
}
.consultants-part h1 {
  font-size: 40px;
  font-weight: 600;
  color: #ffffff;
  line-height: 56px;
}
.consultants-part div {
  margin-top: 20px;
}
.consultants-part div p {
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  line-height: 26px;
}
.tongji {
  margin: 0 auto;
  color: #fff;
  height: 200px;
  font-size: 70px;
  font-weight: 400;
  margin-top: 60px;
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
  color: #fff;
  line-height: 25px;
  margin-top: 17px;
  text-align: center;
}

.book-btn {
  width: 150px;
  height: 46px;
  line-height: 46px;
  text-align: center;
  border-radius: 23px;
  font-size: 16px;
  font-weight: 400;
  border: 1px solid #ffffff;
  color: #ffffff;
  cursor: pointer;
  margin: 0 auto;
  margin-top: 30px;
}
.book-btn:hover {
  background: #ffffff;
  color: #226f9b;
}
.industrys {
  margin-top: 66px;
  padding-bottom: 120px;
}
.industrys h1 {
  font-size: 40px;
  font-weight: 600;
  color: #292e3d;
  line-height: 56px;
  text-align: center;
}
.industry-types {
  width: 610px;
  margin: 0 auto;
  margin-top: 28px;
  margin-bottom: 70px;
}
.industry-types li {
  font-size: 18px;
  font-weight: 300;
  color: #434d57;
  line-height: 26px;
  cursor: pointer;
}
.industry-types li.active {
  font-weight: 600;
  color: #292e3d;
}
.logobj {
  width: 1180px;
  height: 178px;
  display: block;
  margin: 0 auto;
}
.fadeout-left {
  transform: translateX(-1000px);
  opacity: 0;
  transition: all 1.5s ease-in-out;
}
.fadein-left {
  transform: translateX(0);
  opacity: 1;
}
.fadeout-right {
  transform: translateX(1920px);
  opacity: 0;
  transition: all 1.5s ease-in-out;
}
.fadein-right {
  transform: translateX(0);
  opacity: 1;
}
</style>
