import request from '@/utils/request'

// 获取alipay支付url
export function getAlipayUrl(params) {
  return request({
    url: '/order/platform/orders/payment/alipay/payUrl',
    method: 'get',
    params
  })
}
// 获取微信支付url
export function getWechatUrl(params) {
  return request({
    url: '/order/platform/orders/payment/wechat/payUrl',
    method: 'get',
    params
  })
}


