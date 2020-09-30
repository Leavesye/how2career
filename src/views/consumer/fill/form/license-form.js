import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  d: {
    label: '拥有证书信息',
    value: '',
    rules: [r.required()],
    layout: { span: 10 },
    props: {
      placeholder: '请输入证书名称'
    }
  },
  f: {
    type: 'date',
    label: '',
    value: '',
    rules: [r.required()],
    layout: {sm : 7, md : 7, lg : 7},
    labelWidth: '0',
    props: {
      placeholder: '有效日期'
    }
  },
  g: {
    label: '',
    value: '',
    rules: [r.required()],
    layout: {sm : 7, md : 7, lg : 7},
    labelWidth: '0',
    props: {
      placeholder: '请输入补充信息'
    }
  },
  coverImg: {
    label: '',
    type: "upload",
    value: '',
    props: {
      accept: ".pdf.jpg.jpeg.png.bmp",
      action: '',
      limit: 1,
      disabled: false,
      "list-type": "picture",
      "file-list":  [],
      "auto-upload": true,
      "before-upload": (file) => this.uploadBefore(file, true),
      "on-success": (res, file) => this.uploadSuccess(res, file, 'img'),
    },
    render: (h) => {
      return upload(h)
    }
  },
}