import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name:'login',
    component:() => import('@/views/login/LoginView.vue')
  },

  {
    path:'/home',
    name: 'home',
    component: () => import('@/views/Home/HomeView.vue')
  },

  {
    path: '/streamconfig',
    name: 'streamconfig',
    component: store.getters['connected/getConnectedToServer'] ? () => import('@/views/StreamSettings/StreamSettingsView.vue')  : () => import('@/views/StreamSettings/ErroConnection.vue'),

    children : [
      {
        path: 'video',
        component: () => import('@/views/StreamSettings/MenuStreamSettings/SettingsVideo/SettingsVideo.vue')
      },
      {
        path: 'audio',
        component: () => import('../views/StreamSettings/MenuStreamSettings/SettingsAudio/SettingsAudio.vue')
      },
      {
        path: 'input',
        component: () => import('../views/StreamSettings/MenuStreamSettings/settingsInput/SettingsInput.vue')
      },
      {
        path: 'output',
        component: () => import('../views/StreamSettings/MenuStreamSettings/SettingsOutput/SettingsOutput.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
