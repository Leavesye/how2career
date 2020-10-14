import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  title: {
    type: 'input',
    value: '',
    label: '标题',
    rules: [r.required(),r.maxLength(100)],
  },
  content: {
    type: 'input',
    value: '',
    label: '内容',
    rules: [r.required(),r.maxLength(300)],
  },
}