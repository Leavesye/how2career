<template>
  <div class="home">
    <el-button type="info"
               @click="login">登录</el-button>
    <el-button type="info"
               @click="reg">注册</el-button>
    <el-button type="info"
               @click="create">创建订单</el-button>
    <login :isShow="true"></login>
  </div>
</template>

<script>
import { login, consultantReg } from '@/api/user'
import { createOrder } from '@/api/order'
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
    },
    async create() {
      const res = await createOrder({
        "consultant": {
          "_id": "5f532bdb15d031b7520a493d",
          "name": "姓名",
          "avatar": "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "readme": "100字简介",
          "education": {
            "school": "毕业学校",
            "discipline": "专业",
            "degree": "学位",
            "graduationTime": "毕业时间"
          },
          "work": {
            "industry": "行业",
            "company": "公司",
            "position": "职位",
            "workingYears": "工作年限",
            "duty": "工作内容",
            "skills": "工作技能"
          }
        },
        "startTime": "确认的开始时间",
        "consumerTime": [
          1601880873,
          1601880874,
          1601880875
        ]
      })
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
</style>