<template>
  <section style="padding: 30px">
    <!-- 状态面板 -->
    <pannel
      @change="handlePannelChange"
      :pannels="pannels"
      :selPannel="selPannel"
      css="search"
    ></pannel>
    <el-card>
      <quick-form
        :model="form"
        labelWidth="140px"
        ref="form"
      ></quick-form>
      <el-button
        size="large"
        class="search-btn"
        round
        plain
        type="success"
        @click="handleSearch"
        :loading="isLoading"
      >搜索</el-button>
    </el-card>
    <p class="title">搜索结果</p>
    <card-list
      v-if="list.length"
      :list="list"
    ></card-list>
    <el-card
      v-else
      style="margin-bottom: 20px"
    >
      <p class="no-data">暂无数据</p>
    </el-card>
    <p
      class="title"
      style="margin-top: 0"
    >经常查看的咨询师</p>
    <card-list
      v-if="top4 && top4.length"
      :list="top4"
    ></card-list>
    <el-card
      v-else
      style="margin-bottom: 20px"
    >
      <p class="no-data">暂无数据</p>
    </el-card>
  </section>
</template>

<script>
import QuickForm from "@/components/QuickForm";
import Pannel from "@/components/Pannel";
import CardList from "@/components/CardList";
import proform from "./pro-form";
import hrform from "./hr-form";
import { getDicts, getTop4Consultant } from "@/api/user";
import { queryConsultant } from "@/api/consultant";
import tool from "@/utils/tool";

export default {
  name: "consumer-search",
  components: {
    QuickForm,
    Pannel,
    CardList,
  },
  data() {
    return {
      isLoading: false,
      form: proform,
      datetime: "",
      isShow: false,
      selPannel: { name: "搜索在职精英", status: "pro" },
      curTime: "",
      pannels: [
        { name: "搜索在职精英", status: "pro" },
        { name: "搜索资深人力", status: "hr" },
      ],
      list: [],
      top4: [],
    };
  },
  async created() {
    this.orderId = this.$route.query.orderId;
    this.consultantId = this.$route.query.consultantId;
    const l = this.loading();
    const res = await getDicts();
    if (res.result) {
      this.dicts = res.msg;
      const { industry, position, company } = res.msg;
      this.form.industry.options = industry;
      this.form.position.options = position;
      this.form.company.options = company;
      this.form.company.props.remoteMethod = this.getRemoteCompany;
    }
    this.$refs.form.clearValidate();
    const ret = await getTop4Consultant();
    // 经常查看的咨询师top4
    if (ret.result && ret.msg.list) {
      this.top4 = tool.formatFavorites(
        ret.msg.list,
        "预约",
        this.handleOpenDetail,
        this.dicts.position
      );
    }
    l.close();
  },
  methods: {
    getRemoteCompany(query) {
      if (query !== "") {
        this.form.company.options = this.dicts.company.filter((item) => {
          return item.text.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });
      } else {
        this.form.company.options = [];
      }
    },
    handleOpenDetail(id) {
      let url = `/consumer/consultant-detail/${id}`;
      if (this.orderId) {
        url = `/consumer/consultant-detail/${id}?orderId=${this.orderId}`;
      }
      this.$router.push(url);
    },
    handlePannelChange(item) {
      if (item.status == this.selPannel.status) {
        return false;
      }
      this.form = item.status == "pro" ? proform : hrform;
      this.selPannel = item;
      const { industry, position, company } = this.dicts;
      this.form.industry.options = industry;
      this.form.position.options = position;
      this.form.company.options = company;
      this.form.industry.value = [];
      this.form.position.value = [];
      this.form.company.value = [];
      this.$refs.form.clearValidate();
    },
    async handleSearch() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let p = {
            serviceType: this.selPannel.status,
            prevConsultant: this.consultantId ? [this.consultantId] : [],
            ...this.$refs.form.getFormData(),
          };
          this.isLoading = true;
          queryConsultant(p)
            .then((res) => {
              if (res.result) {
                this.list = tool.formatFavorites(
                  res.msg.list,
                  "预约",
                  this.handleOpenDetail,
                  this.dicts.position
                );
              }
              this.isLoading = false;
            })
            .catch((e) => (this.isLoading = false));
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  padding-bottom: 12px;
  border-bottom: 1px solid #edeeef;
}
.title {
  font-size: 16px;
  color: #36ae82;
  margin: 20px 0;
  font-weight: 600;
}
.search-btn {
  width: 180px;
  margin: 0 auto;
  display: block;
}
.no-data {
  text-align: center;
  font-size: 14px;
  color: #7c8ea5;
}
</style>
