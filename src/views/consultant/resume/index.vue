<template>
  <section>
    <div class="flex-vc page-title">
      <div>编辑个人信息</div>
      <p>成为咨询师需要认证简历信息,请先完成简历填写</p>
    </div>
    <p class="form-title">学历信息</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(o, i) in education"
               :key="i">
        <quick-form :model="o"
                    :labelWidth="labelWidth"
                    :ref="'education' + i"></quick-form>
        <el-button class="del-btn"
                   size="small"
                   plain
                   @click="handleDelEducation(i)"
                   v-if="education.length > 1">删除</el-button>
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
    <p class="form-title">工作经历</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(experience, i) in workExperience"
               :key="i">
        <quick-form :model="experience"
                    :labelWidth="labelWidth"
                    :ref="'experience'+i"></quick-form>
        <el-button class="del-btn"
                   size="small"
                   @click="handleDelExperience(i)"
                   plain
                   v-if="workExperience.length > 1">删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button class="add-btn"
                   type="primary"
                   plain
                   size="small"
                   @click="handleAddExperience">+添加更多工作经历</el-button>
      </section>
    </section>
    <!-- 社保 -->
    <quick-form :model="socialEcurity"
                labelWidth="216px"
                ref="socialEcurity"></quick-form>
    <p class="line"></p>
    <p class="form-title">执照与证书</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(license, i) in otherCertificates"
               :key="i">
        <quick-form :model="license"
                    :labelWidth="labelWidth"
                    :ref="'license'+i"></quick-form>
        <el-button class="del-btn"
                   size="small"
                   @click="handleDelLicense(i)"
                   v-if="otherCertificates.length > 1"
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
                    size="small"
                    :maxlength="10"></el-input>
          <el-button type="primary"
                     size="mini"
                     @click="handleAddLang">确认添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="7"
                :span="14">
          <ul class="flex item-select">
            <li v-for="(o,i) in language"
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
                    size="small"
                    :maxlength="20"></el-input>
          <el-button type="primary"
                     size="mini"
                     @click="handleAddSkill">确认添加</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="7"
                :span="14">
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
                 size="mini"
                 @click="handleSave(1)">保存并提交审核</el-button>
      <el-button size="mini"
                 @click="handleSave(2)">保存</el-button>
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
import { getUserInfo, updateUserInfo } from '@/api/user'
import mixin from '@/mixins'

