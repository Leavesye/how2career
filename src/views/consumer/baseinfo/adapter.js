export function boxing (from) {
  return {
    "userName": from.userName,
    "passWord": from.passWord,
    "basic": {
      "birthday": from.birthday,
      "name": from.name,
      "gender": from.gender,
      "nickName": from.nickName,
      "avatarImage": from.avatarImage,
      "selfIntroduction": from.selfIntroduction,
      "detailedIntroduction": from.detailedIntroduction,
      "highestEducation": {
        "country": from.country,
        "school": from.school,
        "discipline": from.discipline,
        "degree": from.degree,
        "graduationTime": from.graduationTime,
        "GPA": from.GPA
      }
    },
    "realVerify": {
      "phone": "手机号码",
      "idCard": "身份证"
    }
  }
}
export function unBoxing (from, to) {
  const { account, basic, publicInfo, realVerify } = from
  const b = to.baseInfo
  b.userName.value = account.userName
  b.passWord.value = account.passWord
  b.name.value = basic.name
  b.nickName.value = publicInfo.nickName
  b.gender.value = basic.gender
  b.avatarImage.value = publicInfo.avatarImage
  const r = to.realVerify
  r.phone.value = realVerify.phone
  r.idCard.value = realVerify.idCard
  r.bankCard.value = realVerify.bankCard
  const c = to.contact
  c.phone.value = basic.phone
  c.wechat.value = basic.wechat
  c.email.value = basic.email
  c.selfIntroduction.value = publicInfo.selfIntroduction
  c.detailedIntroduction.value = basic.detailedIntroduction

}