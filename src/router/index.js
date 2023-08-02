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
        path: 'settingsvideo',
        component: () => import('@/views/StreamSettings/MenuStreamSettings/SettingsVideo/SettingsVideo.vue'),
        children: [
          {
            path: ''
          }
        ]
      },
      {
        path: 'audio',
        component: () => import('../views/StreamSettings/MenuStreamSettings/SettingsSaving/SettingsSaving.vue')
      },
      {
        path: 'saida',
        component: () => import('../views/StreamSettings/MenuStreamSettings/SettingsAlarm/SettingsAlarm.vue')
      }
    ]
  },
  {
    path:'/Other',
    name: 'other'
  }
]

const router = new VueRouter({
  routes
})

export default router
