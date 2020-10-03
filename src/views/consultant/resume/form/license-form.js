import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  name: {
    label: '拥有证书信息',
    value: '',
    layout: { span: 10 },
    rules: [r.maxLength(20)],
    props: {
      placeholder: '请输入证书名称'
    }
  },
  expireDate: {
    type: 'date',
    label: '',
    value: '',
    layout: { span: 7 },
    labelWidth: '0',
    props: {
      placeholder: '有效日期'
    }
  },
  comments: {
    label: '',
    value: '',
    layout: { span: 7 },
    labelWidth: '0',
    rules: [r.maxLength(100)],
    props: {
      placeholder: '请输入补充信息'
    }
  },
  certificateImage: {
    label: '',
    type: "upload",
    value: '',
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
      "on-success": function (index, res, file) { this.uploadSuccess(res, file, index, ['licenses', 'certificateImage']) },
    },
    render: (h) => {
      return upload(h)
    }
  },
}