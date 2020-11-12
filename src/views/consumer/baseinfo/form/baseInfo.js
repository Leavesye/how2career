import Vue from 'vue'
import moment from 'moment'

const r = Vue.prototype.$rules
export default {
  userName: {
    value: '',
    label: '手机号',
    rules: [r.required(), r.mobile()]
  },
  passWord: {
    value: '',
    label: '密码',
    rules: [r.required(), r.length(6, 12)],
    props: {
      type: 'password'
    }
  },
  name: {
    value: '',
    label: '姓名',
    rules: [r.required(), r.maxLength(20)],
  },
  nickName: {
    value: '',
    label: '昵称',
    rules: [r.required(), r.maxLength(10)],
  },
  gender: {
    label : '性别' ,
    value : '' ,
    type : 'radio',
    props: {label: 'label', value: 'value' },
    options: [
      {label: '男', value: 'm'},
      {label: '女', value: 'f'},
    ],
    rules : [r.required()] ,
  },
  birthday: {
    label : '出生年月' ,
    value : '' ,
    type : 'date',
    rules: [r.required()],
    props: {
      style: { width: '200px' },
      // 出生日期>0
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().valueOf()
        }
      }
    }
  },
  avatarImage: {
    label: '设置头像',
    rules: [r.required()],
    type: "upload",
    value: '',
    props: {
      action: process.env.VUE_APP_BASE_API + "/user/platform/consumer/upload",
      accept: '.jpg,.png,.gif',
      name: 'UploadFiles',
      disabled: false,
      "show-file-list": false,
      "auto-upload": true,
      "before-upload": null,
      "on-success": null,
    },
    render: null
  },
}