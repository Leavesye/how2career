export default [
  {
    path: '/consultant/index',
    component: () => import('@/views/consultant/index'),
  },
  {
    path: '/consultant/order/:status',
    component: () => import('@/views/consultant/order'),
  },
  {
    path: '/consultant/cost/:status',
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
    path: '/consultant/room/:id',
    component: () => import('@/views/consultant/room'),
  },
  {
    path: '/consultant/setting/:status',
    component: () => import('@/views/consultant/time-setting'),
  },
  {
    path: '/consultant/message',
    component: () => import('@/views/consultant/message'),
  },
]