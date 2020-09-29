<template>
  <div class="home">
    <el-button type="info"
               @click="login">登录</el-button>
    <el-button type="info"
               @click="reg">注册</el-button>
    <login :isShow="true"></login>
  </div>
</template>

<script>
import { login, consultantReg } from '@/api/user'
import { setToken } from '@/utils/auth'
import Login from './modal/login'

export default {
  name: 'home',
  components: {
    Login
  },
  data () {
    return {

    }
  },
  methods: {
    async login () {
      const res = await login({
        "userName":"18602113265",
        "passWord":"123"
      })
      // token存到cookie
      if (res.result) {
        setToken(res.msg.token)
        this.$router.push('/consultant')
      }
    },
    async reg () {
      const res = await consultantReg({
        "userName": "18566070441",
        "passWord": "111111",
        "basic": {
          "firstName": "ye",
          "lastName": "song",
          "gender": "f",
          "birthday": "1995-10-02",
          "phone": "18566070441",
          "wechat": "fdfgh",
          "email": "43774888@qq.com",
          "detailedIntroduction": "详细介绍"
        },
        "realVerify": {
          "phone": "手机号码",
          "idCard": "身份证",
          "bankCard": "银行卡"
        },
        "publicInfo": {
          "nickName": "leaves",
          "level": 1,
          "avatarImage": "头像url",
          "selfIntroduction": "100字简介"
        }
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>