import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  b: {
    value: '',
    label: '手机号码/邮箱地址',
    rules: [r.required()],
  },
  baa: {
    value: '',
    label: '密码',
    rules: [r.required()],
  },
  bc: {
    value: '',
    label: '姓名',
    rules: [r.required()],
  },
  bcc: {
    value: '',
    label: '昵称',
    rules: [r.required()],
  },
  bccc: {
    label : '性别' ,
    value : '' ,
    type : 'radio',
    props: {label: 'label', value: 'value' },
    options: [
      {label: '男', value: '1'},
      {label: '女', value: '2'},
    ],
    rules : [r.required()] ,
  },
  i: {
    label : '出生年月' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    props: {
      style: {width: '200px'}
    }
  },
  coverImg: {
    label: '设置头像',
    rules: [r.required()],
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