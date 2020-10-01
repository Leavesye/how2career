<template>
<el-dialog
  :show-close="false"
  :visible.sync="isShow"
  width="400px"
  center>
  <section class="modal-main">
    <el-image class="logo" :src="logo"></el-image>
    <ul class="flex tabs">
      <li class="tab" @click="handleTabClick(item, i)" :style="{color: curTab == i ? item.color : ''}" v-for="(item, i) in tabs" :key="i">
        {{ item.name }}
      </li>
      <div class="tab-slide" :style="{ left: tabs[curTab].left, backgroundColor: tabs[curTab].color}"></div>
    </ul>
    <el-form ref="form" :rules="rules" :model="info" label-width="0">
      <el-form-item label="" prop="userName">
        <el-input :maxlength="11" class="phone" placeholder="请输入手机号" v-model="info.userName">
          <template slot="prepend">+86</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="pageType==2" label="" prop="passWord">
        <el-input type="password" :maxlength="10" class="phone" placeholder="请输入密码" v-model="info.passWord"></el-input>
      </el-form-item>
      <el-form-item v-if="pageType==1" label="" prop="vCode">
        <div class="flex-hb">
          <el-input :maxlength="6" class="check-code" placeholder="请输入验证码" v-model="info.vCode"></el-input>
          <el-button class="send-code" plain @click="handleSendCode">{{ seconds > 0 ? seconds + 's' : '获取验证码'}}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="login-bottom">
      <el-button class="reg-btn" :loading="isLoading" :type="curTab == 0? 'success' : 'primary'" @click="handleRegOrLogin">{{pageType==1? '注册': '登录'}}</el-button>
      <p class="tips" v-if="pageType==1">未注册手机验证后自动登录，注册即同意注册协议</p>
      <el-link class="to-login" :type="curTab == 0? 'success' : 'primary'" @click="handleLink">{{pageType==1? '登录已有账号': '注册'}}</el-link>
    </div>
  </section>
</el-dialog>
</template>

<script>
import { sendCode, checkUser, login } from '@/api/user'
import { setToken } from '@/utils/auth'

export default {
  name: 'login-modal',
  props: ['isShow'],
  data () {
    const r = this.$rules
    this.role = 'consumer'
    return {
      isLoading: false,
      pageType: 1, // 1 验证手机  2. 登录
      seconds: 0,
      curTab: 0,
      tabs: [
        {name: '注册咨询者', color: '#36AE82', left: 0},
        {name: '注册咨询师',color: '#15479E', left: '130px'},
      ],
      info: {
        userName: '',
        passWord: '',
        vCode: ''
      },
      rules: {
        userName: [r.required(), r.mobile()],
        password: [r.required()],
        vCode: [r.required()],
      }
    }
  },
  computed: {
    logo: function() {
      return require('../../../../assets/logo.png')
    }
  },
  methods: {
    handleLink() { 
      if (this.pageType==1) {
        this.tabs = [
          {name: '登录咨询者', color: '#36AE82', left: 0},
          {name: '登录咨询师', color: '#15479E', left: '130px'},
        ]
        this.pageType = 2
      } else {
        this.$router.push(this.role=='consumer' ? '/register/consumer' : '/register/consultant')
      }
    },
    handleTabClick(item, index) {
      this.curTab = index
      this.role = index == 0 ? 'consumer' : 'consultant'
      this.$refs.form.resetFields()
    },
    // 发送验证码
    handleSendCode() {
      if (this.seconds > 0) {
        return false
      }
      this.$refs.form.validateField('userName', (errMsg) => {
        if (!errMsg) {
          sendCode({ userName: this.info.userName }).then(res => {
            console.log(res)
            this.seconds = 60
            const sid = setInterval(() => {
              if (this.seconds == 0) {
                clearInterval(sid)
                return
              }
              this.seconds--
            }, 1000)
          })
        }
      })
    },
    async checkUserFn() {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await checkUser(this.info)
      if (res.result) {
        this.$store.dispatch('user/setRole', this.role)
        const path = this.role == 'consultant' ? '/register/consultant' : '/register/consumer'
        this.$router.push(path)
      }
      this.isLoading = false
    },
    // 校验手机号
    checkMobile () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.checkUserFn()
        } else {
          this.alert('请填写正确的信息', 'error')
        }
      })
    },
    async loginFn () {
      if (this.isLoading) return false
      this.isLoading = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          login(this.info).then(res => {
            if (res.result) {
              setToken(res.msg.token)
              this.$store.dispatch('setRole', this.role)
              const path = this.role == 'consultant' ? '/consultant/index' : '/consumer/index'
              this.$router.push(path)
            }
            this.isLoading = false
          }).catch(e => this.isLoading = false)
        } else {
          this.alert('请填写正确的信息', 'error')
        }
      })
    },
    handleRegOrLogin() {
      // 跳转注册
      if (this.pageType == 1) {
        this.checkMobile()
      } else { // 登录
        this.loginFn()
      }
    }
  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 174px;
  height: 88px;
  margin: 0 auto;
  margin-bottom: 40px;
  display: block;
}

.tabs {
  position: relative;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 40px;
}
.tab {
  width: 80px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  margin-right: 50px;
  color: #7A7F84;
  cursor: pointer;
}
.tab-slide {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 80px;
  height: 3px;
  transition: .5s all;
}
.check-code {
  width: 210px;
  margin-right: 10px;
}
.send-code {
  width: 120px;
}
.reg-btn {
  width: 100%;
}
.tips {
  font-size: 14px;
  color: #7A7F84;
  margin-top: 20px;
}
.to-login {
  margin-top: 46px;
}
.login-bottom {
  text-align: center;
}

</style>
