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
    }
  }
}
export function unBoxing (from, to) {
  const { account, basic } = from
  const b = to.baseInfo
  b.passWord.value = account.passWord
  b.name.value = basic.name
  b.nickName.value = basic.nickName
  b.gender.value = basic.gender
  b.birthday.value = basic.birthday
  b.avatarImage.value = basic.avatarImage
  const edu = to.education
  const h = basic.highestEducation
  edu.country.value = h.country
  edu.school.value = h.school
  edu.discipline.value = h.discipline
  edu.degree.value = h.degree
  edu.graduationTime.value = h.graduationTime
  edu.GPA.value = h.GPA
  edu.selfIntroduction.value = basic.selfIntroduction
  edu.detailedIntroduction.value = basic.detailedIntroduction
  return to
}