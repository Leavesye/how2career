export function boxing (from) {
  return {
    "userName": from.userName,
    "passWord": from.passWord,
    "basic": {
      "name": from.name,
      "gender": from.gender,
      "birthday": from.birthday,
      "phone": from.phone,
      "wechat": from.wechat,
      "email": from.email,
      "detailedIntroduction": from.detailedIntroduction
    },
    "realVerify": {
      "phone": from.phone,
      "idCard": from.idCard,
      "bankCard": from.bankCard
    },
    "publicInfo": {
      "nickName": from.nickName,
      // "level": 1,
      "avatarImage": from.avatarImage,
      "selfIntroduction": from.selfIntroduction
    }
  }
}
export function unBoxing (source) {
  return {
    "userName": "18602113265",
    "passWord": "123",
    "basic": {
      "birthday": "出生年月",
      "name": "姓名",
      "gender": "f/m",
      "nickName": "昵称",
      "avatarImage": "头像url",
      "selfIntroduction": "自我简介",
      "detailedIntroduction": "详细介绍",
      "highestEducation": {
        "country": "国家",
        "school": "毕业学校",
        "discipline": "专业",
        "degree": "学位",
        "graduationTime": "毕业时间",
        "GPA": "GPA成绩"
      }
    },
    "realVerify": {
      "phone": "手机号码",
      "idCard": "身份证"
    },
    "refer": "上游用户的id",
    "referType": "MGM"
  }
}