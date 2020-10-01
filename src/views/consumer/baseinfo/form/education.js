import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  gg: {
    type: 'select',
    value: '',
    label: '国家',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  ggg: {
    type: 'select',
    value: '',
    label: '学校',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  g1: {
    type: 'select',
    value: '',
    label: '专业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  g12: {
    type: 'select',
    value: '',
    label: 'GPA',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  g123: {
    type: 'select',
    value: '',
    label: '学位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  i: {
    label : '毕业时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    props: {
      style: {width: '200px'}
    }
  },
  bcc11: {
    value: '',
    label: '自我介绍',
    rules: [r.required()],
  },
  bcc121: {
    value: '',
    label: '详细介绍',
    props: {
      type: 'textarea',
      rows: 6,
      placeholder: '请输入详细内容'
    },
    rules: [r.required()],
  },
}