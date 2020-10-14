import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  Periodical: {
    type: 'input',
    value: '',
    label: '期刊名',
    rules: [r.required(),r.maxLength(100)],
  },
  Article: {
    type: 'input',
    value: '',
    label: '文章名',
    rules: [r.required(),r.maxLength(100)],
  },
  level: {
    type: 'select',
    value: '',
    label: '作者级别',
    props: { props: { label: 'text', value: 'value' } },
    options: [],
  },
  duty: {
    type: 'input',
    value: '',
    label: '主要承担工作',
    rules: [r.maxLength(300)],
  },
}