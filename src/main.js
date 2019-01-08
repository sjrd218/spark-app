import Vue from 'vue'
import Buefy from 'buefy'
import vSelect from 'vue-select'

import App from './App.vue'
import {
  store
} from "@/store"
import {
  router
} from '@/router'

// Styles
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

Vue.use(Buefy)
// register globally
Vue.component('v-select', vSelect)

// // Ensure we checked auth before each page load.
// router.beforeEach((to, from, next) =>
//   Promise.all([store.dispatch(CHECK_AUTH)]).then(next)
//)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
