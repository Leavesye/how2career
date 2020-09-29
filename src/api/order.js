import request from '@/utils/request'

// 创建订单
export function createOrder(data) {
  return request({
    url: '/platform/orders',
    method: 'post',
    data
  })
}
// 咨询者订单点击时间确认
export function consumerTimeConfirm(data) {
  return request({
    url: '/consumer/orders/time/confirm',
    method: 'put',
    data
  })
}
// 咨询师订单点击时间确认
export function consultantTimeConfirm(data) {
  return request({
    url: '/consultant/orders/time/confirm',
    method: 'put',
    data
  })
}
// 查询咨询师订单列表
export function getConsultantOrders(params) {
  return request({
    url: '/consultant/orders/list/query',
    method: 'get',
    params
  })
}
// 查询咨询者订单列表
export function getConsumerOrders(params) {
  return request({
    url: '/consumer/orders/list/query',
    method: 'get',
    params
  })
}
// 查询咨询者订单数量统计
export function getConsumerOrdersCount(params) {
  return request({
    url: '/consumer/orders/list/count',
    method: 'get',
    params
  })
}
// 查询咨询师订单数量统计
export function getConsultantOrdersCount(params) {
  return request({
    url: '/consultant/orders/list/count',
    method: 'get',
    params
  })
}
// 查询咨询者订单详情
export function getConsumerOrderById(params) {
  return request({
    url: '/consumer/orders/single/query',
    method: 'get',
    params
  })
}
// 查询咨询师订单详情
export function getConsultantOrderById(params) {
  return request({
    url: '/consultant/orders/single/query',
    method: 'get',
    params
  })
}
// 订单更换咨询师
export function changeConsultant(data) {
  return request({
    url: '/orders/consultant',
    method: 'put',
    data
  })
}
// 咨询者更新订单预约时间
export function updateAppointmentTimeByConsumer(data) {
  return request({
    url: '/consumer/orders/time',
    method: 'put',
    data
  })
}
// 咨询师更新订单预约时间
export function updateAppointmentTimeByConsultant(data) {
  return request({
    url: '/consultant/orders/time',
    method: 'put',
    data
  })
}
// 咨询者订单评论
export function rateOrderByConsumer(data) {
  return request({
    url: '/consumer/orders/evaluation',
    method: 'post',
    data
  })
}
// 咨询师订单评论
export function rateOrderByConsultant(data) {
  return request({
    url: '/consultant/orders/evaluation',
    method: 'post',
    data
  })
}
// 咨询者订单投诉
export function complaintByConsumer(data) {
  return request({
    url: '/consumer/orders/complaint',
    method: 'post',
    data
  })
}
// 咨询师订单投诉反馈
export function feedbackByConsultant(data) {
  return request({
    url: '/consultant/orders/complaint',
    method: 'post',
    data
  })
}
// 订单取消
export function cancelOrder(data) {
  return request({
    url: '/consultant/orders/cancel',
    method: 'put',
    data
  })
}
