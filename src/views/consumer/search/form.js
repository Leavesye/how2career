import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  industry: {
    layout: { span: 20 },
    type: 'select',
    value: '',
    label: '行业选择',
    props: { props: { label: 'text', value: 'value' },multiple: true },
    options: []
  },
  position: {
    layout: { span: 20 },
    type: 'select',
    value: [],
    label: '职位选择',
    props: { props: { label: 'text', value: 'value' },multiple: true },
    rules: [r.required()],
    options: []
  },
  company: {
    layout: { span: 20 },
    type: 'select',
    value: '',
    label: '公司选择',
    props: { 
      props: { label: 'text', value: 'value' },
      multiple: true,
      filterable: true,
      remote: true,
      remoteMethod: null,
      loading: false,
    },
    options: []
  },
}