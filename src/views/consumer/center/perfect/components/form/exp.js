import Vue from 'vue'
import moment from 'moment'

const r = Vue.prototype.$rules
export default {
  name: {
    type: 'input',
    value: '',
    label: '社团/组织名称',
    rules: [r.required()],
  },
  department: {
    type: 'input',
    value: '',
    label: '部门',
    rules: [r.maxLength(20)],
  },
  position: {
    type: 'input',
    value: '',
    label: '职位',
    rules: [r.required()],
  },
  onBoard: {
    type: 'single-checkbox',
    text: '是否在职',
    value: false,
    events: {
      change: function (i, v) {
        this.handleCheckOnBoard(i, v)
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
    value: '',
    layout: { span: 20 },
    props: { type: 'textarea', rows: "6" },
    rules: [r.maxLength(300)]
  },
}