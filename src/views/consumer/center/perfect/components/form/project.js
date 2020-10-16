import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  title: {
    type: 'input',
    value: '',
    label: '标题',
    layout: { span: 14 },
    rules: [r.required(),r.maxLength(100)],
  },
  content: {
    type: 'input',
    value: '',
    label: '内容',
    layout: { span: 20 },
    rules: [r.required(),r.maxLength(300)],
  },
}