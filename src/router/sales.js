export default [
  {
    path: '/sales/index',
    component: () => import('@/views/sales/index'),
  },
  {
    path: '/sales/report',
    component: () => import('@/views/sales/report'),
  },
  {
    path: '/sales/howto',
    component: () => import('@/views/howto'),
  },
  {
    path: '/sales/qylogin',
    component: () => import('@/views/sales/qylogin'),
  }
]