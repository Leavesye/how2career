<template>
  <section>
    <div class="flex-vc page-title">
      <div>编辑个人信息</div>
      <p>成为咨询师需要认证简历信息,请先完成简历填写</p>
    </div>
    <p class="form-title">学历信息</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(education, i) in educations"
               :key="i">
        <quick-form :model="education"
                    :labelWidth="labelWidth"
                    :ref="'education' + i"></quick-form>
        <el-button class="del-btn"
                   size="small"
                   plain
                   @click="handleDelEducation(i)">删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button class="add-btn"
                   type="primary"
                   plain
                   size="small"
                   @click="handleAddEducation">+添加更多学历</el-button>
      </section>
    </section>
    <p class="line"></p>
    <p class="form-title">工作经历 (最近三段)</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(experience, i) in experiences"
               :key="i">
        <quick-form :model="experience"
                    :labelWidth="labelWidth"
                    :ref="'experience'+i"></quick-form>
        <el-button class="del-btn"
                   size="small"
                   @click="handleDelExperience(i)"
                   plain>删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button class="add-btn"
                   type="primary"
                   plain
                   size="small"
                   @click="handleAddExperience">+添加更多工作经历</el-button>
      </section>
    </section>
    <quick-form :model="socialEcurity"
                labelWidth="216px"
                ref="socialEcurity"></quick-form>
    <p class="line"></p>
    <p class="form-title">执照与证书</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(license, i) in licenses"
               :key="i">
        <quick-form :model="license"
                    :labelWidth="labelWidth"
                    :ref="'license'+i"></quick-form>
        <el-button class="del-btn"
                   size="small"
                   @click="handleDelLicense(i)"
                   plain>删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button class="add-btn"
                   type="primary"
                   plain
                   size="small"
                   @click="handleAddLicense">+添加更多证书</el-button>
      </section>
    </section>
    <quick-form :model="callup"
                labelWidth="216px"
                ref="callup"></quick-form>
    <p class="line"></p>
    <!-- 添加语言 -->
    <section>
      <p class="form-title">语言</p>
      <el-row>
        <el-col :offset="7"
                :span="16">
          <el-input style="width: 460px;margin-right:20px"
                    v-model="lang"
                    placeholder="请输入信息"
                    size="small"></el-input>
          <el-button type="primary"
                     size="mini"
                     @click="handleAddLang">确认添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="7"
                :span="17">
          <ul class="flex item-select">
            <li v-for="(o,i) in langs"
                :key="i">{{o}}
              <i class="el-icon-close"
                 @click="handleDelLang(i)"></i>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
    <p class="line"></p>
    <section>
      <p class="form-title">工作个人技能</p>
      <el-row>
        <el-col :offset="7"
                :span="16">
          <el-input style="width: 460px;margin-right:20px"
                    v-model="skill"
                    placeholder="请输入信息"
                    size="small"></el-input>
          <el-button type="primary"
                     size="mini"
                     @click="handleAddSkill">确认添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="7"
                :span="17">
          <ul class="flex item-select">
            <li v-for="(o,i) in skills"
                :key="i">{{o}}
              <i class="el-icon-close"
                 @click="handleDelSkill(i)"></i>
            </li>
          </ul>
        </el-col>
      </el-row>
    </section>
    <div class="flex-he"
         style="margin: 60px 60px 70px 0">
      <el-button type="primary"
                 size="mini">保存并提交审核</el-button>
      <el-button size="mini">保存</el-button>
    </div>
    <submit-finish :isShow="isShow"
                   @close="handleClose"></submit-finish>
  </section>
</template>

<script>
import _ from 'lodash'
import QuickForm from '@/components/QuickForm'
import SubmitFinish from './modal/submit-finish'
import form from './form'
import eduForm from './form/edu-form'
import expForm from './form/exp-form'
import licenseForm from './form/license-form'

export default {
  name: 'fill-info',
  components: {
    QuickForm,
    SubmitFinish
  },
  data () {
    const r = this.$rules
    return {
      lang: '',
      langs: [],
      skill: '',
      skills: [],
      isShow: false,
      labelWidth: '140px',
      ...form,
    }
  },
  methods: {
    handleAddEducation () {
      this.educations.push(_.cloneDeep(eduForm))
    },
    handleDelEducation (i) {
      if (this.educations.length == 1) return false
      this.educations.splice(i, 1)
    },
    handleAddExperience () {
      this.experiences.push(_.cloneDeep(expForm))
    },
    handleDelExperience (i) {
      if (this.experiences.length == 1) return false
      this.experiences.splice(i, 1)
    },
    handleAddLicense () {
      this.licenses.push(_.cloneDeep(licenseForm))
    },
    handleDelLicense (i) {
      if (this.licenses.length == 1) return false
      this.licenses.splice(i, 1)
    },
    handleAddLang () {
      this.langs.push(this.lang)
      this.lang = ''
    },
    handleDelLang (i) {
      this.langs.splice(i, 1)
    },
    handleAddSkill () {
      this.skills.push(this.skill)
      this.skill = ''
    },
    handleDelSkill (i) {
      this.skills.splice(i, 1)
    },
    handleClose () {
      this.isShow = false
    },
  },
  mounted () {
    console.log(this._data, 111)
  }
}
</script>

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
}
.page-title > p {
  font-size: 14px;
  color: #7c8ea5;
}
.form-card {
  margin-bottom: 10px;
}
.form-box {
  width: 800px;
  margin: 0 auto;
}
.form-title {
  font-size: 16px;
  color: #15479e;
  margin: 30px;
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
}
.item-select li {
  position: relative;
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #edeeef;
  border-radius: 4px;
  border: 1px solid #edeeef;
  margin-right: 18px;
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
