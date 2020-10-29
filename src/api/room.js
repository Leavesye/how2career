import request from '@/utils/request'
import store from '@/store'

// 未点击"准备好了"心跳 - 获取同房状态
export function getRoomStatus(params) {
  return request({
    url: '/timer/platform/waitingRoomStatus',
    method: 'get',
    params
  })
}
// 点击"准备好了"心跳 - 获取同房状态且发送自己状态
export function getRoomStatusAfterReady(data) {
  return request({
    url: `/timer/platform/roomHeart`,
    method: 'post',
    data
  })
}
// 咨询者/咨询师 点击"准备好了"按钮
export function clickReady(data) {
  return request({
    url: `/timer/platform/${store.state.user.role}/roomEnter`,
    method: 'post',
    data
  })
}
// 获取服务器当前时间
export function getServiceTime(params) {
  return request({
    url: `/timer/platform/timeStamp`,
    method: 'get',
    params
  })
}
// 获取语音客户端签名
export function getSign(params) {
  return request({
    url: `/user/platform/trtc/sign`,
    method: 'get',
    params
  })
}


