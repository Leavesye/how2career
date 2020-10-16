import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  name: {
    type: 'input',
    label: '拥有证书信息',
    value: '',
    layout: { span: 12 },
    rules: [r.maxLength(20)],
    props: {
      placeholder: '请输入证书名称'
    }
  },
  expireDate: {
    type: 'date',
    label: '',
    value: '',
    layout: { span: 6 },
    labelWidth: '0',
    props: {
      "value-format": 'timestamp',
      placeholder: '有效日期'
    }
  },
  comments: {
    type: 'input',
    label: '',
    value: '',
    layout: { span: 6 },
    labelWidth: '0',
    rules: [r.maxLength(100)],
    props: {
      placeholder: '请输入补充信息'
    }
  }
}