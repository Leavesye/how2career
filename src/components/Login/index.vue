<template>
  <el-dialog id="login-form" :show-close="false"
             :before-close="handleClose"
             :visible.sync="isShow"
             width="400px"
             center>
    <section class="modal-main">
      <el-image class="logo"
                :src="logo"></el-image>
      <ul class="flex tabs">
        <li class="tab"
            @click="handleTabClick(item, i)"
            :style="{color: curTab == i ? item.color : ''}"
            v-for="(item, i) in tabs"
            :key="i">
          {{ item.name }}
        </li>
        <div class="tab-slide"
             :style="{ left: tabs[curTab].left, backgroundColor: tabs[curTab].color}"></div>
      </ul>
      <el-form ref="form"
               :rules="rules"
               :model="info"
               label-width="0">
        <el-form-item label=""
                      prop="userName">
          <el-input :maxlength="11"
                    class="phone"
                    size="large"
                    placeholder="请输入手机号"
                    v-model="info.userName">
            <template slot="prepend">+86</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="pageType==1"
                      label=""
                      prop="passWord">
          <el-input type="password"
                    :maxlength="16"
                    class="phone"
                    size="large"
                    placeholder="请输入密码"
                    v-model="info.passWord"
                    @keyup.enter.native="handleRegOrLogin"></el-input>
        </el-form-item>
        <el-form-item v-if="pageType==2"
                      label=""
                      prop="vCode">
          <div class="flex-hb">
            <el-input :maxlength="6"
                      class="check-code"
                      size="large"
                      placeholder="请输入验证码"
                      v-model="info.vCode"></el-input>
            <el-button class="send-code"
                       plain
                       @click="handleSendCode">{{ seconds > 0 ? seconds + 's' : '获取验证码'}}</el-button>
          </div>
        </el-form-item>
      </el-form>
      <div class="login-bottom">
        <el-button class="reg-btn"
                    size="large"
                   :loading="isLoading"
                   :type="curTab == 0? 'success' : 'primary'"
                   @click="handleRegOrLogin">{{pageType==2? '注册': '登录'}}</el-button>
        <div v-if="pageType==2" class="flex-hs" style="margin-top: 20px">
          <el-checkbox v-model="isAgree">同意</el-checkbox>
          <el-link  style="margin-left: 20px;"
                 :type="curTab == 0? 'success' : 'primary'"
                 @click="showTerms">网站隐私条款</el-link>
        </div>
        <p class="tips"
           v-if="pageType==2">未注册手机验证后自动登录，注册即同意注册协议</p>
        <el-link class="to-login"
                 :type="curTab == 0? 'success' : 'primary'"
                 @click="handleLink">{{pageType==2? '登录已有账号': '注册'}}</el-link>
      </div>
    </section>
    <terms :isShow="isShowTerms" @close="handleCloseTerms" url="/pdf/IntoCareer 隐私政策.pdf" :isShowBtn="false" :pageCount="17" />
  </el-dialog>
</template>

<script>
import { sendCode, checkUser } from '@/api/user'
import Terms from "@/components/Terms";

