import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

// 前端错误监控
import * as fundebug from "fundebug-javascript";
import fundebugVue from "fundebug-vue";

import ElementUI from 'element-ui'
import '../theme/index.css'
import * as elementApi from './utils/element-api'

import '@/styles/index.scss' // global css
import './icons'
import App from './App'
import store from './store'
import router from './router'
import '@/permission' // permission control
import '@/utils/register-global'

import { axTable, axTableColumn } from './components/table'
import { axForm, axFormItem } from './components/form'
import rules from './utils/validate-rules'
import MetaInfo from 'vue-meta-info'

fundebug.init({
  apikey: "e6a17cbfc307ec62f6effd10f56c3a476551f80f699bbd979869a6b977f6f104"
})
fundebugVue(fundebug, Vue);

Vue.use(MetaInfo)

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
