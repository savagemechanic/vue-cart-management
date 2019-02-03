import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// element ui modal
import { Dialog } from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Dialog, { locale });

Vue.config.productionTip = false

Vue.filter('savageprice', function (value) {
  if (!value) return '0'
  value = value.toString()
  return value.match(/.{1,3}/g).join(',')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
