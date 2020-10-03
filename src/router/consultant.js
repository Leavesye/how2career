export default [
  {
    path: '/consultant/index',
    component: () => import('@/views/consultant/index'),
  },
  {
    path: '/consultant/order',
    component: () => import('@/views/consultant/order'),
  },
  {
    path: '/consultant/cost',
    component: () => import('@/views/consultant/cost'),
  },
  {
    path: '/consultant/baseinfo',
    component: () => import('@/views/consultant/baseinfo'),
  },
  {
    path: '/consultant/resume',
    component: () => import('@/views/consultant/resume'),
  },
  {
    path: '/consultant/room',
    component: () => import('@/views/consultant/room'),
  },
  {
    path: '/consultant/setting',
    component: () => import('@/views/consultant/time-setting'),
  },
]