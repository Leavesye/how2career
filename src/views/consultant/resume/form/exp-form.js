import Vue from 'vue'
import moment from 'moment'

const r = Vue.prototype.$rules
export default {
  industry: {
    type: 'select',
    value: '',
    label: '行业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  company: {
    type: 'select',
    value: '',
    label: '企业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  companySize: {
    type: 'select',
    value: '',
    label: '公司规模',
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  department: {
    type: 'input',
    value: '',
    label: '部门',
    rules: [r.required(), r.maxLength(20)],
  },
  position: {
    type: 'select',
    value: '',
    label: '职位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  level: {
    type: 'input',
    value: '',
    label: '级别',
    rules: [r.required()],
  },
  onBoard: {
    type: 'single-checkbox',
    text: '是否在职',
    value: '',
    events: {
      change: function (i, v) {
        this.handleCheckboxChange(6, i, v)
      }
    }
  },
  entryTime: {
    label : '入职时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    layout: { span: 12 },
    props: {
      "value-format": 'timestamp',
      // 入职时间不能大于当前时间
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  resignationTime: {
    label : '离职时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    layout: { span: 12 },
    hide: false,
    props: {
      "value-format": 'timestamp',
      // 离职时间不能大于当前时间
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  duty: {
    type: 'input',
    label: '主要工作内容与业绩',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    rules: [r.maxLength(300)]
  },
  reward: {
    type: 'input',
    label: '奖励和荣誉',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    rules: [r.maxLength(300)]
  },
  teamManagement: {
    type: 'single-checkbox',
    layout: { span: 24 },
    text: '有带团队经历',
    value: '',
    events: {
      change: function (i, v) {
        this.handleCheckboxChange(4, i, v)
      }
    }
  },
  teamMember: {
    type: 'input',
    layout: { span: 14 },
    label: '团队人数',
    props: {
      style: {width: '200px'}
    },
    value: '',
    rules: [r.nInt, r.range(0, 10000000)],
    hide: true
  },
  teamAchievement: {
    type: 'input',
    label: '主要成果',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    rules: [r.maxLength(300)]
  },
}