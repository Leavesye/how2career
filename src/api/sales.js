import request from '@/utils/request'

// 查询销售订单
export function getOrders(params) {
  return request({
    url: '/sales/orders',
    method: 'get',
    params
  })
}
// 查询销售订单报表
export function getOrderReport(params) {
  return request({
    url: '/sales/orders/report',
    method: 'get',
    params
  })
}
// 查询注册用户报表
export function getRegReport(params) {
  return request({
    url: '/sales/register/report',
    method: 'get',
    params
  })
}
// 查询销售首页总计
export function getHomeCount(params) {
  return request({
    url: '/sales/home/count',
    method: 'get',
    params
  })
}
// 查询销售业绩
export function getSalesPerformance(params) {
  return request({
    url: '/sales/performance',
    method: 'get',
    params
  })
}
// 企业微信登录
export function qyLogin(params) {
  return request({
    url: '/sales/qywx/returnLogin',
    method: 'get',
    params
  })
}


