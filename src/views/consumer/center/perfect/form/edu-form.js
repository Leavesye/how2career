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
    options: [],
    events: {
      change: function (i, v) {
        this.handleCountryChange(i, v)
      }
    }
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
    type: 'select',
    value: '',
    label: 'GPA',
    props: { props: { label: 'text', value: 'value' } },
    options: [],
    style: {
      width: '320px'
    }
  },
  degree: {
    type: 'select',
    value: '',
    label: '学位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [],
    style: {
      width: '320px'
    }
  },
  graduationTime: {
    type: 'date',
    value: '',
    label: '毕业时间',
    rules: [r.required()],
    props: {
      "value-format": 'timestamp',
      style: { width: '300px' },
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