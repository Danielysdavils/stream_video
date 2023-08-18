import userModule from '@/store/Modules/UserModule'
import ToolSelected from '@/store/Modules/ToolSelected'

import VideoModule from '@/store/Modules/VideoModule'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        tool: ToolSelected,
        user: userModule,

        video: VideoModule
    }
}) 

export default store;