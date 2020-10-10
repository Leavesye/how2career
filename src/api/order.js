import request from '@/utils/request'
import store from '@/store'

// 创建订单
export function createOrder(data) {
  return request({
    url: '/order/platform/orders',
    method: 'post',
    data
  })
}
// 咨询者/咨询师 订单点击时间确认
export function timeConfirm(data) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/time/confirm`,
    method: 'put',
    data
  })
}

// 查询咨询师/咨询者订单列表
export function getOrders(params) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/list/query`,
    method: 'get',
    params
  })
}
// 查询咨询者/咨询师订单数量统计
export function getOrdersCount(params) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/list/count`,
    method: 'get',
    params
  })
}
// 查询咨询者/咨询师订单详情
export function getOrderById(params) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/single/query`,
    method: 'get',
    params
  })
}

// 订单更换咨询师
export function changeConsultant(data) {
  return request({
    url: '/order/platform/orders/consultant',
    method: 'put',
    data
  })
}
// 咨询者/咨询师更新订单预约时间
export function updateTime(data) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/time`,
    method: 'put',
    data
  })
}
// 订单添加咨询者问题
export function orderAddQuestion(data) {
  return request({
    url: `/order/platform/consumer/orders/question`,
    method: 'post',
    data
  })
}

// 咨询者订单评论
export function rateOrder(data) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/evaluation`,
    method: 'post',
    data
  })
}

// 咨询者订单投诉
export function complaintByConsumer(data) {
  return request({
    url: '/order/platform/consumer/orders/complaint',
    method: 'post',
    data
  })
}
// 咨询师订单投诉反馈
export function feedbackByConsultant(data) {
  return request({
    url: '/order/platform/consultant/orders/complaint',
    method: 'post',
    data
  })
}
// 咨询师/咨询者 订单取消
export function cancelOrder(data) {
  return request({
    url: `/order/platform/${store.state.user.role}/orders/cancel`,
    method: 'put',
    data
  })
}
// 查询订单的咨询者信息(用于咨询师订单详情显示)
export function queryConsumerByOrderId(params) {
  return request({
    url: `order/platform/consultant/orders/consumer/query`,
    method: 'get',
    params
  })
}
