import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  socialInsuranceImage: {
    label: '上传现任公司社保证明',
    type: "upload",
    rules : [r.required()],
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
      "on-success": function (index, res, file) { this.uploadSuccess(res, file, index, ['socialEcurity', 'socialInsuranceImage']) },
      "on-remove": function (index, file, fileList) { this.uploadRemove(file, fileList, index, ['socialEcurity', 'socialInsuranceImage']) },
    },
    render: (h) => {
      return upload(h)
    }
  },
}