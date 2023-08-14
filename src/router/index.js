import Vue from 'vue'
import VueRouter from 'vue-router'

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
    component: () => import('@/views/StreamSettings/StreamSettingsView.vue'),
    children : [
      {
        path: 'video',
        component: () => import('@/views/StreamSettings/MenuStreamSettings/SettingsVideo/SettingsVideo.vue')
      },
      {
        path: 'audio',
        component: () => import('../views/StreamSettings/MenuStreamSettings/SettingsSaving/SettingsSaving.vue')
      },
      {
        path: 'output',
        component: () => import('../views/StreamSettings/MenuStreamSettings/SettingsAlarm/SettingsAlarm.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
