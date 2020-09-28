<template>
<el-dialog
  :show-close="false"
  :visible.sync="isShow"
  width="400px"
  center>
  <section class="modal-main">
    <el-image class="logo" :src="logo"></el-image>
    <ul class="flex tabs">
      <li class="tab" @click="handleTabClick(i)" :style="{color: curTab == i ? item.color : ''}" v-for="(item, i) in tabs" :key="i">
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
      <el-form-item label="" prop="vCode">
        <div class="flex-hb">
          <el-input :maxlength="6" class="check-code" placeholder="请输入验证码" v-model="info.vCode"></el-input>
          <el-button class="send-code" plain @click="handleSendCode">{{ seconds > 0 ? seconds + 's' : '获取验证码'}}</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div class="login-bottom">
      <el-button class="reg-btn" :type="curTab == 0? 'success' : 'primary'" @click="handleReg">注册</el-button>
      <p class="tips">未注册手机验证后自动登录，注册即同意注册协议</p>
      <el-link class="to-login" :type="curTab == 0? 'success' : 'primary'">登录已有账号</el-link>
    </div>
  </section>
</el-dialog>
</template>

<script>
import { sendCode, checkUser } from '@/api/user'

export default {
  name: 'login-modal',
  props: ['isShow'],
  data () {
    const r = this.$rules
    return {
      seconds: 0,
      curTab: 0,
      tabs: [
        {name: '注册咨询者', color: '#36AE82', left: 0},
        {name: '注册咨询师', color: '#15479E', left: '130px'},
      ],
      info: {
        userName: '',
        vCode: ''
      },
      rules: {
        userName: [r.required(), r.mobile()],
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
    handleTabClick(index) {
      this.curTab = index
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
            this.seconds = 10
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
      const res = await checkUser(this.info)
      if (res.result) {
        this.$router.push('/register')
      }
    },
    // 校验手机号
    async handleReg () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.checkUserFn()
        } else {
          console.log('error submit!!');
        }
      })
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
