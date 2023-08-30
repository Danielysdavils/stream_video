import userModule from '@/store/Modules/UserModule'
import ToolSelected from '@/store/Modules/ToolSelected'
import VideoModule from './Modules/VideoModule'
import AudioModule from './Modules/AudioModule'
import OutputsModule from './Modules/OutputsModule'
import InputModule from '@/store/Modules/InputModule'
import connectionToServer from './Modules/ConnectionToServer'

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        tool: ToolSelected,
        user: userModule,
        video: VideoModule,
        audio: AudioModule,
        output: OutputsModule,
        input: InputModule,
        connection: connectionToServer
    }
}) 

export default store;