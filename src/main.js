import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FlagIcon from 'vue-flag-icon'
import { i18n } from '../plugins/i18n'
import 'normalize.css'

Vue.config.productionTip = false
Vue.use(FlagIcon)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
