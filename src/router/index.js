import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import LayoutConsultant from '@/layout/consultant'
import LayoutConsumer from '@/layout/consumer'
import RegLayout from '@/layout/reg'

import consultant from './consultant'
import consumer from './consumer'

export const constantRoutes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
  },
  {
    path: '/demo',
    component: () => import('@/views/demo/index'),
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/register',
    component: RegLayout,
    children: [
      {
        path: '/register/consumer',
        component: () => import('@/views/consumer/baseinfo')
      },
      {
        path: '/register/consultant',
        component: () => import('@/views/consultant/baseinfo')
      },
    ]
  },
  // 咨询师
  {
    path: '/consultant',
    component: LayoutConsultant,
    redirect: '/consultant/index',
    children: [
      ...consultant
    ]
  },
  // 咨询者
  {
    path: '/consumer',
    component: LayoutConsumer,
    redirect: '/consumer/index',
    children: [
      ...consumer
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', 
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
