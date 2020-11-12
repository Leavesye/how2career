export default [
  // 咨询者首页
  {
    path: '/consumer/index',
    component: () => import('@/views/consumer/index'),
  },
  // 订单中心
  {
    path: '/consumer/order/:status',
    component: () => import('@/views/consumer/order'),
  },
  // 订单确认
  {
    path: '/consumer/order-confirm/:id',
    component: () => import('@/views/consumer/order/confirm'),
  },
  // 咨询师搜索
  {
    path: '/consumer/search',
    component: () => import('@/views/consumer/search'),
  },
  // 咨询师详情
  {
    path: '/consumer/consultant-detail/:id',
    component: () => import('@/views/consumer/consultant-detail'),
  },
  // 好友推荐
  {
    path: '/consumer/recommend',
    component: () => import('@/views/consumer/recommend'),
  },
  {
    path: '/consumer/howto',
    component: () => import('@/views/consumer/recommend/howto'),
  },
  // 咨询房间
  {
    path: '/consumer/room/:id',
    component: () => import('@/views/consumer/room'),
  },
  // 个人中心-基本信息
  {
    path: '/consumer/baseinfo',
    component: () => import('@/views/consumer/baseinfo'),
  },
  // 个人中心-实名认证
  {
    path: '/consumer/verified',
    component: () => import('@/views/consumer/center/verified'),
  },
  // 个人中心-补充信息
  {
    path: '/consumer/perfect',
    component: () => import('@/views/consumer/center/perfect'),
  },
  // 个人中心-我的收藏
  {
    path: '/consumer/favorites',
    component: () => import('@/views/consumer/center/favorites'),
  },
  // 个人中心-消息通知
  {
    path: '/consumer/message',
    component: () => import('@/views/consumer/center/message'),
  },
]