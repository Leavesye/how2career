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
// 密码重置验证码
export function sendResetCode(data) {
  return request({
    url: '/user/platform/mobile/vCode/reset',
    method: 'post',
    data
  })
}
// 密码重置
export function resetPwd(data) {
  return request({
    url: '/user/platform/pwd/reset',
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
  const role = store.state.user.role || 'consumer'
  return request({
    url: `/user/platform/${role}/user`,
    method: 'post',
    data
  })
}
// 咨询者/咨询师 实名认证
export function realVerify(data) {
  return request({
    url: `/user/platform/${store.state.user.role}/realVerify`,
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
  const res = isJSON(xhr.responseText) ? JSON.parse(xhr.responseText) : {}
  return res
}
// 查询咨询师消息
export function getMessage (params) {
  return request({
    url: `/user/platform/${store.state.user.role}/message/list/query`,
    method: 'get',
    params
  })
}
// 收藏咨询师
export function favorite (data) {
  return request({
    url: `/user/platform/consumer/favorite`,
    method: 'post',
    data
  })
}
// 删除收藏咨询师
export function delFavorite (data) {
  return request({
    url: `/user/platform/consumer/favorite`,
    method: 'delete',
    data
  })
}
// 查询收藏咨询师
export function getFavorites (params) {
  return request({
    url: `/user/platform/consumer/favorite`,
    method: 'get',
    params
  })
}
// 查询数据字典
export function getDicts (params) {
  return request({
    url: `/user/platform/enumerate`,
    method: 'get',
    params
  })
}
// 加入好友推荐
export function join (data) {
  return request({
    url: `/user/platform/mgm/join`,
    method: 'put',
    data
  })
}
// tracking 访问咨询师详情动作
export function trackViewConsultant (data) {
  return request({
    url: `/user/platform/consumer/visits`,
    method: 'post',
    data
  })
}
// 咨询者获取经常访问咨询师top4
export function getTop4Consultant (params) {
  return request({
    url: `/user/platform/consumer/visits`,
    method: 'get',
    params
  })
}