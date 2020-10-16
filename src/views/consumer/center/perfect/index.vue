<template>
  <section>
    <div class="flex-vc page-title">
      <div>补充信息</div>
    </div>
    <p class="form-title">其他学历信息</p>
    <section class="form-box">
      <el-card class="form-card"
               v-for="(o, i) in education"
               :key="i">
        <quick-form :model="o"
                    :labelWidth="labelWidth"
                    :ref="'education' + i"></quick-form>
        <!-- 社团 -->
        <student-org v-if="o.studentOrganization.value"
                     :initData="oriEduData[i]||{}"
                     :authorlevel="authorlevel"
                     :studentOrganization="o.studentOrganization.value"
                     :ref="'org' + i"></student-org>
        <el-button class="del-btn"
                   plain
                   @click="handleDelEducation(i)"
                   v-if="education.length > 1">删除</el-button>
      </el-card>
      <section class="flex-he">
        <el-button class="add-btn"
                   type="success"
                   plain
                   @click="handleAddEducation">+添加更多学历</el-button>
      </section>
    </section>
    <p class="line"></p>
    <p class="form-title">社会实践经历</p>
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
      <section class="flex-he" style="margin-bottom: 30px">
        <el-button class="add-btn"
                   type="success"
                   plain
                   @click="handleAddExperience">+添加社会实践</el-button>
      </section>
    </section>
    <div class="common-check">
      <el-checkbox v-model="getRewarded" @change="handleRewardCheck">是否曾经获奖</el-checkbox>
    </div>
    <section class="form-box"
             v-if="getRewarded">
      <div class="form-div"
           v-for="(reward, i) in rewards"
           :key="i">
        <quick-form :model="reward"
                    :labelWidth="labelWidth"
                    :ref="'reward'+i"></quick-form>
        <div class="flex-he">
          <el-button class="del-btn"
                     @click="handleDelReward(i)"
                     plain>删除</el-button>
        </div>
      </div>
      <section class="flex-he" style="margin-bottom: 30px">
        <el-button class="add-btn"
                   type="success"
                   plain
                   @click="handleAddReward">+添加更多奖项</el-button>
      </section>
    </section>
    <div class="common-check">
      <el-checkbox v-model="hasCertificates" @change="handleCertCheck">是否有执照或者证书</el-checkbox>
    </div>
    <section class="form-box"
             v-if="hasCertificates">
      <div class="form-div"
           v-for="(license, i) in otherCertificates"
           :key="i">
        <quick-form :model="license"
                    :labelWidth="labelWidth"
                    :ref="'license'+i"></quick-form>
        <div class="flex-he">
          <el-button class="del-btn"
                     @click="handleDelLicense(i)"
                     plain>删除</el-button>
        </div>
      </div>
      <section class="flex-he">
        <el-button class="add-btn"
                   type="success"
                   plain
                   @click="handleAddLicense">+添加更多执照</el-button>
      </section>
    </section>
    <p class="line"></p>
    <!-- 添加语言 -->
    <section>
      <p class="form-title">语言</p>
      <el-row>
        <el-col :offset="7"
                :span="16">
          <el-input style="width: 395px;margin-right:20px"
                    v-model="lang"
                    placeholder="请输入信息"
                    size="small"
                    :maxlength="10"
                    @keyup.enter.native="handleAddLang"></el-input>
          <el-button type="success"
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
          <el-input style="width: 395px;margin-right:20px"
                    v-model="skill"
                    placeholder="请输入信息"
                    size="small"
                    :maxlength="20"
                    @keyup.enter.native="handleAddSkill"></el-input>
          <el-button type="success"
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
      <el-button type="success"
                 @click="handleSave(1)">保存</el-button>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import QuickForm from '@/components/QuickForm'
import StudentOrg from './components/student-org'
import eduForm from './form/edu-form'
import expForm from './form/exp-form'
import licenseForm from './form/license-form'
import rewardForm from './form/reward-form'
import { getUserInfo, updateUserInfo, getDicts } from '@/api/user'
import mixin from '@/mixins'

