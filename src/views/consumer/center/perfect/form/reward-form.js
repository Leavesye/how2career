import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  name: {
    type: 'input',
    label: '拥有奖项信息',
    value: '',
    layout: { span: 10 },
    rules: [r.maxLength(30)],
    props: {
      placeholder: '请输入奖项名称'
    }
  },
  expireDate: {
    type: 'date',
    label: '',
    value: '',
    layout: { span: 7 },
    labelWidth: '0',
    props: {
      "value-format": 'timestamp',
      placeholder: '获奖的日期'
    }
  },
  comments: {
    type: 'input',
    label: '',
    value: '',
    layout: { span: 7 },
    labelWidth: '0',
    rules: [r.maxLength(100)],
    props: {
      placeholder: '补充信息'
    }
  },
}