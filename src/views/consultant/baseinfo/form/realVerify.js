import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  bc: {
    value: '',
    label: '手机号码',
    rules: [r.required()],
  },
  bcc: {
    value: '',
    label: '身份证号',
    rules: [r.required()], 
  },
  g: {
    type: 'select',
    value: '',
    label: '银行卡信息',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
}