<template>
  <div class="home">
    <el-button type="info"
               @click="action(1)">登录</el-button>
    <el-button type="info"
               @click="action(2)">注册</el-button>
    <el-button type="info"
               @click="create">创建订单</el-button>
    <login @close="handleCloseLogin"
           :isShow="isShow"
           :type="type"></login>
  </div>
</template>

<script>
import { login, getUserInfo } from '@/api/user'
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
      isShow: false,
      type: 1
    }
  },
  methods: {
    handleCloseLogin () {
      this.isShow = false
    },
    async action (type) {
      // const res = await login({
      //   "userName": "18602113265",
      //   "passWord": "123"
      // })
      // setToken(res.msg.token)
      // const ret = await getUserInfo()
      this.isShow = true
      this.type = type
    },
    async reg () {
      // 咨询师用户信息
      var a = {
        "result": true,
        "msg": {
          "_id": "5f532bdb15d031b7520a493d",
          "active": false,
          "available": true,
          "basic": {
            "birthday": "出生年月",
            "detailedIntroduction": "详细介绍",
            "email": "联系信息-私人邮箱",
            "firstName": "名",
            "gender": "f/m",
            "lastName": "姓",
            "phone": "联系信息-手机号码",
            "wechat": "联系信息-微信号"
          },
          "cTime": "创建时间",
          "publicInfo": {
            "availableTime": [
              {
                "period": "day",
                "repeat": true,
                "time": "2020-10-10 20:00"
              },
              {
                "period": "week",
                "repeat": true,
                "time": "2020-10-10 18:00"
              }
            ],
            "avatarImage": "头像url",
            "level": 1,
            "nickName": "昵称",
            "resume": {
              "education": [
                {
                  "GPA": "GPA成绩",
                  "country": "国家",
                  "degree": "学位",
                  "degreeCertificate": "学位证",
                  "discipline": "专业",
                  "getRewarded": true,
                  "graduationTime": "毕业时间",
                  "organizationTitle": "职位",
                  "projectArticle": true,
                  "projectArticleDescription": "项目文章经历描述",
                  "rewardDescription": "奖项描述",
                  "school": "毕业学校",
                  "studentOrganization": true
                }
              ],
              "gallupCertified": true,
              "gallupCertifiedImage": "gallup图片",
              "language": [
                "english",
                "french"
              ],
              "otherCertificates": [
                {
                  "certificateImage": "证书图片",
                  "comments": "备注",
                  "expireDate": "有效日期",
                  "name": "证书名称"
                }
              ],
              "skills": [
                "java",
                "golang"
              ],
              "socialInsuranceImage": "社保图片",
              "workExperience": [
                {
                  "company": "公司",
                  "companySize": "公司规模",
                  "department": "部门",
                  "duty": "工作内容",
                  "entryTime": "2020-10",
                  "industry": "行业",
                  "level": "级别",
                  "onBoard": true,
                  "position": "职位",
                  "resignationTime": "2023-01",
                  "reward": "奖励和荣誉",
                  "teamAchievement": "团队成果",
                  "teamManagement": true,
                  "teamMember": 10
                }
              ]
            },
            "selfIntroduction": "100字简介"
          },
          "realVerified": true,
          "realVerify": {
            "bankCard": "银行卡",
            "idCard": "身份证",
            "phone": "手机号码"
          },
          "resumeVerified": true,
          "slots": [
            {
              "_id": "1600191034",
              "active": true,
              "cost": 123,
              "costLeft": 123,
              "expireTime": 1700191034
            },
            {
              "_id": "1600191035",
              "active": true,
              "cost": 123,
              "costLeft": 123,
              "expireTime": 1700191035
            },
            {
              "_id": "1600191036",
              "active": true,
              "cost": 123,
              "costLeft": 123,
              "expireTime": 1700191036
            },
            {
              "_id": "1600191037",
              "active": true,
              "cost": 123,
              "costLeft": 123,
              "expireTime": 1700191037
            }
          ],
          "slotsFee": -8667,
          "suspendUntil": 0,
          "uTime": 1600191034
        }
      }
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
    async create () {
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