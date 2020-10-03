import Vue from 'vue'
import moment from 'moment'

const r = Vue.prototype.$rules
export default {
  country: {
    type: 'select',
    value: '',
    label: '国家',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'中国', value: '1'},
      {text:'美国', value: '2'},
    ]
  },
  school: {
    type: 'select',
    value: '',
    label: '学校',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'北大', value: '1'},
      {text:'清华', value: '2'},
    ]
  },
  discipline: {
    type: 'select',
    value: '',
    label: '专业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'计算机', value: '1'},
      {text:'工商管理', value: '2'},
    ]
  },
  GPA: {
    type: 'select',
    value: '',
    label: 'GPA',
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'70分', value: '1'},
      {text:'80分', value: '2'},
    ]
  },
  degree: {
    type: 'select',
    value: '',
    label: '学位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text:'学士', value: '1'},
      {text:'硕士', value: '2'},
    ]
  },
  graduationTime: {
    label : '毕业时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    props: {
      style: { width: '200px' },
      // 毕业时间需小于当前时间
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  selfIntroduction: {
    value: '',
    label: '自我介绍',
    rules: [r.maxLength(300)]
  },
  detailedIntroduction: {
    value: '',
    label: '详细介绍',
    rules: [r.maxLength(300)],
    props: {
      type: 'textarea',
      rows: 6,
      placeholder: '请输入详细内容'
    },
  },
}