<template>
  <el-row type="flex" justify="center">
    <el-col class="reg-box" v-bind="layout">
      <h1 class="title">基本信息</h1>
      <div class="form-section">
        <section class="form-box"
                style="margin-top: 30px">
          <el-card class="form-card">
            <div class="flex-vc form-name" v-if="!isReg">
              <label for="">手机号</label>
              <p>{{user.userName}}</p>
            </div>
            <div class="flex-vc form-name" v-if="!isReg">
              <label for="">密码</label>
              <p style="margin-right: 30px">**********</p>
              <el-button plain @click="handleClickChangePwd">修改密码</el-button>
            </div>
            <quick-form :model="baseInfo"
                        labelWidth="90px"
                        ref="baseInfo"></quick-form>
          </el-card>
        </section>
      </div>
      <h1 class="title bottom">最高学历</h1>
      <div class="form-section">
        <section class="form-box">
          <el-card class="form-card">
            <quick-form :model="education"
                        labelWidth="90px"
                        ref="education"></quick-form>
          </el-card>
        </section>
      </div>
      <div class="flex-hs" style="margin-top: 20px; margin-left: 20px;" v-if="isReg">
            <el-checkbox v-model="isAgree">同意</el-checkbox>
            <el-link  style="margin-left: 20px;"
                  type="success" 
                  @click="showTerms">网站隐私条款</el-link>
          </div>
      <div class="flex-he"
          style="margin: 60px 60px 70px 0">
        <el-button type="success" @click="handleSave">确定</el-button>
      </div>
    </el-col>
    <change-pwd :isShow="isShow" :account="account" @close="handleClose"></change-pwd>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import QuickForm from '@/components/QuickForm'
import form from './form'
import mixin from '@/mixins'
import * as adapter from './adapter'
import { register } from '@/api/user'
import defaultImg from '@/assets/avatar-upload.png'
import { setToken } from '@/utils/auth'
import { sendCode, checkUser, getUserInfo, updateUserInfo, getDicts }  from '@/api/user'
import ChangePwd from '@/components/ChangePwd'

