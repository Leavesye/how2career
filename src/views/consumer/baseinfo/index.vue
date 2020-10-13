<template>
  <section>
    <h1 class="title">基本信息</h1>
    <section class="form-box"
             style="margin-top: 30px">
      <el-card class="form-card">
        <div class="flex-vc form-name">
          <label for="">手机号</label>
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
    <h1 class="title bottom">最高学历</h1>
    <section class="form-box">
      <el-card class="form-card">
        <quick-form :model="education"
                    labelWidth="140px"
                    ref="education"></quick-form>
      </el-card>
    </section>
    <div class="flex-he"
         style="margin: 60px 60px 70px 0">
      <el-button type="success" @click="handleSave">确定</el-button>
    </div>
  </section>
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
import { getUserInfo, updateUserInfo }  from '@/api/user'

export default {
  name: 'consumer-baseinfo',
  mixins: [mixin],
  components: {
    QuickForm,
  },
  data () {
    return {
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
    // 是否是注册页进来
    this.isReg = this.$route.path.includes('/register/consumer')
    this.isReg && (this.baseInfo.passWord.hide = false)
    // 给上传组件绑定回调
    const avatar = this.baseInfo.avatarImage
    avatar.props["before-upload"] = (file) => this.uploadBefore(file)
    avatar.props["on-success"] = (res, file) => this.uploadSuccess(res, file, this.uploadCb)
    avatar.render = this.renderUpload
    if (!this.isReg) {
      const l = this.loading()
      let res = await getUserInfo().catch( e=> l.close())
      if (res.result) {
        adapter.unBoxing(res.msg, this._data)
      }
      l.close()
    }
  },
  methods: {
    handleClickChangePwd() {},
    async handleSave() {
      const keys = Object.keys(form)
      // 校验所有表单
      let isValid = true
      const res = await Promise.all(keys.map(key => this.$refs[key].validate())).catch(e => {
        console.log(e, 'error')
        isValid = false
      })
      console.log(res, 333)
      if (isValid) {
        const formData = { 
          userName: this.user.userName,
          ...this.$refs.baseInfo.getFormData(),
          ...this.$refs.education.getFormData()
        }
        console.log(formData, 'formdata')
        const p = adapter.boxing(formData)
        console.log(p, '参数')
        const l = this.loading()
        let ret = null
        if (this.isReg) {
          ret = await register(p).catch(e => l.close())
        } else {
          ret = await updateUserInfo(p).catch(e => l.close())
        }
        if (ret.result) {
          this.alert(this.isReg ? '注册成功' : '保存成功')
          if (this.isReg ) {
            // 缓存token
            setToken(ret.msg.token)
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
  }
}
</script>

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
