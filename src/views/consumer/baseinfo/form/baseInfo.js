import Vue from 'vue'

const r = Vue.prototype.$rules
export default {
  userName: {
    value: '',
    label: '手机号码/邮箱地址',
    rules: [r.required()],
  },
  passWord: {
    value: '',
    label: '密码',
    rules: [r.required()],
  },
  name: {
    value: '',
    label: '姓名',
    rules: [r.required()],
  },
  nickName: {
    value: '',
    label: '昵称',
    rules: [r.required()],
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
      style: {width: '200px'}
    }
  },
  avatarImage: {
    label: '设置头像',
    rules: [r.required()],
    type: "upload",
    value: '',
    props: {
      action: process.env.VUE_APP_BASE_API + "/user/platform/consumer/upload",
      accept: '',
      name: 'UploadFiles',
      limit: 1,
      disabled: false,
      "show-file-list": false,
      "auto-upload": true,
      "before-upload": null,
      "on-success": null,
    },
    render: null
  },
}