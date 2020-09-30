import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  a: {
    type: 'select',
    value: '',
    label: '行业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  b: {
    value: '',
    label: '企业',
    rules: [r.required()],
  },
  c: {
    type: 'select',
    value: '',
    label: '公司规模',
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  d: {
    value: '',
    label: '部门',
    rules: [r.required()],
  },
  f: {
    type: 'select',
    value: '',
    label: '职位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  g: {
    type: 'select',
    value: '',
    label: '级别',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  h: {
    text : '是否在职' ,
    value : '' ,
    type : 'checkbox',
    rules : [{ required : true , message : '必选项' }] ,
    events : {},
  },
  i: {
    label : '入职时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    layout: {sm : 12, md : 12, lg : 12, xl : 12}
  },
  j: {
    label : '离职时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    layout: {sm : 12, md : 12, lg : 12, xl : 12}
  },
  jg: {
    label: '主要工作内容与业绩',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    events : {},
  },
  jgg: {
    label: '奖励和荣誉',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    events : {},
  },
  hf: {
    text : '有带团队经历' ,
    isShow: true,
    inputVal: '',
    inputPlace: '团队人数',
    value : '' ,
    type : 'checkbox',
    events : {},
  },
  jg11: {
    label: '主要成果',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    events : {},
  },
}