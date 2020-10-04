import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  phoneNumber: {
    value: '',
    label: '手机号码',
    rules: [r.required(), r.mobile()],
  },
  idCard: {
    value: '',
    label: '身份证号',
    rules: [r.required(), r.idCard()], 
  },
  bankCard: {
    value: '',
    label: '银行卡信息',
    rules: [r.required(), r.length(13, 19)],
  },
}