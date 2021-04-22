import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  wechat: {
    value: '',
    label: '微信号',
    rules: [r.required(), r.maxLength(50)]
  },
  email: {
    value: '',
    label: '联系邮箱',
    rules: [r.required(), r.maxLength(100), r.eMail()]
  },
  address: {
    value: '',
    label: '联系地址',
    rules: [r.required(), r.maxLength(200)]
  },
  selfIntroduction: {
    value: '',
    label: '自我介绍',
    props: { type: 'textarea', rows: "3",
    placeholder: 'IntoCareer会匹配求职者的要求和简历并推荐数名最适合的咨询师，自我介绍对求职者咨询师的主动选择有着至关重要的作用，请认真填写' },
    events: {},
    rules: [r.maxLength(300)]
  }
}