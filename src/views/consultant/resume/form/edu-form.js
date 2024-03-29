import Vue from 'vue'
import { upload } from './upload'
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
    props: { props: { label: 'text', value: 'value' },filterable: true },
    options: []
  },
  discipline: {
    type: 'select',
    value: '',
    label: '专业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' },filterable: true },
    options: []
  },
  degree: {
    type: 'select',
    value: '',
    label: '学位',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' },style: { width: '294px' }, },
    options: [],
  },
  graduationTime: {
    type: 'date',
    value: '',
    label: '毕业时间',
    rules: [r.required()],
    props: {
      "value-format": 'timestamp',
      style: { width: '294px' },
      // 毕业时间不能大于当前时间
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  GPA: {
    value: '',
    label: 'GPA',
    props: { style: { width: '294px' } },
    rules: [r.float(2), r.range(0, 4, true)],
  },
  studentOrganization: {
    type: 'single-checkbox',
    layout: { span: 24 },
    text: '曾经参加学生组织',
    value: '',
    events: {
      change: function (i, v) {
        this.handleCheckboxChange(1, i, v)
      }
    }
  },
  organizationTitle: {
    type: 'input',
    layout: { span: 19 },
    label: '',
    props: {
      placeholder: '职位（必填）',
      style: {width: '200px'}
    },
    value: '',
    rules: [r.required(), r.maxLength(20)],
    hide: true
  },
  getRewarded: {
    type: 'single-checkbox',
    text: '曾经获得奖项',
    layout: { span: 24 },
    value: '',
    events: {
      change: function (i, v) {
        this.handleCheckboxChange(2, i, v)
      }
    }
  },
  rewardDescription: {
    type: 'input',
    layout: { span: 19 },
    label: '',
    props: {
      placeholder: '奖项描述（必填）',
      style: {width: '200px'}
    },
    value: '',
    rules: [r.required(), r.maxLength(100)],
    hide: true
  },
  projectArticle: {
    type: 'single-checkbox',
    text: '在校内有完成项目经历或发表文章',
    value: '',
    events: {
      change: function (i, v) {
        this.handleCheckboxChange(3, i, v)
      }
    }
  },
  projectArticleDescription: {
    type: 'input',
    label: '',
    value: '',
    props: { type: 'textarea', rows: "6", placeholder: '请输入内容描述（必填）' },
    rules: [r.required(), r.maxLength(300)],
    hide: true
  },
  degreeCertificate: {
    label: '毕业证/学位证或者 学信网学历认证报告',
    rules: [r.required()],
    type: "upload",
    value: '',
    props: {
      action: process.env.VUE_APP_BASE_API + "/user/platform/consultant/upload",
      accept: '.jpg,.png,.gif',
      name: 'UploadFiles',
      limit: 1,
      "file-list": [],
      "list-type":"picture-card",
      "show-file-list": true,
      "auto-upload": true,
      "before-upload": function (index, file) { this.uploadBefore(file, index) },
      "on-success": function (index, res, file) { this.uploadSuccess(res, file, index, ['education', 'degreeCertificate']) },
      "on-remove": function (index, file, fileList) { this.uploadRemove(file, fileList, index, ['education', 'degreeCertificate']) },
    },
    render: (h) => {
      return upload(h)
    },
    slotRender: (h) => {
      return (
        <a style="color: #15479E; margin-top: 15px;display:block" href="/pdf/通过学信网获得中国学位认证步骤.pdf" target="_blank">如何获取</a>
      )
    }
  },
}