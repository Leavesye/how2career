import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  a: {
    type: 'select',
    value: '',
    label: '国家',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  b: {
    type: 'select',
    value: '',
    label: '学校',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  c: {
    type: 'select',
    value: '',
    label: '专业',
    rules: [r.required()],
    props: { props: { label: 'text', value: 'value' } },
    options: []
  },
  d: {
    type: 'select',
    value: '',
    label: 'GPA',
    props: { props: { label: 'text', value: 'value' } },
    options: [],
    style: {
      width: '320px'
    }
  },
  e: {
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
  f: {
    type: 'date',
    value: '',
    label: '毕业时间',
    rules: [r.required()],
    style: {
      width: '320px'
    }
  },
  g: {
    text: '曾经参加学生组织',
    value: '',
    type: 'checkbox',
    events: {},
  },
  h: {
    layout: { span: 5 },
    text: '曾经获得奖项',
    value: '',
    type: 'checkbox',
  },
  hhh: {
    layout: { span: 14 },
    label: '',
    props: { placeholder: '奖项描述（必填）'},
    value: '',
    rules: [r.required()],
  },
  
  i: {
    text: '在校内有完成项目经历或发表文章',
    value: '',
    type: 'checkbox',
    events: {},
  },
  j: {
    label: '',
    value: '',
    props: { type: 'textarea', rows: "6", placeholder: '请输入内容描述（必填）' },
    rules: [r.required()],
    events: {},
  },
  coverImg: {
    label: '毕业证/学位证或者 学信网学历认证报告',
    rules: [r.required()],
    type: "upload",
    value: '',
    props: {
      accept: ".pdf.jpg.jpeg.png.bmp",
      action: '',
      limit: 1,
      disabled: false,
      "list-type": "picture",
      "file-list": [],
      "auto-upload": true,
      "before-upload": (file) => this.uploadBefore(file, true),
      "on-success": (res, file) => this.uploadSuccess(res, file, 'img'),
    },
    render: (h) => {
      return upload(h)
    }
  },
}