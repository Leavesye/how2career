import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  gallupCertified: {
    text : '有Gallup Certified证书' ,
    value : '' ,
    type : 'single-checkbox',
    layout: { span:24 },
    labelWidth: '70px',
    events: {
      change: function (i, v) {
        this.handleCheckboxChange(5, i, v)
      }
    }
  },
  gallupCertifiedImage: {
    layout: { span: 18 },
    labelWidth:'20px',
    label: '',
    type: "upload",
    value: '',
    hide: true,
    props: {
      action: process.env.VUE_APP_BASE_API + "/user/platform/consultant/upload",
      accept: '.jpg,.png,.gif',
      name: 'UploadFiles',
      limit: 1,
      disabled: false,
      "list-type":"picture-card",
      "show-file-list": true,
      "auto-upload": true,
      "before-upload": function (index, file) { this.uploadBefore(file, index) },
      "on-success": function (index, res, file) { this.uploadSuccess(res, file, index, ['callup', 'gallupCertifiedImage']) },
    },
    render: (h) => {
      return upload(h)
    }
  }
}