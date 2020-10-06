import request from '@/utils/request'
import store from '@/store'
import { getToken } from '@/utils/auth'
import { isJSON } from '@/utils'

// 发送验证码
export function sendCode(data) {
  return request({
    url: '/user/platform/mobile/vCode',
    method: 'post',
    data
  })
}
// 验证手机
export function checkUser(data) {
  return request({
    url: '/user/platform/user/check',
    method: 'post',
    data
  })
}
// 登录
export function login(data) {
  return request({
    url: `/user/platform/${store.state.user.role}/login`,
    method: 'post',
    data
  })
}
// 咨询者/ 咨询师 注册
export function register(data) {
  return request({
    url: `/user/platform/${store.state.user.role}/user`,
    method: 'post',
    data
  })
}
// 咨询者/咨询师 实名认证
export function realVerify(data) {
  return request({
    url: `/order/platform/${store.state.user.role}/realVerify`,
    method: 'post',
    data
  })
}
// 查询 咨询者/咨询师 用户信息
export function getUserInfo (params) {
  return request({
    url: `/user/platform/${store.state.user.role}/user`,
    method: 'get',
    params
  })
}
// 更新 咨询者/咨询师 用户信息
export function updateUserInfo (data) {
  console.log()
  return request({
    url: `/user/platform/${store.state.user.role}/user`,
    method: 'put',
    data
  })
}

// 查询咨询师公开信息
export function getPublicInfo(params) {
  return request({
    url: '/user/platform/consultant/user/publicInfo',
    method: 'get',
    params
  })
}
// 查询咨询师未来7-14天已被预约的时间
export function getAppointmentedTimes(params) {
  return request({
    url: '/user/platform/consultant/appointment',
    method: 'get',
    params
  })
}

export function getUserInfoSync () { 
  const xhr = new XMLHttpRequest()
  xhr.open('GET', process.env.VUE_APP_BASE_API + '/user/platform/consultant/user', false)
  xhr.setRequestHeader("Authorization", getToken())  //设置请求头
  xhr.send()
  console.log(xhr, 'xhr')
  const res = isJSON(xhr.responseText) ? JSON.parse(xhr.responseText) : {}
  return res
}