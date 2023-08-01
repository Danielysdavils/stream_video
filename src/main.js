import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'
import store from './store/store'

import { BootstrapVue, IconsPlugin } from  'bootstrap-vue'
import  'bootstrap/dist/css/bootstrap.css' 
import  'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

new Vue({
  render: h => h(App),
  router: router,
  store: store

}).$mount('#app')
