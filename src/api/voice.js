import request from '@/utils/request'

// 未点击"准备好了"心跳 - 获取同房状态
export function getRoomStatus(params) {
  return request({
    url: '/waitingRoomStatus',
    method: 'get',
    params
  })
}
// 咨询者点击"准备好了"按钮
export function consumerReady(data) {
  return request({
    url: '/consumer/roomEnter',
    method: 'post',
    data
  })
}
// 咨询师点击"准备好了"按钮
export function consultantReady(data) {
  return request({
    url: '/consultant/roomEnter',
    method: 'post',
    data
  })
}


