<template>
  <section
    style="padding: 30px"
    v-if="isLoaded"
  >
    <!-- 未认证简历或者没有填写服务时间 -->
    <div v-if="!isFinishReview || !isSettingTime">
      <el-image
        class="banner"
        fit="contain"
        :src="bannerImg"
      ></el-image>
      <p class="reg-success">你已经成功注册咨询师</p>
      <p class="condition">只需再完成以下2个步骤即可开始接受咨询</p>
      <section class="flex-hb">
        <!-- 步骤1 -->
        <div
          class="step"
          :class="{active: !isFinishReview }"
        >
          <el-image
            class="step-num"
            :src="step1"
          ></el-image>
          <!-- 审核中 -->
          <el-image
            v-if="isFillResume && !isFinishReview && !isGoSign && !isWaitingCorrection"
            class="status-img"
            :src="certApply"
          ></el-image>
          <div
            class="step-review"
            v-if="isFillResume && !isFinishReview && !isGoSign && !isWaitingCorrection"
          >
            <p>审核中</p>
            <p>你也可以设置服务时间</p>
          </div>
          <!-- 劳务合同签署 -->
          <div
            class="step-btn"
            style="width: 230px"
            v-if="isGoSign"
            @click="handleOpenWindow"
          >点击进行劳务合同签署</div>
          <!-- 资料待修正 -->
          <div
            class="step-fill"
            v-if="isWaitingCorrection"
          >
            <p>您的资料有缺失或者错误未通过审核</p>
          </div>
          <div
            class="step-btn"
            style="width: 230px"
            v-if="isWaitingCorrection"
            @click="linkTo('/consultant/resume')"
          >资料修正</div>
          <!-- 审核完成 -->
          <el-image
            v-if="isFinishReview"
            class="status-img"
            :src="certFinish"
          ></el-image>
          <div
            class="step-review"
            v-if="isFinishReview"
          >
            <p>审核完成</p>
            <p>请设置服务时间</p>
          </div>
          <!-- 填写简历 -->
          <div
            class="step-fill"
            v-if="!isFillResume"
          >
            <p>成为咨询师需要认证简历信息</p>
            <p>请先完成简历填写</p>
          </div>
          <div
            v-if="!isFillResume"
            class="step-btn"
            @click="linkTo('/consultant/resume')"
          >完善个人信息</div>
        </div>
        <!-- 步骤2 -->
        <div
          class="step"
          :class="{active: isFinishReview}"
        >
          <el-image
            class="step-num"
            :src="step2"
          ></el-image>
          <div class="step-setting">
            <p>你也可以设置您的服务时间</p>
            <p>以便通过审核后立即开始接受订单</p>
          </div>
          <div
            class="step-btn"
            @click="linkTo('/consultant/setting/1')"
          >服务时间设置</div>
        </div>
      </section>
    </div>
    <!-- 已认证 -->
    <div v-else>
      <!-- 状态面板 -->
      <div class="pannel flex-hb">
        <div
          class="p-item"
          :class="{ active: isActive == i }"
          v-for="(o, i) in pannels"
          :key="i"
          @click="handleClickPannel(o, i)"
        >
          <p>{{o.name}}</p>
          <div class="order-count">{{o.count|num}}</div>
        </div>
      </div>
      <!-- 表格 -->
      <section class="order-card">
        <p class="title">即将开始的咨询</p>
        <ul
          class="list-item flex-hbc"
          v-for="(o, i) in serviceOrders"
          :key="i"
        >
          <li class="flex-hbc">
            <small-avatar :imgUrl="o.avatar"></small-avatar>
            <div>{{o.name}}</div>
          </li>
          <li>开始时间: {{o.startTime}}</li>
          <li>{{o.serviceCountDown}}</li>
          <li class="flex-hb">
            <el-button
              type="primary"
              v-if="o.status=='5'"
              @click="linkTo('/consultant/room/'+o.orderId)"
            >进入房间</el-button>
            <el-button
              plain
              @click="handleOpenDetail(o)"
            >订单详情</el-button>
          </li>
        </ul>
        <div
          class="more"
          v-if="serviceOrders && serviceOrders.length"
          @click="linkTo('/consultant/order/4,5')"
        >更多订单<i class="el-icon-arrow-right"></i></div>
        <p
          v-else
          class="no-data"
        >暂无数据</p>
      </section>
      <section class="order-card">
        <p class="title">即将超时确认的订单</p>
        <ul
          class="list-item flex-hbc"
          v-for="(o, i) in confirmOrders"
          :key="i"
        >
          <li class="flex-hbc">
            <small-avatar :imgUrl="o.avatar"></small-avatar>
            <div>{{o.name}}</div>
          </li>
          <li>创建时间: {{o.cTime}}</li>
          <li>{{o.confirmCountDown}}</li>
          <li class="flex-hb">
            <el-button
              plain
              @click="handleOpenDetail(o)"
            >订单详情</el-button>
          </li>
        </ul>
        <div
          class="more"
          v-if="serviceOrders && confirmOrders.length"
          @click="linkTo('/consultant/order/2')"
        >更多订单<i class="el-icon-arrow-right"></i></div>
        <p
          v-else
          class="no-data"
        >暂无数据</p>
      </section>
    </div>
    <detail-modal
      :isShow="isShow"
      :order="order"
      @close="handleClose"
    ></detail-modal>
    <terms
      :isShow="isShowTerms"
      @close="handleCloseTerms"
      :url="url"
      :pageCount="pageCount"
    />
  </section>
