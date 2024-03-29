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
    events: {
      change: function (i, v, h) {
        this.handleCountryChange(i, v, h)
      }
    }
  },
  school: {
    type: 'select',
    value: '',
    label: '学校',
    rules: [r.required()],
    props: { 
      props: { label: 'text', value: 'value' },
      filterable: true,
    },
    options: []
  },
  discipline: {
    type: 'select',
    value: '',
    label: '专业',
    rules: [r.required()],
    props: { 
      props: { label: 'text', value: 'value' },
      filterable: true,
    },
    options: []
  },
  GPA: {
    value: '',
    label: 'GPA',
    layout: { span: 14 },
    rules: [r.float(2), r.range(0, 4, true)],
  },
  degree: {
    type: 'select',
    value: '',
    label: '学位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [],
    layout: { span: 14 },
  },
  graduationTime: {
    type: 'date',
    value: '',
    label: '毕业时间',
    rules: [r.required()],
    layout: { span: 14 },
    props: {
      "value-format": 'timestamp',
      // 毕业时间不能大于当前时间
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  studentOrganization: {
    type: 'single-checkbox',
    layout: { span: 24 },
    text: '曾经参加学生组织',
    value: false,
  },
}