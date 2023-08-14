import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueI18n from 'vue-i18n'

//modules
import store from '@/store/store'
import i18n from '@/lang/i18n'

import { BootstrapVue, IconsPlugin } from  'bootstrap-vue'
import  'bootstrap/dist/css/bootstrap.css' 
import  'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(VueI18n)

new Vue({
  render: h => h(App),
  store: store,
  router,
  i18n
}).$mount('#app')
