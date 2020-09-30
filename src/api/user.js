import request from '@/utils/request'

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
// 咨询者注册
export function consumerReg(data) {
  return request({
    url: '/user/platform/consumer/user',
    method: 'post',
    data
  })
}
// 咨询师注册
export function consultantReg(data) {
  return request({
    url: '/user/platform/consultant/user',
    method: 'post',
    data
  })
}
// 咨询者实名认证
export function consumerRealVerify(data) {
  return request({
    url: '/order/platform/consumer/realVerify',
    method: 'post',
    data
  })
}
// 咨询师实名认证
export function consultantRealVerify(data) {
  return request({
    url: '/order/platform/consultant/realVerify',
    method: 'post',
    data
  })
}
// 查询咨询者用户信息
export function getConsumer(params) {
  return request({
    url: '/user/platform/consumer/user',
    method: 'get',
    params
  })
}
// 更新咨询者用户信息
export function updateConsumer(data) {
  return request({
    url: '/user/platform/consumer/user',
    method: 'put',
    data
  })
}
// 查询咨询师用户信息
export function getConsultant(params) {
  return request({
    url: '/user/platform/consultant/user',
    method: 'get',
    params
  })
}
// 更新咨询师用户信息
export function updateConsultant(data) {
  return request({
    url: '/user/platform/consultant/user',
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

