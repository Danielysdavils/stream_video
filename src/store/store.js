import userModule from '@/store/Modules/UserModule'
import ToolSelected from '@/store/Modules/ToolSelected'
import VideoModule from './Modules/VideoModule'
import AudioModule from './Modules/AudioModule'
import OutputsModule from './Modules/OutputsModule'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        tool: ToolSelected,
        user: userModule,
        video: VideoModule,
        audio: AudioModule,
        output: OutputsModule
    }
}) 

export default store;