import Vue from 'vue'
import { upload } from './upload'

const r = Vue.prototype.$rules
export default {
  name: {
    type: 'input',
    label: '拥有证书信息',
    value: '',
    layout: { span: 12 },
    rules: [r.maxLength(20)],
    props: {
      placeholder: '请输入证书名称'
    }
  },
  expireDate: {
    type: 'date',
    label: '',
    value: '',
    layout: { span: 6 },
    labelWidth: '0',
    props: {
      "value-format": 'timestamp',
      placeholder: '有效日期'
    }
  },
  comments: {
    type: 'input',
    label: '',
    value: '',
    layout: { span: 6 },
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
      "file-list": [],
      "list-type":"picture-card",
      "show-file-list": true,
      "auto-upload": true,
      "before-upload": function (index, file) { this.uploadBefore(file, index) },
      "on-success": function (index, res, file) { this.uploadSuccess(res, file, index, ['otherCertificates', 'certificateImage']) },
      "on-remove": function (index, file, fileList) { this.uploadRemove(file, fileList, index, ['otherCertificates', 'certificateImage']) },
    },
    render: (h) => {
      return upload(h)
    },
    slotRender: (h) => {
      return (
        <a style="color: #15479E;margin-top: 15px;display:block" href="/pdf/通过教留服获得境外学位认证步骤.pdf" target="_blank">如何获取</a>
      )
    }
  },
}