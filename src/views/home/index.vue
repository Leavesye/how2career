<template>
  <div class="home">
    <section class="home-top">
      <div class="inner-home">
        <!-- 顶部导航 -->
        <top-navbar :isBlack="false" :refer="refer" :sales="sales" />
        <div class="content">
          <p>求职难, 要问对人</p>
          <p>海量资深职场人, 带你了解真实职场</p>
          <div>IntoCareer汇聚全行业职场实战经验，为你的求职填坑铺路</div>
        </div>
        <div class="right-now">立刻体验</div>
      </div>
    </section>
    <section class="home-center">
      <div class="why-sel">
        <h1>为何选择我们</h1>
        <p>
          求职信息咨询领域的开拓者和引领者，致力于打造一个专业的职场知识咨询平台
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
        <h1>服务与支持</h1>
        <p>最真实的职场经验出发，为求职者打造属于自己的职业发展策略</p>
      </div>
      <div class="service-items flex-hbc">
        <div class="s-content">
          <img :src="homeN1" alt="" />
          <h1>咨询服务</h1>
          <p>IntoCareer为你 pick目标行业资深职场达人，</p>
          <p>亲授职场实战经验，行业动向、企业风格、岗位实际需求……</p>
          <p>一网打尽，在分秒必争的求职路上不走弯路。</p>
        </div>
        <img class="s-img1" :src="homeService1" alt="" />
      </div>
      <div class="service-items flex-hbc">
        <img class="s-img2" :src="homeService2" alt="" />
        <div class="s-content">
          <img :src="homeN2" alt="" />
          <h1>咨询服务</h1>
          <p>IntoCareer为你pick目标行业资深人力资源专家，</p>
          <p>帮你制定最适合你的求职策略和职业发展道路，</p>
          <p>助力你在职场中更好地实现自我 。</p>
        </div>
      </div>
    </section>
    <section class="home-bottom">
      <div class="consultants-part">
        <h1>专业咨询师</h1>
        <p>
          由众多顶级大学教育专家、国内优秀标杆企业人才，以及国内外知名咨询专家等顶级精英资源组成
        </p>
      </div>
      <ul class="consultants-list flex-hbc">
        <li class="consultant-item" v-for="(item, i) in consultants" :key="i">
          <img :src="item.img" alt="" />
          <h1>{{ item.name }}</h1>
          <h2>{{ item.position }}</h2>
          <div class="flex-hbc">
            <el-rate
              style="text-align: center"
              disabled
              :colors="['#fff','#fff','#fff']"
              v-model="item.rate"
            ></el-rate>
            <div class="rate-count">
              <i class="iconfont icondianping-01"></i>
              <span> {{ item.count }}</span>
            </div>
          </div>
          <p>{{ item.desc }}</p>
          <div class="book-btn">预约咨询</div>
        </li>
      </ul>
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
import FootBar from "@/layout/components/FootBar"
import TopNavbar from "@/components/TopNavbar"

export default {
  name: "home",
  components: {
    FootBar,
    TopNavbar
  },
  data() {
    return {
      refer: "",
      sales: "",
      cidx: 0,
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
      this.cidx = i
    }
  },
  mounted() {
    this.refer = this.$route.query.refer;
    this.sales = this.$route.query.growth;
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: #fff;
}
.home-top {
  width: 100%;
  height: 500px;
  background-image: url(../../assets/home-top.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1920px 500px;
  padding: 1px;
  min-width: 1180px;
}
.inner-home {
  width: 1180px;
  margin: 0 auto;
}
.content {
  margin-top: 90px;
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
  margin-top: 30px;
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
.home-bottom {
  margin-top: 140px;
  width: 100%;
  height: 800px;
  background-image: url(../../assets/home-bottom.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 1920px 800px;
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
.consultants-part p {
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  line-height: 26px;
  margin-top: 20px;
}
.consultants-list {
  width: 930px;
  margin: 0 auto;
  margin-top: 80px;
}
.consultant-item {
  width: 250px;
}
.consultant-item img {
  width: 250px;
  height: 170px;
  display: block;
}
.consultant-item h1 {
  font-size: 22px;
  font-weight: bold;
  color: #ffffff;
  line-height: 30px;
  margin-top: 20px;
}
.consultant-item h2 {
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
  line-height: 22px;
  margin-top: 6px;
}
.rate-count {
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  line-height: 19px;
  margin: 6px 0;
}
.consultant-item p {
  font-size: 14px;
  font-weight: 300;
  color: #ffffff;
  line-height: 22px;
  margin-top: 20px;
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
</style>
