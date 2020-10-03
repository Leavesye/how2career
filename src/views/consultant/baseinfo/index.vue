<template>
  <section>
    <h1 class="title">基本信息</h1>
    <section class="form-box"
             style="margin-top: 30px">
      <el-card class="form-card">
        <div class="flex-vc form-name">
          <label for="">手机号/邮箱地址</label>
          <p>{{user.userName}}</p>
        </div>
        <div class="flex-vc form-name" v-if="!isReg">
          <label for="">密码</label>
          <p style="margin-right: 30px">**********</p>
          <el-button size="small" @click="handleClickChangePwd">修改密码</el-button>
        </div>
        <quick-form :model="baseInfo"
                    labelWidth="140px"
                    ref="baseInfo"></quick-form>
      </el-card>
    </section>
    <h1 class="title bottom">实名认证（未认证）</h1>
    <section class="form-box">
      <el-card class="form-card">
        <div class="flex form-name" v-if="!isReg">
          <label for=""><span style="color: #F56C6C">*</span>姓名</label>
          <p>超级玛丽</p>
        </div>
        <quick-form :model="realVerify"
                    labelWidth="140px"
                    ref="realVerify"></quick-form>
        <div class="flex-vc form-name" v-if="!isReg">
          <label for=""></label>
          <el-button plain type="primary" size="small" @click="handleVerify">重新认证</el-button>
        </div>
      </el-card>
    </section>
    <h1 class="title bottom">联系方式</h1>
    <section class="form-box">
      <el-card class="form-card">
        <quick-form :model="contact"
                    labelWidth="140px"
                    ref="contact"></quick-form>
      </el-card>
    </section>

    <div class="flex-he"
         style="margin: 60px 60px 70px 0">
      <el-button type="primary"
                 size="mini" @click="handleSave">确定</el-button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import QuickForm from '@/components/QuickForm'
import form from './form'
import mixin from '@/mixins'
import * as adapter from './adapter'
import { register, realVerify } from '@/api/user'
import defaultImg from '@/assets/avatar-upload.png'
import { setToken } from '@/utils/auth'

export default {
  name: 'consultant-baseinfo',
  components: {
    QuickForm,
  },
  mixins: [mixin],
  data () {
    return {
      isReg: false, // 是否注册页面
      ...form, // 表单配置
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    handleClickChangePwd() {
      
    },
    // 重新实名认证
    async handleVerify() {
      // {
      //   "name":"吕骏",
      //   "phone":"18602113265",
      //   "idCard":"310104197810206816",
      //   "bankCard":"6225800211952410"
      // }
      const bFormdata = this.$refs.baseInfo.getFormData()
      const rFormdata = this.$refs.realVerify.getFormData()
      const l = this.loading()
      const res = await realVerify({ name: bFormdata.name, ...rFormdata }).catch(e=> l.close())
      l.close()
    },
    async handleSave() {
      const keys = Object.keys(form)
      // 校验所有表单
      let isValid = true
      const res =  await Promise.all(keys.map(key => this.$refs[key].validate())).catch(e => {
        console.log(e, 'error')
        isValid = false
      })
      console.log(res, 333)
      if (isValid) {
        const l = this.loading()
        const formData = { 
          userName: this.user.userName,
          ...this.$refs.baseInfo.getFormData(),
          ...this.$refs.realVerify.getFormData(),
          ...this.$refs.contact.getFormData(),
        }
        console.log(formData, 'formdata')
        const p = adapter.boxing(formData)
        console.log(p, '参数')
        let ret = await register(p).catch(e => l.close())
        if (ret.result) {
          this.alert('注册成功')
          // 缓存token
          setToken(ret.msg.token)
          // 跳转个人首页
          this.$router.replace('/consultant/index')
        }
        l.close()
      }
    },
    renderUpload(h) {
      let avatarImg = ''
      if (this.baseInfo.avatarImage.value) {
        avatarImg = process.env.VUE_APP_HOST_NAME + this.baseInfo.avatarImage.value
      }
      console.log(avatarImg)
      return (
        <el-Image style="border-radius: 50%;width: 90px; height: 90px;overflow: hidden" src={avatarImg || defaultImg}></el-Image>
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
  },
  mounted () {
    // 是否是注册页进来
    this.isReg = this.$route.path.includes('/register/consultant')
    this.isReg && (this.baseInfo.passWord.hide = false)
    // 给上传组件绑定回调
    const avatar = this.baseInfo.avatarImage
    avatar.props["before-upload"] = (file) => this.uploadBefore(file)
    avatar.props["on-success"] = (res, file) => this.uploadSuccess(res, file)
    avatar.render = this.renderUpload // 上传组件渲染函数
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 20px 30px;
  color: #15479e;
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
  width: 800px;
  margin: 0 auto;
}
.form-name {
  font-size: 14px;
  margin-bottom: 30px;
}
.form-name > label {
  color: #7c8ea5;
  width: 140px;
  text-align: right;
  padding-right: 10px;
  font-weight: 500;
}
.form-name > p {
  color: #434d57;
  margin-left: 10px;
}
</style>
