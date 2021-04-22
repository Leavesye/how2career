import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// layout
import LayoutConsultant from '@/layout/consultant'
import LayoutConsumer from '@/layout/consumer'
import LayoutSales from '@/layout/sales'
import RegLayout from '@/layout/reg'

// routes
import consultant from './consultant'
import consumer from './consumer'
import sales from './sales'

const consultantRoute = {
  path: '/consultant',
  component: LayoutConsultant,
  redirect: '/consultant/index',
  children: [
    ...consultant
  ]
}
const consumerRoute = {
  path: '/consumer',
  component: LayoutConsumer,
  redirect: '/consumer/index',
  children: [
    ...consumer
  ]
}
const salesRoute = {
  path: '/sales',
  redirect: '/sales/index',
  component: LayoutSales,
  children: [
    ...sales
  ]
}
export let constantRoutes = [
  {
    path: '/',
    redirect: process.env.VUE_APP_ROLE == 'sales' ? '/sales-login' : '/home'
  },
  {
    path: '/home',
    component: () => import('@/views/home/index'),
  },
  {
    path: '/service',
    component: () => import('@/views/home/service'),
  },
  {
    path: '/about',
    component: () => import('@/views/home/about'),
  },
  {
    path: '/sales-login',
    component: () => import('@/views/home/sales'),
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
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
if (process.env.NODE_ENV == 'development') {
  constantRoutes = [...constantRoutes, salesRoute, consultantRoute, consumerRoute]
} else {
  if (process.env.VUE_APP_ROLE == 'sales') {
    constantRoutes.push(salesRoute)
  } else {
    constantRoutes.push(consultantRoute)
    constantRoutes.push(consumerRoute)
  }
}
const createRouter = () => new Router({
  mode: 'history', 
  base: '/',
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
