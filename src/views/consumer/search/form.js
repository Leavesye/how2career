import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  a: {
    layout: { span: 10 },
    type: 'select',
    value: '',
    label: '行业选择',
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'行业1', value: '1'},
      {text:'行业2', value: '2'},
    ]
  },
  b: {
    layout: { span: 10 },
    type: 'select',
    value: '',
    label: '职位选择',
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'职位1', value: '1'},
      {text:'职位2', value: '2'},
    ]
  },
  f: {
    label : '目标公司选择' ,
    value : '' ,
    type : 'checkbox',
    props : { label : 'label' , value : 'value' } ,
    options: [
      {label : '头部公司Top10' , value : '1'},
      {label : '特色企业Top10' , value : '2'},
      {label : '创业公司Top10' , value : '3'},
    ]
  },
  bccc: {
    label : '咨询师偏好' ,
    value : '' ,
    type : 'radio',
    props: {label: 'label', value: 'value' },
    options: [
      {label : '曾经的我-相似个人背景' , value : '1'},
      {label : '头部大咖-顶级个人背景' , value : '2'},
    ],
  }
}