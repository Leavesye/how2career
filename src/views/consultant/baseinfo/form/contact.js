import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  phone: {
    value: '',
    label: '手机号码',
    rules: [r.required(), r.mobile()],
  },
  wechat: {
    value: '',
    label: '微信号',
    rules: [r.maxLength(50)]
  },
  email: {
    value: '',
    label: '私人邮箱',
    rules: [r.maxLength(100), r.eMail()]
  },
  selfIntroduction: {
    value: '',
    label: '自我介绍',
    props: { type: 'textarea', rows: "3" },
    events: {},
    rules: [r.maxLength(300)]
  },
  detailedIntroduction: {
    label: '奖励和荣誉',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    events: {},
    rules: [r.maxLength(300)]
  }
}