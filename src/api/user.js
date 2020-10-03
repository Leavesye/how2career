import request from '@/utils/request'
import store from '@/store'

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
    url: '/user/platform/login',
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
    url: `/user/platform/consultant/user`,
    method: 'get',
    params
  })
}
// 更新 咨询者/咨询师 用户信息
export function updateUserInfo(data) {
  return request({
    url: `/user/platform/${store.state.user.role}/user`,
    method: 'put',
    data
  })
}

// 查询咨询师公开信息
export function getConsultantPublicjInfo(params) {
  return request({
    url: '/user/platform/consultant/user/publicInfo',
    method: 'get',
    params
  })
}

