export default [
  {
    path: '/consumer/index',
    component: () => import('@/views/consumer/index'),
  },
  {
    path: '/consumer/order',
    component: () => import('@/views/consumer/order/index'),
  },
  {
    path: '/consumer/search',
    component: () => import('@/views/consumer/search/index'),
  },
  {
    path: '/consumer/consultant-detail/:id',
    component: () => import('@/views/consumer/consultant-detail/index'),
  },
  {
    path: '/consumer/recommend',
    component: () => import('@/views/consumer/recommend/index'),
  },
  {
    path: '/consumer/room',
    component: () => import('@/views/consumer/room/index'),
  }
]