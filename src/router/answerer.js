export default [
  {
    path: '/answerer/center',
    component: () => import('@/views/answerer/center/index'),
  },
  {
    path: '/answerer/order',
    component: () => import('@/views/answerer/order/index'),
  },
  {
    path: '/answerer/cost',
    component: () => import('@/views/answerer/cost/index'),
  },
  {
    path: '/answerer/fill',
    name: 'answerer-fill',
    component: () => import('@/views/answerer/fill/index'),
  },
  {
    path: '/answerer/room',
    component: () => import('@/views/answerer/room/index'),
  },
]