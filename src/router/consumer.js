export default [
  {
    path: '/consumer/index',
    component: () => import('@/views/consumer/index'),
  },
  {
    path: '/consumer/order',
    component: () => import('@/views/consumer/order'),
  },
  {
    path: '/consumer/search',
    component: () => import('@/views/consumer/search'),
  },
  {
    path: '/consumer/consultant-detail/:id',
    component: () => import('@/views/consumer/consultant-detail'),
  },
  {
    path: '/consumer/recommend',
    component: () => import('@/views/consumer/recommend'),
  },
  {
    path: '/consumer/room',
    component: () => import('@/views/consumer/room'),
  },
  {
    path: '/consumer/baseinfo',
    component: () => import('@/views/consumer/baseinfo'),
  },
]