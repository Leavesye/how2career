export default [
  {
    path : '/answerer',
    redirect: '/answerer/center',
  },
  {
    path: 'answerer/center',
    name: 'answerer-center',
    component: () => import('@/views/answerer/center/index'),
  },
]