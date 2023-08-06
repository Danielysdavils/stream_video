import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

//modules
import userModule from './store/Modules/UserModule'

import { BootstrapVue, IconsPlugin } from  'bootstrap-vue'
import  'bootstrap/dist/css/bootstrap.css' 
import  'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
  userModule,
  router
}).$mount('#app')