</template>

<script>
import { getOrders, getOrdersCount } from "@/api/order";
import { getUserInfo, getDicts } from "@/api/user";
import tool from "@/utils/tool";
import SmallAvatar from "@/components/SmallAvatar";
import DetailModal from "./modal/detail";
import Terms from "@/components/Terms";

export default {
  components: {
    SmallAvatar,
    DetailModal,
    Terms,
  },
  data() {
    return {
      isShow: false,
      isShowTerms: false,
      pageCount: 1,
      url: "",
      order: {},
      isLoaded: false,
      isFillResume: false,
      isFinishReview: false,
      isSettingTime: false,
      isGoSign: false,
      isWaitingCorrection: false,
      isActive: false,
      curStep: 1,
      pannels: [
        { name: "待确认订单", count: 0, path: "/consultant/order/2" },
        { name: "待服务订单", count: 0, path: "/consultant/order/4,5" },
        { name: "已完成订单", count: 0, path: "/consultant/order/0,7,8" },
        { name: "待结算订单", count: 0, path: "/consultant/cost/2" },
      ],
      serviceOrders: [],
      confirmOrders: [],
    };
  },
  computed: {
    bannerImg: function () {
      return require("../../../assets/invite.png");
    },
    step1: function () {
      return require("../../../assets/step1.svg");
    },
    step2: function () {
      return require("../../../assets/step2.svg");
    },
    certApply: function () {
      return require("../../../assets/cert-apply.png");
    },
    certFinish: function () {
      return require("../../../assets/cert-finish.png");
    },
  },
  async created() {
    const l = this.loading();
    const res = await getUserInfo().catch((e) => l.close());
    if (res.result) {
      this.isLoaded = true;
      // 无resume  就是未填写
      // backgroundVerifyStatus= 0  未审核
      // backgroundVerifyStatus= 1  待审核
      // backgroundVerifyStatus= 2  资料待修正
      // backgroundVerifyStatus= 3  劳务合同签署
      // backgroundVerifyStatus= 4  已审核
      const o = res.msg;
      // o.backgroundVerifyStatus = 4;
      // 是否填写过简历
      this.isFillResume = !!(o.publicInfo && o.publicInfo.resume);
      // 是否审核完成
      this.isFinishReview = o.backgroundVerifyStatus == 4;
      // 去劳务合同签署
      this.isGoSign = o.backgroundVerifyStatus == 3;
      // 资料待修正
      this.isWaitingCorrection = o.backgroundVerifyStatus == 2;
      // 是否设置过服务时间
      this.isSettingTime = !!(o.publicInfo && o.publicInfo.availableTime);
      // 劳务合同签署地址
      this.signUrl = o.eSignUrl;
      const p = { from: "0", to: "2601444690", page: "1", limit: "3" };
      const ret = await Promise.all([
        getOrders({ ...p, condition: "status==4:status==5" }),
        getOrders({ ...p, condition: "status==2" }),
        getOrdersCount({
          condition: "status==2:status==4:status==7:status==10",
        }),
      ]).catch((e) => l.close());
      // 待服务订单
      if (ret[0].result) {
        this.serviceOrders = tool.formatConsultantOrder(ret[0].msg.list);
        // 缓存status==5服务中订单号
        const servicing = this.serviceOrders[0];
        if (servicing && servicing.status == "5") {
          this.$store.dispatch("room/setRoom", servicing.orderId);
        }
      }
      // 待确认订单
      if (ret[1].result) {
        this.confirmOrders = tool.formatConsultantOrder(ret[1].msg.list);
      }
      // 订单数量
      if (ret[2].result) {
        const info = ret[2].msg;
        this.pannels[0].count = info["2"];
        this.pannels[1].count = info["4"];
        this.pannels[2].count = info["7"];
        this.pannels[3].count = info["10"];
      }
    }
    l.close();
  },
  methods: {
    handleCloseTerms(isAgree, isClose) {
      if (isAgree && this.url == "/html/err-manage-consultant.html") {
        window.open(this.signUrl, "_blank");
      }
      if (
        this.url == "/html/err-manage-consultant.html" ||
        !isAgree ||
        isClose
      ) {
        this.isShowTerms = false;
      } else if (this.url == "/html/manage-consultant.html" && isAgree) {
        this.url = "/html/err-manage-consultant.html";
        this.pageCount = 3;
      }
    },
    handleOpenWindow() {
      this.isShowTerms = true;
      this.url = "/html/manage-consultant.html";
    },
    async handleOpenDetail(order) {
      const res = await getDicts();
      this.order = order;
      this.isShow = true;
    },
    handleClose() {
      this.isShow = false;
    },
    handleClickPannel(item, i) {
      this.isActive = i;
      this.linkTo(item.path);
    },
    linkTo(path) {
      this.$router.push(path);
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
$color: #15479e;
.banner {
  height: 220px;
  display: block;
  margin: 0 auto;
  margin-bottom: 40px;
}
.step {
  flex: 1;
  margin-right: 20px;
  height: 420px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.step:last-child {
  margin-right: 0;
}
.step.active {
  border: 1px solid $color;
}
.step-num {
  width: 70px;
  height: 70px;
  margin-top: 60px;
  margin-bottom: 50px;
}
.status-img {
  width: 90px;
  height: 90px;
  margin-bottom: 24px;
  margin: 0 auto;
}
.step-review {
  color: #15479e;
  font-size: 16px;
  text-align: center;
}
.step-setting,
.step-fill {
  color: #7c8ea5;
  font-size: 16px;
  text-align: center;
}
.step-btn {
  width: 180px;
  height: 46px;
  border-radius: 23px;
  border: 1px solid #15479e;
  margin: 50px 0;
  line-height: 46px;
  text-align: center;
  color: $color;
  cursor: pointer;
}
.step-btn:hover {
  background: linear-gradient(123deg, #15479e 0%, #3271cd 100%);
  color: #fff;
}
.reg-success {
  text-align: center;
  font-size: 32px;
  color: $color;
}
.condition {
  text-align: center;
  color: #36ae82;
  font-size: 18px;
  margin-top: 4px;
  margin-bottom: 40px;
}
.pannel {
  margin-bottom: 20px;
}
.p-item {
  flex: 1;
  margin-right: 20px;
  height: 114px;
  background: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding-left: 20px;
  box-sizing: border-box;
  color: #7c8ea5;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.3s;
}
.p-item:last-child {
  margin-right: 0;
}
.p-item > p {
  font-size: 14px;
  margin-top: 20px;
}
.p-item > div {
  font-size: 26px;
  margin-top: 20px;
}
.p-item:hover {
  box-shadow: 0px 0px 4px 0px rgba(21, 71, 158, 0.5);
  border: 1px solid $color;
  color: $color;
}
.order-count {
  font-family: "notosans-bold,notosans-regular";
  font-weight: 600;
}
.order-card {
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #ffffff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
}
.list-item {
  font-size: 14px;
  color: #7c8ea5;
  padding: 14px 0;
  border-bottom: 1px solid #edeeef;
}
.title {
  font-size: 14px;
  color: $color;
  margin-bottom: 20px;
  font-weight: 600;
}
.avatar {
  margin-right: 10px;
  width: 30px;
  height: 30px;
}
.more {
  text-align: center;
  color: $color;
  font-size: 14px;
  margin-top: 18px;
  cursor: pointer;
  font-weight: 400;
}
.no-data {
  text-align: center;
  font-size: 14px;
  color: #7c8ea5;
  padding-bottom: 36px;
}
</style>
