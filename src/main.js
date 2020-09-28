import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import '../theme/index.css'
import { Calendar, ConfigProvider } from 'ant-design-vue'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import '@/permission' // permission control
import TRTC from 'trtc-js-sdk'

// echarts图表
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

// schedule 插件1122
// https://ej2.syncfusion.com/vue/documentation/schedule/getting-started/


import { axTable, axTableColumn } from './components/table'
import { axForm, axFormItem } from './components/form'
import rules from './utils/validate-rules'

Vue.use(Calendar)
Vue.use(ConfigProvider)
Vue.use(axForm)
Vue.use(axFormItem)
Vue.use(axTable)
Vue.use(axTableColumn)
Vue.prototype.$rules = rules
Vue.prototype.$echarts = echarts

// const client = TRTC.createClient({
//   mode: 'rtc',
//   sdkAppId: '1400420577',
//   userId: '123',
//   userSig:'12333'
// })

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
