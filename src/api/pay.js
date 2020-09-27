import request from '@/utils/request'

// 获取alipay支付url
export function getAlipayUrl(params) {
  return request({
    url: '/orders/payment/alipay/payUrl',
    method: 'get',
    params
  })
}