const cfg = {
  'education': eduForm,
  'workExperience': expForm,
  'otherCertificates': licenseForm,
  'rewards': rewardForm,
}
let dicts = {}
// 联动表单配置
const fieldCfg = {
  onBoard: 1,
}
export default {
  components: {
    QuickForm,
    StudentOrg
  },
  mixins: [mixin],
  data () {
    return {
      hasCertificates: false,
      getRewarded: false,
      lang: '',
      language: [],
      skill: '',
      skills: [],
      isShow: false,
      labelWidth: '140px',
      education: [_.cloneDeep(eduForm)],
      workExperience: [_.cloneDeep(expForm)],
      otherCertificates:[],
      rewards:[],
      authorlevel: [],
      oriEduData: {}
    }
  },
  async created () {
    const l = this.loading()
    let ret = await getDicts()
    dicts = ret.msg
    const { countries, majors, degrees, gpa , industry,workCategory, authorlevel } = dicts
    eduForm.country.options = countries
    eduForm.discipline.options = majors
    eduForm.GPA.options = gpa
    eduForm.degree.options = degrees
    expForm.JobCategory.options = workCategory
    expForm.industry.options = industry
    this.authorlevel = authorlevel
    let res = await getUserInfo().catch(e => l.close())
    if (res.result) {
      // 简历信息
      const resume = res.msg.resume
      // 编辑
      if (resume) {
        const { education, workExperience,other: { language, skills,
        certificatesHistory: otherCertificates, rewardHistory: rewards,
        getRewarded, hasCertificates } } = resume
        this.oriEduData = education
        this.getRewarded = getRewarded
        this.hasCertificates = hasCertificates
        const data = { education, workExperience, otherCertificates, rewards }
        Object.keys(data).forEach(key => {
          if (['education', 'workExperience', 'otherCertificates', 'rewards'].includes(key)) {
            const form = data[key]
            this[key] = []
            form.forEach((o, i) => {
              // 创建表单对象并加入列表
              let copy = _.cloneDeep(cfg[key])
              this[key].push(copy)
              // 给表单绑定下拉选项并赋值
              Object.keys(copy).forEach(k => {
                // 国家
                if (k == 'country') {
                  // 联动学校处理
                  copy.school.options = dicts.countries.find(f => f.value == o[k]).schools
                }
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
      } else { // 新增
        // 绑定form表单事件方法this到组件实例 便于后续调用实例方法
        this.education[0] = this.bindThis(this.education[0], 0)
        this.workExperience[0] = this.bindThis(this.workExperience[0], 0)
        this.otherCertificates[0] = this.bindThis(this.otherCertificates[0], 0)
        this.rewards[0] = this.bindThis(this.rewards[0], 0)
      }
    }
    l.close()
  },
  methods: {
    // 国家联动学校
    handleCountryChange (i, v) {
      if (v) {
        console.log(dicts.countries, v)
        const f = dicts.countries.find(o => o.value == v)
        this.education[i].school.options = f.schools
      } else {
        this.education[i].school.options = []
      }
      this.education[i].school.value = ''
    },
    // 表单联动操作
    handleCheckboxChange (type, index, v) {
      if (type == 1) {
        this.workExperience[index].resignationTime.hide = v
        this.workExperience[index].resignationTime.value = ''
      }
    },
    // 学历操作
    handleAddEducation () {
      if (this.education.length == 10) return false
      console.log(_.cloneDeep(eduForm), 9090)
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
    handleCertCheck(v) {
      if (v) {
        this.otherCertificates=[this.bindThis(_.cloneDeep(licenseForm), 0)]
      } else {
        this.otherCertificates = []
      }
    },
    handleAddLicense () {
      if (this.otherCertificates.length == 10) return false
      this.otherCertificates.push(this.bindThis(_.cloneDeep(licenseForm), this.otherCertificates.length))
    },
    handleDelLicense (i) {
      this.otherCertificates.splice(i, 1)
      this.hasCertificates = !!this.otherCertificates.length
    },
    // 奖项操作
    handleRewardCheck(v) {
      if (v) {
        this.rewards=[this.bindThis(_.cloneDeep(rewardForm), 0)]
      } else {
        this.rewards = []
      }
    },
    handleAddReward () {
      if (this.rewards.length == 10) return false
      this.rewards.push(this.bindThis(_.cloneDeep(rewardForm), this.rewards.length))
    },
    handleDelReward (i) {
      this.rewards.splice(i, 1)
      this.getRewarded = !!this.rewards.length
    },
    // 语言操作
    handleAddLang () {
      console.log(this.language, 'iiii')
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
            current.props['file-list'] = [{ url: process.env.VUE_APP_HOST_NAME + current.value }]
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
      console.log(this.$refs, 5555)
      // 社团校验
      let eduv = []
      let expv = []
      let prjv = []
      let artv = []
      eduv = this.education.map((o, i) => {
        if (this.education[i].studentOrganization.value) {
          let org = this.$refs['org' + i][0]
          org.exps = org.exps || []
          expv = org.exps.map((v, i) => {
            const ref = org.$refs['exp' + i]
            let p = ref ? ref[0].validate() : Promise.resolve(true)
            return p
          })
          org.projects = org.projects || []
          prjv = org.projects.map((v, i) => {
            const ref = org.$refs['project' + i]
            let p = ref ? ref[0].validate() : Promise.resolve(true)
            return p
          })
          org.articles = org.articles || []
          artv = org.articles.map((v, i) => {
            const ref = org.$refs['article' + i]
            let p = ref ? ref[0].validate() : Promise.resolve(true)
            return p
          })
        }
        return this.$refs['education' + i][0].validate()
      })
      // 表单校验
      let isValid = true
      console.log(33333)
      let certV = this.hasCertificates ? this.otherCertificates.map((o, i) => this.$refs['license' + i][0].validate()):[]
      let rewardV = this.getRewarded ? this.rewards.map((o, i) => this.$refs['reward' + i][0].validate()):[]
      const res = await Promise.all([
        ...eduv,
        ...expv,
        ...prjv,
        ...artv,
        ...this.workExperience.map((o, i) => this.$refs['experience' + i][0].validate()),
        ...certV,
        ...rewardV,
      ]).catch(e => isValid = false)
      if (isValid) {
        const education = this.education.map((o, i) => {
          let main = this.$refs['education' + i][0].getFormData()
          if (main.studentOrganization) {
            const org = this.$refs['org' + i][0]
            // 参加社团
            main.studentOrganizationHistory = []
            main.projectHistory = []
            main.ArticleHistory = []
            main.publishArticle = !!org.articles.length
            console.log(org.articles, 4444)
            main.projectExperience = !!org.projects.length
            if (main.studentOrganization) {
              main.studentOrganizationHistory = org.exps.map((v, i) => {
                return org.$refs['exp' + i][0].getFormData()
              })
            } else {
              main.studentOrganizationHistory = []
            }
            if (main.projectExperience) {
              main.projectHistory = org.projects.map((v, i) => {
                return org.$refs['project' + i][0].getFormData()
              })
            } else {
              main.projectHistory = []
            }
            if (main.publishArticle) {
              console.log(main.publishArticle, org, 333)
              main.ArticleHistory = org.articles.map((v, i) => {
                return org.$refs['article' + i][0].getFormData()
              })
            } else {
              main.ArticleHistory = []
            }
          }
          return main
        })
        // 组装数据
        let certificatesHistory = this.hasCertificates ? this.otherCertificates.map((o, i) => this.$refs['license' + i][0].getFormData()):[]
        let rewardHistory = this.getRewarded ? this.rewards.map((o, i) => this.$refs['reward' + i][0].getFormData()):[]
        const formData = {
          education,
          workExperience: this.workExperience.map((o, i) => this.$refs['experience' + i][0].getFormData()),
          other: {
            hasCertificates: this.hasCertificates,
            certificatesHistory,
            getRewarded: this.getRewarded,
            rewardHistory,
            language: this.language,
            skills: this.skills,
          },
        }
        console.log(formData, 'formdata')
        const p = {
          resume: formData
        }
        const l = this.loading()
        const ret = await updateUserInfo(p).catch(e => l.close())
        if (ret.result) {
          this.alert('保存成功')
        }
        l.close()
      } else {
        this.alert('表单验证失败', 'warning')
      }
    }
  },
  mounted () {
    console.log(this.$refs, 333)
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
  color: #36ae82;
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
  margin: 0 auto;
  padding: 0 70px;
}
.form-title {
  font-size: 16px;
  color: #36ae82;
  margin: 30px;
}
.add-btn {
  margin-top: 30px;
}
.del-btn {
  float: right;
  margin: 20px 0;
  width: 90px;
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
.common-check {
  padding-left: 240px;
  margin-bottom: 20px;
}
.form-div {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px 10px 10px 0;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #edeeef;
  margin-bottom: 10px;
}
</style>
