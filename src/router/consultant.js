export default [
  {
    path: '/consultant/center',
    component: () => import('@/views/consultant/center/index'),
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
]