import request from '@/utils/request'

// 发送验证码
export function sendCode(data) {
  return request({
    url: '/mobile/vCode',
    method: 'post',
    data
  })
}
// 验证手机
export function checkUser(data) {
  return request({
    url: '/user/check',
    method: 'post',
    data
  })
}

