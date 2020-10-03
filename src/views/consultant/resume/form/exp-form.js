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
    options: [
      {text: '金融',value: '1'},
      {text: '互联网', value: '2'},
    ]
  },
  company: {
    value: '',
    label: '企业',
    rules: [r.required(), r.maxLength(100)],
  },
  companySize: {
    type: 'select',
    value: '',
    label: '公司规模',
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text: '0-10人', value: '1'},
      {text: '10-50人', value: '2'},
    ]
  },
  department: {
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
    options: [
      {text: '普通员工', value: '1'},
      {text: 'CEO', value: '2'},
    ]
  },
  level: {
    type: 'select',
    value: '',
    label: '级别',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: [
      {text: 'P6', value: '1'},
      {text: 'P7', value: '2'},
    ]
  },
  onBoard: {
    type: 'single-checkbox',
    text: '是否在职',
    value: '',
  },
  entryTime: {
    label : '入职时间' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    layout: { span: 12 },
    props: {
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
    props: {
      // 离职时间不能大于当前时间
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  duty: {
    label: '主要工作内容与业绩',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    rules: [r.maxLength(300)]
  },
  reward: {
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
    label: '主要成果',
    value : '' ,
    props: { type: 'textarea', rows: "6" },
    rules: [r.maxLength(300)]
  },
}