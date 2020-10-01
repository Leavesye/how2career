import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  fd: {
    value: '',
    label: '手机号码',
    rules: [r.required()],
  },
  d: {
    value: '',
    label: '微信号',
  },
  g: {
    value: '',
    label: '私人邮箱',
  },
  h: {
    value: '',
    label: '自我介绍',
    props: { type: 'textarea', rows: "3" },
    events : {},
  },
  o: {
    label: '奖励和荣誉',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    events : {},
  }
}