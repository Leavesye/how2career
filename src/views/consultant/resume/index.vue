<template>
  <section>
    <div class="flex-vc page-title">
      <div>完善咨询师信息</div>
      <p>咨询师入驻平台需要平台审核，请按照要求完成咨询师信息的填写并提交审核</p>
    </div>
    <div class="form-title flex-vc">
      <p>学历信息</p>
      <div>请先填写最高学历</div>
    </div>
    <section class="form-box">
      <el-card
        class="form-card"
        v-for="(o, i) in education"
        :key="i"
      >
        <quick-form
          :model="o"
          :labelWidth="labelWidth"
          :ref="'education' + i"
        ></quick-form>
        <el-button
          class="del-btn"
          size="small"
          plain
          @click="handleDelEducation(i)"
          v-if="education.length > 1"
        >删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button
          class="add-btn"
          type="primary"
          plain
          size="small"
          @click="handleAddEducation"
        >+添加更多学历</el-button>
      </section>
    </section>
    <p class="line"></p>
    <p class="form-title">工作经历</p>
    <section class="form-box">
      <el-card
        class="form-card"
        v-for="(experience, i) in workExperience"
        :key="i"
      >
        <quick-form
          :model="experience"
          :labelWidth="labelWidth"
          :ref="'experience'+i"
        ></quick-form>
        <el-button
          class="del-btn"
          size="small"
          @click="handleDelExperience(i)"
          plain
          v-if="workExperience.length > 1"
        >删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button
          class="add-btn"
          type="primary"
          plain
          size="small"
          @click="handleAddExperience"
        >+添加更多工作经历</el-button>
      </section>
    </section>
    <!-- 社保 -->
    <quick-form
      :model="socialEcurity"
      labelWidth="216px"
      ref="socialEcurity"
    ></quick-form>
    <p class="line"></p>
    <p class="form-title">其他信息</p>
    <section class="form-box">
      <el-card
        class="form-card"
        v-for="(license, i) in otherCertificates"
        :key="i"
      >
        <quick-form
          :model="license"
          :labelWidth="labelWidth"
          :ref="'license'+i"
        ></quick-form>
        <el-button
          class="del-btn"
          size="small"
          @click="handleDelLicense(i)"
          v-if="otherCertificates.length > 1"
          plain
        >删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button
          class="add-btn"
          type="primary"
          plain
          size="small"
          @click="handleAddLicense"
        >+添加更多证书</el-button>
      </section>
    </section>
    <!-- <quick-form :model="callup"
                labelWidth="216px"
                ref="callup"></quick-form> -->
    <!-- <p class="line"></p> -->
    <!-- 添加语言 -->
    <section>
      <el-row style="margin-top: 30px">
        <el-col
          :span="2"
          :offset="2"
          style="line-height: 30px;color:#7C8EA5"
        >语言</el-col>
        <el-col :span="16">
          <div class="flex">
            <el-input
              style="flex:1;margin-right:20px"
              v-model="lang"
              placeholder="请输入语言"
              size="small"
              :maxlength="10"
              @keyup.enter.native="handleAddLang"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click="handleAddLang"
            >确认添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="4"
          :span="14"
        >
          <ul class="flex item-select">
            <li
              v-for="(o,i) in language"
              :key="i"
            >{{o}}
              <i
                class="el-icon-close"
                style="cursor: pointer"
                @click="handleDelLang(i)"
              ></i>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
    <p class="line"></p>
    <section>
      <div class="form-title flex-vc">
        <p style="width: 120px">工作个人技能</p>
        <div style="width: 50%">IntoCareer会匹配求职者的要求和简历并推荐数名最适合的咨询师，个人特点会对求职者咨询师的主动选择有着至关重要的作用，请认真填写</div>
      </div>
      <el-row>
        <el-col
          :offset="4"
          :span="16"
        >
          <div class="flex">
            <el-input
              style="flex:1;margin-right:20px"
              v-model="skill"
              placeholder="请输入信息"
              size="small"
              :maxlength="20"
              @keyup.enter.native="handleAddSkill"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              @click="handleAddSkill"
            >确认添加</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col
          :offset="4"
          :span="14"
        >
          <ul class="flex item-select">
            <li
              v-for="(o,i) in skills"
              :key="i"
            >{{o}}
              <i
                class="el-icon-close"
                style="cursor: pointer"
                @click="handleDelSkill(i)"
              ></i>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
    <div
      class="flex-he"
      style="margin: 60px 60px 70px 0"
    >
      <el-button
        type="primary"
        v-if="bgStatus == '0' || bgStatus == '2'"
        size="mini"
        @click="handleSave(1)"
      >保存并提交审核</el-button>
      <el-button
        size="mini"
        @click="handleSave(2)"
      >保存</el-button>
    </div>
    <submit-finish
      :isShow="isShow"
      @close="handleClose"
    ></submit-finish>
  </section>