const tabsCfg = {
  '1': [
    { name: '登录咨询者', color: '#36AE82', left: 0 },
    { name: '登录咨询师', color: '#15479E', left: '150px' },
  ],
  '2': [
    { name: '注册咨询者', color: '#36AE82', left: 0 },
    { name: '注册咨询师', color: '#15479E', left: '150px' },
  ],
}
export default {
  name: 'login-modal',
  props: ['isShow', 'type', 'refer', 'sales'],
  components: {
    Terms
  },
  data () {
    const r = this.$rules
    this.role = 'consumer'
    return {
      isShowTerms: false,
      isAgree: false,
      isShowTerms: false,
      isLoading: false,
      pageType: this.type, // 1 登入  2. 验证手机注册
      seconds: 0,
      curTab: 0,
      tabs: tabsCfg[this.type],
      info: {
        userName: '',
        passWord: '',
        vCode: ''
      },
      rules: {
        userName: [r.required(), r.mobile()],
        passWord: [r.required(), r.psd()],
        vCode: [r.required()],
      }
    }
  },
  computed: {
    logo: function () {
      return require('@/assets/logo1.png')
    }
  },
  watch: {
    'type': function (newV, oldV) {
      this.pageType = newV
      this.tabs = tabsCfg[this.pageType]
    }
  },
  methods: {
    handleCloseTerms() {
       this.isShowTerms = false
    },
    handleShowTerms() {
       this.isShowTerms = true
    },
    handleClose () {
      this.$emit('close')
    },
    handleLink () {
      this.pageType = this.pageType == 1 ? 2 : 1
      this.tabs = tabsCfg[this.pageType]
    },
    handleTabClick (item, index) {
      this.curTab = index
      this.role = index == 0 ? 'consumer' : 'consultant'
      this.$refs.form.resetFields()
    },
    // 发送验证码
    handleSendCode () {
      if (this.seconds > 0) {
        return false
      }
      this.$refs.form.validateField('userName', (errMsg) => {
        if (!errMsg) {
          sendCode({ userName: this.info.userName }).then(res => {
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
    // 验证手机号
    async checkUserFn () {
      if (this.isLoading) return false
      this.isLoading = true
      const res = await checkUser(this.info)
      if (res.result) {
        this.$store.dispatch('user/setUser', { role: this.role, userName: this.info.userName })
        let query = ''
        if (this.refer && this.sales) {
          query = `?refer=${this.refer}&sales=${this.sales}`
        } else if (this.refer && !this.sales) {
          query = `?refer=${this.refer}`
        } else if (!this.refer && this.sales) {
          query = `?sales=${this.sales}`
        }
        const path = this.role == 'consultant' ? '/register/consultant' : `/register/consumer${query}`
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
          // this.alert('请填写正确的信息', 'error')
        }
      })
    },
    async loginFn () {
      console.log(process.env.VUE_APP_BASE_API)
      if (this.isLoading) return false
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.isLoading = true
          const info = { ...this.info, role: this.role }
          this.$store.dispatch('user/login', info).then(res => {
            this.isLoading = false
            if (res.result) {
              const roles = res.msg.types
              // 存在已注册账号  但选择角色不对
              const isRoleErr = roles.length == 1 && !roles.includes(this.role)
              if (isRoleErr && this.role == 'consumer') {
                this.$alert('该账号为咨询师账号,是否直接登录咨询师', '登录角色错误', {
                  confirmButtonText: '确定',
                  callback: action => {
                    if (action == 'confirm') {
                      info.role = 'consultant'
                      // 重新登入
                      this.$store.dispatch('user/login', info).then(ret => {
                        if (res.result) {
                          this.$router.replace('/consultant/index')
                        }
                      })
                    }
                  }
                })
                return false
              }
              if (isRoleErr && this.role == 'consultant') {
                this.$alert('该账号为咨询者账号,是否直接登录咨询者', '登录角色错误', {
                  confirmButtonText: '确定',
                  callback: action => {
                    if (action == 'confirm') {
                      info.role = 'consumer'
                      // 重新登入
                      this.$store.dispatch('user/login', info).then(ret => {
                        if (res.result) {
                          this.$router.replace('/consumer/index')
                        }
                      })
                    }
                  }
                })
                return false
              }
              const path = this.role == 'consultant' ? '/consultant/index' : '/consumer/index'
              this.$router.replace(path)
            }
            this.isLoading = false
          }).catch(e => this.isLoading = false)
        } else {
          // this.alert('请填写正确的信息', 'error')
          this.isLoading = false
        }
      })
    },
    handleRegOrLogin () {
      // 登录
      if (this.pageType == 1) {
        this.loginFn()
      } else { //跳转注册
        if (!this.isAgree) {
          this.alert('请先同意网站隐私条款！', 'warning')
          return false
        }
        this.checkMobile()
      }
    },
    handleCloseTerms() {
      this.isShowTerms = false
    },
    showTerms() {
      this.isShowTerms = true
    }
  },
  mounted () {
  }
};
</script>
<style>
#login-form .el-dialog__header {
  padding-top: 10px;
}
</style>
<style lang="scss" scoped>
.logo {
  width: 108px;
  height: 77px;
  margin: 0 auto;
  margin-bottom: 40px;
  display: block;
}

.tabs {
  position: relative;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 40px;
}
.tab {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  margin-right: 50px;
  color: #7a7f84;
  cursor: pointer;
}
.tab-slide {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100px;
  height: 3px;
  transition: 0.5s all;
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
  color: #7a7f84;
  margin-top: 20px;
}
.to-login {
  margin-top: 46px;
}
.login-bottom {
  text-align: center;
}
</style>
