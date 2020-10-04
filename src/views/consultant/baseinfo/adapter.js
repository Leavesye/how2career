export function boxing (from, to) {
  if (!to) { 
    to = {
      account: {},
      basic: {},
      realVerify: {},
      publicInfo: {}
    }
  }
  // 基本信息
  to.account.userName = from.userName
  to.account.passWord = from.passWord
  to.basic.name = from.name
  to.basic.gender = from.gender
  to.basic.birthday = from.birthday
  to.publicInfo.nickName = from.nickName
  to.publicInfo.avatarImage = from.avatarImage
  // 联系方式
  to.basic.phone = from.phone
  to.basic.wechat = from.wechat
  to.basic.email = from.email
  to.basic.detailedIntroduction = from.detailedIntroduction
  to.publicInfo.selfIntroduction = from.selfIntroduction
  // 认证信息
  to.realVerify.phone = from.phoneNumber
  to.realVerify.idCard = from.idCard
  to.realVerify.bankCard = from.bankCard
  return to
}
export function unBoxing (from, to) {
  const { account, basic, publicInfo, realVerify } = from
  const b = to.baseInfo
  // b.userName.value = account.userName
  b.passWord.value = account.passWord
  b.name.value = basic.name
  b.nickName.value = publicInfo.nickName
  b.gender.value = basic.gender
  b.birthday.value = basic.birthday
  b.avatarImage.value = publicInfo.avatarImage
  publicInfo.avatarImage && (b.avatarImage.props['file-list'] = [{ url: process.env.VUE_APP_HOST_NAME + publicInfo.avatarImage }])
  const r = to.realVerify
  r.phoneNumber.value = realVerify.phone
  r.idCard.value = realVerify.idCard
  r.bankCard.value = realVerify.bankCard
  const c = to.contact
  c.phone.value = basic.phone
  c.wechat.value = basic.wechat
  c.email.value = basic.email
  c.selfIntroduction.value = publicInfo.selfIntroduction
  c.detailedIntroduction.value = basic.detailedIntroduction

}