</template>

<script>
import _ from "lodash";
import QuickForm from "@/components/QuickForm";
import SubmitFinish from "./modal/submit-finish";
import socialForm from "./form/social-ecurity";
// import callupForm from './form/callup'
import eduForm from "./form/edu-form";
import expForm from "./form/exp-form";
import licenseForm from "./form/license-form";
import { getUserInfo, updateUserInfo, getDicts } from "@/api/user";
import mixin from "@/mixins";

const cfg = {
  education: eduForm,
  workExperience: expForm,
  otherCertificates: licenseForm,
};
let dicts = {};
// 联动表单配置
const fieldCfg = {
  studentOrganization: 1,
  getRewarded: 2,
  projectArticle: 3,
  teamManagement: 4,
  gallupCertified: 5,
  onBoard: 6,
};
export default {
  name: "fill-info",
  components: {
    QuickForm,
    SubmitFinish,
  },
  mixins: [mixin],
  data() {
    return {
      bgStatus: "",
      lang: "",
      language: [],
      skill: "",
      skills: [],
      isShow: false,
      labelWidth: "140px",
      education: [_.cloneDeep(eduForm)],
      workExperience: [_.cloneDeep(expForm)],
      otherCertificates: [_.cloneDeep(licenseForm)],
      socialEcurity: socialForm,
      // callup: callupForm
    };
  },
  async created() {
    const l = this.loading();
    let ret = await getDicts();
    dicts = ret.msg;
    const {
      countries,
      majors,
      degrees,
      gpa,
      industry,
      company,
      companySize,
      position,
    } = dicts;
    eduForm.country.options = countries;
    eduForm.discipline.options = majors;
    eduForm.GPA.options = gpa;
    eduForm.degree.options = degrees;
    expForm.industry.options = industry;
    expForm.company.options = company;
    expForm.companySize.options = companySize;
    expForm.position.options = position;
    let res = await getUserInfo().catch((e) => l.close());
    if (res.result) {
      // 简历信息
      const resume = res.msg.publicInfo.resume;
      this.initPublicInfo = res.msg.publicInfo || {};
      this.bgStatus = res.msg.backgroundVerifyStatus;
      // 编辑
      if (resume) {
        const {
          socialInsuranceImage,
          gallupCertified,
          gallupCertifiedImage,
          language,
          skills,
        } = resume;
        Object.keys(resume).forEach((key) => {
          if (
            ["education", "workExperience", "otherCertificates"].includes(key)
          ) {
            const form = resume[key];
            this[key] = [];
            form.forEach((o, i) => {
              let copy = _.cloneDeep(cfg[key]);
              this[key].push(copy);
              Object.keys(copy).forEach((k) => {
                // 国家
                if (k == "country") {
                  console.log(o[k], o, 9999);
                  // 联动学校处理
                  const find = dicts.countries.find((f) => f.value == o[k]);
                  copy.school.options = find ? find.schools : [];
                }
                // 企业
                if (k == "company") {
                  console.log(o[k], o, "company");
                  this.handleCompanyChange(i, o[k]);
                }
                // 联动设置
                if (k in fieldCfg) {
                  this.handleCheckboxChange(fieldCfg[k], i, o[k]);
                }
                copy[k].value = o[k];
              });
              // form表单事件绑定this upload处理
              this.bindThis(copy, i);
            });
          }
        });
        this.language = language;
        this.skills = skills;
        this.socialEcurity.socialInsuranceImage.value = socialInsuranceImage;
        this.bindThis(this.socialEcurity);
        // this.callup.gallupCertified.value = gallupCertified
        // this.callup.gallupCertifiedImage.value = gallupCertifiedImage
        // this.bindThis(this.callup)
        this.handleCheckboxChange(5, "", gallupCertified);
      } else {
        // 新增
        // 绑定form表单事件方法this到组件实例 便于后续调用实例方法
        this.education[0].country.options = dicts.countries;
        this.education[0].discipline.options = dicts.majors;
        this.education[0].GPA.options = dicts.gpa;
        this.education[0].degree.options = dicts.degrees;
        this.workExperience[0].industry.options = dicts.industry;
        this.workExperience[0].company.options = dicts.company;
        this.workExperience[0].companySize.options = dicts.companySize;
        this.workExperience[0].position.options = dicts.position;
        this.education[0] = this.bindThis(this.education[0], 0);
        this.workExperience[0] = this.bindThis(this.workExperience[0], 0);
        this.otherCertificates[0] = this.bindThis(this.otherCertificates[0], 0);
        // this.callup = this.bindThis(this.callup)
        this.socialEcurity = this.bindThis(this.socialEcurity);
      }
    }
    l.close();
  },
  methods: {
    // 国家联动学校
    handleCountryChange(i, v) {
      const f = dicts.countries.find((o) => o.value == v);
      this.education[i].school.options = f.schools;
      this.education[i].school.value = "";
    },
    // 企业选择'其他'
    handleCompanyChange(index, v) {
      const o = this.workExperience[index].companyName;
      o.hide = v != 0;
      if (v != 0) {
        o.value = "";
      }
    },
    // 表单联动操作
    handleCheckboxChange(type, index, v) {
      const o = this.education[index];
      const exp = this.workExperience[index];
      if (type == 1) {
        o.organizationTitle.hide = !v;
        !v && (o.organizationTitle.value = "");
        o.studentOrganization.layout.span = v ? 5 : 24;
      }
      if (type == 2) {
        o.rewardDescription.hide = !v;
        !v && (o.rewardDescription.value = "");
        o.getRewarded.layout.span = v ? 5 : 24;
      }
      if (type == 3) {
        !v && (o.projectArticleDescription.value = "");
        o.projectArticleDescription.hide = !v;
      }
      if (type == 4) {
        exp.teamMember.hide = !v;
        !v && (exp.teamMember.value = "");
        exp.teamManagement.layout.span = v ? 8 : 24;
      }
      // if (type == 5) {
      //   this.callup.gallupCertifiedImage.hide = !v
      //   this.callup.gallupCertified.layout.span = v ? 6 : 24
      // }
      if (type == 6) {
        exp.resignationTime.hide = v;
        !v && (exp.resignationTime.value = "");
      }
    },
    // 学历操作
    handleAddEducation() {
      if (this.education.length == 10) return false;
      let eduform = _.cloneDeep(eduForm);
      eduform.degreeCertificate.rules = [];
      this.education.push(this.bindThis(eduform, this.education.length));
    },
    handleDelEducation(i) {
      if (this.education.length == 1) return false;
      this.education.splice(i, 1);
    },
    // 工作经历操作
    handleAddExperience() {
      if (this.workExperience.length == 10) return false;
      this.workExperience.push(
        this.bindThis(_.cloneDeep(expForm), this.workExperience.length)
      );
    },
    handleDelExperience(i) {
      if (this.workExperience.length == 1) return false;
      this.workExperience.splice(i, 1);
    },
    // 执照与证书操作
    handleAddLicense() {
      if (this.otherCertificates.length == 10) return false;
      this.otherCertificates.push(
        this.bindThis(_.cloneDeep(licenseForm), this.otherCertificates.length)
      );
    },
    handleDelLicense(i) {
      if (this.otherCertificates.length == 1) return false;
      this.otherCertificates.splice(i, 1);
    },
    // 语言操作
    handleAddLang() {
      if (this.language.length == 10) return false;
      this.lang && this.language.push(this.lang);
      this.lang = "";
    },
    handleDelLang(i) {
      this.language.splice(i, 1);
    },
    // 技能操作
    handleAddSkill() {
      if (this.skills.length == 10) return false;
      this.skill && this.skills.push(this.skill);
      this.skill = "";
    },
    handleDelSkill(i) {
      this.skills.splice(i, 1);
    },
    // 审核成功弹框操作
    handleClose() {
      this.isShow = false;
    },
    bindThis(o, index) {
      Object.keys(o).forEach((key) => {
        let current = o[key];
        current.events &&
          Object.keys(current.events).forEach((event) => {
            // 绑定this 及  数组索引
            current.events[event] =
              index != undefined
                ? current.events[event].bind(this, index)
                : current.events[event].bind(this);
          });
        if (current.type == "upload") {
          current.props["before-upload"] = current.props["before-upload"].bind(
            this,
            index
          );
          current.props["on-success"] = current.props["on-success"].bind(
            this,
            index
          );
          current.props["on-remove"] = current.props["on-remove"].bind(
            this,
            index
          );
          if (current.value) {
            current.props["file-list"] = [
              { url: process.env.VUE_APP_HOST_NAME + current.value },
            ];
          }
        }
      });
      return o;
    },
    // 上传文件相关
    checkFile(file) {
      if (file.size > 2 * 1024 * 1024) {
        this.alert("上传图片不能超过2M");
        return false;
      }
      if (!["image/png", "image/jpeg", "image/gif"].includes(file.type)) {
        this.alert("请上传PNG、JPG、GIF类型文件");
        return false;
      }
      return true;
    },
    afterUpload(fileUrl, index, attrs) {
      if (typeof index == "number") {
        this[attrs[0]][index][attrs[1]].value = fileUrl;
      } else {
        this[attrs[0]][attrs[1]].value = fileUrl;
      }
    },
    onRemoveFile(index, attrs) {
      if (typeof index == "number") {
        this[attrs[0]][index][attrs[1]].value = "";
      } else {
        this[attrs[0]][attrs[1]].value = "";
      }
    },
    async handleSave(type) {
      // 表单校验
      let isValid = true;
      const res = await Promise.all([
        ...this.education.map((o, i) =>
          this.$refs["education" + i][0].validate()
        ),
        ...this.workExperience.map((o, i) =>
          this.$refs["experience" + i][0].validate()
        ),
        ...this.otherCertificates.map((o, i) =>
          this.$refs["license" + i][0].validate()
        ),
        this.$refs.socialEcurity.validate(),
        // this.$refs.callup.validate(),
      ]).catch((e) => (isValid = false));
      if (isValid) {
        const l = this.loading();
        // 组装数据
        const formData = {
          education: this.education.map((o, i) =>
            this.$refs["education" + i][0].getFormData()
          ),
          workExperience: this.workExperience.map((o, i) =>
            this.$refs["experience" + i][0].getFormData()
          ),
          otherCertificates: this.otherCertificates.map((o, i) =>
            this.$refs["license" + i][0].getFormData()
          ),
          ...this.$refs.socialEcurity.getFormData(),
          // ... this.$refs.callup.getFormData(),
          language: this.language,
          skills: this.skills,
        };
        this.initPublicInfo.resume = formData;
        const p = {
          publicInfo: this.initPublicInfo,
        };
        // 保存并提交审核 更新  backgroundVerifyStatus= 1 ,保存不更新这个字段
        type == 1 && (p.backgroundVerifyStatus = "1");
        const ret = await updateUserInfo(p).catch((e) => l.close());
        if (ret.result) {
          if (type == 1) {
            this.isShow = true;
          } else {
            this.alert("保存成功");
          }
        }
        l.close();
      } else {
        this.alert("表单验证失败", "warning");
      }
    },
  },
  mounted() {},
};
</script>
<style>
.el-form-item__content {
  line-height: 0 !important;
}
.el-upload-list__item {
  margin-bottom: 0;
}
</style>
<style lang="scss" scoped>
.page-title {
  padding: 20px 30px;
  border-bottom: 1px solid #edeeef;
}
.page-title > div {
  font-size: 16px;
  font-weight: 600;
  color: #15479e;
  margin-right: 30px;
  width: 120px;
}
.page-title > p {
  font-size: 14px;
  color: #7c8ea5;
}
.form-card {
  margin-bottom: 10px;
}
.form-box {
  padding: 0 70px;
  margin: 0 auto;
}
.form-title {
  font-size: 16px;
  color: #15479e;
  margin: 30px;
}
.form-title div {
  font-size: 14px;
  color: #7c8ea5;
  margin-left: 20px;
}
.add-btn {
  margin-top: 30px;
}
.del-btn {
  float: right;
  margin-bottom: 20px;
}
.line {
  height: 1px;
  background: #edeeef;
  margin: 50px 0;
}
.upload-box {
  padding: 0 70px;
}
.item-select {
  margin-top: 20px;
  flex-wrap: wrap;
}
.item-select li {
  position: relative;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #edeeef;
  border-radius: 4px;
  border: 1px solid #edeeef;
  margin-right: 18px;
  margin-bottom: 10px;
  padding: 0 10px;
}
.item-select li > i {
  position: absolute;
  top: -7px;
  right: -7px;
  width: 14px;
  height: 14px;
  line-height: 14px;
  border-radius: 50%;
  background: #7a7f84;
  color: #fff;
}
</style>
