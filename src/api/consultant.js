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
export function getAvailableTime(params) {
  return request({
    url: '/consultant/order/settlement',
    method: 'get',
    params
  })
}


