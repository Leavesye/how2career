import request from '@/utils/request'

// 更新咨询师可用时间
export function updateAvailableTime(data) {
  return request({
    url: '/consultant/platform/consultant/timeAvailable',
    method: 'put',
    data
  })
}
// 咨询师查询待发放订单
export function getConsultantFinanceOrder(params) {
  return request({
    url: '/consultantFinance/platform/consultant/order/settlement',
    method: 'get',
    params
  })
}
// 咨询师查评价列表
export function getRateList(params) {
  return request({
    url: '/consultant/platform/consultant/evaluation',
    method: 'get',
    params
  })
}
// 获取slots列表
export function getSlots(params) {
  return request({
    url: '/consultant/platform/consultant/slot',
    method: 'get',
    params
  })
}
// 咨询师slot关闭
export function closeSlot(data) {
  return request({
    url: '/consultant/platform/consultant/slot',
    method: 'delete',
    data
  })
}
// 咨询师slot单价查询
export function getSlotPrice(params) {
  return request({
    url: '/consultant/platform/consultant/slotPrice',
    method: 'get',
    params
  })
}
// 咨询师劳务合同签署-身份证上传
export function identity(data) {
  return request({
    url: '/consultant/platform/consultant/contract/identity',
    method: 'post',
    data
  })
}
// 咨询师劳务合同签署-信息同步
export function syncInfo(data) {
  return request({
    url: '/consultant/platform/consultant/contract/info',
    method: 'post',
    data
  })
}

// 咨询师劳务合同签署-获取短信口令
export function getCode(params) {
  return request({
    url: '/consultant/platform/consultant/contract/sms',
    method: 'get',
    params
  })
}
// 咨询师劳务合同签署-合同签署
export function sign(data) {
  return request({
    url: '/consultant/platform/consultant/contract/sign',
    method: 'post',
    data
  })
}


