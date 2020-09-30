import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  h: {
    text : '有Gallup Certified证书' ,
    value : '' ,
    type : 'checkbox',
    rules : [{ required : true , message : '必选项' }] ,
    events : {},
    layout: {sm : 6, md : 6, lg : 6},
    labelWidth: '70px',
  },
  coverImg: {
    layout: {sm : 18, md : 18, lg : 18},
    labelWidth:'20px',
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