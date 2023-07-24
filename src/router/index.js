import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name:'home'
    },
    {
      path:'/stream',
      name: 'stream'
    },
    {
      path: '/streamconfig',
      name: 'streamconfig',
      component: () => import('../views/StreamSettings/StreamSettings.vue'),
      children : [
        {
          path: 'settingsvideo',
          component: () => import('../views/StreamSettings/ConfigStreamMenu/SettingsVideo/SettingsVideo.vue')
        },
        {
          path: 'saving',
          component: () => import('../views/StreamSettings/ConfigStreamMenu/SettingsSaving/SettingsSaving.vue')
        },
        {
          path: 'alarm',
          component: () => import('../views/StreamSettings/ConfigStreamMenu/SettingsAlarm/SettingsAlarm.vue')
        }
      ]
    },
    {
      path:'/Other',
      name: 'other'
    }
  ]
})
