export default [
  {
    path : '/answerer',
    redirect: '/answerer/cost',
  },
  {
    path: 'answerer/center',
    name: 'answerer-center',
    component: () => import('@/views/answerer/center/index'),
  },
  {
    path: 'answerer/order',
    name: 'answerer-order',
    component: () => import('@/views/answerer/order/index'),
  },
  {
    path: 'answerer/cost',
    name: 'answerer-cost',
    component: () => import('@/views/answerer/cost/index'),
  },
]