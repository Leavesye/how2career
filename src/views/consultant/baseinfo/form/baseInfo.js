import Vue from 'vue'
import moment from 'moment'

const r = Vue.prototype.$rules
export default {
  passWord: {
    value: '',
    label: '密码',
    props: {
      type: 'password'
    },
    rules: [r.required(), r.length(8, 16), r.psd()],
    hide: false,
  },
  name: {
    value: '',
    label: '姓名',
    rules: [r.required(), r.maxLength(20)],
    props: {
      placeholder: '真实姓名',
      style: { width: '200px' },
    }
  },
  nickName: {
    value: '',
    label: '昵称',
    rules: [r.required(), r.maxLength(10)],
    props: {
      placeholder: '专业的非真实姓名',
      style: { width: '200px' },
    }
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
    value : moment().subtract(18, 'year').format('YYYY-MM-DD') ,
    type : 'date',
    rules: [r.required()],
    props: {
      style: { width: '200px' },
      // 出生日期咨询师控制大于18岁
      'picker-options': {
        disabledDate(time) {
          return time.getTime() > moment().subtract(18, 'year').valueOf()
        }
      }
    }
  },
  avatarImage: {
    label: '设置头像',
    type: "upload",
    value: '',
    props: {
      action: process.env.VUE_APP_BASE_API + "/user/platform/consultant/upload",
      accept: '.jpg,.png,.gif',
      name: 'UploadFiles',
      // limit: 1,
      disabled: false,
      "show-file-list": false,
      "auto-upload": true,
      "before-upload": null,
      "on-success": null,
    },
    render: null
  },
}