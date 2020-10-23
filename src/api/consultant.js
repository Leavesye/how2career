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


