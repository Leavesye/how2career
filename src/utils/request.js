import Vue from 'vue'
import axios from 'axios'
import { MessageBox, Notification } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    // do something before request is sent
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
  error => {
    // do something with request error
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (!res.result) {
      Notification({
        title: '提示',
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    // token不合法或者失效
    if (error.message.includes('403')) {
      // to re-login
      MessageBox.confirm('您已注销，可以取消以保留在该页面上，或者再次登录', '重新登录', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/loginout').then(() => {
          location.reload()
        })
      })
      return false
    }
    Notification({
      title: '提示',
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
Vue.prototype.$request = service
export default service