const cfg = {
  'education': eduForm,
  'workExperience': expForm,
  'otherCertificates': licenseForm,
}
// 联动表单配置
const fieldCfg = {
  studentOrganization: 1,
  getRewarded: 2,
  projectArticle: 3,
  teamManagement: 4,
  gallupCertified: 5,
}
export default {
  name: 'fill-info',
  components: {
    QuickForm,
    SubmitFinish
  },
  mixins: [mixin],
  data () {
    return {
      lang: '',
      language: [],
      skill: '',
      skills: [],
      isShow: false,
      labelWidth: '140px',
      ...form,
    }
  },
  async created () {
    const l = this.loading()
    let res = await getUserInfo().catch(e => l.close())
    if (res.result) {
      // 简历信息
      const resume = res.msg.publicInfo.resume
      this.initPublicInfo = res.msg.publicInfo || {}
      if (resume) {
        const { socialInsuranceImage, gallupCertified, gallupCertifiedImage, language, skills } = resume
        Object.keys(resume).forEach(key => {
          if (['education', 'workExperience', 'otherCertificates'].includes(key)) {
            const form = resume[key]
            this[key] = []
            form.forEach((o, i) => {
              let copy = _.cloneDeep(cfg[key])
              this[key].push(copy)
              Object.keys(copy).forEach(k => {
                // 联动设置
                if (k in fieldCfg) {
                  this.handleCheckboxChange(fieldCfg[k], i, o[k])
                }
                copy[k].value = o[k]
              })
              // form表单事件绑定this upload处理
              this.bindThis(copy, i)
            })
          }
        })
        this.language = language
        this.skills = skills
        this.socialEcurity.socialInsuranceImage.value = socialInsuranceImage
        this.bindThis(this.socialEcurity)
        this.callup.gallupCertified.value = gallupCertified
        this.callup.gallupCertifiedImage.value = gallupCertifiedImage
        this.bindThis(this.callup)
        this.handleCheckboxChange(5, '', gallupCertified)
      } else {
        // 绑定form表单事件方法this到组件实例 便于后续调用实例方法
        this.education[0] = this.bindThis(this.education[0], 0)
        this.workExperience[0] = this.bindThis(this.workExperience[0], 0)
        this.otherCertificates[0] = this.bindThis(this.otherCertificates[0], 0)
        this.callup = this.bindThis(this.callup)
        this.socialEcurity = this.bindThis(this.socialEcurity)
      }
    }
    l.close()
  },
  methods: {
    // 表单联动操作
    handleCheckboxChange (type, index, v) {
      console.log(type, index, v)
      const o = this.education[index]
      const exp = this.workExperience[index]
      if (type == 1) {
        o.organizationTitle.hide = !v
        !v && (o.organizationTitle.value = '')
        o.studentOrganization.layout.span = v ? 5 : 24
      }
      if (type == 2) {
        o.rewardDescription.hide = !v
        !v && (o.rewardDescription.value = '')
        o.getRewarded.layout.span = v ? 5 : 24
      }
      if (type == 3) {
        !v && (o.projectArticleDescription.value = '')
        o.projectArticleDescription.hide = !v
      }
      if (type == 4) {
        exp.teamMember.hide = !v
        !v && (exp.teamMember.value = '')
        exp.teamManagement.layout.span = v ? 8 : 24
      }
      if (type == 5) {
        this.callup.gallupCertifiedImage.hide = !v
        // !v && (this.callup.gallupCertifiedImage.value = '')
        this.callup.gallupCertified.layout.span = v ? 6 : 24
      }
    },
    // 学历操作
    handleAddEducation () {
      if (this.education.length == 10) return false
      console.log(_.cloneDeep(eduForm),9090)
      this.education.push(this.bindThis(_.cloneDeep(eduForm), this.education.length))
    },
    handleDelEducation (i) {
      if (this.education.length == 1) return false
      this.education.splice(i, 1)
    },
    // 工作经历操作
    handleAddExperience () {
      if (this.workExperience.length == 10) return false
      this.workExperience.push(this.bindThis(_.cloneDeep(expForm), this.workExperience.length))
    },
    handleDelExperience (i) {
      if (this.workExperience.length == 1) return false
      this.workExperience.splice(i, 1)
    },
    // 执照与证书操作
    handleAddLicense () {
      if (this.otherCertificates.length == 10) return false
      this.otherCertificates.push(this.bindThis(_.cloneDeep(licenseForm), this.otherCertificates.length))
    },
    handleDelLicense (i) {
      if (this.otherCertificates.length == 1) return false
      this.otherCertificates.splice(i, 1)
    },
    // 语言操作
    handleAddLang () {
      if (this.language.length == 10) return false
      this.lang && this.language.push(this.lang)
      this.lang = ''
    },
    handleDelLang (i) {
      this.language.splice(i, 1)
    },
    // 技能操作
    handleAddSkill () {
      if (this.skills.length == 10) return false
      this.skill && this.skills.push(this.skill)
      this.skill = ''
    },
    handleDelSkill (i) {
      this.skills.splice(i, 1)
    },
    // 审核成功弹框操作
    handleClose () {
      this.isShow = false
    },
    bindThis (o, index) {
      Object.keys(o).forEach(key => {
        let current = o[key]
        current.events && Object.keys(current.events).forEach(event => {
          // 绑定this 及  数组索引
          current.events[event] = index != undefined ? current.events[event].bind(this, index) : current.events[event].bind(this)
        })
        if (current.type == 'upload') {
          current.props['before-upload'] = current.props['before-upload'].bind(this, index)
          current.props['on-success'] = current.props['on-success'].bind(this, index)
          current.props['on-remove'] = current.props['on-remove'].bind(this, index)
          if (current.value) {
            current.props['file-list']= [{ url: process.env.VUE_APP_HOST_NAME + current.value }]
          }
        }
      })
      return o
    },
    // 上传文件相关
    checkFile (file) {
      if (file.size > 2 * 1024 * 1024) {
        this.alert("上传图片不能超过2M")
        return false
      }
      if (!['image/png', 'image/jpeg', 'image/gif'].includes(file.type)) {
        this.alert("请上传PNG、JPG、GIF类型文件")
        return false
      }
      return true
    },
    afterUpload (fileUrl, index, attrs) {
      console.log(fileUrl, index, attrs)
      if (typeof index == 'number') {
        this[attrs[0]][index][attrs[1]].value = fileUrl
      } else {
        this[attrs[0]][attrs[1]].value = fileUrl
      }
    },
    onRemoveFile (index, attrs) {
      if (typeof index == 'number') {
        this[attrs[0]][index][attrs[1]].value = ''
      } else {
        this[attrs[0]][attrs[1]].value = ''
      }
    },
    async handleSave (type) {
      console.log(this.$refs)
      // 表单校验
      let isValid = true
      const res = await Promise.all([
        ...this.education.map((o, i) => this.$refs['education' + i][0].validate()),
        ...this.workExperience.map((o, i) => this.$refs['experience' + i][0].validate()),
        ...this.otherCertificates.map((o, i) => this.$refs['license' + i][0].validate()),
        this.$refs.socialEcurity.validate(),
        this.$refs.callup.validate(),
      ]).catch(e => isValid = false)
      if (isValid) {
        const l = this.loading()
        // 组装数据
        const formData = {
          education: this.education.map((o, i) => this.$refs['education' + i][0].getFormData()),
          workExperience: this.workExperience.map((o, i) => this.$refs['experience' + i][0].getFormData()),
          otherCertificates: this.otherCertificates.map((o, i) => this.$refs['license' + i][0].getFormData()),
          ...this.$refs.socialEcurity.getFormData(),
          ... this.$refs.callup.getFormData(),
          language: this.language,
          skills: this.skills
        }
        console.log(formData, 'formdata')
        this.initPublicInfo.resume = formData
        const p = {
          publicInfo: this.initPublicInfo
        }
        // 保存并提交审核 更新  backgroundVerifyStatus= 1 ,保存不更新这个字段
        type == 1 && (p.backgroundVerifyStatus = 1)
        const ret = await updateUserInfo(p).catch(e => l.close())
        if (ret.result) {
          this.alert(type == 1 ? '保存并提交审核成功' : '保存成功')
        }
        l.close()
      } else {
        this.alert('表单验证失败', 'warning')
      }
    }
  },
  mounted () {

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