// 数据字典
let dicts = {}
export default {
  mixins: [mixin],
  components: {
    QuickForm,
    ChangePwd,
  },
  data () {
    return {
      isAgree: false,
      isShowTerms: false,
      seconds: 0,
      account: {},
      isShow: false,
      layout: {
        span: 24
      },
      isReg: false,
      ...form,
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  async created() {
    // 好友推荐带过来的用户id
    this.refer = this.$route.query.refer
    // 销售邀请
    this.sales = this.$route.query.growth
    // 是否是注册页进来
    this.isReg = this.$route.path.includes('/register/consumer')
     if (this.isReg) {
      this.layout = { xs: 24, sm:24, md: 20, lg:15, xl:12}
      this.baseInfo.vcode.renderAppend = this.renderVcode
    } else {
      this.baseInfo.userName.hide = true
      this.baseInfo.vcode.hide = true
      this.baseInfo.passWord.hide = true
    }
    // 给上传组件绑定回调
    const avatar = this.baseInfo.avatarImage
    avatar.props["before-upload"] = (file) => this.uploadBefore(file)
    avatar.props["on-success"] = (res, file) => this.uploadSuccess(res, file, this.uploadCb)
    avatar.render = this.renderUpload
    let ret = await getDicts()
    dicts = ret.msg
    this.education.country.options = dicts.countries
    this.education.discipline.options = dicts.majors
    this.education.GPA.options = dicts.gpa
    this.education.degree.options = dicts.degrees
    this.education.country.events.change = this.handleCountryChange
    if (!this.isReg) {
      const l = this.loading()
      let res = await getUserInfo().catch( e=> l.close())
      if (res.result) {
        const {basic: { highestEducation: { country }}, account } = res.msg
        this.account = account
        if (country) {
          const f = dicts.countries.find(o => o.value == country)
          this.education.school.options = f ? f.schools : []
        }
        adapter.unBoxing(res.msg, this._data)
      }
      l.close()
    }
  },
  methods: {
    showTerms() {
      this.$router.push(`/register/terms?url=${encodeURIComponent('/pdf/IntoCareerPrivatePolice.pdf')}`)
    },
    handleClickChangePwd() {
      this.isShow = true
    },
    handleClose() {
      this.isShow = false
    },
    handleCountryChange(v) {
       if (v) {
        const f = dicts.countries.find(o => o.value == v)
        this.education.school.options = f.schools
      } else {
        this.education.school.options = []
      }
      this.education.school.value = ''
    },
    async handleSave() {
      const keys = Object.keys(form)
      // 校验所有表单
      let isValid = true
      const res = await Promise.all(keys.map(key => this.$refs[key].validate())).catch(e => {
        isValid = false
      })
      if (isValid) {
        // 如果是注册  需验证手机号且同意隐私条款
        if (this.isReg) {
          const b = this.baseInfo
          const ret = await checkUser({ userName: b.userName.value, vCode: b.vcode.value})
          if (!ret.result) {
            this.alert('手机号验证失败')
            return false
          }
          if (!this.isAgree) {
            this.alert('请先同意隐私条款')
            return false
          }
        }
        const formData = { 
          userName: this.user.userName,
          ...this.$refs.baseInfo.getFormData(),
          ...this.$refs.education.getFormData()
        }
        let p = adapter.boxing(formData)
        // 好友推荐注册
        if (this.isReg && this.refer) {
          p.refer = this.refer
        }
        // 销售码
        if (this.isReg && this.sales) {
          p.sales = this.sales
        }
        const l = this.loading()
        let fn = null
        if (this.isReg) {
          fn = register
        } else {
          const { account, ...params } = p
          p = params
          fn = updateUserInfo
        }
        const ret = await fn(p).catch(e => l.close())
        if (ret.result) {
          this.alert(this.isReg ? '注册成功' : '保存成功')
          // 手机端注册不做处理
          if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
              setTimeout(() => {
                window.location.href = "https://m.intocareer.cn/";
              }, 1000)
              return false
          }
          if (this.isReg ) {
            // 缓存token
            setToken(ret.msg.token)
            this.$store.dispatch('user/setUser', { 
              nickName: formData.nickName,
              avatar: formData.avatarImage,
              completion: 20
            })
            // 跳转个人首页
            this.$router.replace('/consumer/index')
          } else {
            // 更新缓存
            this.$store.dispatch('user/setUser', { 
              nickName: formData.nickName,
              avatar: formData.avatarImage,
            })
          }
        }
        l.close()
      }
    },
    sendCode() {
      if (this.seconds > 0) {
        return false
      }
      console.log(this.$refs.baseInfo)
      if (!/^1[345789]\d{9}$/.test(this.baseInfo.userName.value)) {
        this.alert('f')
        return false
      }
      sendCode({ userName: this.baseInfo.userName.value }).then(res => {
        this.seconds = 60
        const sid = setInterval(() => {
          if (this.seconds == 0) {
            clearInterval(sid)
            return
          }
          this.seconds--
        }, 1000)
      })
    },
    renderVcode(h) {
      return (
        <div onClick={() => this.sendCode()}>{this.seconds > 0 ? this.seconds + 's' : '获取验证码'}</div>
      )
    },
    renderUpload(h) {
      let avatarImg = ''
      if (this.baseInfo.avatarImage.value) {
        avatarImg = process.env.VUE_APP_HOST_NAME + this.baseInfo.avatarImage.value
      }
      return (
        <el-Image fit={'cover'} style="border-radius: 50%;width: 90px; height: 90px;overflow: hidden" src={avatarImg || defaultImg}></el-Image>
      )
    },
    checkFile(file) {
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
    afterUpload(v) {
      this.baseInfo.avatarImage.value = v
    }
  }
}
</script>
<style>
.reg-box {
  background: #FDFDFD;
  border-radius: 8px;
}
.form-section {
  padding: 0 70px;
}
@media screen and (max-width: 768px) {
  .form-section {
    padding: 0 10px;
  }
  .el-card__body {
    padding: 10px;
  }
}
</style>
<style lang="scss" scoped>
.title {
  padding: 20px 30px;
  color: #36ae82;
  font-size: 16px;
  border-bottom: 1px solid #edeeef;
}
.title.bottom {
  border-bottom: none;
  border-top: 1px solid #edeeef;
}
.form-card {
  margin-bottom: 50px;
  padding-top: 30px;
}
.form-box {
  margin: 0 auto;
  padding: 0 10px;
}
.form-name {
  font-size: 14px;
  margin-bottom: 30px;
}
.form-name > label {
  color: #7c8ea5;
  width: 90px;
  text-align: right;
  padding-right: 10px;
  font-weight: 500;
}
.form-name > p {
  color: #434d57;
  margin-left: 10px;
}
</style>
