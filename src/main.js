import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import * as elementApi from './utils/element-api'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/permission' // permission control
import '@/utils/register-global'

import { axTable, axTableColumn } from './components/table'
import { axForm, axFormItem } from './components/form'
import rules from './utils/validate-rules'

Vue.prototype.$rules = rules
Vue.use(axForm)
Vue.use(axFormItem)
Vue.use(axTable)
Vue.use(axTableColumn)
Vue.prototype.alert = elementApi.alert
Vue.prototype.loading = elementApi.loading

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV !== 'production') {
  // const { mockXHR } = require('../mock')
  // mockXHR()
}

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
