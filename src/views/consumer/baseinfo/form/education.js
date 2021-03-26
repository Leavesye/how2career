import Vue from 'vue'
import moment from 'moment'

const r = Vue.prototype.$rules
export default {
  country: {
    type: 'select',
    value: '',
    label: '地区',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [],
    events: {}
  },
  school: {
    type: 'select',
    value: '',
    label: '学校',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  discipline: {
    type: 'select',
    value: '',
    label: '专业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  GPA: {
    value: '',
    label: 'GPA',
    rules: [r.float(2), r.range(0, 4, true)]
  },
  degree: {
    type: 'select',
    value: '',
    label: '学位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' },placeholder: '已获得/即将获得的最高学位' },
    options: []
  },
  graduationTime: {
    label : '毕业时间/预计毕业时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    props: {
      style: { width: '200px' },
      // 毕业时间需小于当前时间
      'picker-options': {
        disabledDate(time) {
          const selTime = time.getTime()
          return selTime > moment().subtract(-7, 'year').valueOf()
        }
      }
    }
  },
  selfIntroduction: {
    value: '',
    label: '自我介绍',
    rules: [r.maxLength(300)],
    props: {
      placeholder: '自我介绍会帮助您获得更好的咨询服务体验，请认真填写'
    },
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