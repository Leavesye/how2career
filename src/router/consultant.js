export default [
  {
    path: '/consultant/index',
    component: () => import('@/views/consultant/index'),
  },
  {
    path: '/consultant/order',
    component: () => import('@/views/consultant/order/index'),
  },
  {
    path: '/consultant/cost',
    component: () => import('@/views/consultant/cost/index'),
  },
  {
    path: '/consultant/fill',
    component: () => import('@/views/consultant/fill/index'),
  },
  {
    path: '/consultant/room',
    component: () => import('@/views/consultant/room/index'),
  },
  {
    path: '/consultant/setting',
    component: () => import('@/views/consultant/time-setting/index'),
  },
]