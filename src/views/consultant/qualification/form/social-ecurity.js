import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  coverImg: {
    label: '上传现任公司社保证明',
    type: "upload",
    rules : [r.required()],
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