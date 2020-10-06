import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// 没登录态链接访问
// 登录咨询师跳咨询者链接处理

// 跳转白名单
const whiteList = ['/home', '/register']

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  // 有登录态直接跳转
  if (hasToken) {
    next()
    NProgress.done()
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
      NProgress.done()
    } else {
      next(`/home?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
