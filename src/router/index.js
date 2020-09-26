import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import answerer from './answerer'

export const constantRoutes = [
  {
    path: '/home',
    component: () => import('@/views/home/index'),
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
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
    path: '/answerer',
    component: Layout,
    redirect: '/answerer/center',
    children: [
      ...answerer
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
