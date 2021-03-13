import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getOrders } from '@/api/order'
import store from '@/store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 没登录态链接访问
// 登录咨询师跳咨询者链接处理

// 跳转白名单
const whiteList = ['/home', '/service', '/about', '/register', '/sales-login', '/sales/qylogin']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // 有登录态直接跳转
  if (hasToken) {
    if (process.env.VUE_APP_ROLE != 'sales') { 
      // 切换页面查询即将开始服务的订单
      getOrders({
        from: "0",
        to: "2601444690",
        page: 0,
        limit: 10,
        condition: 'status==5'
      }).then(res => { 
        if (res.result && res.msg.count) {
          const { _id: orderId } = res.msg.list[0]
          store.dispatch('room/setRoom', orderId)
        } else { 
          store.dispatch('room/setRoom', '')
        }
      })
    }
    next()
    NProgress.done()
  } else {
    const f = whiteList.find(o => to.path.includes(o))
    if (f) {
      next()
      NProgress.done()
    } else {
      if (process.env.VUE_APP_ROLE == 'sales') {
        next(`/sales-login?redirect=${to.path}`)
      } else {
        next(`/home?redirect=${to.path}`)
      }
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
